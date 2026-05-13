const config = require("../playwright.config");
import { FullConfig } from '@playwright/test';
import { adminAuthKeys, dealerAuthKeys,externalAuthKeys } from '../utils/webcp/customer-auth-keys';
import { clearSession } from '../utils/webcp/authenticate';


async function removeAllTestUserSessions(config: FullConfig) {
  await clearSession(adminAuthKeys);
  await clearSession(dealerAuthKeys);
  await clearSession(externalAuthKeys)
  // await clearSession(logoutAuthKeys);
}

async function globalTeardown(config: FullConfig) {
  await removeAllTestUserSessions(config);
}

export default globalTeardown;
