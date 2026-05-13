import { test, expect } from '@playwright/test';
import { waitForLoadingToComplete } from './utils';

export async function createMyPlan(page) {
  // Date
  const date = new Date();
  // Click text=New Plan
  await page.locator('text=New Plan').click();
  await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  // Click input[name="TemplateName"]
  //LC await page.locator('input[name="TemplateName"]').click();
  await page.locator('input[name="TemplateData.Name"]').click();
  // Fill input[name="TemplateName"]
  //LC await page.locator('input[name="TemplateName"]').fill(`Name ${date.getMinutes()}`);
  await page
    .locator('input[name="TemplateData.Name"]')
    .fill(`Name ${date.getMinutes()}`);
  await test.step('Clicking on Project name Field', async () => {
    await waitForLoadingToComplete(page)
    await expect(page.locator('input[id="projectName"]')).toBeVisible();
    await expect(
      page.locator('button[id="searchProjectButton"]')
    ).toBeVisible();
    await page.locator('button[id="searchProjectButton"]').click();
    await waitForLoadingToComplete(page)
    await expect(
      page.getByPlaceholder('Search projects by name')
    ).toBeVisible();
    await page.getByPlaceholder('Search projects by name').click();
    await page.getByPlaceholder('Search projects by name').fill('test');
    await waitForLoadingToComplete(page)
    await page.locator("input[type='radio']").first().click();
    await waitForLoadingToComplete(page)
  });
  await page.getByRole('button', { name: 'Select a client' }).click();
  await waitForLoadingToComplete(page)
  await page.locator('input[name="client"]').first().click()
  // await page.getByRole('button', { name: 'Close' }).click();

  // Click text=Create
  await page.getByRole('button', { name: 'Create' }).click();
  await waitForLoadingToComplete(page)
  await page.getByRole('link', { name: 'My Plans' }).first().click();
  // await page.locator('button#my-quotes-settings').click();
  // await page.locator('ul.navbar-nav a:has-text("My Quotes")').click();
  let groupBy = await page.$$('.form-check-input:checked');
  if (groupBy.length == 1) {
    // await page.locator('input[id="groupByProjectsCheckbox"]').click();
    await page.locator('#groupByProjectsCheck').check();
  }
  await waitForLoadingToComplete(page)
}

export async function createMyPlanForSort(page) {
  // Date
  const date = new Date();
  // Click text=New Plan
  await page.locator('text=New Plan').click();
  await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  await page.locator('input[name="TemplateData.Name"]').click();

  // Fill input[name="TemplateName"]
  // await page.locator('input[name="TemplateName"]').fill(`Name ${date.getMinutes()}`);
  await page
    .locator('input[name="TemplateData.Name"]')
    .fill(`Name ${date.getMinutes()}`);

  // Click input[name="ProjectName"]
  // await page.locator('input[name="ProjectName"]').click();
  // // Fill input[name="ProjectName"]
  // await page.locator('input[name="ProjectName"]').fill(`Proj Name ${date.getMilliseconds()}`);
  // await page.locator('.wts-react-select__input-container input').click();
  // await page.locator('.wts-react-select__input-container input').fill('test');
  // await waitForLoadingToComplete(page)  // await expect(page.locator('#react-select-2-option-1')).toBeVisible();
  // await page.locator('#react-select-2-option-0').click();
  // awaitwaitForLoadingToComplete(page)  await test.step('Clicking on Project name Field', async () => {
  await waitForLoadingToComplete(page)
  await expect(page.locator('input[id="projectName"]')).toBeVisible();
  await expect(
    page.locator('button[id="searchProjectButton"]')
  ).toBeVisible();
  await page.locator('button[id="searchProjectButton"]').click();
  await waitForLoadingToComplete(page)
  await expect(
    page.getByPlaceholder('Search projects by name')
  ).toBeVisible();
  await page.getByPlaceholder('Search projects by name').click();
  await page.getByPlaceholder('Search projects by name').fill('test');
  await waitForLoadingToComplete(page)
  await page.locator("input[type='radio']").first().click();
  await waitForLoadingToComplete(page)
  await page.getByRole('button', { name: 'Select a client' }).click();
  await waitForLoadingToComplete(page)
  await page.locator('input[name="client"]>> nth=1').click();
  // await page.getByRole('button', { name: 'Close' }).click();

  // Click text=Create
  await page.getByRole('button', { name: 'Create' }).click();
  await waitForLoadingToComplete(page)    // Click text=Create
  // await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  await page.locator('a[data-qa="mainMenuNavBar__myPlans"]').click();
  let groupBy = await page.$$('.form-check-input:checked');
  if (groupBy.length == 1) {
    await page.locator('#groupByProjectsCheck').click();
  }
  await waitForLoadingToComplete(page)
}