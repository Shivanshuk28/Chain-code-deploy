import axios from "axios";

function formatCode(input: string) {
  let formattedCode = input.replace(/\\n/g, "\n");

  formattedCode = formattedCode.replace(/\\\\/g, "\\");

  formattedCode = formattedCode.replace(/\\"/g, '"');

  return formattedCode;
}
const token = localStorage.getItem("token");

async function mintNFT(submissionId: string) {
  console.log("token in mint",token);
  const mint = await axios.post(
    `${import.meta.env.VITE_DOMAIN}/nft/mint/${submissionId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return mint;
}

async function judge(
  problemId: string | undefined,
  language: number,
  code: string
) {
  console.log("token in judge",token);
  const testCasesResponse = await axios.get(
    `${import.meta.env.VITE_DOMAIN}/problems/${problemId}`
  );
  const testCases = testCasesResponse.data.testcases;

  // Submit code to Judge0 for each test case
  const results = await Promise.all(
    testCases.map(async (testCase: any) => {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          language_id: language,
          source_code: formatCode(code),
          stdin: testCase.input,
          expected_output: testCase.output,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const Judgetoken = response.data.token;
      console.log("Submission token:", Judgetoken);

      // Poll for the result
      return await pollForResult(Judgetoken);
    })
  );

  console.log("Judge results:", results);
  return results;
}

async function addToDB(
  problemId: string | undefined,
  code: string,
  language: number
) {
  console.log("token in db",token);
  if (!token) {
    console.log("abcde",token);
    throw new Error("Login to save your submission");
  }

  const saveSubmissionResponse = await axios.post(
    import.meta.env.VITE_DOMAIN + "/submissions/submit",
    {
      problemId: problemId,
      code: formatCode(code),
      language: language.toString(), // Convert language ID to string
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return saveSubmissionResponse;
}

export async function submitCode(
  selectedProblem: any,
  language: number,
  code: string
) {
  try {
    // Check if all test cases passed
    const results = await judge(selectedProblem?._id, language, code);
    const allTestsPassed = results.every((result) => result.status.id === 3); // 3 is the status ID for "Accepted"

    if (allTestsPassed) {
      // If all tests passed, save the submission
      const saveSubmissionResponse = await addToDB(
        selectedProblem?._id,
        code,
        language
      );
      if (saveSubmissionResponse.status === 201) {
        console.log(
          "Submission saved successfully:",
          saveSubmissionResponse.data
        );
      } else {
        console.error(
          "Failed to save submission:",
          saveSubmissionResponse.data
        );
        return { error: "Failed to save submission" };
      }
      const mint = await mintNFT(saveSubmissionResponse.data.submissionId);

      if (mint.status === 201) {
        console.log("NFT minted successfully:", mint.data);
      } else {
        return { error: "All testcases not passed" };
      }

      return { results, allTestsPassed };
    } else {
      return { error: "All testcases not passed" };
    }
  } catch (error: any) {
    if (error.status == 400) {
      return { error: "Your Solution is not unique" };
    }
    console.error("Error submitting code:", error);
    return { error: "An error occurred while submitting your code." };
  }
}

async function pollForResult(Judgetoken: string) {
  let result;
  let attempts = 0;
  const maxAttempts = 10;
  const delay = 2000; // 2 seconds

  while (attempts < maxAttempts) {
    const response = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${Judgetoken}`,
      {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    result = response.data;

    if (result.status.id >= 3) {
      // If status is not "In Queue" or "Processing"
      return {
        status: result.status,
        stdout: result.stdout ? result.stdout : null,
        stderr: result.stderr ? result.stderr : null,
        compile_output: result.compile_output ? result.compile_output : null,
        time: result.time,
        memory: result.memory,
      };
    }

    attempts++;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Polling timed out");
}
