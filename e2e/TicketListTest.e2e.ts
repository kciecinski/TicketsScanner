import { device, element, by, expect as detoxExpect } from 'detox';

describe('TicketsList', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('shoudlBeVisible', async () => {
    await detoxExpect(element(by.id('ticketList'))).toBeVisible();
  });

  it('shouldHaveChild', async () => {
    await detoxExpect(element(by.id('TicketItem3'))).toExist();
  });

  it('shouldHaveChildWithId', async () => {
    await detoxExpect(element(by.id('ticketId3'))).toHaveText('Ticket #3');
  });
});

describe('Ticket', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('shouldBeAbleToActivate', async () => {
    await element(by.id('ticketPressable1')).tap();
    await detoxExpect(element(by.id('modalTicket1'))).toBeVisible();

    const ticketDisactivate = element(by.id('ticketActivate1'));
    await ticketDisactivate.tap();
    await detoxExpect(element(by.id('modalTicket1'))).toBeNotVisible();

    const dropdown = element(by.id('dropdown'));

    await detoxExpect(dropdown).toExist();
  });

  it('shouldBeAbleToDisactivate', async () => {
    await element(by.id('ticketPressable1')).tap();
    await detoxExpect(element(by.id('modalTicket1'))).toBeVisible();

    const ticketDisactivate = element(by.id('ticketDisactivate1'));
    await ticketDisactivate.tap();
    await detoxExpect(element(by.id('modalTicket1'))).toBeNotVisible();

    const dropdown = element(by.id('dropdown'));

    await detoxExpect(dropdown).toExist();
  });
});

describe('Navigation', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('TicketsNav shoudbeVisible', async () => {
    await detoxExpect(element(by.id('TicketsNav'))).toBeVisible();
  });

  it('ScanTicets shoudbeVisible after tap', async () => {
    await element(by.id('ScanTicetsNav')).tap();
    await detoxExpect(element(by.id('Scanner'))).toBeVisible();
  });

  it('TicketsNav shoudbeVisible after tap', async () => {
    await element(by.id('TicketsNav')).tap();
    await detoxExpect(element(by.id('TicketsList'))).toBeVisible();
  });
});
