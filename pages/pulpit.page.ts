import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  userNameText: Locator;
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator
  transferConfirmation: Locator

  constructor(private page: Page) {
    this.userNameText = this.page.getByTestId('user-name');
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferConfirmation = this.page.locator('#show_messages')
  }
}
