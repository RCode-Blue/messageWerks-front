import appSettings from "../config/appSettings.json";

const getBackendUrl = (path) => {
  const portNumber = process.env.BACKEND_PORT
    ? `:${process.env.BACKEND_PORT}`
    : "";
  const apiVersion = appSettings.backend.api.version;
  const backendUrl = `${process.env.BACKEND_PROTOCOL}${process.env.BACKEND_URL}${portNumber}/v${apiVersion}${path}`;
  return backendUrl;
};

export { getBackendUrl };
