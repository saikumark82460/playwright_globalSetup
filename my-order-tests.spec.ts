import { test, expect } from '@playwright/test';
import { adminAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { userAgreementPage, waitForLoadingToComplete } from './utils';

useUser(test, adminAuthKeys);
// !! Failing aa expected because we ares eeing the eror while entering the order name
test('PW-06.001, Validating my order page functionality', async ({ page }) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating title to have text Home | TALON: American Building Supply', async () => {
    expect(await page.title()).toBe('TALON: American Building Supply');
  });
  await test.step('Clicking on My Orders tab', async () => {
    await page.locator('li:has-text("My Orders")').click();
  });
  await test.step('Validating breadcrumb has text My Orders', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
    await waitForLoadingToComplete(page)
  });
  await test.step('Validating my quotes table to be visible', async () => {
    await expect(page.locator('.table')).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Validating Number tab to be visible', async () => {
    await expect(page.locator('select.form-select >> option').nth(0)).toHaveText('Number');
  });
  await test.step('Validating Search by Number search box to be visible', async () => {
    await expect(
      page.locator('[placeholder="Search by Number"]')
    ).toBeVisible();
  });
  let firstQuoteNumber = await page.locator('td>>nth=2').innerText();
  let firstQuoteName = await page.locator('td>>nth=3').innerText();
  let firstPONumber = await page.locator('td>>nth=4').innerText();
  let firstClientName = await page.locator('td>>nth=5').innerText();
  await test.step('Selecting QuoteName option', async () => {
    await page.locator('select.form-select').selectOption('QuoteName');
  });
  await test.step('Clicking on Search by Name tab', async () => {
    await page.locator('[placeholder="Search by Name"]').click();
  });
  await test.step('Entering value into Search by Name tab', async () => {
    await page.locator('[placeholder="Search by Name"]').fill(firstQuoteName);
  });
  await test.step('Validating searched quote name to be visible', async () => {
    await expect(page.locator('td>>nth=3')).toHaveText(firstQuoteName);
  });
  //!while searching client it is unable to take special characters so we are directly taking the text
  await test.step('Selecting ClientName option', async () => {
    await page.locator('select.form-select').selectOption('ClientName');
  });
  await test.step('Clicking on Search by Client tab', async () => {
    await page.locator('[placeholder="Search by Client"]').click();
  });
  await test.step('Entering value into Search by Client tab', async () => {
    await page
      .locator('[placeholder="Search by Client"]')
      .fill(firstClientName);
  });
  await test.step('Clicking on Clear Search button', async () => {
    await page.getByRole('button', { name: 'Clear Search' }).click();
  });
  await test.step('Selecting PONumber option', async () => {
    // await page.locator('#select-addon').selectOption('PONumber');
    await page.locator('select.form-select').selectOption('PONumber');
  });
  // await test.step('Clicking on Search by PO Number tab', async () => {
  //   await page.locator('select.form-select').selectOption('PONumber');
  // });
  await test.step('Entering value into Search by PO Number tab', async () => {
    await page
      .locator('[placeholder="Search by PO Number"]')
      .fill(firstPONumber);
  });
  await test.step('Validating searched PO Number to be visible', async () => {
    await expect(page.locator('td>>nth=4')).toHaveText(firstPONumber);
  });
  await test.step('Selecting QuoteNumber option', async () => {
    await page.locator('select.form-select').selectOption('QuoteNumber');
  });
  await test.step('Clicking on Search by Number tab', async () => {
    await page.locator('[placeholder="Search by Number"]').click();
  });
  await test.step('Entering value into Search by Number tab', async () => {
    await page
      .locator('[placeholder="Search by Number"]')
      .fill(firstQuoteNumber);
  });
  await test.step('Validating searched QuoteNumber to be visible', async () => {
    await expect(page.locator('td>>nth=2')).toHaveText(firstQuoteNumber);
  });
  await test.step('Clicking on Search by Number tab', async () => {
    await page.locator('[placeholder="Search by Number"]').click();
  });
  await test.step('Entering value into Search by Number tab', async () => {
    await page
      .locator('[placeholder="Search by Number"]')
      .fill('invalide Number 123');
  });
  await test.step('Validating No data found result to be visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'No data found' })
    ).toBeVisible();
  });
  await test.step('Clicking on clear tab', async () => {
    await page.locator('form span').click();
  });
  await test.step('Validating Order Date tab sort down arrow icon to be visible', async () => {
    await expect(
      page.locator('text=Order Date >> svg[data-icon="sort-down"]')
    ).toBeVisible();
  });
  let currentQuoteNumber = await page.locator('td>>nth=2').innerText();
  await test.step('Clicking on Order Date tab sort arrow icon', async () => {
    await page.locator('text=Order Date >> svg').click();
  });
  await test.step('Validating sorted quote number not to be visible', async () => {
    await expect(page.locator('td>>nth=0')).not.toHaveText(currentQuoteNumber);
  });
  await test.step('Validating Order Date tab sort up arrow icon to be visible', async () => {
    await expect(
      page.locator('text=Order Date >> svg[data-icon="sort-up"]')
    ).toBeVisible();
  });
  await test.step('Clicking on Order Date tab sort arrow icon', async () => {
    await page.locator('text=Order Date >> svg').click();
  });
  currentQuoteNumber = await page.locator('td>>nth=2').innerText();
  // console.log("currentQuoteNumber:-        ",currentQuoteNumber);
  // await test.step('Clicking on Number tab', async () => {
  //   await page.locator('text=Number').nth(2).click();
  // });
  await test.step('Validating Number tab sort down arrow icon to be visible', async () => {
    await expect(
      page.locator('text=Number >> svg[data-icon="sort-down"]').nth(0)
    ).toBeVisible();
  });
  await test.step('Clicking on Number tab sort arrow icon1', async () => {
    await page.locator('th:has-text("Number") >> svg[data-icon="sort-down"]').nth(0).click();
  });
  await test.step('Validating Number tab sort up arrow icon to be visible', async () => {
    await expect(
      page.locator('th:has-text("Number") >>  svg[data-icon="sort-up"]').nth(0)
    ).toBeVisible();
  });
  await test.step('Validating sorted quote number not to be visible', async () => {
    await expect(page.locator('td>>nth=0')).not.toHaveText(currentQuoteNumber);
  });
  await test.step('Clicking on Number tab sort arrow icon2', async () => {
    await page.locator('th:has-text("Number") >>  svg[data-icon="sort-up"]').nth(0).click();
  });
  currentQuoteNumber = await page.locator('td>>nth=2').innerText();
  // await test.step('Clicking on Name tab', async () => {
  //   await page.locator('th:has-text("Name")').click();
  // });
  await test.step('Validating Name tab sort down arrow icon to be visible', async () => {
    await expect(
      page.locator('th:has-text("Name") >> svg[data-icon="sort-down"]')
    ).toBeVisible();
  });
  await test.step('Clicking on Name tab sort arrow icon', async () => {
    await page.locator('th:has-text("Name") >> svg[data-icon="sort-down"]').click();
  });
  await test.step('Validating Name tab sort up arrow icon to be visible', async () => {
    await expect(
      page.locator('th:has-text("Name") >> svg[data-icon="sort-up"]')
    ).toBeVisible();
  });
  await test.step('Validating sorted quote number not to be visible', async () => {
    await expect(page.locator('td>>nth=0')).not.toHaveText(currentQuoteNumber);
  });
  await test.step('Clicking on Name tab sort arrow icon', async () => {
    await page.locator('th:has-text("Name") >> svg[data-icon="sort-up"]').click();
  });
  // await test.step('Clicking on Client tab', async () => {
  //   await page.locator('th:has-text("Client")').click();
  // });
  await test.step('Validating Client tab sort down arrow icon to be visible', async () => {
    await expect(
      page.locator('th:has-text("Client") >> svg[data-icon="sort-down"]')
    ).toBeVisible();
  });
  currentQuoteNumber = await page.locator('td>>nth=2').innerText();
  await test.step('Clicking on Client tab sort arrow icon', async () => {
    await page.locator('th:has-text("Client") >>  svg[data-icon="sort-down"]').click();
  });
  await test.step('Validating Client tab sort up arrow icon to be visible', async () => {
    await expect(
      page.locator('th:has-text("Client") >> svg[data-icon="sort-up"]')
    ).toBeVisible();
  });
  await test.step('Validating sorted quote number not to be visible', async () => {
    await expect(page.locator('td>>nth=0')).not.toHaveText(currentQuoteNumber);
  });
  await test.step('Clicking on Name tab sort arrow icon', async () => {
    await page.locator('th:has-text("Client") >> svg[data-icon="sort-up"]').click();
    await waitForLoadingToComplete(page)
  });
  // await test.step('Clicking on Ship Date tab', async () => {
  //   await page.locator('text=Ship Date').click();
  // });
  await test.step('Validating Ship Date tab sort down arrow icon to be visible', async () => {
    await expect(
      page.locator('text=Ship Date >> svg[data-icon="sort-down"]')
    ).toBeVisible();
  });
  await test.step('Clicking on CShip Datelient tab sort arrow icon', async () => {
    await page.locator('text=Ship Date >> svg[data-icon="sort-down"]').click();
  });
  await test.step('Validating Ship Date tab sort up arrow icon to be visible', async () => {
    await expect(
      page.locator('text=Ship Date >> svg[data-icon="sort-up"]')
    ).toBeVisible();
  });
  await test.step('Clicking on Ship Date tab sort arrow icon', async () => {
    await page.locator('text=Ship Date >> svg[data-icon="sort-up"]').click();
  });
  // await test.step('Validating Entries tab to be visible', async () => {
  //   await expect(page.locator('select >> nth=0')).toBeVisible();
  // });
  // await test.step('Selecting 25 Entries option in dropdown', async () => {
  //   await page.locator('select').first().selectOption('25');
  // });
  // await test.step('Selecting 10 Entries option in dropdown', async () => {
  //   await page.locator('select').first().selectOption('10');
  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
  // });
  // await test.step('Clicking on pagination page 1', async () => {
  //   await page
  //     .getByRole('button', { name: 'Page 1 is your current page' })
  //     .click();
  // });
  // let nextPage = await page.$$('[aria-label="Page 2"]');
  // if (nextPage.length == 1) {
  //   await test.step('Clicking on pagination page 2', async () => {
  //     await page.locator('[aria-label="Page 2"]').click();
  //     awaitwaitForLoadingToComplete(page)  //     await page.waitForSelector('#spinner', {
  //       state: 'hidden',
  //       timeout: 20000,
  //     });
  //     awaitwaitForLoadingToComplete(page)  //   });
  //   await test.step('Validating pagination page 2 tab to be visible', async () => {
  //     await expect(
  //       page.locator('[aria-label="Page 2 is your current page"]')
  //     ).toBeVisible();
  //   });
  //   await test.step('Clicking on pagination page 1', async () => {
  //     await page.locator('[aria-label="Page 1"]').click();
  //     awaitwaitForLoadingToComplete(page)  //     await page.waitForSelector('#spinner', {
  //       state: 'hidden',
  //       timeout: 20000,
  //     });
  //     awaitwaitForLoadingToComplete(page)  //   });
  // } else {
  //   await test.step('Validating pagination page 2 tab to be visible', async () => {
  //     await expect(
  //       page.getByRole('button', { name: 'Page 1 is your current page' })
  //     ).toBeVisible();
  //   });
  // }
});
test('PW-06.002, Validating my orders table features', async ({ page }) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Clicking on My Orders tab', async () => {
    await page.locator('li:has-text("My Orders")').click();
  });
  await test.step('Validating breadcrumb has text My Orders', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
  });
  // await test.step('Clicking on quotes settings tab', async () => {
  //   await page.locator('button#my-quotes-settings').click();
  // });
  // let groupBy = await page.$$('.form-check-input:checked');
  // if (groupBy.length == 1) {
  //   await test.step('Clicking on Group By Projects Checkbox option', async () => {
  //     await page.locator('input[id="groupByProjectsCheckbox"]').click();
  //   });
  // }
  await test.step('Clicking on quotes table', async () => {
    await page.locator('div#content').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Validating my quotes table to be visible', async () => {
    await expect(page.locator('.table')).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  // await page.waitForSelector('tr.quote-row >> nth=1', {
  //   state: 'visible',
  //   timeout: 2000,
  // });
  let lineItems = await page.$$('tr.quote-row');
  await expect(lineItems.length).toBeGreaterThan(0);
  for (let i = 0; i < lineItems.length; i++) {
    await test.step('Validating Details search icon to be visible', async () => {
      await expect(page.locator(` a[title="Details"]>>nth=${i}`)).toBeVisible();
    });
  }
  await test.step('Clicking on Details search icon', async () => {
    await page.locator('a[title="Details"]>>nth=0').click();
  });
  await test.step('Validating breadcrumb has text Order', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Order/);
  });
  await test.step('Validating the text Order Details to be visible', async () => {
    await expect(page.locator('li[role="presentation"] a.active')).toHaveText(
      /Order Details/
    );
  });
  await test.step('Validating the text Details to be visible', async () => {
    await expect(page.locator('#quote-header-tab-details')).toHaveText(
      /Details/
    );
  });
  await test.step('Validating the text Shipping to be visible', async () => {
    await expect(page.locator('#quote-header-tab-shipping-billing')).toHaveText(
      /Shipping/
    );
  });
  await test.step('Validating the text Billing to be visible', async () => {
    await expect(page.locator('#quote-header-tab-shipping-billing')).toHaveText(
      /Billing/
    );
  });
  await test.step('Clicking on My Orders tab', async () => {
    await page.locator('li a.nav-link:has-text("My Orders")').click();
  });
  await test.step('Validating breadcrumb has text My Orders', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
  });
  for (let i = 0; i < lineItems.length; i++) {
    await test.step('Validating the Customer tab to be visible', async () => {
      await expect(
        page.locator(`a.actionLink__item .fa-users >> nth=${i}`)
      ).toBeVisible();
    });
  }
  await test.step('Clicking on first customer tab', async () => {
    await page.locator('a.actionLink__item .fa-users>>nth=0').click();
  });
  await test.step('Validating breadcrumb has text Customer', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Customer/
    );
  });
  await test.step('Validating the text Customer to be visible', async () => {
    await expect(page.locator('li[role="presentation"] .active')).toHaveText(
      /Customer/
    );
  });
  await test.step('Clicking on My Orders tab', async () => {
    await page.locator('li a.nav-link:has-text("My Orders")').click();
  });
  await test.step('Validating breadcrumb has text My Orders', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
  });
  for (let i = 0; i < lineItems.length; i++) {
    await test.step('Validating the Line Items tab to be visible', async () => {
      await expect(
        page.locator(`a[title="Line Items"]>>nth=${i}`)
      ).toBeVisible();
    });
    await test.step('Validating the Line Items badge to be visible', async () => {
      await expect(
        page.locator(`a[title="Line Items"]>>.badge>>nth=${i}`)
      ).toBeVisible();
    });
  }
  await test.step('Clicking on the first Line Items badge', async () => {
    await page.locator('a[title="Line Items"]>>.badge>>nth=0').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
  });
  await test.step('Validating the text Line Items to be visible', async () => {
    await expect(page.locator('li[role="presentation"] .active')).toHaveText(
      /Line Items/
    );
  });
  await test.step('Validating the lable text 100 to be visible', async () => {
    await expect(page.locator('label:has-text("100")').nth(0)).toBeVisible();
  });
  await test.step('Validating the search bar of placeholder Line number, room, description to be visible', async () => {
    await expect(
      page.locator('[placeholder="Line number, room, description"] ')
    ).toBeVisible();
  });
  await test.step('Clicking on My Orders tab', async () => {
    await page.locator('li a.nav-link:has-text("My Orders")').click();
  });
  await test.step('Validating breadcrumb has text My Orders', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
  });
  await test.step('Clicking on first Quote number', async () => {
    await page.locator('td>>nth=2>>a').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Validating breadcrumb has text Order', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Order/);
  });
  await test.step('Validating the text Order Details to be visible', async () => {
    await expect(page.locator('li[role="presentation"] a.active')).toHaveText(
      /Order Details/
    );
  });
  await test.step('Validating the text Details to be visible', async () => {
    await expect(page.locator('#quote-header-tab-details')).toHaveText(
      /Details/
    );
  });
  await test.step('Validating the text Shipping to be visible', async () => {
    await expect(page.locator('#quote-header-tab-shipping-billing')).toHaveText(
      /Shipping/
    );
  });
  await test.step('Validating the text Billing to be visible', async () => {
    await expect(page.locator('#quote-header-tab-shipping-billing')).toHaveText(
      /Billing/
    );
  });
});
test('PW-06.003, Validating User agreement and searching the quote functionality in my orders', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Clicking on My Orders tab', async () => {
    await page.locator('li a.nav-link:has-text("My Orders")').click();
  });
  await test.step('Validating breadcrumb has text My Orders', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
  });
  // await test.step('Clicking on quotes settings tab', async () => {
  //   await page.locator('button#my-quotes-settings').click();
  // });
  // let groupBy = await page.$$('.form-check-input:checked');
  // if (groupBy.length == 1) {
  //   await test.step('Clicking on Group By Projects Checkbox option', async () => {
  //     await page.locator('input[id="groupByProjectsCheckbox"]').click();
  //     awaitwaitForLoadingToComplete(page)  //   });
  // }
  await test.step('Validating my quotes table to be visible', async () => {
    await expect(page.locator('.table')).toBeVisible();
  });
  await test.step('Validating alert message text to be visible', async () => {
    await expect(page.locator('#user-alert-message ')).toHaveText(
      ' All TALON doors and frames will be sent RAW/UNFINISHED and do not reflect the true skin color.'
    );
  });
  await userAgreementPage(page);
  await test.step('Validating Search icon to be visible', async () => {
    await expect(
      page.locator('div button svg.fa-magnifying-glass')
    ).toBeVisible();
  });
  let orderNumber = await page.locator('td>>nth=2>>a').innerText();
  await test.step('Clicking on Search icon tab', async () => {
    await page.locator('div button svg.fa-magnifying-glass').click();
  });
  await test.step('Validating Search by Quote, Order or Plan Number search bar to be visible', async () => {
    await expect(
      page.getByRole('combobox', { name: 'Type in a quote, order, or' })
    ).toBeVisible();
  });
  await test.step('Entering data into Search by Quote, Order or Plan Number search bar', async () => {
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).fill(orderNumber);
    await waitForLoadingToComplete(page)
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).press('Enter');
  });
  // await test.step('Clicking on Search icon tab', async () => {
  //   await page.locator('div.input-group button[title="Search"]').click();
  // });
  await test.step('Validating breadcrumb has text orderNumber', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      `Order ${orderNumber}`
    );
  });
  await test.step('Validating lable text Owner to be visible', async () => {
    await expect(page.getByText('Owner')).toBeVisible();
  });
  await test.step('Validating lable text Created to be visible', async () => {
    await expect(page.getByText('Created')).toBeVisible();
  });
  await test.step('Validating lable text Client to be visible', async () => {
    await expect(page.getByText('Client')).toBeVisible();
  });
  await test.step('Clicking on Search icon tab', async () => {
    await page.locator('div button svg.fa-magnifying-glass').click();
  });
  await test.step('Validating Search by Quote, Order or Plan Number search bar to be visible', async () => {
    await expect(
      page.getByRole('combobox', { name: 'Type in a quote, order, or' })
    ).toBeVisible();
  });
  await test.step('Entering data into Search by Quote, Order or Plan Number search bar', async () => {
    await page
      .getByRole('combobox', { name: 'Type in a quote, order, or' })
      .fill('***********');
  });
  // await test.step('Clicking on Search icon tab', async () => {
  //   await page.locator('div.input-group button[title="Search"]').click();
  // });
  await test.step('Validating No Results found text to be visible', async () => {
    await expect(page.getByRole('heading', { name: 'No Results' })).toBeVisible();
  });
});