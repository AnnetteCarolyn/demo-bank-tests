import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userID = 'testerLO';
    const UserPassword = 'ljkjuytt';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    // await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(UserPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with login with too short username', async ({
    page,
  }) => {
    //Arrange
    const incorrectUserID = 'tester';
    const expectedErrorLoginMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(incorrectUserID);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorLoginMessage,
    );
  });

  test('unsuccessful login with login with too short password - locator name', async ({
    page,
  }) => {
    //Arrange
    const userID = 'testerPP';
    const incorrectPassword = 'wwwww';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.locator('#login_password_container i').first().click();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsuccessful login with login with too short password - blur', async ({
    page,
  }) => {
    //Arrange
    const userID = 'testerPP';
    const incorrectPassword = 'wwwww';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    // page.getByTestId('login-input') == page.locator('#login_id')
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
