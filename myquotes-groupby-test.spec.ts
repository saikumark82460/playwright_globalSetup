import { test, expect } from '@playwright/test';
import { dealerAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { waitForLoadingToComplete } from './utils';
useUser(test, dealerAuthKeys);
test('PW-10.001 Validate group by projects section', async ({ page }) => {
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  await test.step('Verifying the Taron logo is visible', async () => {
    await expect(page.locator('header[role="banner"] a')).toBeVisible();
  });
  await test.step('Verifying the My Quotes tab', async () => {
    await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
  });
  await test.step('Clicking on the My Quotes tab', async () => {
    await page.locator('text=My Quotes').click();
  });
  await test.step('Verifying the My Quote and Home breadcrumbs', async () => {
    await expect(page.locator('.breadcrumb')).toBeVisible();
  });
  await test.step('Verifying the My Quotes breadcrumb is active', async () => {
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    await waitForLoadingToComplete(page)
  });
  // await test.step('Clicking on the Group dropdown', async () => {
  //   await page.locator('button.dropdown-toggle').click();
  //   awaitwaitForLoadingToComplete(page)  // });

  // let groupByProjectIsChecked = await page.$$(
  //   '#groupByProjectsCheckbox:checked'
  // );
  // if (groupByProjectIsChecked.length == 1) {
  //   await page.getByText('Group by projects').click();
  // }

  const checkbox = page.locator('#groupByProjectsCheck');

  if (!(await checkbox.isChecked())) {
    await checkbox.click();
  }
  const sortByName = (
    await page
      .locator('.accordion-item button[type="button"]')
      .nth(0)
      .innerText()
  ).valueOf();
  //  console.log(sortByName)

  let projectName = await page.$$('.accordion-item');
  if (projectName.length > 1) {
    await page.locator('text=Project Name').click();
    await waitForLoadingToComplete(page)
    await expect(
      page.locator('.accordion-item button[type="button"] >> nth=0')
    ).not.toHaveText(sortByName);
  }
  // await test.step('Clicking on the Group dropdown', async () => {
  //   await page.locator('button.dropdown-toggle').click();
  // });
  await test.step('Clicking on the Project Name dropdown', async () => {
    await page
      .locator('div.grid__sortableColumn:has-text("Project Name") svg')
      .click();

    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Project Name fields', async () => {
    await expect(page.locator('button.btn-link >> nth=0')).toBeVisible();
  });
  await test.step('Verifying the New Quote', async () => {
    await expect(page.locator('text=New Quote').nth(1)).toBeVisible();
  });
  await test.step('Clicking on the New Quote dropdown', async () => {
    // await page.locator('text=New Quote >> nth=0').click();
    await page.locator('text=New Quote').nth(1).click();
  });
  await test.step('Verifying the New Quote breadcrumb is active', async () => {
    await expect(page.locator('.breadcrumb')).toHaveText(/New Quote/);
  });
});