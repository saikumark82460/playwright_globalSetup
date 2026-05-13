import { test, expect } from '@playwright/test';
export async function userAgreementPage(page) {
  await test.step('Verifying end user agreement is visible', async () => {
    await expect(
      page.locator('text=End User Agreement & Privacy Policy')
    ).toBeVisible();
    await expect(
      page.locator('footer a:has-text("End User Agreement & Privacy Policy")')
    ).toBeVisible();
  });

  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .getByRole('link', { name: 'End User Agreement & Privacy Policy' })
      .click(),
  ]);
  await waitForLoadingToComplete(page1)
  await expect(
    page1.locator('text=Software as a Service (SaaS) End User Agreement')
  ).toBeVisible();
}
export async function createNewQuoteForInternalUser(page) {
  const date = new Date();
  await test.step('Clicking on new quote', async () => {
    await waitForLoadingToComplete(page)
    await page.getByRole('link', { name: 'New Quote' }).first().click();
  });
  await test.step('Clicking on quote name and filling the text in the quote name', async () => {
    await waitForLoadingToComplete(page)
    await page.getByLabel('Quote Name').click();
    await page.getByLabel('Quote Name').fill('test');
  });
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
  // await page.locator('div.well.form-group button.wts-button').click();
  // await page.getByRole('button', { name: 'Select a client' }).click({
  //   button: 'right'
  // });
  await test.step("Selecting the ' Select a dealer ' tab", async () => {
    await page.locator('button:has-text("Select a client")').click();
  });

  await test.step('Wating for timeout', async () => {
    await waitForLoadingToComplete(page)
  });
  await test.step('selecting the first client', async () => {
    await page.locator('input[name="client"]').first().click();
  });
  await test.step('Clicking on submit and waiting for the page to load', async () => {
    await page.locator('button[type="submit"]').click();

    await page.waitForSelector(
      '#spinner',
      { state: 'hidden' },
      { timeout: 5000 }
    );
  });
  // Click text=Line Items
  await test.step('Clicking on line items and waiting for the page to load', async () => {
    await page.locator('text=Line Items').click();
    await waitForLoadingToComplete(page)
    // Click a:has-text("New Line Item")
    await page.waitForSelector(
      'a:has-text("New Line Item")',
      { state: 'visible' },
      { timeout: 5000 }
    );
  });
  await test.step('Clicking on new line item and waiting for the page to load', async () => {
    await waitForLoadingToComplete(page)
    await page.locator('a:has-text("New Line Item")').click();
    await waitForLoadingToComplete(page)
    // Click text=Exterior
    await page.waitForSelector(
      'text=Exterior',
      { state: 'visible' },
      { timeout: 5000 }
    );
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on exterior and waiting for the page to load', async () => {
    await page.locator('text=Exterior').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await page.locator('#react-select-2-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('div.wts-react-select__control >> nth=1').click();
    await waitForLoadingToComplete(page)
    await page.locator('#react-select-3-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on configurationand dimensions', async () => {
    // await page.getByRole('button', { name: 'Configuration & Dimensions' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await page.locator('#react-select-5-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the 2/0 element', async () => {
    await page
      .locator(
        '#question-id-1a23b598-e8f9-4cba-9351-075e5d51532a > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
      )
      .click();
    await page.locator('#react-select-6-option-0').getByText('2/0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the 6/8 element', async () => {
    await page
      .locator(
        '#question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
      )
      .click();
    await page.locator('#react-select-7-option-0').getByText('6/8').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on door model options and waiting for the page to load', async () => {
    // await page.getByRole('button', { name: 'Door Model Options' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await waitForLoadingToComplete(page)
    await page
      .locator('#react-select-8-option-0')
      .getByText('No Cutout')
      .click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on accessories and door and waiting for the page to laod', async () => {
    // await page.getByRole('button', { name: 'Accessories & Door Prep' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the prehanging options', async () => {
    // await page.getByRole('button', { name: 'Prehanging Options' }).click();
    await page.locator('#nextStep').click();
    await page.waitForSelector(
      '#spinner',
      { state: 'hidden' },
      { timeout: 5000 }
    );
    await waitForLoadingToComplete(page)
  });

  // await page.locator('.wts-react-select__input-container').first().click();
  await test.step('Clicking on the dropdown and selecting no door bottom', async () => {
    await page
      .locator(
        'div[data-pdm-question-text="Door Bottom"] .wts-react-select-container'
      )
      .click();
    await page.locator('text="No Door Bottom"').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on order confirmation', async () => {
    // await page.getByRole('button', { name: 'Order Confirmation' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the dropdown and waiting for the page to load', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the height is correct', async () => {
    await page.locator('text="Yes, Height is correct"').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on add to quote', async () => {
    await page.getByRole('button', { name: 'Add to Quote' }).click();
  });
}

export async function createLineItemForMyPlans(page) {
  // Click text=New Quote >> nth=0
  const date = new Date();
  // Click text=Line Items
  await test.step('Clicking on line items', async () => {
    await page.locator('text=Line Items').click();
    await waitForLoadingToComplete(page)
  });
  // Click a:has-text("New Line Item")
  await test.step('Clicking on new line item', async () => {
    await page.locator('a:has-text("New Line Item")').click();
    await waitForLoadingToComplete(page)
  });
  // Click text=Exterior
  await test.step('Clicking on exterior and waiting for the page to load', async () => {
    await page.locator('text=Exterior').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await page.locator('#react-select-2-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clikcing on the dropdown and selecting the first element', async () => {
    await page.locator('div.wts-react-select__control >> nth=1').click();
    await page.locator('#react-select-3-option-0').click();
  });
  await test.step('Clicking on configuration and dimensions', async () => {
    await page
      .getByRole('button', { name: 'Configuration & Dimensions' })
      .click();

    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await page.locator('#react-select-5-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the 2/0 element', async () => {
    await page
      .locator(
        '#question-id-1a23b598-e8f9-4cba-9351-075e5d51532a > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
      )
      .click();
    await page.locator('#react-select-6-option-0').getByText('2/0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the 6/8 element', async () => {
    await page
      .locator(
        '#question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
      )
      .click();
    await page.locator('#react-select-7-option-0').getByText('6/8').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on door model options', async () => {
    await page.getByRole('button', { name: 'Door Model Options' }).click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the dropdown and selecting the no cut out element', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await waitForLoadingToComplete(page)
    await page
      .locator('#react-select-8-option-0')
      .getByText('No Cutout')
      .click();
    await waitForLoadingToComplete(page)
  });
  {
    /**
  await waitForLoadingToComplete(page)  await page.locator('div[data-pdm-question-text="Door Glass Style"] .wts-react-select__value-container').click();
  await page.getByText('Not Applicable').nth(1).click();
  await page.locator('div[data-pdm-question-text="Door Cutout Size"] .wts-react-select__value-container').click();
  await page.getByText('Not Applicable').nth(2).click();
  await page.locator('div[data-pdm-question-text="Door Skin Type"] .wts-react-select__value-container').click();
  await page.getByText('JELD-WEN Smooth-Pro (TM)').nth(1).click();
  await page.locator('div[data-pdm-question-text="Series"] .wts-react-select__value-container').click();
  await page.getByText('Open').nth(1).click();
  // await page.locator('.wts-react-select__input-container').first().click();
  // await page.getByText('Product Selection Configuration & Dimensions Door Model Options Accessories & Do').click();
  await page.locator('div[data-pdm-question-text="Door Panel Configuration"] .wts-react-select__value-container').click();
  await page.getByText('1 Panel').nth(1).click();
  await page.locator('div[data-pdm-question-text="Door Grid Pattern"] .wts-react-select__value-container').click();
  await page.getByText('Not Applicable').nth(3).click();
  await page.locator('div[data-pdm-question-text="Door Glass Option"] .wts-react-select__value-container').click();
  await page.getByText('Not Applicable').nth(4).click();
  await page.locator('div[data-pdm-question-text="Door Caming"] .wts-react-select__value-container').click();
  await page.getByText('None').nth(1).click();
   */
  }
  await test.step('Clicking on accessories and prep and waiting for the page to load', async () => {
    await page.getByRole('button', { name: 'Accessories & Door Prep' }).click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on prehanging options', async () => {
    await page.getByRole('button', { name: 'Prehanging Options' }).click();
    await waitForLoadingToComplete(page)
  });

  // await page.locator('.wts-react-select__input-container').first().click();
  await test.step('Clicking on the dropdown and selecting no door bottom', async () => {
    await page
      .locator(
        'div[data-pdm-question-text="Door Bottom"] .wts-react-select-container'
      )
      .click();
    await page.locator('text="No Door Bottom"').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on order confirmation', async () => {
    await page.getByRole('button', { name: 'Order Confirmation' }).click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the dropdown and waiting for the page to load', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on height is correct and waiting for the page to load', async () => {
    await page.locator('text="Yes, Height is correct"').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the add to quote', async () => {
    await page.getByRole('button', { name: 'Add to Quote' }).click();
  });
}
export async function newCustomer(page) {
  // Adding Customer Start
  const date = new Date();

  // Click text=New Customer
  await test.step('Clicking on the new customer', async () => {
    await page.getByRole('link', { name: 'New Customer' }).click();
  });
  await expect(page.locator('input[name="Name"]'), {
    message: 'Verifying input name is visible',
  }).toBeVisible();
  // Click input[name="Name"]
  await test.step('Clicking on the input name and filling the text in the input field', async () => {
    await page.locator('input[name="Name"]').click();
    // Fill input[name="Name"]
    await page.locator('input[name="Name"]').fill(`Test ${date.getSeconds()}`);
  });
  // Click input[name="Email"]
  await test.step('Clicking on the input email and filling the mail in the input field', async () => {
    await page.locator('input[name="Email"]').click();
    // Fill input[name="Email"]
    await page.locator('input[name="Email"]').fill('test@gmail.com');
  });
  // Click input[name="IntegrationId"]
  await test.step('Clicking on the integration id and filling the text in the input field', async () => {
    await page.locator('input[name="IntegrationId"]').click();
    // Fill input[name="IntegrationId"]
    await page
      .locator('input[name="IntegrationId"]')
      .fill(`${date.getMilliseconds()}`);
  });
  await expect(page.locator('text=Cancel'), {
    message: 'Verifying cancel is visible',
  }).toBeVisible();
  // await expect(page.locator('button:has-text("Create")')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' }), {
    message: 'Verifying the save button is visible',
  }).toBeVisible();

  // Click button:has-text("Create")
  // await page.locator('button:has-text("Save")').click();
  // // Click text=Edit >> nth=0
  // await expect(page.locator('text=Edit').first()).toBeVisible();
  // await page.locator('text=Edit').first().click();
  // // Click input[name="Name"]
  // await page.locator('input[name="Name"]').click();
  // // Fill input[name="Name"]
  // await page
  //   .locator('input[name="Name"]')
  //   .fill(`Name ${date.getMilliseconds()}`);
  // // Click input[name="Line1"]
  // await page.locator('input[name="Line1"]').click();
  // Fill input[name="Line1"]
  // await page.locator('input[name="Line1"]').fill(`ABC ${date.getHours()}`);
  // // Click input[name="Line2"]
  // await page.locator('input[name="Line2"]').click();
  // // Fill input[name="Line2"]
  // await page.locator('input[name="Line2"]').fill(`KLM ${date.getMinutes()}`);
  // // Click text=Save
  // await page.locator('text=Save').click();
  // // Click text=Edit >> nth=1
  // await expect(page.locator('text=Edit').nth(1)).toBeVisible();
  // await page.locator('text=Edit').nth(1).click();
  // // Click input[name="Name"]
  // await page.locator('input[name="Name"]').click();
  // Fill input[name="Name"]
  // await page
  //   .locator('input[name="Name"]')
}
export async function searchByQuoteNumber(page) {
  await expect(page.getByRole('button', { name: 'Search Ctrl+K' })).toBeVisible();

  let quoteNumber = page.locator('#quote-title').innerText();
  let quote = (await quoteNumber).replace('Quote', '').replace(/\s/g, '');

  await test.step('Clicking on the placeholder and filling the quote in the placeholder', async () => {
    await test.step('Clicking on the search button', async () => {
      await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
    });
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).fill(quote)
  });
  //LC await page.locator('input:has-text("Search")').click();
  await test.step('Clicking on search button', async () => {
    await page.getByRole('link', { name: 'Details' }).click();
  });
  await expect(page.locator('ol.breadcrumb li.active'), {
    message: 'Verifying the breadcrumb is active',
  }).toHaveText(`Quote ${quote}`);

  await expect(page.getByText('Owner'), {
    message: 'Verifying the owner text is visible',
  }).toBeVisible();
  await expect(page.getByText('Created'), {
    message: 'Verifying created text is visible',
  }).toBeVisible();
  await expect(page.getByText('Client'), {
    message: 'Verifying client text is visible',
  }).toBeVisible();

  //Lc await page.locator('ul[role="search"] a').click();
  await test.step('Clikcing on search button', async () => {
    await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
  });

  // Fill [placeholder="My Quote\, Order\, Plan Number"]
  await test.step('Filling the text in the placeholder', async () => {
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).fill('invalide 1233 quote');
  });
  await expect(
    page.getByRole('heading', { name: 'No Results' })
  ).toBeVisible();
  await test.step('Clikcing on the advanced search', async () => {
    await page.getByRole('link', { name: 'Advanced Search' }).click();
  });

  await test.step('Clicking on close button', async () => {
    await page.getByRole('button', { name: 'Cancel' }).click();
  });
}
export async function editQuoteDetails(page) {
  const date = new Date();
  const prevDay = date.getDate() - 1;
  const nextDay = date.getDate() + 1;
  const currentMonth = date.getMonth();
  // const day = date.getDate();
  await test.step('Clicking on quote tabs details', async () => {
    await page.locator('li#quote-tabs_details').click();
  });
  await test.step('Clicking on the edit button', async () => {
    await page.getByRole('button', { name: 'Edit' }).first().click();
  });
  await test.step('Clicking on po number anf filling the text in po number', async () => {
    await page.locator('input#ponumber').click();
    await page.locator('input#ponumber').fill(`test${date.getMilliseconds()}`);
  });
  await test.step('Clicking on internal abs contact and filling the text in the internal abs contact', async () => {
    await page.getByLabel('Internal ABS Contact').click();
    await page
      .getByLabel('Internal ABS Contact')
      .fill(`${date.getMilliseconds()}`);
  });
  await test.step('clicking on job contact and filling the text in the input field', async () => {
    await page.getByLabel('Job Contact Name/Number').click();
    await page
      .getByLabel('Job Contact Name/Number')
      .fill(`test${date.getMilliseconds()}`);
  });
  await page.getByRole('combobox', { name: 'Sales Rep' }).selectOption('0');
  await test.step('Clicking on date the placeholder ', async () => {
    await page.getByPlaceholder('mm/dd/yyyy').first().click();
  });
  await test.step('Clicking on the cell', async () => {
    // await page.getByRole('cell', { name: `${date.getDate() - 1}` }).click();
    await page
      .locator(`td.rdtDay[data-value="${prevDay}"][data-month="${currentMonth}"]:not(.rdtDisabled)`)
      .first()
      .click();
    // await page.locator('td:not(.rdtDisabled)', { hasText: `${date.getDate() - 1}` }).click();
  });
  await test.step('Clicking on the date placeholder and clicking on the cell', async () => {
    await page.getByPlaceholder('mm/dd/yyyy').nth(1).click();
    // await page.getByRole('cell', { name:`${date.getDate()+1}` }).click();
    // await page.locator('td:not(.rdtDisabled)', { hasText: `${date.getDate() + 1}` }).click();
    const shipDate = await page
      .locator(`td.rdtDay[data-value="${nextDay}"][data-month="${currentMonth}"]`).nth(1)
    // await nextday.waitFor({ state: 'visible', timeout: 5000 });
    await shipDate.click();
  });
  await test.step('Clicking on the date placeholder and clicking on the cell', async () => {
    await page.getByPlaceholder('mm/dd/yyyy').nth(2).click();
    // await page.getByRole('cell', { name:`${date.getDate()+1}` }).click();
    // await page.locator('td:not(.rdtDisabled)', { hasText: `${date.getDate() + 1}` }).click();
    // await page
    //   .locator(`td.rdtDay[data-value="${nextDay}"][data-month="${currentMonth}"]:not(.rdtDisabled)`)
    //   .first()
    //   .click();
    const interiorDeliveryDate = await page
      .locator(`td.rdtDay[data-value="${nextDay}"][data-month="${currentMonth}"]`).nth(2)
    // await nextday.waitFor({ state: 'visible', timeout: 5000 });
    await interiorDeliveryDate.click();

  });
  await page.getByPlaceholder('mm/dd/yyyy').nth(3).click();
  const hardwareDeliveryDate = await page
    .locator(`td.rdtDay[data-value="${nextDay}"][data-month="${currentMonth}"]`).nth(3)
  // await nextday.waitFor({ state: 'visible', timeout: 5000 });
  await hardwareDeliveryDate.click();
  await test.step('Clicking on order comment and filling the text in the order comment', async () => {
    await page.getByLabel('Order Comment').click();
    await page.getByLabel('Order Comment').fill('test');
  });
  await test.step('Clicking on the interior/exterior invoice number and filling the text in the input field', async () => {
    await page.getByLabel('Interior/Exterior Invoice Number').click();
    await page
      .getByLabel('Interior/Exterior Invoice Number')
      .fill(`${date.getMilliseconds()}`);
  });
  await test.step('Clicking on the ', async () => {
    await page.getByLabel('Hardware Invoice Number').click();
    await page
      .getByLabel('Hardware Invoice Number')
      .fill(`${date.getMilliseconds()}`);
  });
  await waitForLoadingToComplete(page)
  await page.getByRole('combobox', { name: 'Warehouse' }).click()
  await test.step('selecting the first option', async () => {
    await page.getByRole('combobox', { name: 'Reason' }).selectOption('1');
  });
  await test.step('Selecting the first option from department', async () => {
    await page.getByRole('combobox', { name: 'Department' }).selectOption('1');
  });
  await test.step('Selecting the first option from inside sales person', async () => {
    await page
      .getByRole('combobox', { name: 'Inside Salesperson' })
      .selectOption('0');
  });
  await test.step('Clicking on save button', async () => {
    await page.getByRole('button', { name: 'Save' }).click();
  });
  page.once('dialog', (dialog) => {
    // console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await test.step('Clicking on submit order and verifying the ordered text is visible', async () => {
    await page.getByRole('button', { name: 'Submit Order' }).click();
    await expect(page.locator('div.alert-success')).toHaveText(/ordered/);
  });
}
export async function intialHomePageVerifications(page) {
  expect(await page.title()).toBe('TALON: American Building Supply');
  await expect(page.locator('li:has-text("My Quotes")'), {
    message: 'Verifying my quotes is visible',
  }).toBeVisible();
  await test.step('Clicking on my quotes', async () => {
    await page.locator('text=My Quotes').click();
  });
  await expect(page.locator('ol.breadcrumb li.active'), {
    message: 'Verifying my quotes breadcrumb is visible',
  }).toHaveText(/My Quotes/);
  await expect(page.locator('li:has-text("My Orders")'), {
    message: 'Verifying my orders text is visible',
  }).toBeVisible();
  // Click li:has-text("My Orders")
  await test.step('Clicking on my orders and verifying breadcrumb having my orders text', async () => {
    await page.locator('li:has-text("My Orders")').click();
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Orders/
    );
  });

  await expect(page.locator('li:has-text("My Views")'), {
    message: 'Verifying my views text is visible',
  }).toBeVisible();
  // Click li:has-text("My Views")
  await test.step('Clicking on my views and verifying breadcrumb having my views text', async () => {
    await page.locator('li:has-text("My Views")').click();
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Views/
    );
  });

  await expect(page.locator('li:has-text("My Customers")'), {
    message: 'Verifying my customers is visible',
  }).toBeVisible();
  // Click li:has-text("My Customers")
  await test.step('Clicking on my customers and verifying customers breadcrumb is active', async () => {
    await page.locator('li:has-text("My Customers")').click();
    await expect(page.locator('li.breadcrumb-item.active span')).toBeVisible();
  });

  await expect(page.locator('li:has-text("My Plans")'), {
    message: 'Verifying my plans is visible',
  }).toBeVisible();
  // Click li:has-text("My Plans")
  await test.step('Clicking on my plans and verifying the breadcrumb having my plans text', async () => {
    await page.locator('li:has-text("My Plans")').click();
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Plans/
    );
  });

  await expect(page.locator('li:has-text("My Favorites")'), {
    message: 'Verifyign my favorites text is visible',
  }).toBeVisible();
  // Click li:has-text("My Favorites")
  await test.step('Clicking on my favorites and verifying the breadcrumb having my favorites text', async () => {
    await page.locator('li:has-text("My Favorites")').click();
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Favorites/
    );
  });

  // Click header[role="banner"] a
  await test.step('Clicking on the banner', async () => {
    await page.locator('header[role="banner"] a').click();
  });

  await expect(page.locator('#get-quote-buttons >> text=New Quote '), {
    message: 'Veriyfing new quote is visible',
  }).toBeVisible();
  // Click #get-quote-buttons >> text=New Quote
  await test.step('Clicking on new quote and verifying the breadcrumb having new quote text', async () => {
    await page.locator('#get-quote-buttons >> text=New Quote').click();
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /New Quote/
    );
  });
  // Click header[role="banner"] a
  await test.step('Clicking on banner', async () => {
    await page.locator('header[role="banner"] a').click();
  });
  await expect(page.locator('div#get-quote-buttons a.quick-configure'), {
    message: 'Verifying quick configure is visible',
  }).toBeVisible();
  // Click div#get-quote-buttons a.quick-configure
  await test.step('Clicking on quick configure and veriyfing the active breadcrumb having create line text', async () => {
    await page.locator('div#get-quote-buttons a.quick-configure').click();
    await waitForLoadingToComplete(page)
    await expect(page.locator('li.breadcrumb-item >> a').nth(3)).toHaveText(/Line Items/);
  });
  // Click header[role="banner"] a
  await test.step('Clicking on the banner', async () => {
    await page.locator('header[role="banner"] a').click();
  });

  await expect(page.locator('text=Buy Hardware Online'), {
    message: 'Verifying buy hardware online is visible',
  }).toBeVisible();
  // Click text=Buy Hardware Online
  await test.step('Clicking on buy hardware online', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await expect(page.locator('ol.breadcrumb li.active'), {
    message: 'Veriyfing the breadcrumb having line items text',
  }).toHaveText(/Line Items/);
}

export async function waitForLoadingToComplete(page) {
  const loader = 'div.spin-icon svg';

  // Wait briefly to see if loader appears
  const appeared = await page
  .waitForSelector(loader, { state: 'visible', timeout: 3000 })
  .then(() => true)
  .catch(() => false);

  // Only wait for disappearance if it actually showed up
  if (appeared) {
    await page.waitForSelector(loader, {
    state: 'hidden',
    timeout: 30000,
    });
  }
}