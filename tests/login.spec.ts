import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { PulpitData } from '../test-data/pulpit.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userID = loginData.userID;
    const UserPassword = loginData.userPassword;

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(UserPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);

    //Assert
    await page.waitForLoadState('domcontentloaded');
    await expect(pulpitPage.userNameText).toHaveText(
      PulpitData.expectedUserName,
    );
  });
  ``;
  test('unsuccessful login with login with too short username', async ({
    page,
  }) => {
    //Arrange
    const incorrectUserID = 'tester';
    const expectedErrorLoginMessage = 'identyfikator ma min. 8 znaków';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserID);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorLoginMessage);
  });

  //   test('unsuccessful login with login with too short password - locator name', async ({
  //     page,
  //   }) => {
  //     //Arrange
  //     const userID = loginData.userID;
  //     const incorrectPassword = 'wwwww';
  //     const expectedErrorMessage = 'hasło ma min. 8 znaków';

  //     //Act
  //     const loginPage = new LoginPage(page)
  //     await loginPage.loginInput.fill(userID)
  // await loginPage.passwordInput.fill(incorrectPassword)

  // // missing click on a locator name - to be implemented evtl.

  //     await page.getByTestId('login-input').fill(userID);
  //     await page.getByTestId('password-input').fill(incorrectPassword);
  //     await page.locator('#login_password_container i').first().click();

  //     //Assert
  //     await expect(page.getByTestId('error-login-password')).toHaveText(
  //       expectedErrorMessage,
  //   );
  // });

  test('unsuccessful login with login with too short password - blur', async ({
    page,
  }) => {
    //Arrange
    const userID = loginData.userID;
    const incorrectPassword = 'wwwww';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    // page.getByTestId('login-input') == page.locator('#login_id')
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
