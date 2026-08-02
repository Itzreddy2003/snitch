import { config } from "dotenv";

config();
if (!process.env.MONGO_URI) {
  throw new Error("Mongo Uri is not defined!");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret is not defined!");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Google Client ID is not defined!");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client Secret is not defined!");
}

if (!process.env.IMAGE_KIT_PRIVATE_KEY) {
  throw new Error("Image Kit Private Key is not defined!");
}

export const iconfig = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY,
};
