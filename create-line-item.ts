import { test, expect } from '@playwright/test';
import { waitForLoadingToComplete } from './utils';

export async function createLineItem(page) {
  // Click text=New Quote >> nth=0
  const date = new Date();
  let quoteNumber;
  await test.step('Clicking on new quote and waiting for the page to load', async () => {
    await page.locator('text=New Quote').nth(1).click();
    await page.waitForSelector(
      '#spinner',
      { state: 'hidden' },
      { timeout: 5000 }
    );
  });
  // Flow change
  // Click input[name="QuoteName"]
  await test.step('Clicking on quote name and waiting for the page to load', async () => {
    await page.locator('input[name="QuoteName"]').click();
    await waitForLoadingToComplete(page)
  });
  // Fill input[name="QuoteName"]
  await test.step('Filling the text in the input field', async () => {
    await page
      .locator('input[name="QuoteName"]')
      .fill(`test quote ${date.getMinutes()}`);
    await waitForLoadingToComplete(page)
  });
  // Click input[name="ProjectName"]
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
  await test.step('Clicking on create and waiting for the page to load', async () => {
    await page.getByRole('button', { name: 'Create' }).click();
    await waitForLoadingToComplete(page);
    setTimeout(() => {}, 2000);
    quoteNumber = await page.locator('#quote-title').innerText();
    quoteNumber = quoteNumber.replace('Quote', '').replace(/\s/g, '');
  });

  // Click text=Line Items
  await test.step('Clicking on line items and waiting for the page to load', async () => {
    await waitForLoadingToComplete(page)
    await page.locator('text=Line Items').click();
  })
  // Click a:has-text("New Line Item")
  await test.step('Waiting for the new line item visibility', async () => {
    await page.waitForSelector(
      'a:has-text("New Line Item")',
      { state: 'visible' },
      { timeout: 5000 }
    );
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on new line item and waiting for the page to load', async () => {
    await page.locator('a[data-qa="cs_new-line-button"]').click();
    await waitForLoadingToComplete(page)
    // await page.waitForSelector(
    //   '#spinner',
    //   { state: 'hidden' },
    //   { timeout: 5000 }
    // );
  });
  await page.waitForLoadState('load');
  await waitForLoadingToComplete(page)
  await test.step('Clicking on exterior and waiting for the page to load', async () => {
    await page.locator('text=Exterior').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element in the dropdown', async () => {
    await waitForLoadingToComplete(page)
    await page.locator('.wts-react-select__input-container').click();
    await waitForLoadingToComplete(page)
    await page.locator('#react-select-2-option-0').click();
    await page.waitForSelector(
      '#spinner',
      { state: 'hidden' },
      { timeout: 5000 }
    );
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element in the dropdown', async () => {
    await page.locator('div.wts-react-select__control >> nth=1').click();
    await waitForLoadingToComplete(page)
    await page.locator('#react-select-3-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on configuration and dimensions and waiting for the page to load', async () => {
    // await page
    //   .getByRole('button', { name: 'Configuration & Dimensions' })
    //   .click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element from dropdown', async () => {
    await waitForLoadingToComplete(page)
    await page.locator('.wts-react-select__input-container').first().click();
    await waitForLoadingToComplete(page)
    await page.locator('#react-select-5-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting 2/0 element', async () => {
    await page
      .locator(
        '#question-id-1a23b598-e8f9-4cba-9351-075e5d51532a > .wts-react-select__control > .wts-react-select__value-container > .wts-react-select__input-container'
      )
      .click();
    await waitForLoadingToComplete(page)
    await page.locator('#react-select-6-option-0').getByText('2/0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on dropdown and selecting 6/8 element', async () => {
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
  await test.step('Clicking on the dropdown and selecting no cutout element', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await waitForLoadingToComplete(page)
    await page
      .locator('#react-select-8-option-0')
      .getByText('No Cutout')
      .click();
  });
  await waitForLoadingToComplete(page)
  {
    /** await page.waitForTimeout(500);
  await page.locator('div[data-pdm-question-text="Door Glass Style"] .wts-react-select__value-container').click();
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
  await test.step('Clicking on accessories and door prep and waiting for the page to load', async () => {
    await page.locator('#nextStep').click();
    // await page.getByRole('button', { name: 'Accessories & Door Prep' }).click();

  });
  await waitForLoadingToComplete(page)
  await test.step('Clicking on the prehanging options and waiting for the page to load', async () => {
    // await page.getByRole('button', { name: 'Prehanging Options' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on dropdown and selecting no door bottom element', async () => {
    await page
      .locator(
        'div[data-pdm-question-text="Door Bottom"] .wts-react-select-container'
      )
      .click();
    await waitForLoadingToComplete(page)
    await page.locator('text="No Door Bottom"').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on order confirmation and waiting for the page to load', async () => {
    await page.locator('#nextStep').click();
    // await page.getByRole('button', { name: 'Order Confirmation' }).click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on dropdown and waiting for the page to laod', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on height is correct text and waiting for the page to load', async () => {
    await page.locator('text="Yes, Height is correct"').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on add to quote', async () => {
    await page.getByRole('button', { name: 'Add to Quote' }).click();
  });
  return quoteNumber;
}
export async function createLineItemForMyPlans(page) {
  // Click text=New Quote >> nth=0
  const date = new Date();
  // Click text=Line Items
  await test.step('Clicking on line items and waiting for the page to load', async () => {
    await page.locator('text=Line Items').click();
    await waitForLoadingToComplete(page)
  });
  // Click a:has-text("New Line Item")
  await test.step('Clicking on new line item and waiting for the page to load', async () => {
    await page.locator('a:has-text("New Line Item")').click();
    await waitForLoadingToComplete(page)
  });
  // Click text=Exterior
  await test.step('Clciking on exterior and waiting for the page to load', async () => {
    await page.locator('text=Exterior').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on dropdown and selecting the first element', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await page.locator('#react-select-2-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting the first element', async () => {
    await page.locator('div.wts-react-select__control >> nth=1').click();
    await page.locator('#react-select-3-option-0').click();
  });
  await test.step('Clicking on configuration and dimensions and waiting for the page to load', async () => {
    // await page
    // .getByRole('button', { name: 'Configuration & Dimensions' })
    // .click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and waiitng for the page to load', async () => {
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
  await test.step('Clicking on dropdown and selecting the 6/8 element', async () => {
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
  await test.step('Clicking on the dropdown and selecting the no cutout element', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await waitForLoadingToComplete(page)
    await page
      .locator('#react-select-8-option-0')
      .getByText('No Cutout')
      .click();

    await waitForLoadingToComplete(page)
  });
  // await page.waitForTimeout(500);
  // await page.waitForTimeout(500);
  {
    /**
  await page.waitForTimeout(500);
  await page.locator('div[data-pdm-question-text="Door Glass Style"] .wts-react-select__value-container').click();
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

  await test.step('Clicking on accessories and doors and waiting for the page to load', async () => {
    // await page.getByRole('button', { name: 'Accessories & Door Prep' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on prehanging options', async () => {
    // await page.getByRole('button', { name: 'Prehanging Options' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and selecting no door bottom', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await page
      .locator('text="No Door Bottom"')
      // .getByText('No Door Bottom')
      .click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on order confirmation and waiting for the page to load', async () => {
    // await page.getByRole('button', { name: 'Order Confirmation' }).click();
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the dropdown and waiting for the page to load', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on height is correct text', async () => {
    await page
      .locator('text="Yes, Height is correct"')
      // .getByText('Yes, Height is correct')
      .click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on add to quote', async () => {
    await page.getByRole('button', { name: 'Add to Quote' }).click();
  });
}
