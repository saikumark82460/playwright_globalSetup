import { test, expect } from '@playwright/test';
import { externalAuthKeys } from '../utils/webcp/customer-auth-keys';
import { useUser } from '../utils/webcp/authenticate';
import { searchByQuoteNumber, userAgreementPage, waitForLoadingToComplete } from './utils';
useUser(test, externalAuthKeys);
test('PW-12.001 Validate Quick configure functionality', async ({ page }) => {
  await test.step('Navigating to ABS application', async () => {
    await page.goto('/');
  });
  await test.step('Verifying the title Home TALON American Building Supply is visible', async () => {
    expect(await page.title()).toBe('TALON: American Building Supply');
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Quick configure button', async () => {
    await page.locator('a[data-qa="cs_quick-configure-btn"]').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Select Brand is visible', async () => {
    await expect(page.locator('h3:has-text("Select Brand")')).toBeVisible();
  });
  await test.step('Verifying the breadcrumb Create Line is active', async () => {
    await expect(page.locator('li.breadcrumb-item >> a').nth(3)).toHaveText(/Line Items/);
  });
  await test.step('Clicking on the Exterior image', async () => {
    await page.getByRole('link', { name: 'Exterior' }).click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Product Selection is visible', async () => {
    await expect(
      page.locator('li[role="presentation"] >> text=Product Selection')
    ).toBeVisible();
  });
  await test.step('Verifying on the breadcrumb Product Selection is active', async () => {
    await expect(page.locator('button.nav-link.active')).toHaveText('Product Selection');
  });
  await test.step('Verifying the text Keep making selections to see an image is visible', async () => {
    await expect(
      page.locator('text=Keep making selections to see an image!')
    ).toBeVisible();
  });
  await test.step('Verifying the Tab section', async () => {
    await expect(page.getByText('Tab Section')).toBeVisible();
  });
  await test.step('Clicking on the Tab section dropdown', async () => {
    await page.locator('.wts-react-select__input-container').click();
  });
  await test.step('Clicking on the Fiberglass Doors', async () => {
    await page
      .locator('#react-select-2-option-0')
      .getByText('Fiberglass Doors')
      .click();
  });
  await test.step('Verifying the Configuration is visible', async () => {
    await expect(page.getByText('Configuration')).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Configuration dropdown', async () => {
    await page.locator('.wts-react-select__input-container >> nth=1').click();
  });
  await test.step('Clicking on the Slab only option', async () => {
    await page.locator('#react-select-3-option-0').click();
  });
  await test.step('Clicking on the Number Wide option', async () => {
    await expect(page.getByText('Number Wide')).toBeVisible();
  });
  await test.step('Verifying the breadcrumb Product Selection is active', async () => {
    await expect(
      page.locator('li[data-pdm-step-name="Product Selection"]')
    ).toHaveClass(/active/);
  });
  await test.step('Verifying the Configuration & Dimensions is visible', async () => {
    await expect(
      page.locator('#nextStep')
    ).toBeVisible();
  });
  await test.step('Clicking on the Configuration & Dimensions', async () => {
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the breadcrumb Configuration & Dimensions is active', async () => {
    await expect(
      page.locator('li[data-pdm-step-name="Configuration & Dimensions"]')
    ).toHaveClass(/active/);
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Handing is visible', async () => {
    await expect(page.getByText('Handing')).toBeVisible();
  });
  await test.step('Verifying the Call Width is visible', async () => {
    await expect(page.getByText('Call Width')).toBeVisible();
  });
  await test.step('Verifying the Call Height is visible', async () => {
    await expect(page.getByText('Call Height')).toBeVisible();
  });
  await test.step('Clicking on the Handling dropdown', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
  });
  await test.step('Clicking on the Right Hand Inswing option', async () => {
    await page.locator('#react-select-5-option-0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the call width dropdown', async () => {
    await page.locator('.wts-react-select__input-container').nth(1).click();
  });
  await test.step('Clicking on the 2/0 option', async () => {
    await page.locator('#react-select-6-option-0').getByText('2/0').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the call height dropdown', async () => {
    await page.locator('.wts-react-select__input-container').nth(2).click();
  });
  await test.step('Clicking on the 6/8 option', async () => {
    await page.locator('#react-select-7-option-0').getByText('6/8').click();
    await waitForLoadingToComplete(page)
  });

  await test.step('Clicking on the Door Model Options', async () => {
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the breadcrumb Door Model Options is active', async () => {
    await expect(
      page.locator('li[data-pdm-step-name="Door Model Options"]')
    ).toHaveClass(/active/);
  });
  await test.step('Clicking on Door Cutout Shape', async () => {
    await page.getByText('Door Cutout Shape').click();
  });
  await test.step('Verifying the Door Glass Style is visible', async () => {
    await expect(page.getByText('Door Glass Style')).toBeVisible();
  });
  await test.step('Verifying the Door Cutout Size is visible', async () => {
    await expect(page.getByText('Door Cutout Size')).toBeVisible();
  });
  await test.step('Verifying the Door Skin Type is visible', async () => {
    await expect(page.getByText('Door Skin Type')).toBeVisible();
  });
  await test.step('Verifying the Series is visible', async () => {
    await expect(page.getByText('Series')).toBeVisible();
  });
  await test.step('Verifying the Door Panel Configuration is visible', async () => {
    await expect(page.getByText('Door Panel Configuration')).toBeVisible();
  });
  await test.step('Verifying the Door Grid Pattern is visible', async () => {
    await expect(page.getByText('Door Grid Pattern')).toBeVisible();
  });
  await test.step('Verifying the Door Grid Pattern is visible', async () => {
    await expect(page.getByText('Door Grid Pattern')).toBeVisible();
  });
  await test.step('Verifying the Door Grid Option is visible', async () => {
    await expect(page.getByText('Door Glass Option')).toBeVisible();
  });
  await test.step('Verifying the Door Caming is visible', async () => {
    await expect(page.getByText('Door Caming')).toBeVisible();
  });
  await test.step('Clicking on the DoorCutOut Shape dropdown', async () => {
    await page.locator('.wts-react-select__input-container').first().click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the No Cutout', async () => {
    await page
      .locator('#react-select-8-option-0')
      .getByText('No Cutout')
      .click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Accessories & Door Prep', async () => {
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await waitForLoadingToComplete(page)
  await test.step('Clicking on the Prehanging Options', async () => {
    await page.locator('#nextStep').click();
  });
  await waitForLoadingToComplete(page)
  await test.step('Clicking on the Door Bottom dropdown', async () => {
    await page
      .locator(
        'div[data-pdm-question-text="Door Bottom"] .wts-react-select-container'
      )
      .click();
  });
  await test.step('Clicking on the No Door Bottom', async () => {
    await page.locator('text="No Door Bottom"').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the Order Confirmation', async () => {
    await page.locator('#nextStep').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the breadcrumb Order Confirmation is active', async () => {
    await expect(
      page.locator('li[data-pdm-step-name="Order Confirmation"]')
    ).toHaveClass(/active/);
  });
  await test.step('Verifying the Confirm Height is visible', async () => {
    await expect(page.getByText('Confirm Height')).toBeVisible();
  });
  await test.step('Verifying the Slab Width is visible', async () => {
    await expect(page.getByText('Slab Width')).toBeVisible();
  });
  await test.step('Verifying the Slab Height is visible', async () => {
    await expect(page.getByText('Slab Height')).toBeVisible();
  });
  await test.step('Clicking on the Confirm Height dropdown', async () => {
    await page.locator('.wts-react-select__input-container').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on the yes Height is correct option', async () => {
    await page.locator('text="Yes, Height is correct"').click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Add to Quote is visible', async () => {
    await expect(page.locator('text=Add to Quote >> nth=0')).toBeVisible();
  });
  await test.step('Verifying the Summary is visible', async () => {
    await expect(page.locator('text=Summary')).toBeVisible();
  });
  await test.step('Clicking on the Summary', async () => {
    await page.getByRole('button', { name: 'Summary' }).click();
  });
  // LC await expect(
  //   page.locator('a[role="button"]:has-text("Details")')
  // ).toBeVisible();
  await test.step('Verifying the Details is visible', async () => {
    await expect(page.getByText('Details')).toBeVisible();
  });
  //FLOW CHANGE(UI)
  await test.step('Clicking on the Pricing', async () => {
    await page.getByRole('tab', { name: 'Pricing' }).click();
  });
  //UI change await expect(page.locator("text=List: $")).toBeVisible();
  //UI CHANGE await expect(page.locator("text=Slab Price: $")).toBeVisible();
  //UI CHANGE await expect(page.locator('text=Frame Price: $')).toBeVisible()
  // await page.locator('a[role="button"]:has-text("Details")').click();
  await test.step('Verifying the List is visible', async () => {
    await expect(await page.locator('strong:has-text("List:")')).toBeVisible();
  });
  await test.step('Verifying the Slab Price is visible', async () => {
    await expect(page.getByText('Slab Price:')).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Close is visible', async () => {
    await page.getByRole('button', { name: 'Close' }).click();
  });
  //LC await expect(page.locator('label:has-text("Quantity")')).toBeVisible();
  await test.step('Verifying the Quantity is visible', async () => {
    await expect(page.getByText('Quantity')).toBeVisible();
  });
  await test.step('Verifying the Start Over is visible', async () => {
    await expect(
      page.getByRole('button', { name: 'Start Over' })
    ).toBeVisible();
  });
  //LC await expect(
  //   page.locator('button:has-text("Cancel")>>nth=1')
  // ).toBeVisible();
  await test.step('Verifying the Cancel is visible', async () => {
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });
  await test.step('Verifying the Add to Quote is visible', async () => {
    await expect(page.locator('button:has-text("Add to Quote")')).toBeVisible();
  });
  await test.step('Verifying the drawing img is visible', async () => {
    await expect(page.locator('.drawing img')).toBeVisible();
    await waitForLoadingToComplete(page)
  });
  await test.step('Verifying the Save & Copy is visible', async () => {
    await expect(page.locator('button:has-text("Save & Copy")')).toBeVisible();
  });
  await test.step('Clicking on  the Save & Copy', async () => {
    await page.getByRole('button', { name: 'Save & Copy' }).click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on  the Save & New', async () => {
    await page.getByRole('button', { name: 'Save & New' }).click();
    await waitForLoadingToComplete(page)
  });
  await test.step('Clicking on  the Save & Copy', async () => {
    await expect(page.locator('h3:has-text("Select Brand")')).toBeVisible();
  });
  await test.step('Verifying the breadcrumb Create Line is active', async () => {
    await expect(page.locator('li.breadcrumb-item >> a').nth(3)).toHaveText(/Line Items/);
  });
  await test.step('Clicking on  the Line Items', async () => {
    await page.locator('text=Line Items').click();
    await waitForLoadingToComplete(page)
  });
  await searchByQuoteNumber(page);
  await userAgreementPage(page);
});