import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { PORT, API_SECRET } from './config';
import authorizationRoute from './authorize';
import verificationRoute from './verify';

const app = express();

const allowedOrigins = [
  'https://developer.lens.xyz',
  // Use a regex to match *.fountain.ink
  /^https?:\/\/([a-zA-Z0-9-]+\.)*fountain\.ink$/,
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.some(allowedOrigin =>
      allowedOrigin instanceof RegExp
        ? allowedOrigin.test(origin)
        : allowedOrigin === origin
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', function (req, res) { res.status(200).json({ online: true }); });
app.post('/', function (req, res) { res.status(200).json({ online: true }); });

app.use('/:secret', function (req, res, next) {
  const secret = req.params.secret;

  console.log(`INFO: ${req.method} ${req.originalUrl.replace(/\/[^/]+/, '/[REDACTED]')}`);

  if (secret !== API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});

app.use('/:secret/authorize', authorizationRoute);
app.use('/:secret/verify', verificationRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 