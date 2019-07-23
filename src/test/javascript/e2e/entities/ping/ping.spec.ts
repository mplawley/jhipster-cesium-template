/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PingComponentsPage, PingDeleteDialog, PingUpdatePage } from './ping.page-object';

const expect = chai.expect;

describe('Ping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pingUpdatePage: PingUpdatePage;
  let pingComponentsPage: PingComponentsPage;
  let pingDeleteDialog: PingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pings', async () => {
    await navBarPage.goToEntity('ping');
    pingComponentsPage = new PingComponentsPage();
    await browser.wait(ec.visibilityOf(pingComponentsPage.title), 5000);
    expect(await pingComponentsPage.getTitle()).to.eq('Pings');
  });

  it('should load create Ping page', async () => {
    await pingComponentsPage.clickOnCreateButton();
    pingUpdatePage = new PingUpdatePage();
    expect(await pingUpdatePage.getPageTitle()).to.eq('Create or edit a Ping');
    await pingUpdatePage.cancel();
  });

  it('should create and save Pings', async () => {
    const nbButtonsBeforeCreate = await pingComponentsPage.countDeleteButtons();

    await pingComponentsPage.clickOnCreateButton();
    await promise.all([pingUpdatePage.setLabelInput('label'), pingUpdatePage.setLatitudeInput('5'), pingUpdatePage.setLongitudeInput('5')]);
    expect(await pingUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');
    expect(await pingUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await pingUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    await pingUpdatePage.save();
    expect(await pingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ping', async () => {
    const nbButtonsBeforeDelete = await pingComponentsPage.countDeleteButtons();
    await pingComponentsPage.clickOnLastDeleteButton();

    pingDeleteDialog = new PingDeleteDialog();
    expect(await pingDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Ping?');
    await pingDeleteDialog.clickOnConfirmButton();

    expect(await pingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
