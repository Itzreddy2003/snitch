import { config } from "dotenv";

config();
if (!process.env.MONGO_URI) {
  throw new Error("Mongo Uri is not defined!");
}

export const iconfig = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
