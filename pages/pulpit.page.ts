import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  userNameText: Locator;
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferConfirmation: Locator;
  topUpReceiver: Locator;
  topUpAmount: Locator

  constructor(private page: Page) {
    this.userNameText = this.page.getByTestId('user-name');
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferConfirmation = this.page.locator('#show_messages');
    this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount')
      }

  // async prepareTransfer(receiverID: string, chosenAmount: int, chosenTitle: string): Promise<void> {
  //   await this.transferReceiver.fill(receiverID);
  //   await this.transferAmount.fill(chosenAmount);
  //   await this.transferTitle.fill(chosenTitle);

  //in the course chosenAmount as a string

   async executeMobileTopUp(topUpReceiver: string, topUpAmount: string): Promise <void>{
     await this.topUpReceiver.fill(topUpReceiver)
   await this.topUpAmount.fill(topUpAmount)
  }
}