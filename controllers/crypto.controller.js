import crypto from "crypto";
import { AppError } from "../utils/appError.js";

const encrypt = (req, res) => {
  const { word } = req.body;

  if (!word) {
    throw new AppError("Word is required", 400);
  }

  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(word, "utf8", "hex");
  encrypted += cipher.final("hex");

  res.json({
    encrypted,
    key: key.toString("hex"),
    iv: iv.toString("hex"),
  });
};

const decrypt = (req, res) => {
  const { encrypted, key, iv } = req.body;

  if (!encrypted || !key || !iv) {
    throw new AppError("Provide all info", 400);
  }

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex"),
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  res.json({
    decrypted,
  });
};

export { encrypt, decrypt };
