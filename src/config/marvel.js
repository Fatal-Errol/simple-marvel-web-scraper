import dotenv from 'dotenv';

dotenv.config();

export const baseUrl = process.env.MARVEL_API_BASE_URL;
export const apiKey = process.env.MARVEL_API_PUBLIC_KEY;
export const apiSecret = process.env.MARVEL_API_PRIVATE_KEY;
export const fetchLimit = 100;
