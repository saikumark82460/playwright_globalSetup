import { test, expect } from '@playwright/test';
import { externalAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { waitForLoadingToComplete } from './utils';
useUser(test, externalAuthKeys);
test('PW-02.001 Verifying the home page functionality  ', async ({ page }) => {
  await test.step('Navigating to the home page', async () => {
    await page.goto('/');
  });
  // Verify AbsLogo:User should be able to "My Metrie" logo on left side top of the page
  await test.step('Verifying banner is visible', async () => {
    await expect(page.locator('header[role="banner"] a')).toBeVisible();
  });
  // "Below tabs / links should be displayed on top of home page Open Quotes,Submitted Quotes ,Configured Favorites
  await test.step('Verifying my quotes is visible', async () => {
    await expect(page.locator('nav li a:has-text("My Quotes")')).toBeVisible();
  });
  await test.step('Verifying my orders is visible', async () => {
    await expect(page.locator('nav li a:has-text("My Orders")')).toBeVisible();
  });
  await test.step('Verifying my favorites is visible', async () => {
    await expect(
      page.locator('nav li a:has-text("My Favorites")')
    ).toBeVisible();
  });
  await test.step('Verifying my customers is visible', async () => {
    await expect(
      page.locator('nav li a:has-text("My Customers")')
    ).toBeVisible();
  });
  await test.step('Verifying my plans is visible', async () => {
    await expect(page.locator('nav li a:has-text("My Plans")')).toBeVisible();
  });
  await test.step('Verifying my views is visible', async () => {
    await expect(page.locator('nav li a:has-text("My Views")')).toBeVisible();
  });
  //Tabs / links are listed and user should be able to click on each tab
  // Click text=My Quotes
  await test.step('Clicking on my quotes', async () => {
    await page.locator('text=My Quotes').click();
  });
  await test.step('Verifying my quotes breadcrumb is visible', async () => {
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Quotes/);
  });
  // Click text=My Quotes
  await test.step('Clicking on my orders and verifying my quotes breadcrumb is visible', async () => {
    await page.locator('text=My Orders').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Orders/);
  });
  // Click text=My Customers
  await test.step('Clicking on my customers and verifying my customers breadcrumb is visible', async () => {
    await page.locator('text=My Customers').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb')).toHaveText(/My Customers/);
  });
  // Click text=My Plans
  await test.step('Clicking on my plans and verifying my plans breadcrumb is visible', async () => {
    await page.locator('text=My Plans').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Plans/);
  });
  // Click text=My Views
  await test.step('Clicking on my views and verifying my views breadcrumb is visible', async () => {
    await page.locator('text=My Views').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(/My Views/);
  });
  // Click text=My Favorites
  await test.step('Clicking on my favorites and verifying my favorites breadcrumb is visible', async () => {
    await page.locator('text=My Favorites').click();
    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb li.active')).toHaveText(
      /My Favorites/
    );
  });
});
test('PW-02.002 Checking buttons functionality', async ({ page }) => {
  await test.step('Navigating to application', async () => {
    await page.goto('/');
  });
  // Click #get-quote-buttons >> text=New Quote
  await expect(page.locator('#get-quote-buttons >> text=New Quote'), {
    message: 'Verifying new quote is visible',
  }).toBeVisible();
  await test.step('Clicking on new quote', async () => {
    await page.locator('#get-quote-buttons >> text=New Quote').click();
  });
  // Click h1:has-text("New Quote")
  await expect(page.locator('h1:has-text("New Quote")'), {
    message: 'Verifying new quote heading text is visible',
  }).toBeVisible();
  // Click header[role="banner"] a
  await test.step('Verifying banner is visible and clicking on the banner', async () => {
    await expect(page.locator('header[role="banner"] a')).toBeVisible();
    await page.locator('header[role="banner"] a').click();
  });
  // Click div#get-quote-buttons a.quick-configure
  await test.step('Verifying quick configure is visible and clicking on quick configure', async () => {
    await expect(
      page.locator('div#get-quote-buttons a.quick-configure')
    ).toBeVisible();
    await page.locator('div#get-quote-buttons a.quick-configure').click();
  });
  await test.step('Verifying select brand is visible', async () => {
    await expect(page.locator('h3:has-text("Select Brand")')).toBeVisible();
  });
  // Click header[role="banner"] a
  await test.step('Verifying banner is visible and clicking on the banner', async () => {
    await expect(page.locator('header[role="banner"] a')).toBeVisible();
    await page.locator('header[role="banner"] a').click();
  });
  // Click text=Buy Hardware Online
  await test.step('Verifying buy hardware online text is visible and clicking on buy hardware online', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
    await page.locator('text=Buy Hardware Online').click();
  });
  await expect(page.locator('.breadcrumb li.active'), {
    message: 'Verifying breadcrumb having line items text',
  }).toHaveText(/Line Items/);
  // Click header[role="banner"] a
  await test.step('Verifying banner is visible and clicking on the banner', async () => {
    await waitForLoadingToComplete(page)
    await expect(page.locator('header[role="banner"] a')).toBeVisible();
    await page.locator('header[role="banner"] a').click();
  });
});
test('PW-02.003 Followed by buttons user should be able to see the below sub-windows', async ({
  page,
}) => {
  await test.step('Navigating to application', async () => {
    await page.goto('/');
  });
  await expect(page.locator('text=My Recent Quotes'), {
    message: 'Verifying my recent quotes is visible',
  }).toBeVisible();
  await expect(page.locator('text=My Recent Orders'), {
    message: 'Verifying my recent orders is visible',
  }).toBeVisible();
  await test.step('Verifying overlay is visible', async () => {
    await expect(
      page.locator('div#content div.loading-overlay >> nth=0')
    ).toBeVisible();
    await expect(
      page.locator('div#content div.loading-overlay >> nth=1')
    ).toBeVisible();
  });
});
test('PW-02.004 User should be able to expand and see the full list of my recent quotes sections in home page', async ({
  page,
}) => {
  await test.step('Navigating to application', async () => {
    await page.goto('/');
  });
  await expect(page.locator('text=My Recent Quotes'), {
    message: 'Verifying my recent quotes is visible',
  }).toBeVisible();
  await expect(page.locator('div#content div.loading-overlay >> nth=0'), {
    message: 'Verifying overlay is visible',
  }).toBeVisible();
  //lc await page.locator('text=View More').first().click();
  await test.step('Clicking on view more and waiting for the page to load', async () => {
    await page.getByRole('link', { name: 'View More' }).first().click();
    await waitForLoadingToComplete(page)
  });
  // await expect(page.locator('.my-quotes-table'), {
  //   message: 'Verifying my quotes table is visible',
  // }).toBeVisible();
  // Modify the quote Table locator
  await expect(page.locator('.quotes--type-quotes'), {
    message: 'Verifying my quotes table is visible',
  }).toBeVisible();
});
test('PW-02.005 User should be able to expand and see the full list of my recent orders sections in home page', async ({
  page,
}) => {
  await test.step('Navigating to application', async () => {
    await page.goto('/');
  });
  await expect(page.locator('text=My Recent Orders'), {
    message: 'Verifying my recent quotes is visible',
  }).toBeVisible();
  await expect(page.locator('div#content div.loading-overlay >> nth=1'), {
    message: 'Verifying overlay is visible',
  }).toBeVisible();
  //lc await page.locator('text=View More').first().click();
  await test.step('Clicking on view more and waiting for the page to load', async () => {
    await page.getByRole('link', { name: 'View More' }).nth(1).click();
    await waitForLoadingToComplete(page)
  });
  // await expect(page.locator('.my-quotes-table'), {
  //   message: 'Verifying my quotes table is visible',
  // }).toBeVisible();
  // Modify the order Table locator
  await expect(page.locator('.quotes--type-orders'), {
    message: 'Verifying my quotes table is visible',
  }).toBeVisible();
});
test('PW-02.006 Verify new quote button on home page', async ({ page }) => {
  await test.step('Navigating to the application', async () => {
    await page.goto('/');
  });
  // LC await expect(page.locator('.btn >>.fa >> nth=0')).toBeVisible();
  // Changed the New Quote Button Locator
  await expect(page.locator('[data-qa="shortcutsNavBar__newQuote"]'),
    { message: 'Verifying new quote navigation bar is visible' }
  ).toBeVisible()
  // await expect(
  //   page.locator('a[id="secondary_navbar__newQuote"] span.fa-solid'),
  //   { message: 'Verifying new quote navigation bar is visible' }
  // ).toBeVisible();
  //LC await expect(page.locator('text=New Quote >> nth=0')).toBeVisible();
  await test.step('Clicking on new quote', async () => {
    // await page.getByRole('link', { name: 'New Quote' }).first().click();
    await page.locator('[data-qa="shortcutsNavBar__newQuote"]').click();
  });
});
// TODO launch with sku and design id
test('PW-02.007 Verify Note message', async ({ page }) => {
  await test.step('Navigating to the application and waiting for the page to load', async () => {
    await page.goto('/');
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
  });
  // Click text=New Quote >> nth=0
  await test.step('Clicking on new quote and waiting for the page to load', async () => {
    await page.locator('text=New Quote').nth(1).click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
  });
  // flow change
  // Click input[name="QuoteName"]
  // await test.step('Clicking on quote name', async () => {
  //   await page.locator('input[name="QuoteName"]').click();
  // });
  // const date = new Date();
  // // Fill input[name="QuoteName"]
  // await test.step('Filling the quote name in the input field', async () => {
  //   await page
  //     .locator('input[name="QuoteName"]')
  //     .fill(`new quote ${date.getMinutes()}`);
  // });
  // // Click input[name="ProjectName"]
  // await page.locator('input[name="ProjectName"]').click();
  // Fill input[name="ProjectName"]
  // await page.locator('input[name="ProjectName"]').fill(`new quote ${date.getMilliseconds()}`);
  // await test.step('Clciking on the dropdown and waiting for the page to load', async () => {
  //   await page.locator('.wts-react-select__input-container').click();

  //   awaitwaitForLoadingToComplete(page)  // });
  // Fill input[name="ProjectName"]

  // await page.locator('input[name="ProjectName"]').fill(`test project name ${date.getMilliseconds()}`);

  // await page

  //   .locator("#react-select-2-input")

  //   .fill(`test project name ${date.getMilliseconds()}`);

  // await test.step('Filling text in the dropdown', async () => {
  //   await page
  //     .locator('#react-select-2-input')
  //     .fill(`test${date.getMinutes()}`);
  // });

  // await expect(page.locator('#react-select-2-option-0'), {
  //   message: 'Veriyfing the first dropdown element to be visible',
  // }).toBeVisible();

  // await test.step('Clicking on the first element in the dropdown', async () => {
  //   await page.locator('#react-select-2-option-0').click();
  // });
  // await test.step('Clicking on Project name Field', async () => {
  //   awaitwaitForLoadingToComplete(page)  //   await expect(page.locator('input[id="projectName"]')).toBeVisible();
  //   await expect(
  //     page.locator('button[id="searchProjectButton"]')
  //   ).toBeVisible();
  //   await page.locator('button[id="searchProjectButton"]').click();
  //   awaitwaitForLoadingToComplete(page)  //   await expect(
  //     page.getByPlaceholder('Search projects by name')
  //   ).toBeVisible();
  //   await page.getByPlaceholder('Search projects by name').click();
  //   await page.getByPlaceholder('Search projects by name').fill('test');
  //   awaitwaitForLoadingToComplete(page)  //   await page.locator("input[type='radio']").first().click();
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Selecting a client', async () => {
  //   await page.getByRole('button', { name: 'Select a client' }).click();
  //   await expect(
  //     page.getByPlaceholder('Search by client name or number')
  //   ).toBeVisible();
  //   await page.locator('td input').first().click();
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Clicking on create', async () => {
  //   await page.getByRole('button', { name: 'Create' }).click();
  // });
  // await page.waitForSelector("#spinner", { state: "hidden", timeout: 10000 });
  //  Click text=Notes
  // await page.locator('text=Notes').click();
  // await test.step('Clicking on close button', async () => {
  //   await page.getByRole('button', { name: 'actions.close' }).click();
  // });
  await test.step('Clicking on notes tab', async () => {
    await page.getByRole('tab', { name: 'Notes' }).click();
  }); // Click a:has-text("Order Notes:")
  //getByText('NOTE: All Orders will ship') --- I added
  // await expect(page.getByText('NOTE: All Orders will ship'), {
  //   message: 'Verifying all orders will ship text is visible',
  // }).toBeVisible();
  await test.step('Clicking on order notes text', async () => {
    // await page.locator('a:has-text("Order Notes:")').click();
    await page.getByRole('button', { name: 'Add' }).first().click();
  });
  // Click textarea
  await test.step('Clicking on text area ', async () => {
    await page.locator('textarea').nth(0).click();
  });
  // Fill textarea
  await test.step('Filling the order received text in the text area', async () => {
    await page.locator('textarea').nth(0).fill('order received');
  });
  // Click text=Save
  await test.step('Clicking on save and waiting for the page to load', async () => {
    await page.locator('text=Save').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
  });
  // Click a:has-text("Delivery Notes:")
  await expect(page.locator('div h5:has-text("Delivery Notes:")'), {
    message: 'Verifying delivery notes text is visible',
  }).toBeVisible();
  await test.step('Clicking on delivery notes', async () => {
    // await page.locator('a:has-text("Delivery Notes:")').click();
    await page.getByRole('button', { name: 'Add' }).nth(1).click();
  });
  // Click textarea
  await test.step('Clicking on text area and filling the text in the text areas', async () => {
    await page.locator('textarea').nth(1).click();
    // Fill textarea
    await page.locator('textarea').nth(1).fill('delivery will start soon.');
  });
  // Click text=Save
  await test.step('Clciking on save and waiting for the page to load', async () => {
    await page.locator('role=button[name="Save"]').click();
    await waitForLoadingToComplete(page)
  });
  // Click text=Delivery Notes:
  // await expect(page.locator('text=Delivery Notes:')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Delivery Notes:' }), {
    message: 'Verifying delivery notes text is visible',
  }).toBeVisible();

  // Click text=delivery will start soon.
  await expect(page.locator('text=delivery will start soon.'), {
    message: 'Verifying delivery will start soon text is visible',
  }).toBeVisible();
  // Click text=Order Notes:
  await expect(await page.getByRole('heading', { name: 'Order Notes:' }), {
    message: 'Verifying order notes heading is visible',
  }).toBeVisible();
  // Click text=order received
  await expect(page.locator('text=order received'), {
    message: 'Verifying order received text is visible',
  }).toBeVisible();
});
test('PW-02.008 verify Search Option', async ({ page }) => {
  await test.step('Navigating to application', async () => {
    await page.goto('/');
  });
  // Modify the Search Button Locator
  await test.step('Verifying search button is viisble and clicking on search button', async () => {
    // await expect(page.locator('button[title="Search"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search Ctrl+K' })).toBeVisible();
    await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
  });
  // Modify the Placeholder Locator
  await expect(page.getByRole('combobox', { name: 'Type in a quote, order, or' })).toBeVisible();
  // await expect(page.getByPlaceholder('Search by Quote, Order or Plan Number'), {
  //   message: 'Verifying search by quote placeholder is visible',
  // }).toBeVisible();

  // await expect(
  //   page
  //     .locator('form:has-text("Advanced")')
  //     .getByRole('button', { name: 'Search' }),
  //   { message: 'Verifying advanced search button is visible' }
  // ).toBeVisible();
  // Modify the Advance Search Button Locator
  await expect(page.getByRole('link', { name: 'Advanced Search' })).toBeVisible();
  // await expect(page.locator('.breadcrumb li.active')).toHaveText(/Advanced Search/)
});
test('PW-02.009 Verify log out, settings and preferences', async ({ page }) => {
  await test.step('Naviagting to the application', async () => {
    await page.goto('/');
  });
  await test.step('Clicking on dropdown', async () => {
    await page.locator('a.dropdown-toggle').first().click();
  });
  await expect(page.locator('ul.dropdown-menu'), {
    message: 'Verifying dropdown menu is visible',
  }).toBeVisible();
  await expect(page.getByRole('link', { name: 'General Settings' }), {
    message: 'Verifying general settings is visible',
  }).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pricing Preferences' }), {
    message: 'Verifying pricing preferences is visible',
  }).toBeVisible();
  await expect(page.getByRole('link', { name: 'Paperwork Headers' }), {
    message: 'Verifying paperwork headers is visible',
  }).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' }), {
    message: 'Verifying logout is visible',
  }).toBeVisible();

  // await expect(page.locator("ul.dropdown-menu a:has-text('General Settings')")).toBeVisible()
  // await expect(page.locator("ul.dropdown-menu a:has-text('Pricing Preferences')")).toBeVisible()
  // await expect(page.locator("ul.dropdown-menu a:has-text('Paperwork Headers')")).toBeVisible()
  // await expect(page.locator("ul.dropdown-menu a:has-text('Log out')")).toBeVisible()
});
test('PW-02.010 Verify other features for home page', async ({ page }) => {
  await page.goto('/');
  // Click a > div >> nth=0
  const [absWebsite] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a > div').first().click(),
  ]);
  // Click text=The ABS Story
  await expect(absWebsite, {
    message: 'Verifying the url having abs',
  }).toHaveURL(/abs/);
});
test('PW-02.011 Verify other features for hardware prices', async ({
  page,
}) => {
  await test.step('Navigating to the application', async () => {
    await page.goto('/');
  });
  // Click a > div >> nth=0
  const [hardwarePrices] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('div:nth-child(2) > a').click(),
  ]);
  // Click text=The ABS Story
  await expect(hardwarePrices, {
    message: 'Veriyfing the url having hardware ',
  }).toHaveURL(/hardware/);
});
test('PW-02.012 Verify PO Number', async ({ page }) => {
  await page.goto('/');
  // Click a > div >> nth=0
  const [poNumber] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('.homepage-grid-configurable > div:nth-child(3) > a').click(),
  ]);
  // Click text=The ABS Story
  await expect(poNumber.locator('input[name="po"]'), {
    message: 'Verifying input number po is visible',
  }).toBeVisible();
});

// test('TC-13 Verify dorrs section', async ({ page }) => {
//   await page.goto('/');
//   // Click a > div >> nth=0
//   const [dDorrs] = await Promise.all([
//     page.waitForEvent('popup'),
//     page.locator('div:nth-child(4) > a').click(),
//   ]);
//   // Click text=The ABS Story
//   await expect(
//     dDorrs.locator('text=Commercial and Residential Doors')
//   ).toBeVisible();
// });
test('PW-02.013 verify hardware section', async ({ page }) => {
  await page.goto('/');
  // Click a > div >> nth=0
  const [dHardware] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('div:nth-child(6) > a').click(),
  ]);
  // Click text=The ABS Story
  await expect(dHardware.locator('text=CommercialDoor Hardware'), {
    message: 'Verifying commercial door hardware is visible',
  }).toBeVisible();
});
test('PW-02.014 verify talon help section', async ({ page }) => {
  await page.goto('/');
  // Click a > div >> nth=0
  const [tHelp] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('div:nth-child(7) > a').click(),
  ]);
  // Click text=The ABS Story

  await expect(tHelp.locator('text=Talon Help'), {
    message: 'Verifying talon help is visible',
  }).toBeVisible();
});
test('PW-02.015 Verify user agreement', async ({ page }) => {
  await page.goto('/');

  const [userAgreementPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('text=End User Agreement & Privacy Policy').click(),
  ]);
  await userAgreementPage.waitForLoadState();
  // console.log(await userAgreementPage.title());
  await expect(
    userAgreementPage.locator(
      'text=Software as a Service (SaaS) End User Agreement'
    ),
    { message: 'Verifying end user aggrement is visible' }
  ).toBeVisible();
});