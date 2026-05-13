import { test, expect } from '@playwright/test';
import { adminAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { createLineItemForMyPlans } from './create-line-item';
import { createMyPlan, createMyPlanForSort } from './my-plans';
import { waitForLoadingToComplete } from './utils';
useUser(test, adminAuthKeys);
test('PW-07.001 Validate the breadcrumb of my plan page', async ({ page }) => {
  await test.step('Navigate to home page', async () => {
    await page.goto('/');
  });
  await expect(page.locator('text=My Plans'), {
    message: 'Verifying my plans is visible',
  }).toBeVisible();
  await test.step('clicking on the first link(my quotes) in the navigation bar', async () => {
    await page.locator('a.nav-link >> nth = 0').click();
  });
  await test.step('Veriyfing the breadcrumb is active', async () => {
    await expect(page.locator('.breadcrumb')).toBeVisible();
  });
  await test.step('Verifying the active breadcrumb having my quotes text', async () => {
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
  });
});
test('PW-07.002 Validate features of my plan page', async ({ page }) => {
  await test.step('Navigating to home page', async () => {
    await page.goto('/');
  });
  await test.step('Waiting for the page to load', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying my quotes text is visible', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('Clicking on my plans and verifying the breadcrumb should have my plans text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  await createMyPlan(page);
  await test.step('Verifying my quotes text is visible', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('clicking on my plans and verifying the breadcrumb should be having my plans', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  let groupBy = await page.$$('.form-check-input:checked');
  if (groupBy.length != 1) {
    await page.locator('#groupByProjectsCheck').uncheck();
  }
  await test.step('Waiting for the page to load until the table should be visible', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await page.waitForSelector('tbody tr >> nth = 0', {
      state: 'visible',
      timeout: 5000,
    });
    await expect(page.locator('tbody tr >> nth = 0')).toBeVisible();
  });
  const planNo = (await page.locator('(//td)[3]').innerText()).valueOf();
  await test.step('Verifying the placeholder is visible and clicking on the search by number placeholder', async () => {
    await page.locator('[placeholder="Search by Number"]').click();
    await expect(
      page.locator('[placeholder="Search by Number"]')
    ).toBeVisible();
  });
  await test.step('Filling the plan number in the placeholder', async () => {
    await page.locator('[placeholder="Search by Number"]').fill(planNo);
  });
  await test.step('Verifying the table body having plan number ', async () => {
    await expect(page.locator('(//td)[3]')).toHaveText(planNo);
  });
  await createMyPlan(page);
  await test.step('Verifying my quotes text should be viisble', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('clicking on my plans and verifying the breadcrumb should be having my plans', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await waitForLoadingToComplete(page)
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  await test.step('Clicking on sort icon of the table heading field', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await page.locator('thead >> text=Number >> svg').nth(1).click();
  });
  await test.step('Clicking on the sort icon of the table heading field and waiting for the page to load', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await page.locator('thead >> text=Number >> svg').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  // await test.step('Verifying the page should be having the /show/ text at the top', async () => {
  //   await expect(page.locator('.my-quotes-grid__perPage label')).toHaveText(
  //     /Show/
  //   );
  // });
  // await test.step('Verifying the page should be having the /entries/ text at the top', async () => {
  //   await expect(page.locator('.my-quotes-grid__perPage span')).toHaveText(
  //     /entries/
  //   );
  // });
  // await test.step('Verifying the table should not be hvaing the plan number ', async () => {
  //   await expect(page.locator('(//td)[3]')).not.toHaveText(planNo);
  // });
  // !!Expected change:user should not be able to see the entries and entry checkbox
  // await test.step('Verifying the page having /showing/ /to/ /plans/ text is viisble at the bottom', async () => {
  //   await expect(page.locator('.grid__dataCount')).toHaveText(/Showing/);
  //   await expect(page.locator('.grid__dataCount')).toHaveText(/to/);
  //   await expect(page.locator('.grid__dataCount')).toHaveText(/plans/);
  // });
  // //lc await page.locator('text=Show 1025 entries >> select').selectOption('25');
  // await test.step('selecting the option /25/ from the combo box dropdown and waiting for the page to load', async () => {
  //   await page.getByRole('combobox', { name: 'Show' }).selectOption('25');
  //   awaitwaitForLoadingToComplete(page)  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 20000 });
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Verifying the page should not be having the text /showing 1 to 10 plans/', async () => {
  //   await expect(page.locator('.grid__dataCount')).not.toHaveText(
  //     /Showing 1 to 10 plans/
  //   );
  //   awaitwaitForLoadingToComplete(page)  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 20000 });
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('selecting the option /10/ from the combobox and waiting for the page to load', async () => {
  //   await page.getByRole('combobox', { name: 'Show' }).selectOption('10');
  //   awaitwaitForLoadingToComplete(page)  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 15000 });
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Verifying the page should be showing /page 1 is your current page/', async () => {
  //   await expect(
  //     page.locator('[aria-label="Page 1 is your current page"]')
  //   ).toBeVisible();
  // });
  // let nextPage = await page.$$('[aria-label="Page 2"]');
  // if (nextPage.length == 1) {
  //   await page.locator('[aria-label="Page 2"]').click();

  //   awaitwaitForLoadingToComplete(page)  //   await page.waitForSelector('#spinner', {
  //     state: 'hidden',
  //     timeout: 20000,
  //   });
  //   awaitwaitForLoadingToComplete(page)  //   await expect(
  //     page.locator('[aria-label="Page 2 is your current page"]')
  //   ).toBeVisible();
  //   await page.locator('[aria-label="Page 1"]').click();
  //   awaitwaitForLoadingToComplete(page)  //   await page.waitForSelector('#spinner', {
  //     state: 'hidden',
  //     timeout: 20000,
  //   });
  //   awaitwaitForLoadingToComplete(page)  // } else {
  //   await expect(
  //     page.locator('aria-label="Page 1 is your current page"')
  //   ).toBeVisible();
  // }
});
test('PW-07.003 Validate features of my plan table', async ({ page }) => {
  await test.step('Navigating to home page', async () => {
    await page.goto('/');
  });
  await test.step('waiting for the page to load', async () => {
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying my quotes text is visible', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('Clicking on my plans and verifying the breadcrumb having the my plans text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });

  await createMyPlanForSort(page);
  await test.step('Verifying my quotes text is visible', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('clicking on the my plans and having the breadcrumb having my plans text', async () => {
    await page.locator('a[data-qa="mainMenuNavBar__myPlans"]').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  await test.step('verifying the table should be visible and clicking on the table', async () => {
    await expect(page.locator('table')).toBeVisible();
    await page.locator('div#content-main').click();
  });
  await test.step('Verifying the table having created is visible', async () => {
    await expect(page.locator('text=Created')).toBeVisible();
  });
  await test.step('Verifying the table having number is visible', async () => {
    await expect(page.locator('th:has-text("Number")')).toBeVisible();
  });
  await test.step('Verifying the table having name is visible', async () => {
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
  });
  await test.step('Verifying the table having client is visible', async () => {
    await expect(page.locator('th:has-text("Client")')).toBeVisible();
  });
  await test.step('Verifying the table having customer is viisble', async () => {
    await expect(page.locator('th:has-text("Customer")')).toBeVisible();
  });
  const createdNo = (await page.locator('(//td)[2]').innerText()).valueOf();
  await test.step('clciking on sort icon for the created field ', async () => {
    await page.locator('thead>> text=Created >> svg').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('verifying the first row data should not be having created number', async () => {
    await expect(page.locator('(//td)[2]').first()).not.toHaveText(createdNo);
  });
  const planNum = (await page.locator('(//td)[3]').innerText()).valueOf();
  await test.step('clicking on the sort icon for the number field and waiting for the page to load', async () => {
    await page.locator('thead >> text=Number >> svg').nth(1).click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('clicking on the sort icon for the number field', async () => {
    await page.locator('thead >> text=Number >> svg').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying the table data should not be having plan number', async () => {
    await expect(page.locator('(//td)[3]').first()).not.toHaveText(planNum);
  });
  const name = (await page.locator('(//td)[4]').innerText()).valueOf();
  await test.step('clicking on the sort icon for the name field and waiting for the page to load', async () => {
    await page.locator('thead >> text=Name >> svg').nth(1).click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('clicking on the sort icon for the name field and waiting for the page to load', async () => {
    await page.locator('thead >> text=Name >> svg').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying the table data should not be having the name', async () => {
    await expect(page.locator('(//td)[4]').first()).not.toHaveText(name);
  });
  const client = (await page.locator('(//td)[5]').innerText()).valueOf();
  await test.step('clicking on the sort icon for the client field and waiting for the page to load', async () => {
    await page.locator('thead >> text=Client >> svg').nth(1).click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  // if ()
  await test.step('clicking on the sort icon for the client field and waiting for the page to load', async () => {
    await page.locator('thead >> text=Client >> svg').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  // await expect(page.locator('(//td)[5]').first()).not.toHaveText(client);
});
test('PW-07.004 Validate features of view more', async ({ page }) => {
  await test.step('Navigate to the application', async () => {
    await page.goto('/');
  });
  await test.step('waiting for the page to load', async () => {
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying my quotes text is visible', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('clicking on my plans and verifying the breadcrumb having my plans text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });

  await createMyPlan(page);
  await test.step('clciking on my plans and verifying the breadcrumb having the text my plans ', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  let favoriteItem = await page.$$('.wts__i--view');
  for (let i = 0; i < favoriteItem.length; i++) {
    await expect(page.locator(`.wts__i--view >> nth=${i}`)).toBeVisible();
  }
  const name = (
    await page.locator('td:nth-child(4) >> nth=0').innerText()
  ).valueOf();
  const client = (
    await page.locator('td:nth-child(5) >> nth=0').innerText()
  ).valueOf();
  // Click .wts__i--view >> nth=0
  // await page.locator('.wts__i--view').first().click();
  await test.step('clicking on the magnifying glass', async () => {
    await page.locator('a svg.fa-magnifying-glass').first().click();
  });
  await test.step('verifying the quote name should be having the name of the quote', async () => {
    await expect(page.locator('a.inline-edit--copy.inline-edit--copy--active')).toHaveText(name)
  });
});
test('PW-07.005 Validate features of the line item for my plans', async ({
  page,
}) => {
  await test.step('Navigate to the application', async () => {
    await page.goto('/');
  });
  await test.step('Verifying my quotes text is visible', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('clicking on my plans and verifying the breadcrumb having the my plans text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });

  await createMyPlan(page);
  await test.step('clicking on my plans and verifying the breadcrumb having the my plan text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });

  let favoriteItem = await page.$$('.wts__i--view');
  for (let i = 0; i < favoriteItem.length; i++) {
    await expect(page.locator(`.wts__i--view >> nth=${i}`)).toBeVisible();
  }
  const name = (
    await page.locator('td:nth-child(4) >> nth=0').innerText()
  ).valueOf();
  const client = (
    await page.locator('td:nth-child(5) >> nth=0').innerText()
  ).valueOf();
  await test.step('clicking on the magnifying glass', async () => {
    await page.locator('a svg.fa-magnifying-glass').first().click();
  });
  await test.step('verifying quote name is visible', async () => {
    await expect(page.locator('a.inline-edit--copy.inline-edit--copy--active')).toHaveText(name);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page)
  });
  await createLineItemForMyPlans(page);
  await test.step('clicking on my plans and waiting for the page to load', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await page.locator('text=My Plans').first().click();
  });
  let listItem = await page.$$('svg.fa-list');

  for (let i = 0; i < listItem.length; i++) {
    await expect(page.locator(`svg.fa-list >> nth=${i}`)).toBeVisible();
  }
  await test.step('clicking on line items icon and waiting for the page to load ', async () => {
    await page.locator('svg.fa-list >> nth=0').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying the page breadcrumb having the text /line items/', async () => {
    await expect(page.locator('.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  // Click text=Actions Toggle Dropdown
  // await expect(page.locator('text=Actions Toggle Dropdown')).toBeVisible();
  await test.step('Veriyfing actions button is viisble and clicking on the button', async () => {
    await expect(page.getByRole('button', { name: 'Actions' })).toBeVisible();
    await page.getByRole('button', { name: 'Actions' }).click();
  });
  await test.step('verifying the paperwork button is visible', async () => {
    await expect(page.getByRole('link', { name: 'Paperwork' })).toBeVisible();
  });
  await test.step('verifying export button is viisble', async () => {
    await expect(page.locator('text=Export')).toBeVisible();
  });
  await test.step('verifying copy quote is viisble', async () => {
    // await expect(page.locator('#copy-quote')).toBeVisible();
    await expect(page.locator('button.dropdown-item svg.fa-copy')).toBeVisible();
  });
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('text=Export').click(),
  ]);
  // await page.locator('text=Actions Toggle Dropdown').click();
  await test.step('clicking on actions button', async () => {
    await page.getByRole('button', { name: 'Actions' }).click();
  });
  await test.step('clicking on copy quote button and waiting for the page to load', async () => {
    await page.locator('button.dropdown-item svg.fa-copy').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page)
  });
  await test.step('verifying the plan name text is visible', async () => {
    await expect(page.locator('text=Plan Name')).toBeVisible();
  });
  await test.step('clciking on cancel button and waiting for the page to load', async () => {
    await page.locator('text=Cancel').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('clicking on actions button', async () => {
    await page.getByRole('button', { name: 'Actions' }).click();
  });
  await test.step('verifying paperwork button is visible and clicking on paperwork button', async () => {
    await expect(page.getByRole('link', { name: 'Paperwork' })).toBeVisible();
    // await page.locator('button:has-text("Paperwork")').click();
    await page.getByRole('link', { name: 'Paperwork' }).click();
  });
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('button[name="inline"] >> nth=0').click(),
  ]);
});
test('PW-07.006 Validate features of add plan', async ({ page }) => {
  await test.step('Navigating to home page', async () => {
    await page.goto('/');
  });
  await test.step('waiting for th epage to load', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying my quotes text is visible', async () => {
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('clicking on my plans and verifying the breadcrumb having /my quotes/ text is visible', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  // await test.step('clicking on my quotes settings button', async () => {
  //   await page.locator('button#my-quotes-settings').click();
  // });
  // let groupBy = await page.$$('.form-check-input:checked');
  // if (groupBy.length == 1) {
  //   await page.locator('input[id="groupByProjectsCheckbox"]').click();
  // }
  await test.step('verifying the table hsould be visible', async () => {
    await expect(page.locator('table')).toBeVisible();
  });
  await test.step('clicking on my plan and waitign for the page to load', async () => {
    await page.locator('text=New Plan').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('verifying plan name input field is visible', async () => {
    await expect(page.locator('text=Plan Name')).toBeVisible();
  });
  await test.step('verifying project name is viisble', async () => {
    await expect(page.locator('text=Project Name')).toBeVisible();
  });
  // Skipped the Plan Description
  // await test.step('verifying plan description is visible', async () => {
  //   await expect(page.locator('text=Plan Description')).toBeVisible();
  // });
  await test.step('Verifying client text is visible and clicking on client button', async () => {
    await expect(page.locator('label:has-text("Client")')).toBeVisible();
    await page.getByRole('button', { name: 'Select a client' }).click();
  });
  await test.step('Verifying table is visible and number, name, billing, shipping fields are visible', async () => {
    await expect(page.locator('.table')).toBeVisible();
    await expect(page.locator('(//th)[2]')).toHaveText(/Number/);
    await expect(page.locator('(//th)[3]')).toHaveText(/Name/);
    await expect(page.locator('(//th)[4]')).toHaveText(/Billing/);
    await expect(page.locator('(//th)[5]')).toHaveText(/Shipping/);
  });
  await test.step('verifying /show/ /clients/ text is visible on the page', async () => {
    await expect(page.locator('div.pagination')).toHaveText(/Show/);
    await expect(page.locator('div.pagination')).toHaveText(/clients/);
  });
  const number = (await page.locator('((//tr)[3]//td)[2]').innerText()).valueOf();
  await test.step('clicking on number and waiting for the page to load', async () => {
    await page.locator('text=Number').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('clicking on number and waiting for the page to load', async () => {
    await page.locator('text=Number').click();
await waitForLoadingToComplete(page)
  });
  // await expect(page.locator('(//td)[2]').first()).not.toHaveText(number);
  const name = (await page.locator('(//td)[3]').first().innerText()).valueOf();
  // await page.waitForSelector("th.grid__sortableColumn:has-text('Name') span svg >>nth=0", { state: 'visible', timeout: 5000 });
  await test.step('clicking on the name in the table', async () => {
   await page.locator('svg:nth-child(2)').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('verifying the table should not have the name', async () => {
    await expect(page.locator('((//tr)[3]//td)[2]')).not.toHaveText(name);
  });
  await test.step('Clicking on the placeholder and filling the number in the placeholder', async () => {
    await page.getByPlaceholder('Search by client name or number').click();
    await page.getByPlaceholder('Search by client name or number').fill(number);
    await waitForLoadingToComplete(page)
  });
  await test.step('verifying the table row have number', async () => {
    await expect(page.locator('((//tr)[2]//td)[2]')).toHaveText(number);
  });
});
test('PW-07.007 Validate search functionality for plans', async ({ page }) => {
  await test.step('Navigate to homepage', async () => {
    await page.goto('/');
  });
  await test.step('Waiting for the page to load and verifying my quotes is viisble', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('Clicking on my plans and verifying the bredcrumb having my plans text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  // await test.step('Clicking on the settings button', async () => {
  //   await page.locator('button#my-quotes-settings').click();
  // });
  // let groupBy = await page.$$('.form-check-input:checked');
  // if (groupBy.length == 1) {
  //   await page.locator('input[id="groupByProjectsCheckbox"]').click();
  // }
  await test.step('Verifying table is visible and waiting for the page to load', async () => {
    await expect(page.locator('table')).toBeVisible();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page)
  });
  const quoteNo = (await page.locator('(//td)[3]').innerText()).valueOf();
  await test.step('Clicking on placehholder and filling the quote number in the placeholder', async () => {
    await page.locator('[placeholder="Search by Number"]').click();
    await page.locator('[placeholder="Search by Number"]').fill(quoteNo);
  });
  await test.step('Verifying the table should have the quote number', async () => {
    await expect(page.locator('(//td)[3]')).toHaveText(quoteNo);
  });
  await test.step('Filling the quote number in the placeholder', async () => {
    await page
      .locator('[placeholder="Search by Number"]')
      .fill(`${quoteNo}1912`);
  });
  await test.step('Verifying the no data foung text is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'No data found' })
    ).toBeVisible();
  });
  const [userAgreementPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('text=End User Agreement & Privacy Policy').click(),
  ]);
  await userAgreementPage.waitForLoadState();
  await expect(
    userAgreementPage.locator(
      'text=Software as a Service (SaaS) End User Agreement'
    )
  ).toBeVisible();
});
//Unable to verify see data from other users(reported)
test('PW-07.008 Validate group by project functionality', async ({ page }) => {
  await test.step('Navigate to homepage', async () => {
    await page.goto('/');
  });
  await test.step('Waiting for the page to load and verifying my quotes is visible', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await expect(page.locator('text=My Quotes')).toBeVisible();
  });
  await test.step('Clicking on my plans and verifying the breadcrumb having my plans text', async () => {
    await page.locator('text=My Plans >> nth = 0').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  // await page.locator('.grid__settings').click();
  // await expect(
  //   page.locator('text=Group by projects >> input[type="checkbox"]')
  // ).toBeVisible();
  // await page
  //   .locator('text=Group by projects >> input[type="checkbox"]')
  //   .click();

  // Skip the Setting Button
  // await test.step('Clicking on settings button', async () => {
  //   await page.getByRole('button', { name: 'Settings' }).click();
  // });
  await test.step('Clicking on group by projects and waiting for the page to load', async () => {
    await page.getByText('Group by projects').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying project name text is viisble', async () => {
    await expect(page.locator('text=Project Name')).toBeVisible();
  });
  // await expect(page.locator('.wts__i--plus-circle >> nth = 0')).toBeVisible();
  // await page.locator('.wts__i--plus-circle >> nth = 0').click();\
  // await expect(page.locator('a[title="Details"]')).first().toBeVisible()
  await test.step('clicking on expand button', async () => {
    await page.locator('button.btn-collapse-chevron').nth(0).click();
  });
  await test.step('Verifying the collapse is visible', async () => {
    await expect(
      page.locator('button.btn-collapse-chevron').nth(0)
    ).toBeVisible();
  });
  await test.step('Waiting for the page to load', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Verifying the created text is visible', async () => {
    await expect(page.locator('text=Created')).toBeVisible();
  });
  await test.step('Verifying the number text is visible', async () => {
    await expect(page.locator('th:has-text("Number")')).toBeVisible();
  });
  await test.step('Verifying the name text is visible', async () => {
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
  });
  await test.step('Verifying the client text is visible', async () => {
    await expect(page.locator('th:has-text("Client")')).toBeVisible();
  });
  await test.step('Verifying the customer text is visible', async () => {
    await expect(page.locator('th:has-text("Customer")')).toBeVisible();
  });
  // await page.locator('.grid__settings').click();
  // await expect(
  //   page.locator('text=Group by projects >> input[type="checkbox"]')
  // ).toBeVisible();
  // await page
  //   .locator('text=Group by projects >> input[type="checkbox"]')
  //   .click();
  // Skip the Setting Button
  // await test.step('Clicking on settings button', async () => {
  //   await page.getByRole('button', { name: 'Settings' }).click();
  // });
  await test.step('Clicking on group by projects and waiting for the page to load', async () => {
    await page.getByText('Group by projects').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  // await test.step('Clicking on settings button', async () => {
  //   await page.getByRole('button', { name: 'Settings' }).click();
  // });
  await test.step('Verifying the see data from other users checkbox is visible', async () => {
    await expect(page.getByLabel('See data from other users')).toBeVisible();
  });
  // await page
  //   .locator('text=See data from other users >> input[type="checkbox"]')
  //   .click();
  await test.step('checking the see data from other users checkbox and waiting for the page to load', async () => {
    await page.getByLabel('See data from other users').check();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('verifying the table data is visible', async () => {
    await expect(page.locator('(//td)[7]')).toBeVisible();
  });
  // await test.step('Clicking on settings button', async () => {
  //   await page.getByRole('button', { name: 'Settings' }).click();
  // });
});