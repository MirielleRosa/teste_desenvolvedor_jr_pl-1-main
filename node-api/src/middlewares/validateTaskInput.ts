import { Request, Response, NextFunction } from "express";

const SUPPORTED_LANGUAGES = ["pt", "en", "es"];

export const validateTaskInput = (req: Request, res: Response, next: NextFunction) => {
  const { text, lang } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'The "text" field is required.' });
  }

  if (!lang) {
    return res.status(400).json({ error: 'The "lang" field is required.' });
  }

  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return res.status(400).json({ error: "Language not supported" });
  }

  next(); 
};
