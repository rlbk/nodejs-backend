import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT || 8000,
  databaseUrl: process.env.MONGO_URI,
  frontendDomain: process.env.FRONTEND_DOMAIN,
  corsOrigin: process.env.CORS_ORIGIN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export default Object.freeze(_config);
