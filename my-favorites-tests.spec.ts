import { test, expect } from '@playwright/test';
import { adminAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { userAgreementPage, waitForLoadingToComplete } from './utils';
import { createLineItem } from './create-line-item';
useUser(test, adminAuthKeys);
test('PW-05.001 Validating my favorites page', async ({ page }) => {
  await test.step('Navigating to home page', async () => {
    await page.goto('/');
  });
  const date = new Date();
  await test.step('Verifying the title of the page and waiting for the page to load', async () => {
    expect(await page.title()).toBe('TALON: American Building Supply');
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on new quote and waiting for the page to load', async () => {
    await page.locator('[data-qa="shortcutsNavBar__newQuote"]').click();
    await createLineItem(page);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on my favorites and verifying the breadcrumb having the text my favorites', async () => {
    await page.locator('li:has-text("My Favorites")').click();
    await expect(page.locator('li.breadcrumb-item.active span')).toHaveText(/My Favorites/);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page)
  });
  await waitForLoadingToComplete(page)
  await page.waitForLoadState();
  let favoriteItem = await page.$$('.table-responsive');
  await expect(favoriteItem.length).toBeGreaterThan(0);
  for (let i = 0; i < favoriteItem.length; i++) {
    await expect(page.locator(` .table-responsive >>nth=${i}`)).toBeVisible();
  }
  let firstFavoriteItemName = await page.locator('tr >> td:nth-child(2) >> a').nth(1).innerText();
  await test.step('Clicking on the search placeholder and filling the favorite name in the placeholder', async () => {
    await page.getByPlaceholder('Search by name, description or tag').click();
    await page.getByPlaceholder('Search by name, description or tag')
      .fill(`${firstFavoriteItemName}`);
  });
  await test.step('Verifying the favorite tile should have the first favorite item name ', async () => {
    await expect(page.locator('tr >> td:nth-child(2) >> a').nth(1)).toHaveText(
      `${firstFavoriteItemName}`
    );
  });
  await test.step('Clicking on the search placeholder and filling the invalid favorites text in placehodler', async () => {
    await page.getByPlaceholder('Search by name, description or tag').click();
    await page.getByPlaceholder('Search by name, description or tag').fill('invalid favorites');
  });
  await test.step('Verifying the no favorites found error message', async () => {
    await expect(page.locator('text=No Favorites found')).toBeVisible();
  });
  await test.step('Clicking on clear search button', async () => {
    await page.locator('button[title="Clear Search"]').click();
  });
  await test.step('Verifying the edit name button is visible', async () => {
    await expect(
      page.locator('a[title="Edit"]').nth(0)
    ).toBeVisible();
  });
  await test.step('Verifying the delete button is visible', async () => {
    await expect(
      page.locator('button[title="Delete"]').nth(0)
    ).toBeVisible();
  });
  await test.step('Clicking on the edit name of the favorites and verifying the dialog box having edit name is viisble', async () => {
    await page.locator('a[title="Edit"]').nth(0).click();
    // await expect(page.getByRole('dialog').getByText('Edit Name')).toBeVisible();
  });
  await test.step('Verifying max 50 characters is viisble', async () => {
    await expect(page.locator('small.wtsInput__inlineHelp')).toBeVisible();
  });
  await test.step('Verifying the cancel button is visible in the dialog box', async () => {
    await expect(
      page.getByRole('link', { name: 'Cancel' })
    ).toBeVisible();
  });
  await test.step('Verifying the save button is visiblein the dialog box', async () => {
    await expect(
      page.getByRole('button', { name: 'Save' })
    ).toBeVisible();
  });
  await test.step('Clicking on cancel button', async () => {
    await page.getByRole('link', { name: 'Cancel' }).click();
  });
  await test.step('Clicking on new quote and verifying the breadcrumb havingthe text my quotes', async () => {
    await page.locator('[data-qa="shortcutsNavBar__newQuote"]').click()
    // await expect(page.locator('li.breadcrumb-item active span')).toHaveText(
    //   /New Quote/
    // );
  });
  await test.step('Verifying the heading having new quote text is viisble', async () => {
    await expect(
      page.locator('[data-qa="shortcutsNavBar__newQuote"]')
    ).toBeVisible();
  });
  // flow change
  // await test.step('Verifying the quote name text is visible', async () => {
  //   await expect(
  //     page.getByLabel('Quote Name')
  //   ).toBeVisible();
  // });
  // await test.step('Verifying the project name text is visible', async () => {
  //   await expect(
  //     page.locator('input[id="projectName"]')
  //   ).toBeVisible();
  // });
  // await test.step('Clicking on cancel button', async () => {
  //   await page.getByRole('button', { name: 'Cancel' }).click();
  //   awaitwaitForLoadingToComplete(page)  // });
  await waitForLoadingToComplete(page)
  await test.step('Clicking on my quotes and verifying the breadcrumb my quotes is visible', async () => {
    await page.getByRole('link', { name: 'My Quotes' }).nth(0).click();
    // await expect(page.locator('li.breadcrumb-item active span')).toHaveText(
    //   /My Quotes/
    // );
  });
  let groupBy = await page.$$('.form-check-input:checked');
  if (groupBy.length == 1) {
    await page.locator('#groupByProjectsCheck').check();
  }
  await test.step('Clicking on line items badge', async () => {
    // await page.locator('a[title="Line Items"] .badge >> nth=0').click();
    await page.locator("a[title='Line Items'] span.badge-count").nth(0).click();
    await page.locator('svg[data-icon="ellipsis"]').first().click();
  });
  await test.step('Clicking on save as favorite', async () => {
    await page.getByRole('button', { name: 'Save as Favorite' }).first().click();
  });
  await test.step('Clicking on the placeholder', async () => {
    await page.locator('input.form-control').nth(0).click();
  });
  let favItem = `delete favorite item ${date.getMilliseconds()}`;
  await test.step('Filling the favorite name in the placeholder', async () => {
    await page.locator('input.form-control').nth(0).fill(favItem);
  });
  await test.step('Clicking on the save button', async () => {
    await waitForLoadingToComplete(page)
    await page.getByRole('button', { name: 'Save' }).click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying favorite created text is visible', async () => {
    // await expect(page.locator('text=Favorite created')).toBeVisible();
  });
  await test.step('Clicking on my favorites button and waiting for the page to load', async () => {
    await page.locator('li:has-text("My Favorites")').click();
    await expect(page.locator('li.breadcrumb-item.active span')).toHaveText(/My Favorites/);
    await waitForLoadingToComplete(page)
    await page.waitForLoadState();
  });
  await test.step('Filling the fav item name in the placeholder', async () => {
    await page.getByPlaceholder('Search by name, description or tag').fill(favItem);
  });
  await test.step('Clicking on delete button', async () => {
    await page.locator('button[title="Delete"]').nth(0).click();
  });
  await test.step('Verifying the favorite deleted text ', async () => {
    await page.locator('div[role="alert"]:has-text("Favorite deleted")')
      .click();
  });
  await test.step('Clicking on the home link and verifying the page is navigated to home page', async () => {
    await page.getByRole('link', { name: 'Home' }).click();
    expect(await page.title()).toBe('TALON: American Building Supply');
  });
});
test('PW-05.002 Add my favorites item', async ({ page }) => {
  const date = new Date();
  await test.step('Navigating to home page and verifying the title of the page', async () => {
    await page.goto('/');
    expect(await page.title()).toBe('TALON: American Building Supply');
  });
  await test.step('Clicking on my favorites and veriyfing the active breadcrumb having my favorites text', async () => {
    await page.locator('li:has-text("My Favorites")').click();
    await waitForLoadingToComplete(page)
    await expect(page.locator('li.breadcrumb-item.active span')).toHaveText(/My Favorites/);
    await waitForLoadingToComplete(page)
  });
  await createLineItem(page);
  await test.step('Waiting for the page to load', async () => {
    await page.waitForSelector('.line-item >> nth=0', {
      state: 'visible',
      timeout: 15000,
    });
  });
  let lineItemBeforeAddingFavorites = await page.$$('.line-item');
  let lineItemAfterAddingFavorites = lineItemBeforeAddingFavorites.length + 1;
  await test.step('Clicking on checkbox', async () => {
    await page
      .locator('div.card-header label[class="form-check-label"]')
      .click();
  });
  await test.step('Clicking on checkbox icon', async () => {
    await page.locator('svg[data-icon="ellipsis"]').click();
  });
  await test.step('Clicking on save as favorite button ', async () => {
    await page.getByRole('button', { name: 'Save as Favorite' }).click();
  });
  await test.step('Clicking on name your favorite placeholder and filling the favorite name in the placeholder', async () => {
    await page.locator('input.form-control').nth(0).click();
    await page.locator('input.form-control').nth(0).fill(`test1 ${date.getMilliseconds()}${date.getSeconds()}`);
  });
  await test.step('Clicking on save button', async () => {
    await waitForLoadingToComplete(page)
    await page.getByRole('button', { name: 'Save' }).click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on dropdown', async () => {
    await page.locator('button:has-text("Toggle Dropdown")').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Veriyfing the new favorite line text is viisble', async () => {
    await expect(
      page.getByRole('link', { name: 'New Favorite Line' })
    ).toBeVisible();
  });
  await test.step('Verifying new misc line is visible', async () => {
    await expect(
      page.getByRole('button', { name: 'New Misc Line' })
    ).toBeVisible();
  });
  await test.step('Verifying add parts is visible', async () => {
    await expect(page.getByRole('link', { name: 'Add Parts' })).toBeVisible();
  });
  // await test.step('Verifying Additional Charges is visible', async () => {
  //   await expect(
  //     page.getByRole('button', { name: 'Additional Charges' })
  //   ).toBeVisible();
  // });
  await test.step('Clicking on New Favorite Line', async () => {
    await page.getByRole('link', { name: 'New Favorite Line' }).click();
  });
  await test.step('Verifying breadcrumb is having text Select Favorite ', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Select Favorite/
    );
  });
  await test.step('Clicking on favorite tile name', async () => {
    await page.locator('tr >> td >> nth=0 >> button').nth(0).click();
  });
  await waitForLoadingToComplete(page)

  // Click the first matching "Close" button
  const closeButton = page.locator('div[class="modal-content"] button[type="button"] span span:has-text("Close")');
  await closeButton.click();
  await test.step('Clicking on Order Confirmation', async () => {
    await page.locator('tr >> button >> svg[data-icon="plus"]').nth(0).click();
  });
  await page.locator('text=Order Confirmation').first().click();
  await test.step('Clicking on Add to Quote', async () => {
    await page.locator('text=Add to Quote').click();
  });
  await test.step('Waiting for spinner selector', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await waitForLoadingToComplete(page)
  let lengthOfLineItems = lineItemBeforeAddingFavorites.length;
  await test.step('Clicking on Delete button', async () => {
    await page.locator(`text=Delete >> nth=${lengthOfLineItems} `).click();
  });
});
test('PW-05.003 Validating other features of my favorites page', async ({
  page,
}) => {
  const date = new Date();

  await page.goto('/');
  await test.step('Checking the title of the page', async () => {
    expect(await page.title()).toBe('TALON: American Building Supply');
  });
  // Click li:has-text("My Favorites")
  await test.step('Clicking on My Favorites button', async () => {
    await page.locator('li:has-text("My Favorites")').click();
  });
  await expect(page.locator('li.breadcrumb-item.active span')).toHaveText(/My Favorites/);
  await waitForLoadingToComplete(page)
  await test.step('Waiting for spinner selector', async () => {
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  });
  await test.step('Waiting for favorite tile selector', async () => {
    await page.waitForSelector('.container', {
      state: 'visible',
      timeout: 2000,
    });
  });
  await test.step('Verifying user alert message having text All Orders will ship complete, UNLESS noted to Ship as Ready. Your delivery date will be confirmed once you receive your confirmation ', async () => {
    await expect(page.locator('#user-alert-message ')).toHaveText(
      ' All TALON doors and frames will be sent RAW/UNFINISHED and do not reflect the true skin color.'
    );
  });
  await test.step('verifying header is visible ', async () => {
    await expect(page.locator('header[role="banner"] a')).toBeVisible();
  });
  // "Below tabs / links should be displayed on top of home page Open Quotes,Submitted Quotes ,Configured Favorites
  await test.step('verifying My Quotes is visible ', async () => {
    await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
  });
  await test.step('verifying My Orders is visible ', async () => {
    await expect(page.locator('nav li a:has-text("My Orders")')).toBeVisible();
  });
  await test.step('verifying My Favorites is visible ', async () => {
    await expect(
      page.locator('nav li a:has-text("My Favorites")')
    ).toBeVisible();
  });
  await test.step('verifying My Customers is visible ', async () => {
    await expect(
      page.locator('nav li a:has-text("My Customers")')
    ).toBeVisible();
  });
  await test.step('verifying My Plans is visible ', async () => {
    await expect(page.locator('nav li a:has-text("My Plans")')).toBeVisible();
  });
  await test.step('verifying My Views is visible ', async () => {
    await expect(page.locator('nav li a:has-text("My Views")')).toBeVisible();
  });
  await userAgreementPage(page);
});