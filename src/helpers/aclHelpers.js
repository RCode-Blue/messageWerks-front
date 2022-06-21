const appSettings = require("../config/appSettings.json");

const checkIsAdmin = (role) => {
  if (parseInt(role) >= appSettings.roles.adminThreshold) {
    return true;
  } else {
    return false;
  }
};

export { checkIsAdmin };
