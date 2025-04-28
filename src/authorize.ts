import express from 'express';
import { API_SECRET, PRIVATE_KEY } from './config';

const router = express.Router();

// Authorize endpoint
router.post('/', function (req, res) {
  if (req.body.test === true) {
    return res.sendStatus(200);
  }

  const { account, signedBy } = req.body;

  if (!account || !signedBy) {
    return res.status(400).json({ error: "Missing 'account' or 'signedBy' field" });
  }

  console.log(`INFO: Wallet ${signedBy} is requesting to authenticate with Account: ${account}.`);

  const isAllowed = true;

  if (!isAllowed) {
    return res.json({ allowed: false, reason: 'User not allowed to login' });
  }

  const isSponsored = true;

  // in vercel `protocol` is `http`, but `x-forwarded-proto` is `https`
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const fullDomain = `${protocol}://${host}`;

  res.json({
    allowed: true,
    sponsored: isSponsored,
    signingKey: PRIVATE_KEY,
  });
});

export default router; 