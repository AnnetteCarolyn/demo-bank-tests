import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { PulpitData } from '../test-data/pulpit.data';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const UserPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await loginPage.login(userID, UserPassword);
  });
  test.describe.configure({ retries: 3 });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange

    // const transferReceiver = PulpitData.receiverID;
    // const transferAmount =  PulpitData.chosenAmount;
    // const transferTitle = PulpitData.chosenTitle;
    // const expectedTransferReceiver = 'Chuck Demobankowy';
    const transferConfirmation = PulpitData.expectedConfirmationText;

    //Act

    await page.waitForLoadState('domcontentloaded');

    // await pulpitPage.transferReceiver.click();
    // await pulpitPage.transferReceiver.selectOption(PulpitData.receiverID);
    // await pulpitPage.transferAmount.click();

    // await pulpitPage.prepareTransfer(PulpitData.receiverID, PulpitData.chosenAmount, PulpitData.chosenTitle);

    await pulpitPage.transferReceiver.selectOption(PulpitData.receiverID);
    await pulpitPage.transferAmount.click();
    await pulpitPage.transferAmount.fill(PulpitData.chosenAmount);
    await pulpitPage.transferTitle.fill(PulpitData.chosenTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(pulpitPage.transferConfirmation).toHaveText(
      PulpitData.expectedConfirmationText(
        'Chuck Demobankowy',
        PulpitData.chosenAmount,
        'pizza',
      ),
    );
    // await expect(page.locator('#show_messages')).toHaveText(
    //  `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const chosenNumber = '503 xxx xxx';
    const topupAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${chosenNumber}`;

    //Act
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').click();
    await pulpitPage.topUpReceiver.selectOption(chosenNumber);
   //await page.locator('#widget_1_topup_receiver').click();
    await page.locator('#widget_1_topup_amount').click();
    await pulpitPage.topUpAmount.fill(topupAmount);
   // await pulpitPage.executeMobileTopUp(chosenNumber, topupAmount)
     await page.locator('#uniform-widget_1_topup_agreement span').click();
   //await page.locator('#widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByText('Doładowanie wykonane!Kwota:').click();
    //  await page.waitForLoadState("domcontentloaded");
    await page.getByTestId('close-button').click();
    //  await expect(page.locator('#ui-id-2')).toHaveText('Doładowanie wykonane');
    await page.waitForLoadState('domcontentloaded');
    // await page.getByRole('link', { name: 'Doładowanie wykonane! 50,' }).click();

    // await.expect(page.locator('#ui-id-2')).toHaveText('Doładowanie wykonane');

    //Assert
    await expect(pulpitPage.transferConfirmation).toHaveText(expectedMessage);
   // await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    //Arrange
    const chosenNumber = '503 xxx xxx';
    const topupAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

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
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
