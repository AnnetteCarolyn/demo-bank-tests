import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'testerAW';
    const UserPassword = 'hhhhhhhh';

    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(UserPassword);
    await page.getByTestId('login-button').click();
  });
  test.describe.configure({ retries: 3 });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverID = '2';
    const transferAmount = '100';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act

    await page.waitForLoadState('domcontentloaded');

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    // await page.locator ('#execute_btn').click();
    await page.getByTestId('close-button').click();
    //   await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 100,00PLN - pizza' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const chosenNumber = '503 xxx xxx';
    const topupAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${chosenNumber}`;

    //Act
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').selectOption(chosenNumber);
    // await page.locator('#widget_1_topup_amount').click();
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByText('Doładowanie wykonane!Kwota:').click();
    //  await page.waitForLoadState("domcontentloaded");
    await page.getByTestId('close-button').click();
    //  await expect(page.locator('#ui-id-2')).toHaveText('Doładowanie wykonane');
    await page.waitForLoadState('domcontentloaded');
    // await page.getByRole('link', { name: 'Doładowanie wykonane! 50,' }).click();

    // await.expect(page.locator('#ui-id-2')).toHaveText('Doładowanie wykonane');

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
