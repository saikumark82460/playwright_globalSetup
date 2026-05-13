import { IAuthKeys } from '../auth/AuthKeys';

export const adminAuthKeys: IAuthKeys = {
  username: "admin_username", //key of the username from the secret store
  password: "admin_password", //key of the password from the secret store
  storageStateFile: "adminStorageState.json", //file name of the browser session storage
};

export const dealerAuthKeys: IAuthKeys = {
  username: "dealer_username",
  password: "dealer_password",
  storageStateFile: "dealerStorageState.json",
};

export const externalAuthKeys:IAuthKeys={
  username:"external_username",
  password:"external_password",
  storageStateFile:"externalStorageState.json"
}

// export const logoutAuthKeys: IAuthKeys = {
//   username: "logout_username",
//   password: "logout_password",
//   storageStateFile: "logoutStorageState.json",
// };

// add additional users here