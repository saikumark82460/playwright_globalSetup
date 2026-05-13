const config = require('../playwright.config');
import { FullConfig } from '@playwright/test';
import {
  adminAuthKeys,
  dealerAuthKeys,
  externalAuthKeys,
} from '../utils/webcp/customer-auth-keys';
import { authenticateWebCP } from '../utils/webcp/authenticate';

async function loginAllTestUsers(config: FullConfig) {
  // get auth state for all needed test user accounts
  await authenticateWebCP(config, adminAuthKeys);
  await authenticateWebCP(config, dealerAuthKeys);
  await authenticateWebCP(config, externalAuthKeys); //uncomment this line to also log in a dealer user. Remember to set the credentials in the secret store and uncomment the cleanup line in globalTeardown().
  // await authenticateWebCP(config, logoutAuthKeys);
}

async function globalSetup(config: FullConfig) {
  await loginAllTestUsers(config);
}

export default globalSetup;
