import dotenv from 'dotenv';

dotenv.config();

export const appName = process.env.npm_package_name;
export const appDescription = process.env.npm_package_description;
export const appVersion = process.env.npm_package_version;
export const appEnv = process.env.NODE_ENV || 'production';
export const appAuthor = {
  name: process.env.npm_package_author_name,
  email: process.env.npm_package_author_email,
  url: process.env.npm_package_author_url,
};
