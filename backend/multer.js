import multer, { memoryStorage } from "multer";

const storage = memoryStorage(); // Store files in memory
export const upload = multer({ storage: storage });