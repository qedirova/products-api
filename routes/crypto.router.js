import { Router } from "express";
import { encrypt, decrypt } from "../controllers/crypto.controller.js";

const router = Router();

router.post("/encrypt", encrypt);
router.post("/decrypt", decrypt);

export { router as cryptoRouter };
