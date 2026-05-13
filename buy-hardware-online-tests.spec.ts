import { test, expect } from '@playwright/test';
import { externalAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import {
  intialHomePageVerifications,
  searchByQuoteNumber,
  userAgreementPage,
  waitForLoadingToComplete,
} from './utils';
useUser(test, externalAuthKeys);
test('PW-01.001 Validate buy hardware online', async ({ page }) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await intialHomePageVerifications(page);
  await test.step('Clicking on Talon logo', async () => {
    await page.locator('header[role="banner"] a').click();
  });
  await test.step('Clicking on Quick configure tab', async () => {
    await page.locator('div#get-quote-buttons a.quick-configure').click();
  });
  await test.step('Validating Select Brand tab to be visible', async () => {
    await expect(page.locator('h3:has-text("Select Brand")')).toBeVisible();
  });
  await test.step('Validating breadcrumb has text Create Line', async () => {
    await expect(page.locator('li.breadcrumb-item span').nth(2)).toHaveText(
      /Line Items/
    );
  });
  await test.step('Validating Exterior tab to be visible', async () => {
    await expect(page.locator('text=Exterior')).toBeVisible();
  });
  await test.step('Validating Interior tab to be visible', async () => {
    await expect(page.locator('text=Interior')).toBeVisible();
  });
  await test.step('Validating Hardware tab to be visible', async () => {
    await expect(page.locator('text=Hardware')).toBeVisible();
  });
  await test.step('Clicking on Hardware tab', async () => {
    await page.locator('text=Hardware').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
  });
  await test.step('Validating Parts Search tab to be visible', async () => {
    await expect(page.locator('[placeholder="Parts Search"]')).toBeVisible();
  });
  await test.step('Validating Select a Part tab to be visible', async () => {
    await expect(page.locator('text=Select a Part ')).toBeVisible();
    await waitForLoadingToComplete(page);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 5000 });
    await waitForLoadingToComplete(page);
  });
  await test.step('Validating parts table data to be visible', async () => {
    await page.waitForSelector('.parts-grid  form >> nth=1', {
      state: 'visible',
      timeout: 2000,
    });
  });
  let lineItems = await page.$$('.parts-grid  form');
  await expect(lineItems.length).toBeGreaterThan(0);
  let listOfParts = await page.$$('.parts-tree .parts-tree-item');
  for (let i = 1; i <= listOfParts.length; i++) {
    await test.step('Validating list group option to be visible', async () => {
      await expect(
        page.locator(
          `.list-group-root > div:nth-child(${i}) > .parts-tree-item`
        )
      ).toBeVisible();
    });
    await test.step('Validating list group option name to be visible', async () => {
      await expect(
        page.locator(
          `.list-group-root > div:nth-child(${i}) > .parts-tree-item label`
        )
      ).toBeVisible();
    });
    await test.step('Validating list group checkbox to be visible', async () => {
      await expect(
        page.locator(
          `.list-group-root > div:nth-child(${i}) > .parts-tree-item>.parts-tree-item-checkbox:near(span.parts-tree-item-label)`
        )
      ).toBeVisible();
    });
    await test.step('Clicking on expand list group option', async () => {
      await page
        .locator(
          `.list-group-root div .parts-tree-item-expander svg[data-icon="chevron-right"]`
        )
        .first()
        .click();
    });
    //User should be able expand every part to get more available features on it and select using checkbox
    await test.step('Validating expanded list group options to be visible', async () => {
      await expect(page.locator('div.list-group-root')).toBeVisible();
    });
    let listOfFeatures = await page.$$('div.list-group-root .parts-tree-item');
    await test.step('Clicking on expand list group option', async () => {
      await page.locator('svg[data-icon="chevron-down"]').click();
    });
  }
});
test('PW-01.002 Verify the user can expand sections and select the checkbox', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page);
  });
  await test.step('Clicking on expand arrow option', async () => {
    await page
      .locator(
        `.list-group-root div .parts-tree-item-expander svg[data-icon="chevron-right"]`
      )
      .first()
      .click();
    await waitForLoadingToComplete(page);
  });
  let listOfFeatures = await page.$$('div.list-group-item .parts-tree-item');
  // console.log(listOfFeatures.length)
  // for (let j = 1; j <= listOfFeatures.length - 1 ; j++) {
  await test.step('Validating expanded option to be visible', async () => {
    await expect(
      page.locator(`div.list-group-item div .parts-tree-item >> nth=1`)
    ).toBeVisible();
  });
  await test.step('Validating expanded option lable to be visible', async () => {
    await expect(
      page.locator(`div.list-group-item div .parts-tree-item label >> nth=1`)
    ).toBeVisible();
  });
  await test.step('Validating checkbox option to be visible', async () => {
    await expect(
      page.locator(
        `div.list-group-item div .parts-tree-item .parts-tree-item-checkbox:near(span.parts-tree-item-label) >> nth=1`
      )
    ).toBeVisible();
    await waitForLoadingToComplete(page)
    await test.step('Clicking on checkbox option ', async () => {
      await page
        .locator(
          `div.list-group-item div .parts-tree-item .parts-tree-item-checkbox >> nth=1`
        )
        .click();
      await waitForLoadingToComplete(page)
    });
    // }
    await test.step('Clicking on arrow option ', async () => {
      await page.locator('svg[data-icon="chevron-down"]').click();
      await waitForLoadingToComplete(page)
    });
    await test.step('Clicking on Deselect all option ', async () => {
      await page.locator('button[data-qa="cs_part-search-deselect-btn"]').click();
    });
  });
})
test('PW-01.003 Validate user is selecting one part at a time', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page)
  });
  await test.step('Validating text to be visible', async () => {
    await expect(
      page.locator('text=03884BY-PASS TRACK & HDWE 4/0 BIPASS')
    ).toBeVisible();
  });
  await test.step('Clicking on checkbox', async () => {
    await page.locator('.parts-tree-item-checkbox >> nth=0').click();
  });
  await test.step('Validating checkbox to be checked', async () => {
    await expect(
      page.locator('.parts-tree-item-checkbox >> nth=0')
    ).toHaveClass(/checked/);
  });
  await test.step('Clicking on checkbox', async () => {
    await page.locator('.parts-tree-item-checkbox >> nth=1').click();
    await waitForLoadingToComplete(page)
  });
  // Locator Change
  // await test.step('Validating 9ALCDL270026DALC,ACS CTRL,DL2700 26D SCH C STAND,ALONE,KEY,PAD,LOCK to be visible', async () => {
  //   await expect(
  //     page.locator(
  //       'text=9ALCDL270026DALC,ACS CTRL,DL2700 26D SCH C STAND,ALONE,KEY,PAD,LOCK'
  //     )
  //   ).toBeVisible();
  // });
  await test.step('Validating 9BABITK1212 item is visible', async () => {
    await expect(
      page.locator('.fake-table-td', {
        hasText: '9BABITK1212'
      })
    ).toBeVisible();
  });

  await test.step('Validating checkbox to be checked', async () => {
    await expect(
      page.locator('.parts-tree-item-checkbox >> nth=1')
    ).toHaveClass(/checked/);
  });
  await test.step('Validating checkbox to be checked', async () => {
    await expect(
      page.locator('.parts-tree-item-checkbox >> nth=0')
    ).not.toHaveClass(/checked/);
  });
  await test.step('Clicking the Deselect All option', async () => {
    await page.locator('text=Deselect All').click();
  });
  await test.step('Validating checkbox not to be checked', async () => {
    await expect(page.locator('.checked')).not.toBeVisible();
  });
});
test('PW-01.004 Search parts and validate the parts details table header', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page)
    await page.waitForSelector('.parts-grid  form >> nth=1', {
      state: 'visible',
      timeout: 10000,
    });
  });
  let lineItems = await page.$$('.parts-grid  form');
  await expect(lineItems.length).toBeGreaterThan(0);
  await test.step('Entering value into Parts Search option', async () => {
    await page.getByPlaceholder('Parts Search').fill('03');
  });
  await test.step('Clicking on Search button', async () => {
    // await page.getByRole('button', { name: 'Search' }).click();
    await page.locator('//button[text()="Search"]').click()

  });
  await test.step('Validating part number to have 03', async () => {
    await expect(
      page.locator('.fake-table-td >> nth=2 >>.part-number')
    ).toHaveText(/03/);
  });
  // !! Images are not coming the URL. Please uncomment the code if images are coming in the UI.
  // await expect(page.locator('.fake-table-td >> nth=1 >>img')).toBeVisible()
  await test.step('Validating Description to be visible', async () => {
    await expect(
      page.locator('.fake-table-thead>>.fake-table-th:has-text("Description")')
    ).toBeVisible();
  });
  await test.step('Validating UOM to be visible', async () => {
    await expect(
      page.locator('.fake-table-thead>>.fake-table-th:has-text("UOM")')
    ).toBeVisible();
  });
  await test.step('Validating Price to be visible', async () => {
    await expect(
      page.locator('.fake-table-thead>>.fake-table-th:has-text("Price")')
    ).toBeVisible();
  });
  await test.step('Validating Qty to be visible', async () => {
    await expect(
      page.locator('.fake-table-thead>>.fake-table-th:has-text("Qty")')
    ).toBeVisible();
  });
});
test('PW-01.005 checking the functionality of magnifying glass icon ', async ({
  page,
}) => {
  let date = new Date();
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page)
    await page.waitForSelector('.parts-grid  form >> nth=1', {
      state: 'visible',
      timeout: 10000,
    });
  });
  let lineItems = await page.$$('.parts-grid  form');
  await expect(lineItems.length).toBeGreaterThan(0);
  for (let i = 0; i < lineItems.length; i++) {
    await test.step('Validating Details tab to be visible', async () => {
      await expect(
        page.locator(` button[title="Details"]>>nth=${i}`)
      ).toBeVisible();
    });
  }
  await test.step('Clicking on Details tab', async () => {
    await page.locator('button[title="Details"]>>nth=0').click();
  });
  await test.step('Validating Close button to be visible', async () => {
    await expect(
      await page.getByRole('button', { name: 'Close' })
    ).toBeVisible();
  });
  await test.step('Validating Part # tab to be visible', async () => {
    await expect(page.locator('label:has-text("Part #") ')).toBeVisible();
  });
  await test.step('Validating Description tab to be visible', async () => {
    await expect(
      page.locator('label:has-text("Description")    ')
    ).toBeVisible();
  });
  await test.step('Validating Brand tab to be visible', async () => {
    await expect(page.locator('text=Brand')).toBeVisible();
  });
  await test.step('Validating Catalog tab to be visible', async () => {
    await expect(page.locator('text=Catalog')).toBeVisible();
  });
  await test.step('Validating Unit of Measurement tab to be visible', async () => {
    await expect(page.locator('text=Unit of Measurement')).toBeVisible();
  });
  await test.step('Validating Available Date tab to be visible', async () => {
    await expect(page.locator('text=Available Date')).toBeVisible();
  });
  await test.step('Validating End Mfg Date tab to be visible', async () => {
    await expect(page.locator('text=End Mfg Date')).toBeVisible();
  });
  await test.step('Validating Obsolete Date tab to be visible', async () => {
    await expect(page.locator('text=Obsolete Date')).toBeVisible();
  });
  await test.step('Validating Price tab to be visible', async () => {
    await expect(page.locator('label:has-text("Price")')).toBeVisible();
  });
  await test.step('Validating Quantity tab to be visible', async () => {
    await expect(page.locator('text=Quantity >> nth=0')).toBeVisible();
  });
  await test.step('Validating Quantity on Hand tab to be visible', async () => {
    await expect(page.locator('text="Quantity on Hand"')).toBeVisible();
  });
  await test.step('Validating Global Quantity on Hand tab to be visible', async () => {
    await expect(page.locator('text=Global Quantity on Hand')).toBeVisible();
  });
  await test.step('Validating Cancel tab to be visible', async () => {
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
  });
  await test.step('Validating Add to Quote tab to be visible', async () => {
    await expect(
      page.locator('button:has-text("Add to Quote") ')
    ).toBeVisible();
  });
  await test.step('Clicking on Cancel tab', async () => {
    await page.locator('text=Cancel').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
  });
  await test.step('Validating Parts Search tab to be visible', async () => {
    await expect(page.locator('[placeholder="Parts Search"]')).toBeVisible();
  });
  await test.step('Validating Select a Part tab to be visible', async () => {
    await expect(page.locator('text=Select a Part ')).toBeVisible();
  });
  await test.step('Validating ClosePart tab to be visible', async () => {
    await expect(
      page.locator('div[role="document"]:has-text("ClosePart")')
    ).not.toBeVisible();
  });
  await test.step('Clicking on Details button', async () => {
    await page.locator('button[title="Details"]>>nth=0').click();
  });
  await test.step('Validating Close tab to be visible', async () => {
    await expect(
      await page.getByRole('button', { name: 'Close' })
    ).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on Add to Quote tab', async () => {
    await page.locator('text=Add to Quote').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Validating Part added tab to be visible', async () => {
    await expect(
      page.getByText('Part added')
    ).toBeVisible();
  });
  await test.step('Clicking on Quote Details tab', async () => {
    await page.getByRole('tab', { name: 'Quote Details' }).click();
  });
  await test.step('Clicking on Purchase Order tab', async () => {
    await page.getByLabel('Purchase Order').click();
  });
  await test.step('Entering value into Purchase Order option', async () => {
    await page.getByLabel('Purchase Order').fill(`${date.getMilliseconds()}7`);
  });
  await page.getByRole('textbox', { name: 'Job Contact Name/Number' }).click();
  await page.getByRole('textbox', { name: 'Job Contact Name/Number' }).fill('test');
  await page.getByRole('tabpanel', { name: 'Details' }).getByRole('button').first().click();
  await page.getByRole('cell', { name: '4' }).first().click();
  await page.getByRole('textbox', { name: 'Order Comment' }).click();
  await page.getByRole('textbox', { name: 'Order Comment' }).fill('test');
  await page.getByLabel('Reason').selectOption('1');
  await test.step('Clicking on Save button', async () => {
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Clicking on Submit Order button', async () => {
    await page.getByRole('button', { name: 'Submit Order' }).click();
  });
  await expect(page.getByText('Order Validation').nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Submit Order' }).click();
  await test.step('Validating Quote ordered message', async () => {
    await expect(page.getByRole('alert').nth(0)).toBeVisible();
  });
});
test('PW-01.006 Validating quantity add button, pagination and close button functionality', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page);
  });
  await test.step('Validating parts table data to be visible', async () => {
    await page.waitForSelector('.parts-grid  form >> nth=1', {
      state: 'visible',
      timeout: 10000,
    });
  });
  let lineItems = await page.$$('.parts-grid  form');
  await expect(lineItems.length).toBeGreaterThan(0);
  await test.step('Clicking on Qty tab', async () => {
    await page.locator('span.fake-table-td input >> nth=0').click();
  });
  await test.step('Clicking on Up arrow', async () => {
    await page.locator('span.fake-table-td input >> nth=0').press('ArrowUp');
  });
  await test.step('Clicking on Qty tab', async () => {
    await page.locator('text=Qty').click();
  });
  await test.step('Validating Qty tab have value 2', async () => {
    await expect(
      page.locator('span.fake-table-td input >> nth=0')
    ).toHaveAttribute('value', /2/);
  });
  await test.step('Clicking on Qty tab', async () => {
    await page.locator('span.fake-table-td input >> nth=0').click();
  });
  await test.step('Clicking on down arrow', async () => {
    await page.locator('span.fake-table-td input >> nth=0').press('ArrowDown');
  });
  await test.step('Clicking on Qty tab', async () => {
    await page.locator('text=Qty').click();
  });
  await test.step('Validating Qty tab have value 1', async () => {
    await expect(
      page.locator('span.fake-table-td input >> nth=0')
    ).toHaveAttribute('value', /1/);
  });
  await test.step('Clicking on Add tab', async () => {
    await page.locator('button[title="Add"]').first().click();
  });
  await test.step('Validating Part added tab to be visible', async () => {
    await expect(
      page.getByText('Part added')
    ).toBeVisible();
  });
  await test.step('Validating backgroun color', async () => {
    await expect(page.locator('.Toastify__toast--success')).toHaveCSS(
      'background-color',
      'rgb(106, 177, 144)'
    );
  });
  await test.step('Validating pagination to be visible', async () => {
    await expect(page.locator('.pagination')).toBeVisible();
  });
  await test.step('Validating pagination of page 1 to be visible', async () => {
    await expect(
      page.locator('[aria-label="Page 1 is your current page"]')
    ).toBeVisible();
  });
  await test.step('Validating pagination of page 2 to be visible', async () => {
    await page.locator('[aria-label="Page 2"]').click();
    await expect(
      page.locator('[aria-label="Page 2 is your current page"]')
    ).toBeVisible();
  });
  await test.step('Clicking on pagination of page 1 ', async () => {
    await page.locator('[aria-label="Page 1"]').click();
  });
  await test.step('Validating pagination of page 1 to be visible', async () => {
    await expect(
      page.locator('[aria-label="Page 1 is your current page"]')
    ).toBeVisible();
  });
  await test.step('Validating close tab to have count of 2', async () => {
    await expect(page.locator('a:has-text("close")')).toHaveCount(2);
  });
  await test.step('Validating close tab to be visible', async () => {
    await expect(page.locator('a:has-text("close")>>nth=0')).toBeVisible();
  });
  await test.step('Validating close tab to be visible', async () => {
    await expect(page.locator('a:has-text("close")>>nth=1')).toBeVisible();
  });
  await test.step('Clicking on close tab', async () => {
    await page.locator('a:has-text("close")>>nth=1').click();
  });
  await test.step('Validating Line number, room, description placeholder to be visible', async () => {
    await expect(
      page.locator('[placeholder="Line number, room, description"]')
    ).toBeVisible();
  });
  await test.step('Validating New Line Item tab to be visible', async () => {
    await expect(page.locator('a:has-text("New Line Item")')).toBeVisible();
  });
});
test('PW-01.007 Validating table and action dropdown section', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page);
  });
  await test.step('Validating parts table data to be visible', async () => {
    await page.waitForSelector('.parts-grid  form >> nth=1', {
      state: 'visible',
      timeout: 10000,
    });
  });
  //LC await page.locator('button:has-text("Add") >> nth=0').click()
  await test.step('Clicking on Add tab ', async () => {
    await page.locator('button[title="Add"]').first().click();
  });
  await test.step('Validating parts tracker tab to be visible', async () => {
    await expect(page.locator('.parts-tracker')).toBeVisible();
  });
  await test.step('Validating Part # tab to be visible', async () => {
    await expect(
      page.locator('.parts-tracker th:has-text("Part #") ')
    ).toBeVisible();
  });
  await test.step('Validating Description tab to be visible', async () => {
    await expect(
      page.locator('.parts-tracker th:has-text("Description") ')
    ).toBeVisible();
  });
  await test.step('Validating UOM tab to be visible', async () => {
    await expect(
      page.locator('.parts-tracker th:has-text("UOM") ')
    ).toBeVisible();
  });
  await test.step('Validating Qty tab to be visible', async () => {
    await expect(
      page.locator('.parts-tracker th:has-text("Qty") ')
    ).toBeVisible();
  });
  await test.step('Validating number tab to be visible', async () => {
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
  });
  await test.step('Validating number tab has value 1', async () => {
    await expect(page.locator('input[type="number"]').first()).toHaveAttribute(
      'value',
      '1'
    );
  });
  await test.step('Clicking on Actions button', async () => {
    await page.getByRole('button', { name: 'Actions' }).click();
  });
  //LC await expect(page.locator('button:has-text("Paperwork")')).toBeVisible()
  await test.step('Validating Paperwork button to be visible', async () => {
    await expect(
      page.getByRole('link', { name: 'Paperwork' })
    ).toBeVisible();
  });
  //LC await expect(page.locator('text=Export')).toBeVisible()
  await test.step('Validating Export button to be visible', async () => {
    await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
  });
  //LC await expect(page.locator('text=Update')).toBeVisible()
  await test.step('Validating Update button to be visible', async () => {
    await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
  });
  //LC await expect(page.locator('#copy-quote')).toBeVisible()
  await test.step('Validating Copy button to be visible', async () => {
    await expect(page.getByRole('button', { name: 'Copy' })).toBeVisible();
  });
  //LC await expect(page.locator('text=Create Plan')).toBeVisible()
  await test.step('Validating Create Plan tab to be visible', async () => {
    await expect(page.getByRole('link', { name: 'Create Plan' })).toBeVisible();
  });
  await test.step('Clicking on Paperwork button', async () => {
    await page.getByRole('link', { name: 'Paperwork' }).click();
  });
  await test.step('Validating Quote Paperwork tab to be visible', async () => {
    await expect(
      page.getByRole('link', { name: 'Paperwork Headers' })
    ).toBeVisible();
  });
  // await expect(page.locator('.panel-heading>>nth=0 >>button:has-text("Open")')).toBeVisible()
  await test.step('Validating report open button to be visible', async () => {
    await expect(page.locator('button.btn-report-open').first()).toBeVisible();
  });
  //lc await expect(page.locator('.panel-heading>>nth=0 >>button:has-text("Download")')).toBeVisible()
  await test.step('Validating report download button to be visible', async () => {
    await expect(
      page.locator('button.btn-report-download').first()
    ).toBeVisible();
  });
  //LC await expect(page.locator('.panel-heading>>nth=0 >>button:has-text("Email")')).toBeVisible()
  await test.step('Validating report email button to be visible', async () => {
    await expect(page.locator('a.btn-report-email:has-text("Email")').first()).toBeVisible();
  });
  await page.locator('li.breadcrumb-item').nth(2).locator('a').click();
  //LC await page.locator('text=Actions Toggle Dropdown').click();
  await test.step('Clicking on Actions button', async () => {
    await page.getByRole('button', { name: 'Actions' }).click();
  });
  // LC await page.locator('#copy-quote').click();
  await test.step('Clicking on Copy button', async () => {
    await page.getByRole('button', { name: 'Copy' }).click();
  });
  await test.step('Validating breadcrumb has text Copy', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Quote/);
  });

  //not visible await expect(page.locator('text=Copy with current client')).toBeVisible()
  //not visible await expect(page.locator('text=Or, select a new client')).toBeVisible()
  // not visible await expect(page.locator('[placeholder="Search"]')).toBeVisible()
  // not visible await expect(page.locator('table[aria-describedby="clients-table_info"]')).toBeVisible()
  // not visible await expect(page.locator('text=Cancel Copy >> a>>nth=0')).toBeVisible()
  // not visible await expect(page.locator('text=Cancel Copy >> a>>nth=1')).toBeVisible()
  // not visible await expect(page.locator('input:has-text("copy")>>nth=0')).toBeVisible()
  // not visible await expect(page.locator('input:has-text("copy")>>nth=1')).toBeVisible()
  await test.step('Validating Cancel tab to be visible', async () => {
    await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
  });
  await test.step('Validating Copy tab to be visible', async () => {
    await expect(
      await page.getByRole('button', { name: 'Copy' })
    ).toBeVisible();
  });
  await test.step('Clicking on Cancel button', async () => {
    await page.getByRole('link', { name: 'Cancel' }).click();
  });
  // Click text=Actions Toggle Dropdown
  //LC await page.locator('text=Actions Toggle Dropdown').click();
  await test.step('Clicking on Actions button', async () => {
    await page.getByRole('button', { name: 'Actions' }).click();
  });
  // Click text=Create Plan
  // lc await page.locator('text=Create Plan').click();
  await test.step('Clicking on Create Plan button', async () => {
    await page.getByRole('link', { name: 'Create Plan' }).click();
  });
  await test.step('Validating breadcrumb has text New Plan from Quote', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /New Plan from Quote/
    );
  });
  await test.step('Validating New Plan from Quote tab to be visible', async () => {
    await expect(
      page.locator('h1:has-text("New Plan from Quote")')
    ).toBeVisible();
  });
  await test.step('Validating Plan Name tab to be visible', async () => {
    await expect(
      page.locator(
        '#content-main label[class="form-label"]:has-text("Plan Name")'
      )
    ).toBeVisible();
  });
  await test.step('Validating Project Name tab to be visible', async () => {
    await expect(
      page.locator(
        '#content-main label[class="form-label"]:has-text("Project Name")'
      )
    ).toBeVisible();
  });
  // await test.step('Validating Plan Description tab to be visible', async () => {
  //   await expect(
  //     page.locator(
  //       '#content-main label[class="form-label"]:has-text("Plan Description")'
  //     )
  //   ).toBeVisible();
  // });
  //not visible await expect(page.locator('text=Search for Client')).toBeVisible()
  //not visible await expect(page.locator('[placeholder="Search"]')).toBeVisible()
  //not visible await expect(page.locator('table[aria-describedby="clients-table_info"]')).toBeVisible()
  //not visible await expect(page.locator('text=Default Client')).toBeVisible()
  await test.step('Clicking on Select a client button', async () => {
    await page.getByRole('button', { name: 'Select a client' }).click();
  });
  //LC await expect(page.locator('div#form-default-client input[checked="checked"]')).toBeVisible()
  await test.step('Validating checkbox to be visible', async () => {
    await expect(
      page.locator('div[role="dialog"] div.form-check input[checked]')
    ).toBeVisible();
  });
});
test('PW-01.008 Verifying user agreement link and search functionality ', async ({
  page,
}) => {
  await test.step('Navigating to Home page', async () => {
    await page.goto('/');
  });
  await test.step('Validating Buy Hardware Online to be visible', async () => {
    await expect(page.locator('text=Buy Hardware Online')).toBeVisible();
  });
  await test.step('Clicking on Buy Hardware Online tab', async () => {
    await page.locator('text=Buy Hardware Online').click();
  });
  await test.step('Validating breadcrumb has text Line Items', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
    await waitForLoadingToComplete(page);
  });
  await test.step('Validating parts table data to be visible', async () => {
    await page.waitForSelector('.parts-grid  form >> nth=1', {
      state: 'visible',
      timeout: 10000,
    });
    await waitForLoadingToComplete(page)
  });
  await waitForLoadingToComplete(page)
  await searchByQuoteNumber(page);
  await userAgreementPage(page);
});