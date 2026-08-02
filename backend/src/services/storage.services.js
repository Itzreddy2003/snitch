import ImageKit from "@imagekit/nodejs";
import { iconfig } from "../config/config.js";
import fs from "fs";
const client = new ImageKit({
  privateKey: iconfig.IMAGE_KIT_PRIVATE_KEY, // This is the default and can be omitted
});

export const uploadFile = async (buffer, fileName, folder = "snitch") => {
  try {
    const result = await client.files.upload({
      file: await ImageKit.toFile(buffer),
      fileName: fileName,
      folder: folder,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("File upload failed");
  }
};
