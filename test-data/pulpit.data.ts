
export const PulpitData = {
  expectedUserName: 'Jan Demobankowy',
  receiverID: '2',
  chosenAmount: '100',
  chosenTitle: 'pizza',
  expectedConfirmationText: (transferReceiver: string, transferAmount: string, transferTitle: string) =>
    `Przelew wykonany! ${transferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
  topUpReceiver: '503 xxx xxx',
  topUpAmount: '50'
}