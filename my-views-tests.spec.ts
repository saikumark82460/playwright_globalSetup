import { test, expect } from '@playwright/test';
import { adminAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { userAgreementPage, waitForLoadingToComplete } from './utils';

useUser(test, adminAuthKeys);

test('PW-09.001 Validate features of my view page', async ({ page }) => {
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  await test.step('Verifying the title Home TALON American Building Supply is visible', async () => {
    expect(await page.title()).toBe('TALON: American Building Supply');
    await waitForLoadingToComplete(page)  });
  // Click li:has-text("My Views")
  await test.step('Clicking on the My Views tab ', async () => {
    await page.locator('ul.navbar-nav li a:has-text("My Views")').click();
  });
  // await page.getByRole('link', { name: 'My Views' }).click();
  await test.step('Verifying the breadcrumb My Views is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Views/
    );
  });
  await test.step('Verifying the breadcrumb My Views is active', async () => {
    await expect(
      page.locator('li[role="presentation"] button.active')
    ).toHaveText(/My Views/);
  });
  // await expect(page.locator('#viewsTab-tabpane-myViews table')).toBeVisible()
  await test.step('Verifying the My Views table is visible', async () => {
    await expect(page.locator('#viewsTab-tabpane-myViews')).toBeVisible();
  });
  await test.step('Verifying the New Quote is active', async () => {
    await expect(page.getByRole('link', { name: 'New Quote' })).toBeVisible();
  });
  // Click text=New Quote
  await test.step('Clicking on the New Quote button', async () => {
    // await page.locator('text=New Quote').nth(0).click();
    await page.getByRole('link', { name: 'New Quote' }).click();

  });
  await test.step('Verifying the breadcrumb New Quote is active', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /New Quote/
    );
  });
  await test.step('Verifying the New Quote is visible', async () => {
    await expect(
      page.locator('#content-main div h1:has-text("New Quote")')
    ).toBeVisible();
  });

  // await test.step('Verifying the Quote Name is visible', async () => {
  //   await expect(
  //     // page.locator('#content-main div div label:has-text("Quote Name")')
  //     page.locator('input#quoteName')
  //   ).toBeVisible();
  // });
  // await test.step('Verifying the Project Name is visible', async () => {
  //   // await expect(
  //   //   page.locator('#content-main div div label:has-text("Project Name")')
  //   // ).toBeVisible();
  //   await expect(page.locator('input[id="projectName"]')).toBeVisible();
  // });
  await waitForLoadingToComplete(page)  // Click text=My Views
  await test.step('Clicking on the My Views tab', async () => {
    await page.locator('text=My Views').click();
  });
  await waitForLoadingToComplete(page) 
   await test.step('Verifying the My Views link is visible', async () => {
    await expect(
      page.locator(' li[role="presentation"]:has-text("My Views")')
    ).toBeVisible();
  });
  await test.step('Verifying the Shared Views link is visible', async () => {
    await expect(
      page.locator('li[role="presentation"]:has-text("Shared Views")')
    ).toBeVisible();
  });
  // Click a[role="tab"]:has-text("My Views")
  await test.step('Clicking on the My Views', async () => {
    await page.locator('li[role="presentation"]:has-text("My Views")').click();
  });
  await test.step('Verifying the Name is visible', async () => {
    await expect(
      page.locator('#viewsTab-tabpane-myViews >> text=Name ')
    ).toBeVisible();
  });
  await test.step('Verifying the Created is visible', async () => {
    await expect(
      page.locator('#viewsTab-tabpane-myViews th:has-text("Created")')
    ).toBeVisible();
  });
  // await expect(page.locator('#viewsTab-tabpane-myViews ')).toHaveAttribute("aria-hidden", "false")
  await test.step('Verifying the My Views table rows is visible', async () => {
    let myViews = await page.$$('#viewsTab-tabpane-myViews >> table>> tr');
    // console.log(myViews.length)
    await expect(myViews.length).toBeGreaterThan(0);
  });
  await test.step('Clicking on the Shared Views link', async () => {
    await page
      .locator('li[role="presentation"]:has-text("Shared Views")')
      .click();
  });
  // await expect(page.locator('button#viewsTab-tabpane-sharedViews')).toHaveAttribute("aria-hidden", "false")
  await test.step('Verifying the Name is visible', async () => {
    await expect(
      page.locator('#viewsTab-tabpane-sharedViews >> text=Name ')
    ).toBeVisible();
  });
  await test.step('Verifying the Created is visible', async () => {
    await expect(
      page.locator('#viewsTab-tabpane-sharedViews >> text=Created')
    ).toBeVisible();
  });
  await test.step('Verifying the sharedViews table rows is visible', async () => {
    let sharedViews = await page.$$(
      '#viewsTab-tabpane-sharedViews >> table>> tr'
    );
    await expect(sharedViews.length).toBeGreaterThan(0);
  });
});
test('PW-09.002 Customized filter fields', async ({ page }) => {
  const date = new Date();
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  await test.step('Clicking on the New Quote', async () => {
    await page.getByRole('link', { name: 'New Quote' }).first().click();
  });
  await test.step('Clicking on the Quote Name', async () => {
    await page.getByLabel('Quote Name').click();
  });
  await test.step('Filling quote name in Quote Name field', async () => {
    await page.getByLabel('Quote Name').fill(`test${date.getMilliseconds()}`);
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
    await waitForLoadingToComplete(page)  });
  await waitForLoadingToComplete(page)  
  await page.getByRole('button', { name: 'Select a client' }).click();
  await page.getByPlaceholder('Search by client name or number').click();
  await page
    .getByPlaceholder('Search by client name or number')
    .fill('test client');
  await waitForLoadingToComplete(page)  
  await page.locator('.form-check-input').first().click();
  // await page.getByRole('button', { name: 'Close' }).click();

  await test.step('Clicking on the Create', async () => {
    await page.getByRole('button', { name: 'Create' }).click();
  });
  await test.step('Clicking on the line-items', async () => {
    // await page.locator('li#quote-tabs_line-items').click();
    await page.locator('li.nav-item >> a[data-qa="quoteNavTabs__lineItems"]').click();
  });
  await test.step('Clicking on the New Line Item', async () => {
    await page.getByRole('link', { name: 'New Line Item' }).click();
  });
  await test.step('Clicking on the Hardware Hardware', async () => {
    // await page.getByRole('link', { name: 'Hardware Hardware' }).click();
    await page.locator('h5.card-title a.stretched-link').nth(2).click();
  });
  await test.step('Clicking on the plus icon', async () => {
    // await page.locator('svg.fa-plus').first().click();
    await page.locator('button[title="Add"] >> svg[data-icon="plus"]').first().click();
  });
  await test.step('Clicking on the quote tab notes', async () => {
    // await page.locator('li[id="quote-tabs_notes"]').click();
    await page.getByRole('tab', { name: 'Notes' }).click();
  });
  await test.step('Clicking on order notes text', async () => {
    // await page.locator('a:has-text("Order Notes:")').click();
    await page.locator('button:has-text("Add")').first().click();
  });
  // Click textarea
  await test.step('Clicking on text area ', async () => {
    await page.locator('textarea').nth(0).click();
  });
  // Fill textarea
  await test.step('Filling the order received text in the text area', async () => {
    await page.locator('textarea').nth(0).fill('test notes');
  });
  await test.step('Clicking on the Save', async () => {
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await page.locator('text=Cancel').click();
  await waitForLoadingToComplete(page) 
   await test.step('Clicking on the My Views tab ', async () => {
    // await page.locator('span[text="My Views"]').click();
    await page.locator('li.reports a[href="/views"]').click();
  });
  await test.step('Clicking on the New View', async () => {
    await page.getByRole('link', { name: 'New View' }).click();
  });
  await test.step('Clicking on the View Name', async () => {
    await page.getByLabel('View Name').click();
  });
  await test.step('Filling view name in view name field', async () => {
    let notes = `Hardware Test with notes ${date.getMilliseconds()}`;
    await page.getByLabel('View Name').fill(notes);
  });
  await test.step('Clicking on the Client or Company', async () => {
    await page.getByRole('tab', { name: 'Client / Company' }).click();
    await waitForLoadingToComplete(page)  });
  // await page.getByRole('checkbox', { name: 'Client' }).check();
  await test.step('Clicking on the Client', async () => {
    // await page.getByRole('checkbox', { name: 'Client' }).nth(1).check();
    await page.locator('#ClientId').check();
  });
  await test.step('Clicking on the Select Clients', async () => {
    await page.getByRole('button', { name: 'Select Clients' }).click();
  });
  await test.step('Clicking on the first row in table', async () => {
    await page
      .locator('tr.user-actionable input.form-check-input')
      .first()
      .check();
  });
  await test.step('Clicking on the Close', async () => {
    await page.getByText('Close').click();
  });
  await test.step('Clicking on the Client Integration ID', async () => {
    await page.getByLabel('Client Integration ID').check();
  });
  await test.step('Clicking on the Build client integrationID', async () => {
    await page
      .locator(
        'input[name="Build\\.TextFilters\\.ClientIntegrationID\\.Value"]'
      )
      .click();
  });
  await test.step('Filling Build client integrationID in client field', async () => {
    await page
      .locator(
        'input[name="Build\\.TextFilters\\.ClientIntegrationID\\.Value"]'
      )
      .fill('12345');
  });
  await test.step('Clicking on the Create', async () => {
    await page.getByRole('button', { name: 'Create' }).click();
  });
  await test.step('Clicking on the Display info tab ', async () => {
    await page.getByRole('tab', { name: 'Display info' }).click();
  });
  await test.step('Clicking on the add column dropdown in Display info tab', async () => {
    await page.locator('.wts-react-select__input-container').click();
  });
  await test.step('Selecting the first option in add column dropdown', async () => {
    await page.locator('#react-select-2-option-0').click();
  });
  await test.step('Clicking on the Create tab ', async () => {
    await page.getByRole('button', { name: 'Create' }).click();
  });
  await test.step('Clicking on the ellipsis icon', async () => {
    await page.locator('svg.fa-ellipsis').first().click();
  });
  // await page.getByRole('row', { name: notes }).getByRole('button', { name: 'Toggle Dropdown' }).click();
  await test.step('Clicking on the Edit', async () => {
    await page.getByRole('link', { name: 'Edit' }).click();
  });
  await test.step('Clicking on the Quote Review', async () => {
    await page.getByRole('tab', { name: 'Quote Review' }).click();
  });
  await test.step('Verifying the Reason is visible', async () => {
    await expect(page.getByText('Reason').nth(0)).toBeVisible();
  });
  await test.step('Verifying the Department is visible', async () => {
    await expect(page.getByText('Department')).toBeVisible();
  });
  await test.step('Verifying the Interior Exterior Delivery Date is visible', async () => {
    await expect(
      page.getByText('Interior/Exterior Delivery Date')
    ).toBeVisible();
  });
  await test.step('Verifying the Hardware Delivery Date is visible', async () => {
    await expect(page.getByText('Hardware Delivery Date')).toBeVisible();
  });
  await test.step('Verifying the Interior Exterior Invoice Number is visible', async () => {
    await expect(
      page.getByText('Interior/Exterior Invoice Number')
    ).toBeVisible();
  });
  await test.step('Verifying the Hardware Invoice Number is visible', async () => {
    await expect(page.getByText('Hardware Invoice Number')).toBeVisible();
  });
  await test.step('Verifying the Hardware Quote is visible', async () => {
    await expect(page.getByText('Hardware Quote')).toBeVisible();
  });
  await test.step('Verifying the Quote With Notes is visible', async () => {
    await expect(page.getByText('Quote With Notes')).toBeVisible();
  });
});
test('PW-09.003 Validate features of my views line item', async ({ page }) => {
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  // Click li:has-text("My Views")
  await test.step('Clicking on the My Views', async () => {
    await page.locator('li:has-text("My Views")').click();
  });
  await test.step('Verifying the breadcrumb My Views is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Views/
    );
    await waitForLoadingToComplete(page)  });
  await test.step('Waiting for the My Views table is visible', async () => {
    await page.waitForSelector(
      '#viewsTab-tabpane-myViews>> table>> tr >> nth=1',
      { state: 'visible', timeout: 2000 }
    );
  });
  await test.step('Verifying the Views in My Views table', async () => {
    let viewItem = await page.$$(
      '#viewsTab-tabpane-myViews>> table>>tbody>> tr'
    );
    // console.log(viewItem.length)
    await expect(viewItem.length).toBeGreaterThan(0);
    for (let i = 0; i < viewItem.length; i++) {
      await expect(
        page.locator(`#viewsTab-tabpane-myViews a[title="View"]  >>nth=${i}`)
      ).toBeVisible();
    }
  });
  let firstViewName = await page
    .locator('div.tab-content table tr a >>nth=1')
    .innerText();
  // console.log("firstViewName", firstViewName)
  await test.step('Clicking on the View', async () => {
    await page
      .locator('#viewsTab-tabpane-myViews a[title="View"] >>nth=0')
      .click();
  });
  await test.step('Verifying the firstViewName breadcrumb is active', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      firstViewName
    );
  });
  // !! unable to see entries
  // Click text=Edit ViewShow 1025 entries >> button
  // await test.step('Verifying the text Showing is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/Showing/);
  // });
  // await test.step('Verifying the text to is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/to/);
  // });
  // await test.step('Verifying the text of is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/of/);
  // });
  // await test.step('Verifying the text entries is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/entries/);
  // });
  // await page.locator('button.ellipsis-menu').first().click()
  // await page.getByRole('link', { name: 'Edit' }).click();
  await test.step('Clicking on the Edit View', async () => {
    await page.getByRole('link', { name: 'Edit View' }).click();
  });
  // await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
  //   `Edit View ${firstViewName}`
  // );
  await test.step('Clicking on the ClientCompany', async () => {
    await page.locator('a[data-rr-ui-event-key="ClientCompany"]').click();
    await waitForLoadingToComplete(page)  });
  // Click text=Edit View
  // await page.getByRole('link', { name: 'Edit View' }).click();
  // await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
  //   `Edit View ${firstViewName}`
  // );

  // await page.waitForSelector(
  //   '#filter-field-ClientId >> text=Client >> nth=0',
  //   { state: 'visible', timeout: 15000 }
  // );
  // await page.getByRole('link', { name: 'Edit' }).click();
  // await page.locator('tr.user-actionable input.form-check-input >> nth=0').click();
  // await page.getByRole('checkbox', { name: 'Client' }).check();
  await test.step('Clicking on the Client', async () => {
    // await page.getByRole('checkbox', { name: 'Client' }).check();
    await page.locator("//input[@id='ClientId']").check()
  });
  const selectButton = await page.$$("text='0 selected'");
  if (selectButton.length > 0) {
    await test.step('Clicking on the Select Clients', async () => {
      await page.getByRole('button', { name: 'Select Clients' }).click();
    });
    await test.step('Selecting the first client', async () => {
      await page
        .locator('tr.user-actionable input.form-check-input >> nth=0')
        .click();
      await waitForLoadingToComplete(page)    });
  }
  await test.step('Clicking on the Select Clients', async () => {
    await page.locator('text=Select Clients').click();
    await waitForLoadingToComplete(page)  });
  // Click tr.user-actionable input.form-check-input
  await test.step('Selecting the first client', async () => {
    await page
      .locator('tr.user-actionable input.form-check-input >> nth=0')
      .click();
    await waitForLoadingToComplete(page)  });
  // Click text=Select Clients
  await test.step('Clicking on the Close', async () => {
    await page.getByText('Close').click();
    await waitForLoadingToComplete(page)  });
  await test.step('Clicking on the Select Clients', async () => {
    await page.locator('text=Select Clients').first().click();
    await waitForLoadingToComplete(page)  });
  // Check text=Select All >> input[type="checkbox"]
  await test.step('Clicking on the Select Visible', async () => {
    await page.getByLabel('Select Visible').check();
  });
  await test.step('Clicking on the Close', async () => {
    await page.getByText('Close').click();
  });
  // Click text=×Close
  // await page.locator('text=×Close').click();
  // Click text=Update
  await test.step('Clicking on the Update', async () => {
    await page.locator('text=Update').click();
  });
  await test.step('Verifying the success notification is visible', async () => {
    await page.locator('.notification-success').isVisible();
  });
  // await expect(page.locator('text=View updated ×')).toBeVisible()
  await test.step('Waiting for the view in myviews', async () => {
    await page.waitForSelector(
      '#viewsTab-tabpane-myViews a[title="View"] >>nth=0',
      { state: 'hidden', timeout: 5000 }
    );
  });
  await test.step('Clicking on the View', async () => {
    await page
      .locator('#viewsTab-tabpane-myViews a[title="View"] >>nth=0')
      .click();
    await waitForLoadingToComplete(page)  });
  // Click text=Edit ViewShow 1025 entries >> button
  // await page.locator('text=Edit ViewShow 1025 entries >> button').click();
  // await test.step('Verifying the text Showing is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/Showing/);
  // });
  // await test.step('Verifying the text to is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/to/);
  // });
  // await test.step('Verifying the text of is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/of/);
  // });
  // await test.step('Verifying the text entries is visible', async () => {
  //   await expect(page.locator('div.pagination')).toHaveText(/entries/);
  //   awaitwaitForLoadingToComplete(page)  // });
  // Click text=Edit View
  // await page.locator('text=Edit View').click();
  // Uncheck text=Client Select Clients (5 selected) >> input[type="checkbox"]
  await test.step('Clicking on the Edit View', async () => {
    await page.getByRole('link', { name: 'Edit View' }).click();
  });
  await test.step('Clicking on the ClientCompany', async () => {
    await waitForLoadingToComplete(page)   
     await page.locator('a[data-rr-ui-event-key="ClientCompany"]').click();
    await waitForLoadingToComplete(page)  });
  // await expect(page.getByText('(3 selected)')).toBeVisible();
  await test.step('Clicking on the Select Clients', async () => {
    await page.getByRole('button', { name: 'Select Clients' }).click();
    await waitForLoadingToComplete(page)  });
  await test.step('Clicking on the Select Visible', async () => {
    await page.getByLabel('Select Visible').uncheck();
  });
  await test.step('Clicking on the Close', async () => {
    await page.getByText('Close').click();
  });
  await test.step('Clicking on the Select Clients', async () => {
    await page.getByRole('button', { name: 'Select Clients' }).click();
  });
  await test.step('Selecting the first client', async () => {
    await page
      .locator('tr.user-actionable input.form-check-input >> nth=0')
      .click();
    await waitForLoadingToComplete(page)  });
  // Click text=Select Clients
  await test.step('Clicking on the Close', async () => {
    await page.getByText('Close').click();
  });
  // await page.getByText('Close').click();
  await test.step('Clicking on the Update', async () => {
    await page.locator('text=Update').click();
    await waitForLoadingToComplete(page)  });
  // for (let i = 0; i < viewItem.length; i++) {
  //   await expect(
  //     page.locator(` #viewsTab-tabpane-myViews a[title="Edit"]   >>nth=${i}`)
  //   ).toBeVisible();
  // }
  await test.step('Clicking on the ellipsis icon', async () => {
    await page.locator('svg[data-icon="ellipsis"] >>nth=0').click();
  });
  await test.step('Clicking on the Edit', async () => {
    await page.getByRole('link', { name: 'Edit' }).click();
  });
  // await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
  //   `Edit View ${firstViewName}`
  // );
  await test.step('Clicking on the ClientCompany', async () => {
    await page.locator('a[data-rr-ui-event-key="ClientCompany"]').click();
  });
  await test.step('Clicking on the Select Clients', async () => {
    await page.getByRole('button', { name: 'Select Clients' }).click();
  });
  // Click tr.user-actionable input.form-check-input
  await test.step('Selecting the first client', async () => {
    await page
      .locator('tr.user-actionable input.form-check-input')
      .first()
      .click();
  });
  await test.step('Clicking on the Close', async () => {
    await page.getByText('Close').click();
  });
  // Click text=Select Clients
  await test.step('Clicking on the Select Clients', async () => {
    await page.locator('text=Select Clients').first().click();
  });
  // Check text=Select All >> input[type="checkbox"]
  // await page.locator('text=Select All >> input[type="checkbox"]').check();
  await test.step('Clicking on the Select Visible', async () => {
    await page.getByLabel('Select Visible').check();
  });
  // Click text=×Close
  await test.step('Clicking on the Close', async () => {
    await page.locator('text=Close').click();
  });
  // Click text=Update
  await test.step('Clicking on the Update', async () => {
    await page.locator('text=Update').click();
  });
  await test.step('Verifying the success notification is visible', async () => {
    await page.locator('.notification-success').isVisible();
  });
  // await expect(page.locator('text=View updated ×')).toBeVisible()
  // await page
  //   .locator('#viewsTab-tabpane-myViews a[title="Edit"] >>nth=0')
  //   .click();
  // Uncheck text=Client Select Clients (5 selected) >> input[type="checkbox"]
  // await page
  //   .locator(
  //     'text=Client Select Clients (5 selected) >> input[type="checkbox"]'
  //   )
  //   .uncheck();
  // await test.step('Clicking on the ellipsis icon', async () => {
  //   await page.locator('svg[data-icon="ellipsis"] >>nth=0').click();
  // });
  // await test.step('Clicking on the Edit', async () => {
  //   await page.getByRole('link', { name: 'Edit' }).click();
  // });
  // // await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
  // //   `Edit View ${firstViewName}`
  // // );
  // await test.step('Clicking on the ClientCompany', async () => {
  //   await page.locator('a[data-rr-ui-event-key="ClientCompany"]').click();
  // });
  // await test.step('Clicking on the Select Clients', async () => {
  //   await page.locator('text=Select Clients').click();
  // });
  // await test.step('Clicking on the Select Visible', async () => {
  //   await page.getByLabel('Select Visible').uncheck();
  // });
  // await test.step('Clicking on the Close', async () => {
  //   await page.getByText('Close').click();
  // });
  // await test.step('Clicking on the Select Clients', async () => {
  //   await page.getByRole('button', { name: 'Select Clients' }).click();
  // });
  // await test.step('Selecting the first client', async () => {
  //   await page
  //     .locator('tr.user-actionable input.form-check-input >> nth=0')
  //     .click();
  //   awaitwaitForLoadingToComplete(page)  // });
  // await test.step('Clicking on the Select Visible', async () => {
  //   await page.getByLabel('Select Visible').uncheck();
  // });
  // await test.step('Clicking on the Close', async () => {
  //   await page.getByText('Close').click();
  // });
  // await test.step('Clicking on the Update', async () => {
  //   await page.locator('text=Update').click();
  // });
  // await test.step('Verifying the success notification is visible', async () => {
  //   await page.locator('.notification-success').isVisible();
  // });
  // await expect(page.locator('text=View updated ×')).toBeVisible()
  // for (let i = 0; i < viewItem.length; i++) {
  //   await expect(
  //     page.locator(
  //       ` #viewsTab-tabpane-myViews button[title="Copy"]>>nth=${i}`
  //     )
  //   ).toBeVisible();
  // }
  await test.step('Clicking on the ellipsis icon', async () => {
    await page.locator('svg[data-icon="ellipsis"] >> nth=0').click();
  });
  await test.step('Clicking on the Copy', async () => {
    await page.getByRole('button', { name: 'Copy' }).click();
  });
  // await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
  //   `Edit View ${firstViewName}-Copy1`
  // );
  // Click text=Cancel
  await waitForLoadingToComplete(page)
  await test.step('Clicking on the Cancel', async () => {
    await page.getByRole('button', { name: 'Cancel' }).click();
  });
  // for (let i = 0; i < viewItem.length; i++) {
  //   await expect(
  //     page.locator(
  //       ` #viewsTab-tabpane-myViews button[title="Delete"]>>nth=${i}`
  //     )
  //   ).toBeVisible();
  // }
  page.once('dialog', (dialog) => {
    // console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toEqual('Are you sure?');
    dialog.dismiss().catch(() => { });
  });
  await test.step('Clicking on the ellipsis icon', async () => {
    await page.locator('svg[data-icon="ellipsis"] >>nth=0').click();
  });
  await test.step('Clicking on the Delete', async () => {
    await page.getByRole('button', { name: 'Delete' }).click();
  });
  await test.step('Verifying the View deleted is visible', async () => {
    await expect(page.getByText('View deleted')).toBeVisible();

  });
});
test('PW-09.004 Validate Shared views features', async ({ page }) => {
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  // Click li:has-text("My Views")
  await test.step('Clicking on the My Views tab', async () => {
    await page.locator('li:has-text("My Views")').click();
  });
  await test.step('Verifying the breadcrumb My Views is ative', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Views/
    );
  });
  // Click text=Shared Views
  await test.step('Clicking on the Shared Views', async () => {
    await page.locator('text=Shared Views').click();
    await waitForLoadingToComplete(page)  });
  await test.step('Waiting for the shared views table is visible', async () => {
    await page.waitForSelector(
      '#viewsTab-tabpane-sharedViews table tr >> nth=1',
      { state: 'visible', timeout: 2000 }
    );
  });
  await test.step('Verifying the Name in sharedViews is visible', async () => {
    await expect(
      page.locator('#viewsTab-tabpane-sharedViews >> text=Name ')
    ).toBeVisible();
  });
  await test.step('Verifying the Created in sharedViews is visible', async () => {
    await expect(
      page.locator('#viewsTab-tabpane-sharedViews >> text=Created')
    ).toBeVisible();
  });

  let sharedViewItem = await page.$$(
    '#viewsTab-tabpane-sharedViews>> table>>tbody>> tr'
  );
  // console.log(sharedViewItem.length)
  await test.step('Verifying the sharedViews table rows is visible', async () => {
    await expect(sharedViewItem.length).toBeGreaterThan(0);
    for (let i = 0; i < sharedViewItem.length; i++) {
      await expect(
        page.locator(
          ` #viewsTab-tabpane-sharedViews a[title="View"]  >>nth=${i}`
        )
      ).toBeVisible();
    }
  });
  let sharedView = await page
    .locator('#viewsTab-tabpane-sharedViews a')
    .nth(1)
    .innerText();
  await test.step('Clicking on the View', async () => {
    await page
      .locator('#viewsTab-tabpane-sharedViews a[title="View"] >>nth=0')
      .click();
  });
  await test.step('Verifying the breadcrumb sharedView is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      sharedView
    );
  });
  await test.step('Clicking on the Quote Number', async () => {
    await page.locator('th:has-text("Quote Number")').click();
    await waitForLoadingToComplete(page)  });
  await test.step('Verifying the Quote Number is visible', async () => {
    await expect(
      page.locator('th:has-text("Quote Number") >> svg.fa-sort-up')
    ).toBeVisible();
    await waitForLoadingToComplete(page)   
  });
  let quoteItemNumber = await page.locator('tr td a >> nth=3').innerText();
  // console.log(quoteItemNumber)
  await test.step('Clicking on the Details', async () => {
    await page.locator('a[title="Details"]>>nth=0').click();
    await waitForLoadingToComplete(page)  });
  await test.step('Verifying the quote number breadcrumb is visible', async () => {
    await page.waitForSelector('ol.breadcrumb li.active', {
      state: 'visible',
      timeout: 30000,
    });
  });
  await expect(page.locator('#quote-title')).toContainText(
    `${quoteItemNumber}`
  );
  await test.step('Verifying the text Showing is visible', async () => {
    await expect(page.locator('li.breadcrumb-item.active span')).toContainText(
      `${quoteItemNumber}`
    );
  });
  await test.step('Clicking on the Back to View', async () => {
    await page
      .getByRole('link', { name: `Back to View ${sharedView}` })
      .click();
    await waitForLoadingToComplete(page)  });
  await test.step('Clicking on the Customer', async () => {
    await page.locator('a[title="Customer"]>>nth=0').click();
    await waitForLoadingToComplete(page)  });
  await test.step('Verifying the breadcrumb Customer is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Customer/
    );
  });
  await test.step('Clicking on the Back to View ', async () => {
    await page
      .getByRole('link', { name: `Back to View ${sharedView}` })
      .click();
  });
  await test.step('Clicking on the Line Items', async () => {
    await page.locator('a[title="Line Items"] .badge >> nth=0').click();
  });
  await test.step('Verifying the breadcrumb Line Items is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /Line Items/
    );
  });
  await test.step('Verifying the Back to View is visible', async () => {
    await expect(
      page.getByRole('link', { name: `Back to View ${sharedView}` })
    ).toBeVisible();
  });;
  await test.step('Verifying the line-item is visible', async () => {
    await expect(page.locator('div.line-item >> nth=0')).toBeVisible();
  });
  // Click text=Back to View Advanced Views Back to View test share
  await test.step('Clicking on the Back to View', async () => {
    await page
      .getByRole('link', { name: `Back to View ${sharedView}` })
      .click();
  });
});
test('PW-09.005 Validate user agreement section and search functionality', async ({
  page,
}) => {
  await test.step('Navigate to ABS application', async () => {
    await page.goto('/');
  });
  // Click li:has-text("My Views")
  await test.step('Clicking on the My Views', async () => {
    await page.locator('li:has-text("My Views")').click();
  });
  await test.step('Verifying the breadcrumb My Views is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      /My Views/
    );
    await waitForLoadingToComplete(page)  });
  await test.step('Verifying the myViews table is visible', async () => {
    await page.waitForSelector(
      '#viewsTab-tabpane-myViews >> table>> tr >> nth=1',
      { state: 'visible', timeout: 2000 }
    );
  });
  //!!creating new view and searching the quote title
  await page.getByRole('link', { name: 'My Quotes' }).click();
await waitForLoadingToComplete(page)  
  let groupBy = await page.$$('.form-check-input:checked');
  if (groupBy.length == 1) {
    await page.locator('input[id="groupByProjectsCheckbox"]').click();
  }
await waitForLoadingToComplete(page)  
  await page.locator('a[title="Details"]').nth(1).click()
  let quoteName = await page.locator('#quote-title').innerText();
  quoteName = quoteName.substring(6, quoteName.length);

  await test.step('Clicking on the Search', async () => {
    await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
  });
  await test.step('Verifying the Search by Quote field is visible', async () => {
    await expect(
      page.getByRole('combobox', { name: 'Type in a quote, order, or' })
    ).toBeVisible();
  });
  // Fill [placeholder="My Quote\, Order\, Plan Number"]
  // await page.locator('[placeholder="My Quote\\, Order\\, Plan Number"]').fill(quoteName);
  await test.step('Filling quote name in Search by Quote field', async () => {
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).fill(quoteName);
  });
  // Click input:has-text("Search")
  await test.step('Clicking on search button', async () => {
    await page.getByRole('link', { name: 'Details' }).click();
  });
  await test.step('Verifying the breadcrumb quote name is visible', async () => {
    await expect(page.locator('ol.breadcrumb li.active')).toHaveText(
      `Quote ${quoteName}`
    );
  });
  await test.step('Verifying the text Owner is visible', async () => {
    await expect(page.locator('text=Owner')).toBeVisible();
  });
  await test.step('Verifying the text Created is visible', async () => {
    await expect(page.locator('text=Created')).toBeVisible();
  });
  await test.step('Verifying the text Client is visible', async () => {
    await expect(page.locator('text=Client').nth(0)).toBeVisible();
  });

  await test.step('Clicking on Customer ', async () => {
    await page.getByRole('link', { name: 'My Customers' }).click();
  })
  await page.getByRole('link', { name: 'My Quotes' }).click();
  const select = page.locator('select.form-select');
  await select.click();
  await expect(select.locator('option')).toContainText(['Number']);
  const options = select.locator('option');
  await expect(options).toContainText(['Number', 'Name', 'Client', 'PO Number']);

  await test.step('Clicking on the Search', async () => {
    await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
  });
  // Fill [placeholder="My Quote\, Order\, Plan Number"]
  await test.step('Filling quote name in Search by Quote field', async () => {
    await page.getByRole('combobox', { name: 'Type in a quote, order, or' }).fill('invalide 1233 quote');
  });
  await test.step('Verifying the text No Results is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'No Results' })
    ).toBeVisible();
  });
  await test.step('Clikcing on the advanced search', async () => {
    await page.getByRole('link', { name: 'Advanced Search' }).click();
  });
  await test.step('Clicking on close button', async () => {
    await page.getByRole('button', { name: 'Cancel' }).click();
  });
  await userAgreementPage(page);
});
