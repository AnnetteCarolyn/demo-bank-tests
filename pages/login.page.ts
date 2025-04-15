import { Locator, Page } from '@playwright/test';

export class LoginPage {
  
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginError: Locator;
  passwordError: Locator;


  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
   // this.expectedUserName = this.page.getByTestId('user-name')

    this.loginError = this.page.getByTestId('error-login-id');
    this.passwordError = this.page.getByTestId('error-login-password');
  }
    async login(userId: string, userpassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userpassword);
    await this.loginButton.click();

    }

  }

