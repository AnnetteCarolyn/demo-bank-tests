import { test, expect } from '@playwright/test';
 
 test.describe('Pulpit tests', () => {
test.describe.configure({retries:3});
test('quick payment with correct data', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('login-input').press('Tab');
  await page.getByRole('link', { name: 'Demobank w sam raz do testów' }).press('Tab');
  await page.getByTestId('password-input').fill('password');
  await page.getByTestId('login-button').click();

  await page.waitForLoadState("domcontentloaded");

  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_amount').fill('100');
  await page.locator('#widget_1_transfer_title').fill('pizza');
  await page.getByRole('button', { name: 'wykonaj' }).click();
  // await page.locator ('#execute_btn').click();
  await page.getByTestId('close-button').click();
//   await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 100,00PLN - pizza' }).click();

  await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 100,00PLN - pizza');
});
    test('successful mobile top-up', async ({ page }) => {
      await page.goto('https://demo-bank.vercel.app/');
     // await page.getByTestId('login-input').click();
      await page.getByTestId('login-input').fill('testerAW');
      await page.getByTestId('login-input').press('Tab');
      await page.getByRole('link', { name: 'Demobank w sam raz do testów' }).press('Tab');
      await page.getByTestId('password-input').fill('hhhhhhhh');
      await page.getByTestId('login-button').click();
     // await page.waitForLoadState("domcontentloaded");
      await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
     // await page.locator('#widget_1_topup_amount').click();
      await page.locator('#widget_1_topup_amount').fill('50');
     // await page.locator('#uniform-widget_1_topup_agreement span').click();
     await page.locator('#widget_1_topup_agreement').click();
      await page.getByRole('button', { name: 'doładuj telefon' }).click();
      await page.getByText('Doładowanie wykonane!Kwota:').click();
    //  await page.waitForLoadState("domcontentloaded");
      await page.getByTestId('close-button').click();

    //  await expect(page.locator('#ui-id-2')).toHaveText('Doładowanie wykonane');

      await page.waitForLoadState("domcontentloaded");
     // await page.getByRole('link', { name: 'Doładowanie wykonane! 50,' }).click();

     // await.expect(page.locator('#ui-id-2')).toHaveText('Doładowanie wykonane');
     await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 503 xxx xxx');
    });


     });