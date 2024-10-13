import axios from "axios";
import Submission from "../models/Submission.js";
import { ethers } from "ethers";
import { contractAbi } from "../abi.js";

const privateKey = process.env.PRIVATE_KEY;
const api = process.env.API;

const contractAddress = process.env.CONTRACT_ADDRESS;

// Ethereum provider
const provider = new ethers.JsonRpcProvider(api);
const wallet = new ethers.Wallet(privateKey, provider);

// export const getTokenURI = async (req, res) => {
//   const { tokenId } = req.params;
//   const { walletAddress } = req.user;

//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/query/${CONTRACT_ADDRESS}/TokenURI`,
//       {
//         network: "TESTNET",
//         blockchain: "KALP",
//         walletAddress: walletAddress,
//         args: {
//           tokenId: tokenId,
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(
//       "Error fetching TokenURI:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).json({ error: "Failed to fetch TokenURI" });
//   }
// };

/////
export const mintNFT = async (req, res) => {
  const { submissionId } = req.params;
  const walletAddress = req.user.user.walletAddress;
  const MyToken = new ethers.Contract(contractAddress, contractAbi, wallet);

  const tokenURI = "localhost:5173/" + submissionId.toString();

  try {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    const tx = await MyToken.safeMint(walletAddress, tokenURI);
    const recipt = await tx.wait();
    const data = await MyToken.tokensOfOwner(walletAddress);
    console.log(recipt);
    console.log(data);
    if (recipt) {
      return res.status(201).json({ message: "NFT minted Successfully" });
    }
    // const tokenId = `${submission.user}-${submission._id}-${Date.now()}`;
  } catch (error) {
    console.log(error);
  }
};

// async function writeContractData() {
//   try {

//     //api method

//   } catch (error) {
//     console.error("Error reading contract data:", error);
//   }
// }

// writeContractData();
