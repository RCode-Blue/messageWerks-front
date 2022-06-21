import appSettings from "../config/appSettings.json";

const getBackendUrl = (path) => {
  const apiVersion = appSettings.backend.api.version;
  const backendUrl = `${process.env.BACKEND_PROTOCOL}${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/v${apiVersion}${path}`;
  return backendUrl;
};

export { getBackendUrl };
