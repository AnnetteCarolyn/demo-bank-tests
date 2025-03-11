import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

  test('successful login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('ljkjuytt');
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();

    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('unsuccessful login with login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });
});

test('unsuccessful login with login with too short password - locator name', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  // page.getByTestId('login-input') == page.locator('#login_id')
  await page.getByTestId('login-input').click(); 
  await page.getByTestId('login-input').fill('testerPP');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('wwwww');
  await page.locator('#login_password_container i').first().click();

  await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  
});

test.only('unsuccessful login with login with too short password - blur', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  // page.getByTestId('login-input') == page.locator('#login_id')
  await page.getByTestId('login-input').click(); 
  await page.getByTestId('login-input').fill('testerPP');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('wwwww');
  await page.getByTestId('password-input').blur();

  await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
})