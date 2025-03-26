// import { Page } from "@playwright/test";

// export class PaymentPage {
//     constructor(private page: Page)

//     transferReceiverInput = this.page.getByTestId('transfer_receiver')
//     transferToInput = this.page.getByTestId('form_account_to')

//     // await page.getByTestId('form_account_to').fill(transferAccount);
//     // await page.getByTestId('form_amount').fill(transferAmount);
//     // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
//     // await page.getByTestId('close-button').click();
//     {}
// }

import { Page, Locator } from '@playwright/test';

export class PaymentPage {
  transferReceiverInput: Locator;
  transferToInput: Locator;
  transferAmountInput: Locator;

  transferButton: Locator;
  actionCloseButton: Locator;

  messageText: Locator;

  constructor(private page: Page) {
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferToInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');

    this.transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');
  }
}