import axios from "axios";
import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js"; // Add this import

async function uniqueSubmissionCheck(req, res, next) {
  const { problemId, code } = req.body;
  try {
    // Fetch the problem to get the submission IDs
    const problem = await Problem.findOne({ _id: problemId });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Fetch all submissions for the given problem, excluding the current submission
    const existingSubmissions = await Submission.find({
      _id: { $in: problem.submissions },
    });
    console.log(existingSubmissions);

    // If there are no other submissions, the current submission is unique
    if (existingSubmissions.length === 0) {
      return next();
    }

    // Compare the current submission with each existing submission
    for (const submission of existingSubmissions) {
      if (req.params.id === submission._id) {
        continue;
      }
      const isUnique = await compareSubmissions(code, submission.code);
      console.log(isUnique + "\n");
      if (!isUnique) {
        return res.status(400).json({ message: "Submission is not unique" });
      }
    }

    // If we've made it through all comparisons, the submission is unique
    next();
  } catch (error) {
    // console.error("Error in uniqueSubmissionCheck middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function compareSubmissions(code1, code2) {
  const prompt = `Return in one word, true or false. Assess if the algorithmically equivalent of the provided code snippets. Consider their data structures, techniques, and time complexities. Return 'true' if they are algorithmically same meaning after all the fuss they are similar at core, 'false' if they are not code 1: ${code1} code 2: ${code2}`;

  const data = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAXP0d1YSWe4c99DvXouVobtpdOKGFaE4k",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const result = response.data.candidates[0].content.parts[0].text
      .trim()
      .toLowerCase();
    console.log(result);
    return result === "false"; // If 'false', the submissions are different (unique)
  } catch (error) {
    console.error("Error comparing submissions:", error);
    throw error;
  }
}

export default uniqueSubmissionCheck;
