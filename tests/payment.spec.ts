import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const UserPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(UserPassword);
    await loginPage.loginButton.click();

    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Lulek Ohoho';
    const transferAccount = '12 3456 7890 1234 5678 9012 3456';
    const transferAmount = '20';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Lulek Ohoho`;

    //Act
    // await page.getByTestId('transfer_receiver').fill(transferReceiver);
    // await page.getByTestId('form_account_to').fill(transferAccount);
    // await page.getByTestId('form_amount').fill(transferAmount);
    // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    // await page.getByTestId('close-button').click();

    // //Assert
    // await expect(page.locator('#show_messages')).toHaveText(expectedMessage);

    //Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferToInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);

    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();

    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
