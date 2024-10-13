import express from 'express';
import { mintNFT } from '../controllers/nftController.js';
import auth from '../middleware/auth.js'; // Assuming you have an auth middleware

const router = express.Router();

// router.get('/token-uri/:tokenId', auth, getTokenURI);
router.post('/mint/:submissionId', auth, mintNFT);

export default router;