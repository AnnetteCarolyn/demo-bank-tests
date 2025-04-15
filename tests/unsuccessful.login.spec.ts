import { test, expect } from '@playwright/test';

test.describe('Unsuccessful User login to site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('unsuccessful login with login with too short username', async ({
    page,
  }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('bla');
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible;
  });

  
  test('unsuccessful login with login with too short password', async ({
    page,
    
  }) => {
    //Arrange
    const userID = 'tomsmith123';
    const tooshortpassword = 'blaaa';
    const errorMessage = 'Your username is invalid!';

    //Act
    await page.locator('#username').fill(userID);
    await page.getByRole('textbox', { name: 'Password' }).fill(tooshortpassword);
    await page.getByRole('button', { name: ' Login' }).click();

    //Assert
    await expect(page.getByText(errorMessage)).toBeVisible;

;})})
