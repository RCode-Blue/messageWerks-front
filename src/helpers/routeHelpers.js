import appSettings from "../config/appSettings.json";

const getBackendUrl = (path) => {
  const portNumer = process.env.BACKEND_PORT
    ? `:${process.env.BACKEND_PORT}`
    : "";
  const apiVersion = appSettings.backend.api.version;
  const backendUrl = `${process.env.BACKEND_PROTOCOL}${process.env.BACKEND_URL}${portNumer}/v${apiVersion}${path}`;
  // const backendUrl = `${process.env.BACKEND_PROTOCOL}${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/v${apiVersion}${path}`;
  return backendUrl;
};

export { getBackendUrl };
