import { test, expect } from '@playwright/test';
import { dealerAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { waitForLoadingToComplete } from './utils';
useUser(test, dealerAuthKeys);
test('PW-11.001 Verifying the visibility of quick configure in external user', async ({
  page,
}) => {
  test.setTimeout(280000);
  await test.step('Navigating to ABS application', async () => {
    await page.goto('/');
  });
  await test.step('Verifying the New Quote and Buy Hardware Online buttons is visible', async () => {
    await expect(page.locator('div#get-quote-buttons')).toBeVisible();
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
  await test.step('Clicking on the My Quotes tab', async () => {
    await page.locator('text=My Quotes').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Talon banner', async () => {
    await page.getByRole('banner').getByRole('link').click();
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
  await test.step('Clicking on the My Orders tab', async () => {
    await page.locator('text=My Orders').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Talon banner', async () => {
    await page.getByRole('banner').getByRole('link').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
  await test.step('Clicking on the My Views tab', async () => {
    await page.locator('text=My Views').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Talon banner', async () => {
    await page.getByRole('banner').getByRole('link').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
  await test.step('Clicking on the My Customers tab', async () => {
    await page.locator('text=My Customers').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Talon banner', async () => {
    await page.getByRole('banner').getByRole('link').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
  await test.step('Clicking on the My Plans tab', async () => {
    await page.locator('text=My Plans').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Talon banner', async () => {
    await page.getByRole('banner').getByRole('link').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
  await test.step('Clicking on the My Favorites tab', async () => {
    await page.locator('text=My Favorites').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Talon banner', async () => {
    await page.getByRole('banner').getByRole('link').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Quick configure is not visible', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).not.toBeVisible();
  });
});
