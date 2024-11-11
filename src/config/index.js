const config = {
  NODE_ENV: process.env.NODE_ENV,
  NAME_KEY: process.env.REACT_APP_NAME_KEY || "App",
  NAME_TITLE: process.env.REACT_APP_NAME_TITLE || "app",
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  RESUME_DOWNLOAD_URL: process.env.REACT_APP_RESUME_DOWNLOAD_URL,
  DEFAULT_LANGUAGE: process.env.REACT_APP_DEFAULT_LANGUAGE || "en",
  IMAGE_URL: process.env.REACT_APP_IMAGE_PATH,
  AGORA_APP_ID: process.env.REACT_APP_AGORA_APP_ID,
};

export default config;
