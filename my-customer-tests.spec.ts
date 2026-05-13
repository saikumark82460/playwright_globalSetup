import { test, expect } from '@playwright/test';
import { adminAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { userAgreementPage, waitForLoadingToComplete } from './utils';
useUser(test, adminAuthKeys);
test('PW-04.001 Validating my customer page functionality', async ({
  page,
}) => {
  await page.goto('/');
  const date = new Date();
  const deleteCustomerName = `customer ${date.getMilliseconds()}`;
  expect(await page.title()).toBe("TALON: American Building Supply");
  await test.step('Verifying my customers text is visible and clicking on my customers tab', async () => {
    await expect(page.locator('li:has-text("My Customers")')).toBeVisible();
    // Click li:has-text("My Customers")
    await page.locator('li:has-text("My Customers")').click();
  });
  await test.step('Verifying the page is landed on my customers page ', async () => {
    await expect(page.locator('li.breadcrumb-item.active >> span')).toHaveText(
      /My Customers/
    );
  });
  await test.step('Verifying customers table is visible', async () => {
    await expect(page.locator('table.customers-table')).toBeVisible();
  });
  if (await page.locator('.customers-row').first().isVisible()) {
    await expect(page.locator('button[title="Share"]').first()).toBeVisible();
  }
  await test.step('Verifying name field is present in customers table', async () => {
    await expect(page.locator('th:has-text("Name") ')).toBeVisible();
  });
  await test.step('Verifying billing field is present in customers table', async () => {
    await expect(page.locator('th:has-text("Billing") ')).toBeVisible();
  });
  await test.step('Verifying shipping field is present in customers table', async () => {
    await expect(page.locator('th:has-text("Shipping")')).toBeVisible();
  });
  await test.step('clicking on new customer and verifying the breadcrumb text', async () => {
    await page.locator('text=New Customer').click();
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/New/);
  });
  await test.step('Clicking on iput name field', async () => {
    await page.locator('input[name="Name"]').click();
  });
  await test.step('Filling the text in input name field', async () => {
    await page.locator('input[name="Name"]').fill(deleteCustomerName);
  });
  await test.step('Clicking on email input field', async () => {
    await page.locator('input[name="Email"]').click();
  });
  await test.step('Filling the text in email input field', async () => {
    await page
      .locator('input[name="Email"]')
      .fill(`test${date.getMilliseconds()}@feuji.com`);
  });
  await test.step('Clicking on integration id input field', async () => {
    await page.locator('input[name="IntegrationId"]').click();
  });
  await test.step('Filling the text in integration id field', async () => {
    await page
      .locator('input[name="IntegrationId"]')
      .fill(`${date.getSeconds()}${date.getMilliseconds()}`);
  });
  // Click text=Save
  await test.step('Clicking on save button and waiting for the page to load', async () => {
    await page.locator('text=Save').click();
    await waitForLoadingToComplete(page)
    await page.waitForSelector('div[role="alertdialog"]', {
      state: 'hidden',
      timeout: 20000,
    });
  });
  await test.step('Clciking on customers active tab and verifying the page is landed on my customers page', async () => {
    // await page.locator('li.customers.active').click();
    await page.locator('li.breadcrumb-item').nth(1).click();
    await expect(page.locator('li.breadcrumb-item').nth(1)).toHaveText(
      /My Customers/
    );
  });
  await test.step('Verifying customers table is visible and waiting for the page to load', async () => {
    await expect(page.locator('table.customers-table')).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying sorting up icon is visible and clicking on the icon', async () => {
    await expect(page.locator('svg[data-icon="sort-up"]')).toBeVisible()
    await page.locator('svg[data-icon="sort-up"]').click({ force: true });
    await waitForLoadingToComplete(page)
  });
  let customerItemCount = await page.locator('table.customers-table tbody tr').count();
  await test.step('Verifying the customers length in the table should be greter than zero', async () => {
    expect(customerItemCount).toBeGreaterThan(0);
  });
  for (let i = 0; i < customerItemCount; i++) {
    await expect(
      page.locator(`.form-check-input >>nth=${i}`)
    ).toBeVisible();
  }
  await test.step('Clicking on first customer checkbox', async () => {
    await page.locator('input[aria-label="Select Customer"]').first().check();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the share button should not be visible', async () => {
    await expect(
      page.locator('#selectItems button[title="Share"]').first()
    ).not.toBeVisible();
  });
  await test.step('Verifying the first select customer tab is visible', async () => {
    await expect(
      page.locator('input[aria-label="Select Customer"]').first()
    ).toBeVisible();
  });
  if (
    !(await page
      .locator('input[aria-label="Select Customer"]')
      .first()
      .isChecked())
  ) {
    await page.locator('input[aria-label="Select Customer"]').first().check();
    await waitForLoadingToComplete(page)
  }
  await test.step('Verifying first customer checkbox should be checked', async () => {
    await expect(
      page.locator('input[aria-label="Select Customer"]').first()
    ).toBeChecked();
  });
  // await test.step('Verifying share button should be enabled', async () => {
  //   await expect(page.locator('button[title="Share"]').first()).toBeEnabled();
  //   // await expect(page.locator('button:has(svg[data-icon="share-nodes"])')).toBeEnabled();
  // });
  // await test.step('clicking on select customer checkbox', async () => {
  //   await page.locator('input[aria-label="Select Customer"]').first().check();
  // });
  // await test.step('Verifying select customer is visible', async () => {
  //   await expect(
  //     page.locator('input[aria-label="Select Customer"]').first()
  //   ).toBeVisible();
  //   awaitwaitForLoadingToComplete(page)  // });
  // // !! After selecting customer we are not able to see edit button
  // await test.step('Veriyfing selected items are visible', async () => {
  //   await expect(page.locator('div#selectItems')).toBeVisible();
  // });
  // // await expect(page.locator('a[title="Edit"] >> nth=0')).toBeVisible()
  // await test.step('Verifying trash(delete) icon is visible for the selected item', async () => {
  //   await expect(
  //     page.locator('#selectItems button svg.fa-trash-can')
  //   ).toBeVisible();
  // });
  // await test.step('Verifying share button is visible for the selected item ', async () => {
  //   await expect(
  //     page.locator('#selectItems button[title="Share"]')
  //   ).toBeVisible();
  // });
  // await test.step('Unchecking the first selected customer', async () => {
  //   await page.locator('input[aria-label="Select Customer"]').first().uncheck();
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Clciking on the edit button and waiting fo the page to load', async () => {
  //   await page.locator('a[title="Edit"]>>nth=0').click();
  //   awaitwaitForLoadingToComplete(page)  // });
  // let fulltestName = await page
  //   .locator('input[name="Name"]')
  //   .getAttribute('value');
  // await test.step('Clicking on input name field and filling the input field', async () => {
  //   await page.locator('input[name="Name"]').click();
  //   await page.locator('input[name="Name"]').fill(`${fulltestName}1`);
  // });
  // await test.step('Clicking on the email input field and filling the text in the email field', async () => {
  //   await page.locator('input[name="Email"]').click();
  //   await page
  //     .locator('input[name="Email"]')
  //     .fill(`test${date.getMilliseconds()}@feuji.com`);
  // });
  // await test.step('Clicking on integration id field and filling the text in the integration id field', async () => {
  //   await page.locator('input[name="IntegrationId"]').click();
  //   await page
  //     .locator('input[name="IntegrationId"]')
  //     .fill(`${date.getSeconds()}${date.getMilliseconds()}`);
  // });
  // await test.step('Clicking on save button', async () => {
  //   await page.locator('text=Save').click();
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Verifying the customer updated success message', async () => {
  //   await expect(
  //     page.locator('div[role="alertdialog"]:has-text("Customer updated.")')
  //   ).toBeVisible();
  // });

  // await test.step('clicking on cancel button', async () => {
  //   await page.locator('text=Cancel').click();
  //   awaitwaitForLoadingToComplete(page)  // });
  await test.step('Clicking on share button and verifying the landed page contains the breadcrumb share', async () => {
    // await page.locator('button[title="Share"]').first().click();
    await page.getByRole('button', { name: 'Share' }).click({ force: true });
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Share/);
  });
  await test.step('Verifying email to share input field is viisble', async () => {
    // await expect(page.locator('input#emailToShare')).toBeVisible();
    await expect(page.locator('.input-group-text')).toBeVisible();
  });
  await test.step('Clicking on cancel button', async () => {
    // await page.locator('text=Cancel').click();
    await page.getByRole('button', { name: 'Cancel' }).click({ force: true });
    await waitForLoadingToComplete(page)
  });
  await test.step('Clciking on customer name from the table and verifying the page having customer breadcrumb', async () => {
    await page.locator('input[aria-label="Select Customer"]').first().uncheck();
    await page.locator('//tbody/tr[1]/td[2]/a').click();
    await waitForLoadingToComplete(page)
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /customer/
    );
  });
  await test.step('Verifying the page having details text', async () => {
    await expect(page.locator('li[role="presentation"] a.active')).toHaveText(
      /Details/
    );
  });
  await test.step('Verifying the page having addresses text', async () => {
    await expect(
      page.locator('li[role="presentation"]:has-text("Addresses")')
    ).toBeVisible();
  });
  await test.step('Verifying the page having preferences text', async () => {
    await expect(
      page.locator('a[role="tab"]:has-text("Preferences")')
    ).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on customers link and veriyfing the page having my customers text', async () => {
    await page.locator('li.breadcrumb-item').nth(1).click();
    await expect(page.locator('li.breadcrumb-item').nth(1)).toHaveText(
      /My Customers/
    );
  });
  await test.step('Verifying customers table is visible', async () => {
    await expect(page.locator('table.customers-table')).toBeVisible();
  });
  await test.step('Filling the tex in the placeholder', async () => {
    await page.getByRole('textbox', { name: 'Search by customer name or ID' }).fill(deleteCustomerName);
  });
  await test.step('Clicking on delete button', async () => {
    await page.locator('button[title="Delete"]').first().click();
  });
});
test('PW-04.002 Validating shared selected customers for my customer page', async ({
  page,
}) => {
  await page.goto('/');
  expect(await page.title()).toBe('TALON: American Building Supply');
  // Click li:has-text("My Customers")
  await test.step('Clicking on My Customers ', async () => {
    await page.locator('li:has-text("My Customers")').click();
  });
  await test.step('Verifying the page is landed on my customers page ', async () => {
    await expect(page.locator('li.breadcrumb-item.active >> span')).toHaveText(
      /My Customers/
    );
  });

  await test.step('verifying customers-table is visible ', async () => {
    await expect(page.locator('table.customers-table')).toBeVisible();
  });
  await test.step('verifying Share button is visible ', async () => {
    await expect(page.locator('button[title="Share"]').first()).toBeVisible();
  });
  await test.step('Clicking on Select Customer', async () => {
    await page.locator('input[aria-label="Select Customer"]>>nth=0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying Select customer checkbox should be checked', async () => {
    await expect(
      page.locator('input[aria-label="Select Customer"]>>nth=0')
    ).toBeChecked();
    await page.locator('input[aria-label="Select Customer"]>>nth=0').click();
  });
  // await test.step('Verifying Share button should be enabled', async () => {
  //   await expect(page.locator('button[title="Share"]').first()).toBeEnabled();
  // });

  // await test.step('verifying Share button is visible and Clicking on Share button', async () => {
  //   await expect(
  //     page.locator('#selectItems button[title="Share"]')
  //   ).toBeVisible();
  //   await page.locator('#selectItems button[title="Share"]').click();
  // });

  // await test.step('Verifying the breadcrumb is having text Share ', async () => {
  //   await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Share/);
  // });
  // // Fill input#emailToShare
  // await test.step('Giving input for emailToShare', async () => {
  //   await page.locator('input#emailToShare').fill('example@email.com');
  // });
  // await test.step('Clicking on react', async () => {
  //   await page.locator('#react-select-2-option-1').click();
  // });
  // await test.step('Clicking on Share button', async () => {
  //   await page.locator('button:has-text("Share")').click();
  // });
  // await test.step('verifying is Customers shared visible ', async () => {
  //   await expect(
  //     page.locator('div[role="alertdialog"]:has-text("Customers shared")')
  //   ).toBeVisible();
  //   awaitwaitForLoadingToComplete(page)  // });

  await test.step('Clicking on Share button', async () => {
    // await page.locator('nav.fixed-bottom button[type="button"] span span:has-text("Share")').click();
    await expect(page.locator('button[title="Share"]').first()).toBeEnabled();
    await page.locator('button[title="Share"]').first().click()
  });
  await test.step('Verifying the breadcrumb is having text Share ', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Share/);
  });
  await test.step('Giving input for emailToShare', async () => {
    await page.locator('input#emailToShare').fill('example@email.com');
  });
  // await page.locator('#react-select-3-option-0-0').click();
  await test.step('Clicking on example@email.com', async () => {
    await page.locator('text=example@email.com').nth(1).click();
  });
  await test.step('verifying emailToShare is visible ', async () => {
    await expect(page.locator('input#emailToShare')).toBeVisible();
  });
  await test.step('Verifying the select option is having text Viewer ', async () => {
    await expect(page.locator('select option[value="1"] ')).toHaveText(
      'Viewer'
    );
  });
  await test.step('Verifying the select option is having text Editor ', async () => {
    await expect(page.locator('select option[value="2"] ')).toHaveText(
      'Editor'
    );
  });
  await test.step('Verifying the select option is having text Owner ', async () => {
    await expect(page.locator('select option[value="3"] ')).toHaveText('Owner');
  });

  // Fill input#emailToShare
  await test.step('Giving input for emailToShare', async () => {
    await page.locator('input#emailToShare').fill('example@email.com');
  });
  // Select 1await test.step('Giving input for emailToShare', async () => {
  // await page.locator('select').selectOption('1');
  // Click text=Add
  // await page.locator('text=Add').click();
  // await expect(page.locator('text=example@email.comViewer')).toBeVisible()
  // await expect(page.locator('.share-customers__user-item ')).toHaveText('example@email.comViewer')
  // Click button:has-text("Share")
  // await test.step('Clicking on Share button', async () => {
  //   await page.locator('button:has-text("Share")').click();
  // });
  // await test.step('verifying Customers shared alertdialog is visible ', async () => {
  //   await expect(
  //     page.locator('div[role="alertdialog"]:has-text("Customers shared")')
  //   ).toBeVisible();
  // });

  // await test.step('Clicking on Share button', async () => {
  //   await page.locator('button[title="Share"]').first().click();
  // });
  // await test.step('Verifying breadcrumb is having text Share', async () => {
  //   await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Share/);
  // });
  // await test.step('verifying Recent Shares is visible ', async () => {
  //   await expect(page.locator('text=Recent Shares')).toBeVisible();
  // });
  // await test.step('verifying share-customer recent-item has text example@email.com is visible ', async () => {
  //   await expect(
  //     page.locator(
  //       '.share-customers__recent-item:has-text("example@email.com")'
  //     )
  //   ).toBeVisible();
  // });
  // await test.step('verifying Share button is visible ', async () => {
  //   await expect(
  //     page.locator('button[disabled]:has-text("Share")')
  //   ).toBeVisible();
  // });
  // await test.step('verifying Cancel button is visible ', async () => {
  //   await expect(page.locator('text=Cancel')).toBeVisible();
  // });
  // // Click text=Cancel
  // await test.step('Clicking on button button', async () => {
  //   await page.locator('text=Cancel').click();
  // });
  // await test.step('Verifying customers list having text My Customers ', async () => {
  //   await expect(page.locator('li.customers.active')).toHaveText(
  //     /My Customers/
  //   );
  // });

  await test.step('Clicking on button', async () => {
    // await page.locator('nav.fixed-bottom button[type="button"] span span:has-text("Share")').click();
  });
  await test.step('Verifying breadcrumb is having text Share', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Share/);
  });
  await test.step('Verifying emailToShare is having Attribute value', async () => {
    await expect(page.locator('input#emailToShare')).toHaveAttribute(
      'value',
      'example@email.com'
    );
  });
  // Click text=example@email.com
  await test.step('Clicking on emailToShare ', async () => {
    await waitForLoadingToComplete(page)
    await page.locator('input#emailToShare').click();
  });
  await test.step('Clicking on options', async () => {
    await page.locator('#react-select-2-option-1').click();
  });
  // await expect(page.locator('input#emailToShare')).toHaveAttribute("value", "example@email.com")
  // Select 1
  await test.step('Selecting a option', async () => {
    await page.locator('select').selectOption('1');
  });
  // Click text=Add
  // await test.step('Clicking on Add button', async () => {
  //   await page.locator('text=Add').click();
  // });
  // Click text=Cancel
  await test.step('Clicking on Cancel button', async () => {
    await page.locator('text=Cancel').click();
  });
  await test.step('Verifying customers list having text My Customers ', async () => {
    await expect(page.locator('li.breadcrumb-item.active')).toHaveText(
      /My Customers/
    );
  });

  await test.step('Clicking on Share button', async () => {
    await expect(page.locator('button[title="Share"]').first()).toBeEnabled();
    await page.locator('button[title="Share"]').first().click()
  });
  await test.step('Verifying breadcrumb is having text Share', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Share/);
  });
  await test.step('Verifying emailToShare is having Attribute value', async () => {
    await expect(page.locator('input#emailToShare')).toHaveAttribute(
      'value',
      ''
    );
  });
  await test.step('Giving input for emailToShare', async () => {
    await page.locator('input#emailToShare').fill('testCustomerShare@test.com');
  });
  // Click text=example@email.com
  await page.locator('text=testCustomerShare@test.com').nth(1).click();
  await waitForLoadingToComplete(page)  // await expect(page.locator('input#emailToShare')).toHaveAttribute("value", "example@email.com")
  // Select 1
  await page.locator('select').nth(1).selectOption('1');
  // Click text=Add
  // await test.step('Clicking on button', async () => {
  //   await page.locator('text=Add').click();
  // });
  // await page.pause()
  // Click button:has-text("Share")
  await test.step('Clicking on button', async () => {
    await page.getByRole('button', { name: 'Share' }).click();
  });

  // await page.locator('button:has-text("Share")').click();
  await expect(
    page.locator('div[role="alert"] div >>nth=1')
  ).toHaveText(/Customers shared/);
  await waitForLoadingToComplete(page)
  await expect(page.locator('a:has-text("New Customer") ')).toBeVisible();
  // Click text=New Customer
  await test.step('Clicking on button', async () => {
    await page.locator('text=New Customer').click();
    await waitForLoadingToComplete(page)
  });
  // await page.pause()

  await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
    /New Customer/
  );
  // await expect(page.locator('li[role="presentation"] a.active')).toHaveText(
  //   /Details/
  // );

  // Click text=Cancel
  await test.step('Clicking on button', async () => {
    await page.locator('text=Cancel').click();
  });
  await waitForLoadingToComplete(page)
  // Click button:has-text("Toggle Dropdown")
  // await test.step('Clicking on button', async () => {
  //   await page.locator('button:has-text("Toggle Dropdown")').click();
  // });

  // Click text=Import
  await test.step('Clicking on button', async () => {
    // await page.locator('text=Import').click();
    await expect(page.getByRole('link', { name: 'Import' })).toBeVisible()
    await page.getByRole('link', { name: 'Import' }).click();
  });
  await expect(page.locator('ol.breadcrumb li.active')).toHaveText(/Import/);
  // await expect(
  //   page.locator(
  //     'text=Import CenterPoint Contacts >> input[name="accepted_file_type"]'
  //   )
  // ).toBeVisible();
  // await test.step('Verifying Import CenterPoint Contacts is having Attribute type and radio', async () => {
  //   await expect(
  //     page.locator(
  //       'text=Import CenterPoint Contacts >> input[name="accepted_file_type"]'
  //     )
  //   ).toHaveAttribute('type', 'radio');
  // });
  // await test.step('verifying acceptedfiletype is visible ', async () => {
  //   await expect(
  //     page.locator('text=CSV >> input[name="accepted_file_type"]')
  //   ).toBeVisible();
  // });
  // await test.step('Verifying acceptedfiletype is having Attribute type and radio', async () => {
  //   await expect(
  //     page.locator('text=CSV >> input[name="accepted_file_type"]')
  //   ).toHaveAttribute('type', 'radio');
  // });
  await test.step('verifying Select File is visible ', async () => {
    await expect(page.locator('text=Select File')).toBeVisible();
  });

  await test.step('verifying ShareWithManufacturer input field is visible ', async () => {
    await expect(
      page.locator('input[name="ShareWithManufacturer"]')
    ).toBeVisible();
  });
  await test.step('Verifying ShareWithManufacturer is having Attribute type and checkbox', async () => {
    await expect(
      page.locator('input[name="ShareWithManufacturer"]')
    ).toHaveAttribute('type', 'checkbox');
  });
  await test.step('verifying Cancel button is visible ', async () => {
    await expect(page.locator('text=Cancel')).toBeVisible();
  });
  await test.step('verifying Import button is visible ', async () => {
    await expect(
      page.locator('button:has-text("Import")[disabled]')
    ).toBeVisible();
  });
});
test('PW-04.003 Validating user agreement and searching the quote functionality in my customer page', async ({
  page,
}) => {
  await test.step('Navigating to home page', async () => {
    await page.goto('/');
  });
  // Click li:has-text("My Customers")
  // await page.locator('li:has-text("My Customers")').click();
  // awaitwaitForLoadingToComplete(page)  // await page.waitForSelector('table.customers-table>> tr >> nth=1', {
  //   state: 'visible',
  //   timeout: 2000,
  // });

  await userAgreementPage(page);
  await test.step('Verifying search button is viisble and clicking on search button', async () => {
    await expect(page.getByRole('button', { name: 'Search Ctrl+K' })).toBeVisible();
    await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
  });
  await test.step('Verifying search by quote placeholder is viisble and filling the text in the placeholder', async () => {
    // await expect(
    //   page.getByPlaceholder('Search by Quote, Order or Plan Number')
    // ).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Type in a quote, order, or' })).toBeVisible();
    // await page
    //   .getByPlaceholder('Search by Quote, Order or Plan Number')
    //   .fill('invalide 1233 quote');
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).fill('invalide 1233 quote')
  });
  await expect(
    page.getByRole('heading', { name: 'No Results' })
  ).toBeVisible();
  await test.step('Clicking on advanced search button', async () => {
    // await page
    //   .locator('form:has-text("Advanced")')
    //   .getByRole('button', { name: 'Search' })
    //   .click();
    await page.getByRole('link', { name: 'Advanced Search' }).click();
  });

});