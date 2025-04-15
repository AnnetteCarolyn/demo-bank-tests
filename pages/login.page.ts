import { Locator, Page } from '@playwright/test';

export class LoginPage {
  
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginError: Locator;
  passwordError: Locator;


  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('username');
    this.passwordInput = this.page.getByTestId('password');
    this.loginButton = this.page.getByRole('button');
   // this.expectedUserName = this.page.getByTestId('user-name')

    this.loginError = this.page.getByTestId('#flash.flash.error');
   // this.passwordError = this.page.getByTestId('#flash.flash.error');
  }
    async login(userId: string, userpassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userpassword);
    await this.loginButton.click();

    }

  }

