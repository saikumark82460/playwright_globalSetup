import { test, expect } from '@playwright/test';
import { adminAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { waitForLoadingToComplete } from './utils';
test('PW-03.001 Verify login/logout functionality', async ({ page }) => {
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  await test.step('Clicking on Enter your email', async () => {
    await page.getByPlaceholder('Enter your email').click();
  });
  await test.step('Clicking on Register', async () => {
    await page.getByRole('link', { name: 'Register' }).click();
  });
  await test.step('Verifying the First Name is visible', async () => {
    await expect(page.getByText('First Name')).toBeVisible();
  });
  await test.step('Verifying the Last Name is visible', async () => {
    await expect(page.getByText('Last Name')).toBeVisible();
  });
  await test.step('Verifying the Email is visible', async () => {
    await expect(page.getByText('Email')).toBeVisible();
  });
  await test.step('Verifying the Password is visible', async () => {
    await expect(page.getByText('Password').first()).toBeVisible();
  });
  await test.step('Verifying the Confirm password is visible', async () => {
    await expect(page.getByText('Confirm password')).toBeVisible();
  });
  await test.step('Verifying the Show password is visible', async () => {
    await expect(page.getByText('Show Password')).toBeVisible();
  });
  await test.step('Verifying the End User Agreement is visible', async () => {
    await expect(
      page.getByText(
        "By checking this box you agree to be bound by Paradigm's End User Agreement & Pr"
      )
    ).toBeVisible();
  });
  await test.step('Verifying the Sign In Instead is visible', async () => {
    await expect(
      page.getByRole('button', { name: 'Sign In Instead' })
    ).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the register form', async () => {
    await page.locator('div#content').click();
  });
  await test.step('Clicking on the Sign In Instead', async () => {
    await page.getByRole('button', { name: 'Sign In Instead' }).click();
  });
  await test.step('Verifying the page login is visible', async () => {
    await expect(page).toHaveURL(/login/);
  });
  await test.step('Verifying the Background color of next button', async () => {
    await expect(page.locator('button.btn-primary')).toHaveCSS(
      'background-color',
      'rgb(0, 83, 161)'
    );
  });
});
