import { test, expect } from '@playwright/test';
import {
  adminAuthKeys,
} from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { createLineItem } from './create-line-item';
import { createNewQuoteForInternalUser, editQuoteDetails, waitForLoadingToComplete } from './utils';
useUser(test, adminAuthKeys);
test.describe('My Quotes Test Suite', () => {
  test('PW-08.001 Validate the breadcrumb of my quotes', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is viisble in navigation bar and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is viisble and having my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
  });
  test('PW-08.002 Validate features of my quotes', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is viisble and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await test.step('Verifying the first row data is visible', async () => {
      await expect(page.locator('.quote-row >> nth=0')).toBeVisible();
    });
    await test.step('Verifying table is visible', async () => {
      await expect(page.locator('table')).toBeVisible();
    });
    await test.step('Clicking on search by number placeholder and filling $ in the placeholder', async () => {
      await page.getByPlaceholder('Search by Number').click();
      await page.getByPlaceholder('Search by Number').fill('$$$$$');
    });
    await test.step('Verifying no data found text is visible', async () => {
      await expect(
        page.getByRole('heading', { name: 'No data found' })
      ).toBeVisible();
    });
    await test.step('Clicking on clear search button and waiting for the page to load', async () => {
      await page.getByRole('button', { name: 'Clear Search' }).click();
      await waitForLoadingToComplete(page)
    });
    const quoteNum = (
      await page.locator('tr >> a >> nth=1').innerText()
    ).valueOf();
    await test.step('Clicking on search by number placeholder and filling the quote number', async () => {
      await page.locator('[placeholder="Search by Number"]').click();
      await page.locator('[placeholder="Search by Number"]').fill(quoteNum);
    });
    await test.step('Verifying table data has quote number', async () => {
      await expect(page.locator(`td:has-text("${quoteNum}")`)).toBeVisible();
    });
    await test.step('Clicking on search by number placeholder and filling the quote number along with 1 and waiting for the page to load', async () => {
      await page.locator('[placeholder="Search by Number"]').click();
      await page.locator('[placeholder="Search by Number"]').fill(`${quoteNum}1`);
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Verifying row does not having the quote number', async () => {
      await expect(page.locator('.quote-row').first()).not.toBeVisible();
    });
    await test.step('Verifying no data found text is visible', async () => {
      await expect(page.locator('text=No data found')).toBeVisible();
    });
    await test.step('Filling empty data in placeholder', async () => {
      await page.locator('[placeholder="Search by Number"]').fill('');
    });
    const num = (await page.locator('tr >> a >> nth=1').innerText()).valueOf();
    await test.step('Verifying the table data number is visible', async () => {
      await expect(page.locator(`td:has-text("${num}")`)).toBeVisible();
    });
    await test.step('Clicking on the number and waiting for the page to load', async () => {
      await page.locator('text=Number').nth(2).click();
      // await page.locator('text=Number').nth(2).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the table data should not have the number text', async () => {
      await expect(page.locator('(//td)[3]')).not.toHaveText(num);
    });
    const name = (await page.locator('(//td)[4]').innerText()).valueOf();
    await test.step('Verifying the fourth column data in first row is viisbe and veriyfing the data have name ', async () => {
      await expect(page.locator('td:nth-child(4) >> nth=0')).toBeVisible();
      await expect(page.locator('(//td)[4]')).toHaveText(name);
    });
    await test.step('Clicking on the heading having the name and waiting for the page to load', async () => {
      await page.locator('th:has-text("Name")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying table data should not have the text name', async () => {
      await expect(page.locator('(//td)[4]')).not.toHaveText(name);
    });
    const numForName = (
      await page.locator('tr >> a >> nth=1').innerText()
    ).valueOf();
    await test.step('Verifying the fifth column table data of first row is visible ', async () => {
      await expect(page.locator('td:nth-child(5) >> nth=0')).toBeVisible();
    });
    await test.step('Verifying the table data having text name', async () => {
      await expect(page.locator('(//td)[3]')).toHaveText(numForName);
    });
    await test.step('Clicking on the client and waiting for the page to load', async () => {
      await page.locator('th:has-text("Client")').click();
      // await page.locator('th:has-text("Client")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the table data should not have name', async () => {
      await expect(page.locator('(//td)[3]')).not.toHaveText(numForName);
    });
    await test.step('Clicking on quote details button', async () => {
      await page.locator('a[title="Details"]').first().click();
    });
    // await test.step('Clicking on edit button', async () => {
    //   await page.getByRole('button', { name: 'Edit' }).first().click();
    // });
    await test.step('Clicking on PO number', async () => {
      await page.locator('input[name="ponumber"]').click();
    });
    const date = new Date();
    const poNum = `${date.getMilliseconds()}${date.getSeconds()}`;
    await test.step('Filling po number in the input field', async () => {
      await page.locator('input[name="ponumber"]').fill(poNum);
    });
    await test.step('Clicking on save button', async () => {
      // await page.locator('text=Save').click();
      await page.locator('button[type="submit"] span span:has-text("Save Details")').click()
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on my quotes and waiting for the page to load', async () => {
      await page.locator('li.quotes >> text=My Quotes').click();
      await waitForLoadingToComplete(page)
      await page.locator('th:has-text("Client")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the seventh column data from first row is visible and having the po number is visible', async () => {
      await page.waitForLoadState('load')
      await page.locator('text=My Views').click();
      await waitForLoadingToComplete(page)
      await page.locator('li.quotes >> text=My Quotes').click();
      await expect(page.locator('td:nth-child(7) >> nth=0')).toBeVisible();
      await expect(page.locator('td:nth-child(7) >> nth=0')).toHaveText(poNum);
      await waitForLoadingToComplete(page)

    });
    await test.step('Clicking on the po number heading', async () => {
      await page.locator('th:has-text("PO Number")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the seventh column data from first row should not contains po number', async () => {
      await expect(page.locator('td:nth-child(7) >> nth=0')).not.toHaveText(
        poNum
      );
      // pagination is unavailable
      //   await page.waitForSelector('.quote-row >>nth=0', {
      //     state: 'visible',
      //     timeout: 10000,
      //   });
      // });
      // let itemDisplay = await page.$$('.quote-row');
      // let count = itemDisplay.length;
      // await test.step('Selecting option 25 from the dropdown and waiting for the page to load', async () => {
      //   await page.getByRole('combobox', { name: 'Show' }).selectOption('25');
      //   await waitForLoadingToComplete(page)      // });
      // let viewCount = await page.$$('a[title="Details"]');
      // await test.step('Verifying the viewcount should be greater than count', async () => {
      //   await expect(viewCount.length).toBeGreaterThan(count);
      // });
      // await test.step('Selecting the option 10 from the dropdown and waiting for the page to load', async () => {
      //   await page.getByRole('combobox', { name: 'Show' }).selectOption('10');
      //   await waitForLoadingToComplete(page)      // });
      // await test.step('Verifying page 1 is your current page button is visible', async () => {
      //   await expect(
      //     page.getByRole('button', { name: 'Page 1 is your current page' })
      //   ).toBeVisible();
      // });
      // await test.step('Clicking on next page', async () => {
      //   await page.getByRole('button', { name: 'Next page' }).click();
      // });
      // await test.step('Verifying page 2 is your current page is visible', async () => {
      //   await expect(
      //     page.getByRole('button', { name: 'Page 2 is your current page' })
      //   ).toBeVisible();
      // });
      // await test.step('Clicking on previous page button', async () => {
      //   await page.getByRole('button', { name: 'Previous page' }).click();
      // });
      // await test.step('Verifying page 1 is your current page button', async () => {
      //   await expect(
      //     page.getByRole('button', { name: 'Page 1 is your current page' })
      //   ).toBeVisible();
      // });
      // const [endUserPolicy] = await Promise.all([
      //   page.waitForEvent('popup'),
      //   page.locator('text=End User Agreement & Privacy Policy').click(),
      // ]);
      // await test.step('Clicking on end user agreement text', async () => {
      //   await endUserPolicy
      //     .locator('text=Software as a Service (SaaS) End User Agreement')
      //     .click();
    });
  });
  test('PW-08.003 Validate features of quotes table', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is viisble and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having the text my quotes', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    //settings icon is not available
    // await test.step('Clicking on settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await waitForLoadingToComplete(page)
    // await test.step('veriyfing my quotes is visible', async () => {
    //   await expect(page.locator('#my-quotes-app')).toBeVisible();
    // });
    // await test.step('Veriyfing the created text is viisble', async () => {
    //   await expect(page.locator('text=Created')).toBeVisible();
    // });
    await test.step('Verifying the column number is visible', async () => {
      // await expect(page.locator('role=cell[name="Number"]')).toBeVisible();
      await expect(page.getByRole('columnheader', { name: 'Number', exact: true })).toBeVisible();
    });
    await test.step('Verifying sort up icon for the number column is visible', async () => {
      await expect(
        page.locator('.grid__selectedSortableIcon > .svg-inline--fa > path')
      ).toBeVisible();
    });
    await test.step('Verifying sort down icon for the number column is visible', async () => {
      await expect(
        page.locator('svg:nth-child(2) > path').first()
      ).toBeVisible();
    });
    await test.step('Verifying the name column is visible', async () => {
      // await expect(page.locator('role=cell[name="Name"]')).toBeVisible();
      await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    });
    await test.step('Verifying sort up icon for the name column is visible', async () => {
      await expect(
        // page.locator('role=cell[name="Name"] >> [data-icon="sort-up"]')
        page.locator('.grid__selectedSortableIcon > .svg-inline--fa > path')
      ).toBeVisible();
    });
    await test.step('Verifying sort down icon for the name column is visible', async () => {
      await expect(
        // page.locator('role=cell[name="Name"] >> [data-icon="sort-down"]')
        page.locator('th:nth-child(4) > .grid__sortableIcon > .svg-inline--fa.fa-sort-down > path')
      ).toBeVisible();
    });
    await test.step('Verifying client column is visible', async () => {
      await expect(page.getByRole('columnheader', { name: 'Client' })).toBeVisible();
    });
    await test.step('Verifying sort up icon for the client column is visible', async () => {
      await expect(
        // page.locator('role=cell[name="Client"] >> [data-icon="sort-up"]')
        page.locator('.grid__selectedSortableIcon > .svg-inline--fa > path')
      ).toBeVisible();
    });
    await test.step('Verifying sort down icon for the client cloumn is visible', async () => {
      await expect(
        // page.locator('role=cell[name="Client"] >> [data-icon="sort-down"]')
        page.locator('th:nth-child(5) > .grid__sortableIcon > .svg-inline--fa.fa-sort-down')
      ).toBeVisible();
    });
    await test.step('Verifying the column customer is visible', async () => {
      await expect(page.getByRole('columnheader', { name: 'Customer' })).toBeVisible();
    });
    await test.step('Verifying po number column is visible', async () => {
      await expect(page.getByRole('columnheader', { name: 'PO Number' })).toBeVisible();
    });
    await test.step('Verifying sort up icon for the po number column is visible', async () => {
      await expect(
        // page.locator('role=cell[name="PO Number"] >> [data-icon="sort-up"]')
        page.locator('.grid__selectedSortableIcon > .svg-inline--fa > path')
      ).toBeVisible();
    });
    await test.step('Verifying sort down icon for the po number column is visible', async () => {
      await expect(
        // page.locator('role=cell[name="PO Number"] >> [data-icon="sort-down"]')
        page.locator('th:nth-child(7) > .grid__sortableIcon > .svg-inline--fa.fa-sort-down > path')
      ).toBeVisible();
    });
    let favoriteItem = await page.$$('a[title="Details"]');
    for (let i = 0; i < favoriteItem.length; i++) {
      await expect(page.locator(`a[title="Details"] >> nth=${i}`)).toBeVisible();
    }
    const number = (
      await page.locator('td:nth-child(3) >> nth=0').innerText()
    ).valueOf();
    const name = (
      await page.locator('td:nth-child(4) >> nth=0').innerText()
    ).valueOf();
    const client = (
      await page.locator('td:nth-child(5) >> nth=0').innerText()
    ).valueOf();
    await test.step('Clicking on quote details ', async () => {
      await page.locator('a[title="Details"]').first().click();
    });
    await test.step('Verifying the title of the quote having quote nume', async () => {
      await expect(page.locator('#quote-title')).toHaveText(`Quote ${number}`);
    });
    await test.step('Verifying edit name having name text ', async () => {
      // await expect(page.locator('#quote-name-edit')).toHaveText(name);
      await expect(page.locator('.inline-edit').nth(0)).toHaveText(name);
    });
    await test.step('Verifying first client is visible', async () => {
      await expect(page.getByText(client).first()).toBeVisible();
    });
    await test.step('Clicking on my quotes and waiting for the page to load', async () => {
      await page.locator('div#nav >> text=My Quotes').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the users in the first row is visible', async () => {
      await expect(
        page.locator('.quote-row >> [data-icon="users"] >> nth=0')
      ).toBeVisible();
    });
    let customerIcon = await page.$$('.quote-row >> [data-icon="users"]');
    for (let i = 0; i < customerIcon.length; i++) {
      await expect(
        page.locator(`.quote-row >> [data-icon="users"] >> nth=${i}`)
      ).toBeVisible();
    }
    await test.step('Clicking on the user icon in the table ', async () => {
      await page.locator('.quote-row >> [data-icon="users"] >> nth=0').click();
    });
    await test.step('Verifying active customers tab is visible', async () => {
      await expect(page.locator('#quote-tabs')).toBeVisible();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__customer"]')).toHaveClass(
        /active/
      );
    });
  });
  test('PW-08.004 Validate line items icon section ', async ({ page }) => {
    let quoteNumber;
    await test.step('Navigating to the application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is visible and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and my quotes text is visible', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await test.step('Clicking on new quote', async () => {
      await page.locator('text=New Quote').nth(1).click();
    });
    quoteNumber = await createLineItem(page);
    console.log(quoteNumber,"quoteNumber");
    await test.step('Verifying my quotes is visible on navigation bar', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")').nth(0)).toBeVisible();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying my quotes breadcrumb is visible and clicking on breadcrumb', async () => {
      await expect(page.locator('.breadcrumb-item >> text=My Quotes')).toBeVisible();
      await page.locator('.breadcrumb-item >> text=My Quotes').click();
    });
    await test.step('Verifying the first badge is visible', async () => {
      await expect(page.locator('.badge >> nth=0')).toBeVisible();
    });
    const lineItems = parseInt(
      (await page.locator('.badge >> nth=1').innerText()).valueOf()
    );
    await test.step('Clicking on badge and verifying the first line item is visible', async () => {
      await page.locator('.badge >> nth=1').click();
      await expect(page.locator('.line-item').first()).toBeVisible();
    });
    let pannelBody = await page.$$('.line-item');
    expect(pannelBody.length).toBeLessThanOrEqual(lineItems);
    await test.step('Verifying line drawinf and status is visible', async () => {
      await expect(page.locator('.line-item-drawing')).toBeVisible();
      await expect(page.locator('.lineItem_mfgStatus')).toBeVisible();
    });
    let favoriteItem = await page.$$('div.card');
    for (let i = 0; i < favoriteItem.length; i++) {
      await expect(page.locator(`div.card >> nth=${i}`)).toBeVisible();
      await expect(page.locator(`.line-item-drawing >> nth=${i}`)).toBeVisible();
      await expect(page.locator(`.lineItem_mfgStatus >> nth=${i}`)).toBeVisible();
    }
    await test.step('Clicking on quote details and veriyfing the quote details tab is active', async () => {
      await page.locator('text=Quote Details').click();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__details"]')).toHaveClass(
        /active/
      );
    });
    await test.step('Clicking on customer tab and veriyfing the customer tab is active', async () => {
      await page.locator('a[role="tab"]:has-text("Customer")').click();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__customer"]')).toHaveClass(
        /active/
      );
    });
    await test.step('Clicking on line items and verifying the lin eitems tab is active', async () => {
      await page.locator('text=Line Items').click();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__lineItems"]')).toHaveClass(
        /active/
      );
    });
    await test.step('Clicking on attachments and veriyfing attachments tab is active', async () => {
      await page.locator('text=Attachments').click();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__attachments"]')).toHaveClass(
        /active/
      );
    });
    await test.step('Clicking on notes and veriyfing the notes tab is active', async () => {
      await page.locator('text=Notes').click();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__notes"]')).toHaveClass(/active/);
    });
    await test.step('Clicking on relatives tab and verifying the relatives tab is active', async () => {
      await page.locator('text=Relatives').click();
      await expect(page.locator('#quote-tabs >> [data-qa="quoteNavTabs__relations"]')).toHaveClass(
        /active/
      );
    });
  });
  test('PW-08.005 Validate delete functionality', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is visible and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having my quotes text is visible', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    let deleteItem = await page.$$('.wts__i--trash');
    for (let i = 0; i < deleteItem.length; i++) {
      await expect(page.locator(`a[title="Details"] >> nth=${i}`)).toBeVisible();
    }
    page.once('dialog', (dialog) => {
      dialog.dismiss().catch(() => { });
    });
  });
  test('PW-08.006 Validate quote details for a quote', async ({ page }) => {
    const date = new Date();
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is viisble and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await test.step('Verifying quotes details is visible and clciking on quote details', async () => {
      await expect(page.locator('a[title="Details"]').first()).toBeVisible();
      await page.locator('a[title="Details"]').first().click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
      await page.waitForSelector('#quote-header-app', {
        state: 'visible',
        timeout: 5000,
      });
    });
    await test.step('Verifying quote header having details text', async () => {
      await expect(page.locator('#quote-header-app')).toHaveText(
        /Details/
      );
    });
    await test.step('Verifying quote header having shipping text', async () => {
      await expect(page.locator('#quote-header-app')).toHaveText(
        /Shipping/
      );
    });
    await test.step('veriyfing quote header having billing text', async () => {
      await expect(page.locator('#quote-header-app')).toHaveText(
        /Billing/
      );
    });
    const poNumber = `${date.getMilliseconds() - date.getSeconds()}`;
    // await test.step('Clicking on quote details edit button', async () => {
    //   await page.getByRole('button', { name: 'Edit' }).first().click();
    // });
    await test.step('Verifying po number is visible and clicking on po number and filling the po number in the input field', async () => {
      await expect(page.locator('input[name="ponumber"]')).toBeVisible();
      await page.locator('input[name="ponumber"]').click();
      await page.locator('input[name="ponumber"]').fill(poNumber);
    });
    await test.step('Clicking on save button and waiting for the page to load', async () => {
      await page.locator('button[type="submit"] span span:has-text("Save Details")').click()


      // await page.locator('text=Save').click();
      // await page.locator('role=button[name="Save"]').click()
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the third column is not having the po number', async () => {
      await expect(page.locator('.form-group >> nth=3')).not.toHaveText(poNumber);
    });
    // await test.step('Clicking on quote details edit button', async () => {
    //   awaitwaitForLoadingToComplete(page)    //   await page.getByRole('button', { name: 'Edit' }).first().click();
    //   awaitwaitForLoadingToComplete(page)    // });
    await test.step('Verifying the po number input field is visible and clicking on po number', async () => {
      await page.locator('input[name="ponumber"]').isVisible();
      await page.locator('input[name="ponumber"]').click();
    });
    let poNum = 'po num 1';
    let jobNum = 'job num';
    await test.step('Filling the poNum in input field', async () => {
      await page.locator('input[name="ponumber"]').fill(poNum);
    });
    await test.step('Clciking on the input field and filling jobNum in input field', async () => {
      await page.locator('input[name="Configurable02"]').click();
      await page.locator('input[name="Configurable02"]').fill(jobNum);
    });
    await test.step('Clicking on save button and waiting for the page to load', async () => {
      await page.locator('text=Save').first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying po number label is visible', async () => {
      await expect(page.locator("label[for='ponumber']")).toBeVisible();
    });
    await test.step('Verifying po number text is visible', async () => {
      await expect(page.locator('.form-group >> nth=3')).toHaveText(
        /Purchase Order/
      );
    });
    await test.step('Verifying job number text is visible', async () => {
      await expect(page.locator('.form-group >> nth=5')).toHaveText("Job Contact Name/Number");
    });
    // await test.step('Clicking on edit button', async () => {
    //   await page.getByRole('button', { name: 'Edit' }).nth(1).click();
    //   awaitwaitForLoadingToComplete(page)    // });
    // await test.step('Clicking on save button', async () => {
    //   await page.locator('text=Save').first().click();
    //   awaitwaitForLoadingToComplete(page)    // });
    // await test.step('Clicking on edit button', async () => {
    //   await page.getByRole('button', { name: 'Edit' }).first().click();
    // });
    await test.step('Clicking on date placeholder', async () => {
      await page.locator('[placeholder="mm\\/dd\\/yyyy"]').nth(0).click();
    });
    await test.step('Clicking on arrow icon ', async () => {
      await page.locator('div[class="rdtDays"] th.rdtNext span').nth(0).click();
    });
    await test.step('Clicking on the table data contains text 18', async () => {
      await page.locator('td:has-text("18")').nth(0).click();
    });
    await test.step('Clicking on save button and waitign for the page to load', async () => {
      await page.locator('text=Save').first().click();
      await waitForLoadingToComplete(page)
    });
  });
  test('PW-08.007 internal user quote details', async ({ page }) => {
    // const internalContext = await browser.newContext({
    //   storageState: `tests/state/${dealerAuthKeys.storageStateFile}`,
    // });
    // const page = await internalContext.newPage();
    await test.step('Navigating to the application', async () => {
      await page.goto('/');
    });
    await createNewQuoteForInternalUser(page);
    await test.step('Clicking on quote details tab', async () => {
      await page.locator('#quote-tabs >> [data-qa="quoteNavTabs__details"]').click();
    });
    await test.step('Verifying purchase order is visible', async () => {
      await expect(page.getByText('Purchase Order')).toBeVisible();
    });
    await test.step('Verifying internal ABS contact is visible', async () => {
      await expect(page.getByText('Internal ABS Contact')).toBeVisible();
    });
    await test.step('Verifying job contact name/number is visible', async () => {
      await expect(
        page.getByText('Job Contact Name/Number')
      ).toBeVisible();
    });
    await test.step('Verifying sales rep is visible', async () => {
      await expect(page.getByText('Sales Rep', { exact: true })
      ).toBeVisible();
    });
    await test.step('Verifying requested date is visible', async () => {
      await expect(page.getByText('Requested Date')).toBeVisible();
    });
    await test.step('Verifying interior/exterior delivery date is visible', async () => {
      await expect(
        page.getByText('Interior/Exterior Delivery Date')
      ).toBeVisible();
    });
    await test.step('Verifying hardware delivery date is visible', async () => {
      await expect(
        page.getByText('Hardware Delivery Date')
      ).toBeVisible();
    });
    await test.step('Verifying order comments is visible', async () => {
      await expect(page.getByText('Order Comment')).toBeVisible();
    });
    await test.step('Verifying interior/exterior invoice number is visible', async () => {
      await expect(
        page.getByText('Interior/Exterior Invoice Number')
      ).toBeVisible();
    });
    await test.step('Verifying hardware invoice number is visible', async () => {
      await expect(
        page.getByText('Hardware Invoice Number')
      ).toBeVisible();
    });
    await test.step('Verifying warehouse is visible', async () => {
      await expect(page.getByText('Warehouse')).toBeVisible();
    });
    await test.step('Verifying reason is visible', async () => {
      await expect(page.getByText('Reason')).toBeVisible();
    });
    await test.step('Verifying department is visible', async () => {
      await expect(page.getByText('Department')).toBeVisible();
    });
    await test.step('Verifying inside sales person is visible', async () => {
      await expect(page.getByText('Inside Salesperson')).toBeVisible();
    });
  });
  //could not able to test for multiple clients
  test.skip('PW-08.008 Validate shipping details features', async ({ page }) => {
    const date = new Date();
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('verifying My Quotes is visible ', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
    });
    await test.step('Clicking on My Quotes', async () => {
      await page.locator('text=My Quotes').click();
    });
    await test.step('verifying breadcrumb is visible ', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
    });
    await test.step('Verifying breadcrumb has text My Quotes', async () => {
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on my quotes settings', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    // let groupBy = await page.$$('.form-check-input:checked');
    // if (groupBy.length == 1) {
    //   await test.step('Clicking on groupByProjectsCheckbox', async () => {
    //     await page.locator('input[id="groupByProjectsCheckbox"]').click();
    //   });
    // }
    await test.step('Clicking on New Quote ', async () => {
      await page.locator('text=New Quote').nth(1).click();
    });
    await test.step('Verifying url has text create', async () => {
      await expect(page).toHaveURL(/create/);
    });
    await test.step('Clicking on QuoteName and giving input for QuoteName', async () => {
      await page.locator('input[name="QuoteName"]').click();
      await page
        .locator('input[name="QuoteName"]')
        .fill(`test quote ${date.getMinutes()}`);
    });
    await test.step('Clicking on container input field and giving data ', async () => {
      // await page.locator('.wts-react-select__input-container input').click();
      await page.locator('input[name="ProjectName"]').click();
      // await page.locator('.wts-react-select__input-container input').fill('test');
      await page.locator('input[name="ProjectName"]').fill(`test project name ${date.getMilliseconds()}`);
      await waitForLoadingToComplete(page)
    });

    // await test.step('verifying is options are visible and Clicking on option', async () => {
    //   await expect(page.locator('#react-select-2-option-1')).toBeVisible();
    //   await page.locator('#react-select-2-option-0').click();
    //   awaitwaitForLoadingToComplete(page)    // });
    await test.step('Clicking on Create button', async () => {
      await page.locator('text=Create').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying quoteheader details has text Details', async () => {
      await expect(page.locator('#quote-header-app')).toHaveText(
        /Details/
      );
    });
    await test.step('Verifying quoteheader__shipping has text Shipping', async () => {
      await expect(page.locator('#quote-header-app')).toHaveText(
        /Shipping/
      );
    });
    await test.step('Verifying quoteheader__shipping has text Billing', async () => {
      await expect(page.locator('#quote-header-app')).toHaveText(
        /Billing/
      );
    });
    await test.step('Clicking on Save button', async () => {
      await page.locator('text=Save').click();
      await waitForLoadingToComplete(page)
    });
    // !! Only one record is coming we can not select multiple client
  });
  test('PW-08.009 Validate customer section', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('verifying My Customers is visible ', async () => {
      await expect(
        page.locator('nav li a:has-text("My Customers")')
      ).toBeVisible();
    });
    await test.step('Clicking on My Customers', async () => {
      await page.locator('text=My Customers').click();
    });
    await test.step('verifying breadcrumb is visible ', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
    });
    await test.step('Verifying breadcrumb has text My Customers', async () => {
      await expect(page.locator('.breadcrumb li.active')).toHaveText(
        /My Customers/
      );
      await waitForLoadingToComplete(page)
    });
    let customerCheckBox = await page.$$('input[aria-label="Select Customer"]');
    for (let i = 0; i < customerCheckBox.length; i++) {
      await test.step('verifying Select Customer is visible ', async () => {
        await expect(
          page.locator(`input[aria-label="Select Customer"] >> nth=${i}`)
        ).toBeVisible();
      });
    }
    await test.step('verifying Name is visible ', async () => {
      await expect(page.locator('th.grid__sortableColumn')).toBeVisible();
    });
    await test.step('verifying Permission is visible ', async () => {
      await expect(page.locator('th:has-text("Permission")')).toBeVisible();
    });
    await test.step('verifying Billing is visible ', async () => {
      await expect(page.locator('th:has-text("Billing")')).toBeVisible();
    });
    await test.step('verifying Shipping is visible ', async () => {
      await expect(page.locator('th:has-text("Shipping")')).toBeVisible();
    });
    await test.step('Clicking on New Customer button', async () => {
      await page.getByRole('link', { name: 'New Customer' }).click();
    });
    await test.step('verifying Full Name is visible ', async () => {
      await expect(page.getByText('Full Name')).toBeVisible();
    });
    await test.step('verifying Email is visible ', async () => {
      await expect(page.getByText('Email')).toBeVisible();
    });
    await test.step('verifying Customer ID is visible ', async () => {
      await expect(page.getByText('Customer ID')).toBeVisible();
    });
    await test.step('verifying Save is visible ', async () => {
      await expect(page.getByText('Save')).toBeVisible();
    });
    await test.step('verifying Cancel is visible ', async () => {
      await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
    });
  });
  test('PW-08.010 Validate line item functionality', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is visible and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await test.step('Verifying Line Items icon and clicking on it', async () => {
      await expect(page.locator('span.badge-count >> nth=0')).toBeVisible();
      await page.locator('span.badge-count').first().click();
    });
    await test.step('Verifying Line Items tab is visible', async () => {
      await expect(
        page.locator('a[role="tab"]:has-text("Line Items")')
      ).toBeVisible();
    });
    await createLineItem(page);
    await test.step('Verifying Line Items is visible', async () => {
      await expect(page.locator('div.card >> nth=0')).toBeVisible();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on My Quotes tab', async () => {
      await page.locator('nav li a:has-text("My Quotes")').nth(0).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Line Items icon and clicking on it', async () => {
      await expect(page.locator('span.badge-count').nth(0)).toBeVisible();
      await page.locator('span.badge-count').nth(0).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Line Items and Line Items status is visible', async () => {
      await expect(page.locator('div.card >> nth=0')).toBeVisible();
      await waitForLoadingToComplete(page)
      await expect(page.locator('div.card').first()).toBeVisible();
      await expect(page.locator('.lineItem_mfgStatus')).toBeVisible();
    });
  })
  test('PW-08.011 Validate line item for exterior', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is visible and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    const date = new Date();
    await test.step('Clicking on New Quote button', async () => {
      await page.locator('text=New Quote').nth(1).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on QuoteName', async () => {
      await page.locator('input[name="QuoteName"]').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Entering Quote name in Quote name field', async () => {
      await page
        .locator('input[name="QuoteName"]')
        .fill(`test quote ${date.getMinutes()}`);
    });
    // await test.step('Clicking on ProjectName', async () => {
    //   // await page.locator('.wts-react-select__input-container input').click();
    //   await page.locator('input[name="ProjectName"]').click();
    // });
    // await test.step('Entering Project name in Project name field', async () => {
    //   // await page.locator('.wts-react-select__input-container input').fill('test');
    //   await page.locator('input[name="ProjectName"]').fill(`test project name ${date.getMilliseconds()}`);
    //   await waitForLoadingToComplete(page)    // });
    // await test.step('Verifying the first project name and clicking it', async () => {
    //   await expect(page.locator('#react-select-2-option-1')).toBeVisible();
    //   await page.locator('#react-select-2-option-0').click();
    //   awaitwaitForLoadingToComplete(page)    // });
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
    await test.step('Selecting a client', async () => {
      await page.getByRole('button', { name: 'Select a client' }).click();
      await expect(
        page.getByPlaceholder('Search by client name or number')
      ).toBeVisible();
      await page.locator('td input').first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on create button', async () => {
      await page.locator('text=Create').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Line Items', async () => {
      await page.locator('text=Line Items').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on New Line Item', async () => {
      await page.locator('a:has-text("New Line Item")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Exterior text is visible', async () => {
      await expect(page.locator('div.card-body h5 >> nth = 0')).toHaveText(
        /Exterior/
      );
    });
    await test.step('Verifying Exterior image is visible', async () => {
      await expect(page.locator('img >> nth= 0')).toBeVisible();
    });
    await test.step('Verifying Interior text is visible', async () => {
      await expect(page.locator('div.card-body h5 >> nth = 1')).toHaveText(
        /Interior/
      );
    });
    await test.step('Verifying Interior image is visible', async () => {
      await expect(page.locator('img >> nth= 1')).toBeVisible();
    });
    await test.step('Verifying Hardware text is visible', async () => {
      await expect(page.locator('div.card-body h5 >> nth = 2')).toHaveText(
        /Hardware/
      );
    });
    await test.step('Verifying Hardware image is visible', async () => {
      await expect(page.locator('img >> nth= 2')).toBeVisible();
    });
    await test.step('Clicking on Exterior', async () => {
      await page.locator('text=Exterior').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Product Selection breadcrumb is active', async () => {
      await expect(page.getByRole('button', { name: 'Product Selection' })).toHaveText(
        /Product Selection/
      );
    });
    await test.step('Verifying Keep making selections to see an image is visible', async () => {
      await expect(
        page.locator('text=Keep making selections to see an image!')
      ).toBeVisible();
    });
    // !! creating new line item for exterior
    await test.step('Clicking on Tab section dropdown', async () => {
      await page.locator('.wts-react-select__input-container').click();
    });
    await test.step('Clicking on FiberGlass option', async () => {
      await page.locator('#react-select-2-option-0').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Configuration dropdown', async () => {
      await page.locator('div.wts-react-select__control >> nth=1').click();
    });
    await test.step('Clicking on Slab only option', async () => {
      await page.locator('#react-select-3-option-0').click();
    });
    await test.step('Clicking on Configuration and Dimensions button', async () => {
      // await page
      //   .getByRole('button', { name: 'Configuration & Dimensions' })
      //   .click();
      await page.locator('#nextStep').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Handling dropdown', async () => {
      await page.locator('.wts-react-select__input-container').first().click();
    });
    await test.step('Clicking on Right hand inswing option', async () => {
      await page.locator('#react-select-5-option-0').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Call width dropdown', async () => {
      await page
        .locator(
          '#question-id-1a23b598-e8f9-4cba-9351-075e5d51532a > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
        )
        .click();
    });
    await test.step('Clicking on 2/0 option', async () => {
      await page.locator('#react-select-6-option-0').getByText('2/0').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Call height dropdown', async () => {
      await page
        .locator(
          '#question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
        )
        .click();
    });
    await test.step('Clicking on 6/8 option', async () => {
      await page.locator('#react-select-7-option-0').getByText('6/8').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Door Model Options button', async () => {
      // await page.getByRole('button', { name: 'Door Model Options' }).click();
      await page.locator('#nextStep').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Door cutout shape dropdown', async () => {
      await page.locator('.wts-react-select__input-container').first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on No Cutout option', async () => {
      await page
        .locator('#react-select-8-option-0')
        .getByText('No Cutout')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Accessories & Door Prep button', async () => {
      // await page.getByRole('button', { name: 'Accessories & Door Prep' }).click();
      await page.locator('#nextStep').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Prehanging Options button', async () => {
      // await page.getByRole('button', { name: 'Prehanging Options' }).click();
      await page.locator('#nextStep').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Door bottom dropdown', async () => {
      await page.locator('.wts-react-select__input-container').click();
    });
    await test.step('Clicking on No Door Bottom option', async () => {
      await page.locator('text="No Door Bottom"').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Order Confirmation button', async () => {
      // await page.getByRole('button', { name: 'Order Confirmation' }).click();
      await page.locator('#nextStep').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Confirm height dropdown', async () => {
      await page.locator('.wts-react-select__input-container').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Yes Height is correct option', async () => {
      await page.locator('text="Yes, Height is correct"').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Start Over button is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'Start Over' })
      ).toBeVisible();
    });
    await test.step('Verifying Cancel button is visible', async () => {
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });
    await test.step('Verifying Save and Copy button is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'Save & Copy' })
      ).toBeVisible();
    });
    await test.step('Verifying Save and New button is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'Save & New' })
      ).toBeVisible();
    });
    await test.step('Verifying Add to Quote button is visible', async () => {
      await expect(
        page.locator('role=button[name="Add to Quote"] >> nth=0')
      ).toBeVisible();
    });
    await test.step('Clicking on Save and Copy button', async () => {
      await page.getByRole('button', { name: 'Save & Copy' }).click();
    });
    await test.step('Verifying Configuration copied is visible', async () => {
      await expect(page.getByText('Configuration copied')).toBeVisible();
    });
    await test.step('Clicking on Save and New button', async () => {
      await page.getByRole('button', { name: 'Save & New' }).click();
    });
    await test.step('Verifying the url select-brand is visible', async () => {
      await expect(page).toHaveURL(/brands/);
    });
  });
  test('PW-08.012 Validate line item added', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is visible and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is viisble and hvaing my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await createLineItem(page);
    await test.step('Verifying line 100 saved text is visible', async () => {
      await page.getByText('100').click();
    });
    await test.step('Verifying line item card is visible', async () => {
      await expect(page.locator('div.card >> nth=0')).toBeVisible();
      // await expect(page.locator('div.card')).toBeVisible();
    });
    await test.step('Verifying line item drawing is visible', async () => {
      await expect(page.locator('.line-item-drawing')).toBeVisible();
      await expect(page.locator('.lineItem_mfgStatus')).toBeVisible();
    });
  });
  test('PW-08.013 Validate new line item for hardware', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying my quotes is viisble and clicking on my quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible and having my quotes text', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on settings', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    const date = new Date();
    await test.step('Clicking on new quote and waiting for the page to load', async () => {
      await page.locator('text=New Quote').nth(1).click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Clicking on quote name and waiting for the page to load', async () => {
      await page.locator('input[name="QuoteName"]').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Filling the quote name input field', async () => {
      await page
        .locator('input[name="QuoteName"]')
        .fill(`test quote ${date.getMinutes()}`);
    });
    // await test.step('Clicking on the dropdown and filling the test in the dropdown', async () => {
    //   await page.locator('.wts-react-select__input-container input').click();
    //   await page.locator('.wts-react-select__input-container input').fill('test');
    //   await waitForLoadingToComplete(page)    // });
    // await test.step('Verifying dropdown items should be visible and clicking the firsst element from dropdown', async () => {
    //   await expect(page.locator('#react-select-2-option-1')).toBeVisible();
    //   await page.locator('#react-select-2-option-0').click();
    //   awaitwaitForLoadingToComplete(page)    // });
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
    await test.step('Selecting a client', async () => {
      await page.getByRole('button', { name: 'Select a client' }).click();
      await expect(
        page.getByPlaceholder('Search by client name or number')
      ).toBeVisible();
      await page.locator('td input').first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on create button and waiting for the page to load', async () => {
      await page.locator('text=Create').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Clicking on line items and waiting for the page to load', async () => {
      await page.locator('text=Line Items').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Clicking on new line item and waiting for the page to load', async () => {
      await page.locator('a:has-text("New Line Item")').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the first heading contains exterior text', async () => {
      await expect(page.locator('div.card-body h5 >> nth = 0')).toHaveText(
        /Exterior/
      );
    });
    await test.step('Verifying the first image to be visible', async () => {
      await expect(page.locator('img >> nth= 0')).toBeVisible();
    });
    await test.step('Verifying the second card having interior text', async () => {
      await expect(page.locator('div.card-body h5 >> nth = 1')).toHaveText(
        /Interior/
      );
    });
    await test.step('Verifying the image is visible', async () => {
      await expect(page.locator('img >> nth= 1')).toBeVisible();
    });
    await test.step('Verifying the hardware text is visible', async () => {
      await expect(page.locator('div.card-body h5 >> nth = 2')).toHaveText(
        /Hardware/
      );
    });
    await test.step('Verifying image is visible', async () => {
      await expect(page.locator('img >> nth= 2')).toBeVisible();
    });
    await test.step('Clicking on hardware text and waiting for the page to load', async () => {
      await page.locator('text=Hardware').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Verifying select a part is visible', async () => {
      await expect(page.locator('text=Select a Part')).toBeVisible();
    });
    await test.step('Verifying the parts items to be visible', async () => {
      await expect(page.locator('.parts-tree-item >> nth=0')).toBeVisible();
    });
    let treeItems = await page.$$('.parts-tree-item');
    for (let i = 0; i < treeItems.length; i++) {
      await expect(page.locator(`.parts-tree-item >> nth=${i}`)).toBeVisible();
    }
    let itemsList = await page.$$('.fake-table-td');
    for (let i = 0; i < itemsList.length; i++) {
      await expect(page.locator(`.fake-table-td >> nth=${i}`)).toBeVisible();
    }
    await test.step('verifying first checkbox is visible and clicking on checkbox', async () => {
      await expect(
        page.locator('.parts-tree-item-checkbox > .user-actionable >> nth=0')
      ).toBeVisible();
      await page
        .locator('.parts-tree-item-checkbox > .user-actionable >> nth=0')
        .click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Verifying the item is checked', async () => {
      await expect(
        page.locator('.parts-tree-item-checkbox >> nth = 0')
      ).toHaveClass(/checked/);
    });
    await test.step('Clicking on first checkbox and waiting for the page to load', async () => {
      await page
        .locator('.parts-tree-item-checkbox > .user-actionable >> nth=0')
        .click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Verifying the item is not checked', async () => {
      await expect(
        page.locator('.parts-tree-item-checkbox >> nth = 0')
      ).not.toHaveClass(/checked/);
    });
    await test.step('Verifying item expand is visible', async () => {
      await expect(
        page.locator('.parts-tree-item .parts-tree-item-expander >> nth = 0')
      ).toBeVisible();
    });
    await test.step('Clciking on item expand button and waiting for the page to load ', async () => {
      await page
        .locator('.parts-tree-item .parts-tree-item-expander >> nth = 0')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on parts item checkbox and waiting for the page to load', async () => {
      await page.locator('span.parts-tree-item-checkbox').first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying item is checked ', async () => {
      await expect(
        page.locator('span.parts-tree-item-checkbox').first()
      ).toHaveClass(/checked/);
    });
    await test.step('Clicking on deselect all button', async () => {
      await page.locator('text=Deselect All').click();
    });
    let checkList = await page.$$('span.parts-tree-item-checkbox');
    for (let i = 0; i < checkList.length; i++) {
      await expect(
        page.locator(`span.parts-tree-item-checkbox >> nth=${i}`)
      ).not.toHaveClass(/checked/);
    }
    let listItems = await page.$$('.fake-table-tr');
    for (let i = 0; i < listItems.length; i++) {
      await expect(page.locator(`.fake-table-tr >> nth=${i}`)).toBeVisible();
    }
    await test.step('Verifying the first image to be visible', async () => {
      await expect(page.locator('.fake-table-td img >> nth = 0')).toBeVisible();
    });
    await test.step('Verifying the table data is visible', async () => {
      await expect(
        page.locator('form > span:nth-child(4) >> nth=0')
      ).toBeVisible();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the table data is visible', async () => {
      await expect(
        page.locator('.fake-table-td.text-end >> nth=0')
      ).toBeVisible();
    });
    await test.step('Verifying input quantity is visible', async () => {
      await expect(page.locator('input.part-qty >> nth = 0')).toBeVisible();
    });
    await test.step('Verifying the table body is visible', async () => {
      await expect(
        page.locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
      ).toBeVisible();
    });
    const sortByDesc = (
      await page.locator('.part-desc >> nth = 0').innerText()
    ).valueOf();
    await test.step('Clicking on placeholder parts search and filling the text in placeholder', async () => {
      await page.getByPlaceholder('Parts Search').click();
      await page.getByPlaceholder('Parts Search').fill(sortByDesc);
    });
    await waitForLoadingToComplete(page)
    await test.step('Clciking on search and waiting for the page to load', async () => {
      // await page.getByRole('button', { name: 'Search' }).click();
      await page.locator('//button[text()="Search"]').click()
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the description contains the text', async () => {
      await expect(page.locator('.part-desc >> nth = 0')).toHaveText(sortByDesc);
    });
    await test.step('Filling empty data in placeholder', async () => {
      await page.getByPlaceholder('Parts Search').fill(' ');
    });
    await waitForLoadingToComplete(page)
    await test.step('Clicking on search button and waiting for the page to load', async () => {
      await page.locator('//button[text()="Search"]').click()
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying table body is visible and clicking on the icon', async () => {
      await expect(
        page.locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
      ).toBeVisible();
      await page
        .locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the part# label is visible', async () => {
      await expect(page.locator('label:has-text("Part #")')).toBeVisible();
    });
    await test.step('Verifying the description label is visible', async () => {
      await expect(page.locator('label:has-text("Description")')).toBeVisible();
    });
    await test.step('Verifying brand label is visible', async () => {
      await expect(page.locator('text=Brand')).toBeVisible();
    });
    await test.step('Verifying the catalog label is visible', async () => {
      await expect(page.locator('text=Catalog')).toBeVisible();
    });
    await test.step('Verifying unit of measurement label is visible', async () => {
      await expect(page.locator('text=Unit of Measurement')).toBeVisible();
    });
    await test.step('Verifying available date is visible', async () => {
      await expect(page.locator('text=Available Date')).toBeVisible();
    });
    await test.step('Verifying end mfg date is visible', async () => {
      await expect(page.locator('text=End Mfg Date')).toBeVisible();
    });
    await test.step('Veriyfing obsolete date is visible', async () => {
      await expect(page.locator('text=Obsolete Date')).toBeVisible();
    });
    await test.step('Verifying the price is visible', async () => {
      await expect(page.locator('label:has-text("Price")')).toBeVisible();
    });
    await test.step('Verifying quantity is visible', async () => {
      await expect(page.locator('text=Quantity >> nth=0')).toBeVisible();
    });
    await test.step('Verifying quantity on hand is visible', async () => {
      await expect(page.locator('text=Quantity on Hand >> nth=0')).toBeVisible();
    });
    await test.step('Verifying global quantity on hand is visible', async () => {
      await expect(page.locator('text=Global Quantity on Hand')).toBeVisible();
    });
    await test.step('Veriyfing add to quote is visible', async () => {
      await expect(page.locator('text=Add to Quote')).toBeVisible();
    });
    await test.step('Verifying cancel button is visible and clicking on cancel button', async () => {
      await expect(page.locator('text=Cancel')).toBeVisible();
      await page.locator('text=Cancel').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying select a part is visible', async () => {
      await expect(page.locator('text=Select a Part')).toBeVisible();
    });
    await test.step('Veriyfing the table body is visible and clicking on icon', async () => {
      await expect(
        page.locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
      ).toBeVisible();
      await page
        .locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying add to quote and clicking on add to quote', async () => {
      await expect(page.locator('text=Add to Quote')).toBeVisible();
      await page.locator('text=Add to Quote').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the part added text on dialog box', async () => {
      await expect(
        page.getByText('Part added')
      ).toBeVisible();
    });
    await test.step('Clicking on number input and filling 123 in the input field', async () => {
      await page.locator('input[type="number"] >> nth=0').click();
      await page.locator('input[type="number"] >> nth=0').fill('123');
    });
    await test.step('Clicking on plus icon and waiting for the page to load', async () => {
      await page
        .locator('span.fake-table-td svg[data-icon="plus"]')
        .nth(0)
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the part added dialog box', async () => {
      await expect(
        page.getByText('Part added').nth(0)
      ).toBeVisible();
    });
    await test.step('Verifying page 1 is your current page is visible', async () => {
      await expect(
        page.locator('[aria-label="Page 1 is your current page"]')
      ).toBeVisible();
    });
    await test.step('Clicking on right arrow', async () => {
      await page.locator('a[class="page-link"] svg.fa-chevron-right').click();
    });
    await test.step('Verifying page 2 is your current page', async () => {
      await expect(
        page.locator('[aria-label="Page 2 is your current page"]')
      ).toBeVisible();
    });
    await test.step('Clicking on right arrow', async () => {
      await page.locator('a.page-link svg[data-icon="chevron-right"]').click();
    });
    await test.step('Verifying table body is visible', async () => {
      await expect(
        page.locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
      ).toBeVisible();
    });
    await test.step('Clicking on table body and waiting for the page to load', async () => {
      await page
        .locator('div.fake-table-tbody .btn-icon-only >> nth = 0')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying part # is viisble', async () => {
      await expect(page.locator('label:has-text("Part #")')).toBeVisible();
    });
    await test.step('Clicking on close and waiting for the page to load', async () => {
      // await page.getByRole('button', { name: 'Close' }).click();
      await page.locator('button.btn-close[aria-label="Close"]').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying part # label is not visible', async () => {
      await expect(page.locator('label:has-text("Part #")')).not.toBeVisible();
    });
  });
  test('PW-08.014 Validate hardware new line item', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Verifying banner is visible', async () => {
      await expect(page.locator('header[role="banner"] a')).toBeVisible();
    });
    await test.step('Verifying My Quotes is visible and Clicking on My Quotes', async () => {
      await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
      await page.locator('text=My Quotes').click();
    });
    await test.step('Verifying breadcrumb is visible', async () => {
      await expect(page.locator('.breadcrumb')).toBeVisible();
    });
    await test.step('Verifying breadcrumb has text My Quotes', async () => {
      await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
    });
    // await test.step('Clicking on quotes settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await test.step('Clicking on groupByProjectsCheckbox input', async () => {
        await page.locator('input[id="groupByProjectsCheckbox"]').click();
      });
    }
    const date = new Date();
    await test.step('Clicking on New Quote', async () => {
      await page.locator('text=New Quote').nth(1).click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on button', async () => {
      await page.locator('input[name="QuoteName"]').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Giving input for QuoteName', async () => {
      await page
        .locator('input[name="QuoteName"]')
        .fill(`test quote ${date.getMinutes()}`);
    });
    // await test.step('Clicking on input field and giving input', async () => {
    //   await page.locator('.wts-react-select__input-container input').click();
    //   await page.locator('.wts-react-select__input-container input').fill('test');
    //   await waitForLoadingToComplete(page)    // });
    // await test.step('verifying is options are visible and Clicking on option', async () => {
    //   await expect(page.locator('#react-select-2-option-1')).toBeVisible();
    //   await page.locator('#react-select-2-option-0').click();
    // });
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
    await test.step('Selecting a client', async () => {
      await page.getByRole('button', { name: 'Select a client' }).click();
      await expect(
        page.getByPlaceholder('Search by client name or number')
      ).toBeVisible();
      await page.locator('td input').first().click();
      await waitForLoadingToComplete(page)
    });
    await waitForLoadingToComplete(page)
    await test.step('Clicking on Create', async () => {
      await page.locator('text=Create').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Line Items', async () => {
      await page.locator('text=Line Items').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on New Line Item', async () => {
      await page.locator('a:has-text("New Line Item")').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await waitForLoadingToComplete(page)
    await test.step('Clicking on Hardware button', async () => {
      await page.locator('text=Hardware').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Select a Part is visible', async () => {
      await expect(page.locator('text=Select a Part')).toBeVisible();
    });
    await test.step('Verifying tree item is visible', async () => {
      await expect(page.locator('.parts-tree-item >> nth=0')).toBeVisible();
    });
    let treeItem = await page.$$('.parts-tree-item');
    for (let i = 0; i < treeItem.length; i++) {
      await test.step('Verifying tree item is visible', async () => {
        await expect(page.locator(`.parts-tree-item >> nth=${i}`)).toBeVisible();
      });
    }
    await test.step('Clicking on button in form', async () => {
      await page.locator('form > span:nth-child(7) > button >> nth = 0').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    const partNo = (
      await page.locator('.part-number >> nth = 0').innerText()
    ).valueOf();
    await test.step('Verifying partNo is visible', async () => {
      await expect(page.locator(`td:has-text('${partNo}')`)).toBeVisible();
    });
    const partDesc = (
      await page.locator('.part-desc >> nth = 0').innerText()
    ).valueOf();
    await test.step('Verifying partDesc is visible', async () => {
      await expect(page.locator(`td:has-text('${partDesc}')`)).toBeVisible();
    });
    await test.step('Verifying table data has text 1 is visible', async () => {
      await expect(page.locator('td:has-text("1")')).toBeVisible();
    });
    await test.step('Verifying button is visible', async () => {
      await expect(page.locator('.col-table-tiny .btn')).toBeVisible();
    });
  });
  test('PW-08.015 Validate submit order button functionality', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await createLineItem(page);
    await test.step('Clicking on Quote Details', async () => {
      await page.locator('text=Quote Details').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    // await test.step('Clicking on Edit button', async () => {
    //   await page.getByRole('button', { name: 'Edit' }).first().click();
    // });
    await test.step('Verifying input ponumber has attribute maxlength', async () => {
      await expect(page.locator('input[name="ponumber"]')).toHaveAttribute(
        'maxlength',
        '14'
      );
    });
    await test.step('Clicking on button and Giving input for ponumber', async () => {
      await page.locator('input[name="ponumber"]').click();
      await page
        .locator('input[name="ponumber"]')
        .fill(`PO Num ${date.getMinutes()}`);
    });
    await test.step('Clicking on Configurable02 and Giving input for Configurable', async () => {
      await page.locator('input[name="Configurable02"]').click();
      await page
        .locator('input[name="Configurable02"]')
        .fill(`Job Num ${date.getMilliseconds()}`);
    });
    await test.step('Clicking on mm dd yyyy', async () => {
      await page.locator('[placeholder="mm\\/dd\\/yyyy"]').nth(0).click();
    });
    await test.step('Clicking on arrow icon ', async () => {
      await page.locator('div[class="rdtDays"] th.rdtNext span').nth(0).click();
    });
    await test.step('Clicking on the table data contains text 18', async () => {
      await page.locator('td:has-text("18")').nth(0).click();
    });
    await test.step('Clicking on button and Giving input for comment', async () => {
      await page.locator('input[name="comment"]').click();
      await page.locator('input[name="comment"]').fill('Comment');
    });
    await test.step('Selecting a option from Configurable', async () => {
      await page.locator('select[name="Configurable05"]').selectOption('1');
    });
    await test.step('Clicking on Save button', async () => {
      await page.locator('button[type="submit"] span span:has-text("Save Details")').click()

      // await page.locator('role=button[name="Save"]').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    page.once('dialog', (dialog) => {
      dialog.dismiss().catch(() => { });
    });
    await test.step('Clicking on Submit Order button', async () => {
      await page.getByRole('button', { name: 'Submit Order' }).click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
  });
  test('PW-08.016 Validate action button functionality', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await createLineItem(page);
    // await test.step('Waiting for spinner selector', async () => {
    //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    // });
    await test.step('Verifying Actions is visible and clicking on Actions', async () => {
      await waitForLoadingToComplete(page)
      await expect(page.locator('text=Actions')).toBeVisible();
      await page.locator('text=Actions').click();
    });
    await test.step('Verifying Paperwork button is visible', async () => {
      await expect(page.locator('role=link[name="Paperwork"]')).toBeVisible();
    });
    await test.step('Verifying Export is visible', async () => {
      await expect(page.locator('text=Export')).toBeVisible();
    });
    await test.step('Verifying Update is visible', async () => {
      await expect(page.locator('text=Update')).toBeVisible();
    });
    await test.step('Verifying copy quote is visible', async () => {
      await expect(page.locator('li:has-text("Copy") >> role=button[name="Copy"]')).toBeVisible();
    });
    await test.step('Verifying Create Plan is visible', async () => {
      await expect(page.locator('text=Create Plan')).toBeVisible();
    });
    await test.step('Clicking on copy quote', async () => {
      await page.locator('li:has-text("Copy") >> role=button[name="Copy"]').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Cancel is visible', async () => {
      await expect(page.locator('text=Cancel >> nth = 0')).toBeVisible();
    });
    await test.step('Verifying Copy is visible', async () => {
      await expect(page.locator('text=Copy >> nth=0')).toBeVisible();
    });
  });
  test('PW-08.017 Validate functionality for creating a new plan', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await createLineItem(page);
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying Actions is visible and clicking on Actions', async () => {
      await expect(page.locator('text=Actions')).toBeVisible();
      await page.locator('text=Actions').click();
    });
    await test.step('Verifying Paperwork button is visible', async () => {
      await expect(page.locator('role=link[name="Paperwork"]')).toBeVisible();
    });
    await test.step('Verifying Export is visible', async () => {
      await expect(page.locator('text=Export')).toBeVisible();
    });
    await test.step('Verifying Update is visible', async () => {
      await expect(page.locator('text=Update')).toBeVisible();
    });
    await test.step('Verifying copy quote is visible', async () => {
      await expect(page.locator('li:has-text("Copy") >> role=button[name="Copy"]')).toBeVisible();
    });
    await test.step('Verifying Create Plan is visible and clicking on Create Plan', async () => {
      await expect(page.locator('text=Create Plan')).toBeVisible();
      await page.locator('text=Create Plan').click();
    });
    await test.step('Waiting for spinner selector', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying div has text New Plan from Quote', async () => {
      await expect(page.locator('div#content-main h1')).toHaveText(
        /New Plan from Quote/
      );
    });
    await test.step('Verifying Plan Name is visible', async () => {
      await expect(page.locator('text=Plan Name')).toBeVisible();
    });
    await test.step('Verifying Project Name is visible', async () => {
      await expect(page.locator('text=Project Name')).toBeVisible();
    });
    // await test.step('Verifying Plan Description is visible', async () => {
    //   await expect(page.locator('text=Plan Description')).toBeVisible();
    // });
    await test.step('Verifying plaintext is visible', async () => {
      await expect(page.locator('p.form-control-plaintext')).toBeVisible();
    });
  });
  test('PW-08.018 Validate features on the line item for my quotes', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on the input checkbox', async () => {
      await page
        .locator('div.line-item-row input[class="form-check-input"]')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on select all and waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
      await page.getByText('Select All').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on notes and waiting for the page to load', async () => {
      await page.locator('a[role="tab"]:has-text("Notes")').click();
    });
    await test.step('Verifying Line 100 none assigned to be visible', async () => {
      await expect(page.locator('text=Line 100-1 None Assigned')).toBeVisible();
    });
    await test.step('Verifying order notes is visible', async () => {
      await expect(page.locator('text=Order Notes:')).toBeVisible();
    });
    await test.step('Verifying delivery notes is visible', async () => {
      await expect(page.locator('text=Delivery Notes:')).toBeVisible();
    });
    await test.step('Veriyfing order notes is visible', async () => {
      await expect(
        page.locator('text=Order Notes').nth(1)
      ).toBeVisible();
    });
    await test.step('Verifying notes visible', async () => {
      await expect(page.getByRole('tab', { name: 'Notes' })).toBeVisible();
    });
    await test.step('Clicking on order notes and waiting for the page to load', async () => {
      // await page.locator('a:has-text("Order Notes:")').click();
      await page.getByRole('button', { name: 'Add' }).first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on text area input field', async () => {
      await page.locator('textarea').nth(0).click();
    });
    await test.step('filling the text in the text area', async () => {
      await page.locator('textarea').nth(0).fill(`Order Note ${date.getMilliseconds()}`);
    });
    await test.step('Verifying save button is visible', async () => {
      await expect(page.locator('text=Save')).toBeVisible();
    });
    await test.step('Verifying cancel button is visible and clicking on cancel button', async () => {
      await expect(page.locator('text=Cancel')).toBeVisible();
      await page.locator('text=Cancel').click();
    });
    await test.step('Verifying order notes is visible and clicking on order notes', async () => {
      await expect(page.locator('text=Order Notes:')).toBeVisible();
      // await page.locator('a:has-text("Order Notes:")').click();
      await page.getByRole('button', { name: 'Add' }).first().click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on text area input field', async () => {
      await page.locator('textarea').nth(0).click();
    });
    let noteName = `Order Note ${date.getMilliseconds()}`;
    await test.step('Filling the text in the text area input field', async () => {
      await page.locator('textarea').nth(0).fill(noteName);
    });
    await test.step('Verifying save button is visible and clicking on save button', async () => {
      await expect(page.locator('text=Save')).toBeVisible();
      await page.locator('text=Save').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the note name is visible', async () => {
      await expect(page.locator(`text=${noteName}`)).toBeVisible();
    });
    await test.step('Verifying relatives text is visible and clciking on relatives text', async () => {
      await expect(page.locator('text=Relatives')).toBeVisible();
      await page.locator('text=Relatives').click();
    });
    await test.step('Verifying no relatives found text is visible ', async () => {
      await expect(page.locator('text=No data found')).toBeVisible();
    });
  });

  test('PW-08.019 Verify dealer option and dealer total option', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Verifying line item settings button is visible', async () => {
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
      await waitForLoadingToComplete(page)
      await page.locator('button[id="lineItem-settings"]').isVisible();
    });
    await test.step('Clicking on line item settings button', async () => {
      await page.locator('button[id="lineItem-settings"]').click();
    });
    await test.step('Verifying hide my pricing is visible', async () => {
      await page.getByLabel('Hide My Pricing').isVisible();
    });
    await waitForLoadingToComplete(page);
    if (await page.getByLabel('Hide My Pricing').isChecked()) {
      await page.getByLabel('Hide My Pricing').uncheck();
      await waitForLoadingToComplete(page)

    }
    await test.step('Verifying dealer and dealer total labels are visible', async () => {
      await expect(
        page.locator("label:has-text('Dealer')").first()
      ).toBeVisible();
      await expect(page.getByText('Dealer Total')).toBeVisible();
    });
  });
  test('PW-08.020 validate notes in line item', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Clicking on notes', async () => {
      await page.getByRole('link', { name: 'Notes' }).click();
    });
    await test.step('Verifying order notes is visible and clicking on order notes', async () => {
      await expect(page.locator('text=Order Notes:')).toBeVisible();
      // await page.locator('a:has-text("Order Notes:")').click();
      await page.getByRole('button', { name: 'Add' }).first().click();
    });
    await test.step('Clicking on text area input field and filling the text in the text area', async () => {
      await page.locator('textarea').nth(0).click();
      await page
        .locator('textarea').nth(0)
        .fill(`order received ${date.getMilliseconds()}`);
    });
    await test.step('Clicking on save button', async () => {
      await page.locator('role=button[name="Save"]').click();
    });
    await test.step('Clicking on edit button', async () => {
      await page.getByRole('button', { name: 'Edit' }).click();
    });
    await test.step('Clicking on take a note placeholder and filling the text in the placeholder', async () => {
      await page.getByPlaceholder('Take a note…').nth(0).click();
      await page
        .getByPlaceholder('Take a note…').nth(0)
        .fill(`note 2 edited${date.getMilliseconds}`);
    });
    await test.step('Clicking on save button', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });
    await test.step('Clicking on quote line items tab ', async () => {
      await page.getByRole('tab', { name: 'Line Items' }).click();
    });
    await test.step('Clicking on copy button', async () => {
      await page.getByRole('button', { name: 'Copy' }).click();
    });

    await test.step('Verifying  the line copied text in dialog box', async () => {
      await expect(page.getByText('Line copied').first()).toBeVisible();
    });
    await test.step('Verifying card body is visible', async () => {
      await expect(page.locator('div.card-body >> nth=1')).toBeVisible();
    });
    await test.step('Clicking on delete button', async () => {
      // await page.getByRole('button', { name: 'Delete' }).nth(1).click();
      await page.once('dialog', dialog => {
        dialog.dismiss().catch(() => { });
      });
      await page.getByRole('button', { name: 'Delete' }).nth(1).click();
    });
    await test.step('Verifying line deleted text is visible on dialog box', async () => {
      await expect(page.getByText('Line deleted').first()).toBeVisible();
    });
  });
  // !! skipped because unable to see pricebreakdown in external user
  test.skip('PW-08.021 internal user quote details', async ({ page }) => {
    // const internalContext = await browser.newContext({
    //   storageState: `tests/state/${dealerAuthKeys.storageStateFile}`,
    // });
    // const page = await internalContext.newPage();
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await createNewQuoteForInternalUser(page);
    await test.step('Clicking on menu button', async () => {
      await page.locator('button.ellipsis-menu').click();
    });
    await test.step('Verifying price breakdown is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'Price Breakdown' })
      ).toBeVisible();
    });
    await test.step('Verifying save as favorite button is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'Save as Favorite' })
      ).toBeVisible();
    });
    await test.step('clicking on copy button', async () => {
      await page.getByRole('button', { name: 'Copy' }).click();
    });
    let lineItemNumber = await page
      .locator('div.line-item-row label.form-check-label')
      .nth(1)
      .innerText();
    await test.step('clicking on menu button', async () => {
      await page.locator('button.ellipsis-menu').nth(1).click();
    });
    await test.step('Clicking on price breakdown', async () => {
      await page.getByRole('button', { name: 'Price Breakdown' }).click();
    });

    await test.step('Verifying line items contains line item number text', async () => {
      await expect(
        page
          .locator('div.lineitems-price-breakup div.form-group span')
          .first()
      ).toHaveText(lineItemNumber);
    });
    await test.step('Verifying list price button is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'List Price' })
      ).toBeVisible();
    });
    await test.step('Verifying discounts button is visible', async () => {
      await expect(
        page.getByRole('button', { name: 'Discounts' })
      ).toBeVisible();
    });
    await test.step('Clicking on add button', async () => {
      await page.getByRole('button', { name: 'Add' }).click();
    });
    await test.step('Filling the text in the placeholder', async () => {
      await page.getByPlaceholder('Price Modifier Name').fill('test');
    });
    await test.step('Filling the price in the input field', async () => {
      await page.getByLabel('Price').fill('1');
    });
    await test.step('Clicking on add button', async () => {
      await page.getByRole('button', { name: 'Add' }).click();
    });
    await test.step('Verifying price mod added text is visible', async () => {
      await expect(
        page.getByText('PriceMod added').first()
      ).toBeVisible();
    });
    page.once('dialog', (dialog) => {
      dialog.dismiss().catch(() => { });
    });
    await test.step('Clicking on delete button', async () => {
      await page
        .getByRole('cell', { name: 'Delete' })
        .getByRole('button', { name: 'Delete' })
        .click();
    });
    await test.step('Verifying price mod deleted text is visible', async () => {
      await expect(
        page.getByText('PriceMod deleted').first()
      ).toBeVisible();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on close button and waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
      await page.getByRole('button', { name: 'Close' }).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the background color of the submit quote button', async () => {
      await expect(
        page.locator('button#line-items__submit-quote')
      ).toHaveCSS('background-color', 'rgb(0, 83, 161)');
    });
    await editQuoteDetails(page);
  });
  test('PW-08.022 additonal charges in external user', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await createLineItem(page);
    await test.step('Clicking on menu button', async () => {
      await waitForLoadingToComplete(page)
      await page.locator('button.ellipsis-menu').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying additional charges is visible', async () => {
      await page.getByRole('button', { name: 'Additional Charges' }).isVisible();
    });
  });
  test('PW-08.023 Validate features on the line items and price list', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying quantity label is visible', async () => {
      await expect(page.locator("label:has-text('Qty')")).toBeVisible();
    });
    await test.step('Veriyfing list label is visible', async () => {
      await expect(page.locator("label:has-text('List')").first()).toBeVisible();
    });
    await test.step('Verifying customer text is visible', async () => {
      await expect(
        page.locator("label:has-text('Customer')").first()
      ).toBeVisible();
    });
    await test.step('Verifying customer total is visible', async () => {
      await expect(page.getByText('Customer Total')).toBeVisible();
    });
  });
  test('PW-08.024 Validate attachment button functionality', async ({ page }) => {
    await test.step('Naviagting to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on attachments and waiting for the page to load', async () => {
      await page.locator('text=Attachments').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying new attachments and clicking on new attachments', async () => {
      await expect(page.locator('a:has-text("New Attachment")')).toBeVisible();
      await page.locator('a:has-text("New Attachment")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying drop files here is visible', async () => {
      await expect(
        page.getByText('Drop files here orSelect Files')
      ).toBeVisible();
    });
    await test.step('Veriyfing cancel button is visible', async () => {
      await expect(page.locator('text=Cancel')).toBeVisible();
    });
    await test.step('Verifying save button is visible', async () => {
      await expect(page.locator('text=Save')).toBeVisible();
    });
    await test.step('Verifying select files text is visible', async () => {
      await expect(page.locator('text=Select Files')).toBeVisible();
    });
    await test.step('Verifying drop files here text is visible', async () => {
      await expect(page.locator('text=Drop files here or')).toBeVisible();
    });
  });
  test('PW-08.025 Validate edit button functionality for the line item', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on edit button', async () => {
      await page.locator('text=Edit').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on the dropdown and waiting for the page to load', async () => {
      await page
        .locator('div.wts-react-select__value-container >> nth=1')
        .click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on text 2/4 and waiting for the page to load', async () => {
      await page.locator('text=2/4').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on save line text', async () => {
      await page.locator('text=Save Line >> nth=0').click();
    });
  });
  test('PW-08.026 Validate click functionality for my favrioute', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on toggle dropdown', async () => {
      await page.getByRole('button', { name: 'Toggle Dropdown' }).nth(1).click();
    });
    await test.step('Clicking on save as favorite button', async () => {
      await page.getByRole('button', { name: 'Save as Favorite' }).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on name your favorite placeholder', async () => {
      await page.locator('[name="Name"]').click();
    });
    const myFav = `My Fav ${date.getMilliseconds()}`;
    await test.step('Filling the favorite name in placeholder', async () => {
      await page.locator('[name="Name"]').fill(myFav);
    });
    await test.step('Clicking on save button', async () => {
      await page.locator('button:has-text("Save")').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on my favorites and waiting for the page to load', async () => {
      await page.locator('text=My Favorites').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on search placeholder and filling the name in the placeholder', async () => {
      await waitForLoadingToComplete(page)
      await page.locator('[placeholder="Search by name, description or tag"]').click();
      await page.locator('[placeholder="Search by name, description or tag"]').fill(myFav);
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on the group button', async () => {
      await page.getByRole('link', { name: /My Fav/ }).nth(0).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on delete button', async () => {
      await page.getByRole('button', { name: 'Delete' }).click();
    });
    await test.step('Verifying favorite deleted text is visible on dialog box', async () => {
      await expect(page.locator('text=Favorite deleted')).toBeVisible();
    });
  });
  test('PW-08.027 Validate click functionality on customer pricing', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    // await test.step('Waiting for the page to load', async () => {
    //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    //   awaitwaitForLoadingToComplete(page)    // });
    // await test.step('Waiting for the page to load', async () => {
    //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    // }); // todo await expect(page.locator('button[title="Pricing')).toBeVisible();
  });
  test('PW-08.028 Validate click functionality on Hide My pricing', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on settings button and waiting for the page to load', async () => {
      await page.locator('button#lineItem-settings').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Clicking on hide all pricing and waiting for the page to load', async () => {
      await page.locator('text=Hide All Pricing').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Clicking on settings button', async () => {
      await page.locator('button#lineItem-settings').click();
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    });
    await test.step('Verifying hid emy price should be disabled', async () => {
      await expect(
        page.locator('div.lineItems_pricingSettings_hideMyPricing')
      ).toHaveClass(/disabled/);
    });
    await test.step('Clicking on hide all pricing and waiting for the page to load', async () => {
      await page.locator('text=Hide All Pricing').click();
    });
    await test.step('Clicking on settings button and waiting for the page to load', async () => {
      await page.locator('button#lineItem-settings').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on hide my pricing and waiting for the page to load', async () => {
      await page.locator('text=Hide My Pricing').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on settings button and waiting for the page to load', async () => {
      await page.locator('button#lineItem-settings').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying hide pricing should not be disabled', async () => {
      await expect(
        page.locator('input[id="lineItems_pricingSettings_hidePricing"]')
      ).not.toHaveClass(/disabled/);
    });
  });
  test('PW-08.029 Validate click functionality for Double Check', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on double check and waiting for the page to load', async () => {
      await page.locator('text=Double Check').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying double check text is visible', async () => {
      await expect(page.locator('text=Double Check')).toBeVisible();
      await page.getByLabel('Show inconsistencies only').uncheck();
    });
    await test.step('Verifying table is visible', async () => {
      let listItems = await page.$$('.table');
      for (let i = 0; i < listItems.length; i++) {
        await expect(page.locator(`.table >> nth=${i}`)).toBeVisible();
      }
    });
    await test.step('Verifying edit option is visible', async () => {
      let editOption = await page.$$('.table .btn-icon-only');
      for (let i = 0; i < editOption.length; i++) {
        await expect(page.locator(`.table .btn-icon-only >> nth=${i}`)).toBeVisible();
      }
    });
  });
  test('PW-08.030 Validate search functionality for my quotes', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on the placeholder', async () => {
      await page
        .locator('[placeholder="Line number\\, room\\, description"]')
        .click();
    });
    const lineNo = (
      await page
        // .locator('.line-item-checkbox .checkbox label >> nth = 0')
        .locator('.line-item-checkbox label >> nth=0')
        .innerText()
    ).valueOf();
    const describe =
      // await page.locator('.lineItem_description div >> nth = 0').innerText()
      (await page.locator('p.lineItem_roomDescription').innerText()).valueOf();
    await test.step('Filling the line number in the placeholder', async () => {
      await page
        .locator('[placeholder="Line number\\, room\\, description"]')
        .fill(lineNo);
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying line item checkbox to have line number text', async () => {
      await expect(page.locator('.line-item-checkbox label >> nth=0')).toHaveText(
        lineNo
      );
    });
    await test.step('Filling the text in the placeholder', async () => {
      await page
        .locator('[placeholder="Line number\\, room\\, description"]')
        .fill(describe.substring(0, 10));
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying the line item room description having the describe text', async () => {
      await expect(
        page.locator('p.lineItem_roomDescription >> nth=0')
      ).toHaveText(describe);
    });
    await test.step('Filling the line number in the placeholder', async () => {
      await page
        .locator('[placeholder="Line number\\, room\\, description"]')
        .fill(`${lineNo}@${describe.substring(0, 10)}`);
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying line item description is not visible', async () => {
      await expect(
        page.locator('p.lineItem_roomDescription >> nth=0')
      ).not.toBeVisible();
    });
    await test.step('Filling the empty data in the placeholder', async () => {
      await page
        .locator('[placeholder="Line number\\, room\\, description"]')
        .fill(' ');
    });
    await test.step('Clicking on dropdown', async () => {
      await page
        .locator('div.wts-react-select__dropdown-indicator')
        .first()
        .click();
    });
    //todo await expect(page.locator('#react-select-2-option-0')).toBeVisible();
  });
  test('PW-08.031 Validate copy/delete line item functionality', async ({
    page,
  }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    const date = new Date();
    await test.step('Waiting for the page to load', async () => {
      await waitForLoadingToComplete(page)
    });
    await createLineItem(page);
    await test.step('waiting for the page to load', async () => {
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on actions copy button', async () => {
      await page.locator('.wts-button.btn.btn-xs.btn-default.lineItem_actionButtons_copy').nth(0).click();
    });
    await test.step('Verifying line items are visible', async () => {
      await expect(page.locator('div.card-body >> nth=1')).toBeVisible();
    });
    page.once('dialog', (dialog) => {
      dialog.dismiss().catch(() => { });
    });
    await test.step('Clicking on delete button', async () => {
      await page.getByRole('button', { name: 'Delete' }).nth(1).click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Verifying line deleted text is visible on dialog box', async () => {
      await expect(page.locator('text=Line deleted')).toBeVisible();
    });
  });
  test('PW-08.032 Validate search quote for line item', async ({ page }) => {
    await test.step('Navigating to application', async () => {
      await page.goto('/');
    });
    await test.step('Clicking on my quotes and waiting for th epag eto load', async () => {
      await waitForLoadingToComplete(page)
      await page.locator('text=My Quotes').click();
    });
    // await test.step('Clicking on quotes settings button', async () => {
    //   await page.locator('button#my-quotes-settings').click();
    // });
    await waitForLoadingToComplete(page)
    let groupBy = await page.$$('.form-check-input:checked');
    if (groupBy.length == 1) {
      await page.locator('input[id="groupByProjectsCheckbox"]').click();
    }
    await test.step('Clciking on search by number placeholder and waiting for the page to load', async () => {
      await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
      await page.locator('[placeholder="Search by Number"]').click();
      await waitForLoadingToComplete(page)
    });
    const quoteNo = (await page.locator('(//td)[3]').innerText()).valueOf();
    await test.step('Filling quote number in the placeholder', async () => {
      await page.locator('[placeholder="Search by Number"]').fill(quoteNo);
    });
    await test.step('Verifying the third column in the table contains quote number', async () => {
      await expect(page.locator('(//td)[3]')).toHaveText(quoteNo);
    });
    await test.step('Filling the quote number in the placeholder', async () => {
      await page
        .locator('[placeholder="Search by Number"]')
        .fill(`${quoteNo}1912`);
    });
    await test.step('Verifying no data found is visible', async () => {
      await expect(
        page.getByRole('heading', { name: 'No data found' })
      ).toBeVisible();
    });
  });
})