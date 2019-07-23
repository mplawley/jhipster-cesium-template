/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CesiumViewerComponentsPage, CesiumViewerDeleteDialog, CesiumViewerUpdatePage } from './cesium-viewer.page-object';

const expect = chai.expect;

describe('CesiumViewer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cesiumViewerUpdatePage: CesiumViewerUpdatePage;
  let cesiumViewerComponentsPage: CesiumViewerComponentsPage;
  let cesiumViewerDeleteDialog: CesiumViewerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CesiumViewers', async () => {
    await navBarPage.goToEntity('cesium-viewer');
    cesiumViewerComponentsPage = new CesiumViewerComponentsPage();
    await browser.wait(ec.visibilityOf(cesiumViewerComponentsPage.title), 5000);
    expect(await cesiumViewerComponentsPage.getTitle()).to.eq('Cesium Viewers');
  });

  it('should load create CesiumViewer page', async () => {
    await cesiumViewerComponentsPage.clickOnCreateButton();
    cesiumViewerUpdatePage = new CesiumViewerUpdatePage();
    expect(await cesiumViewerUpdatePage.getPageTitle()).to.eq('Create or edit a Cesium Viewer');
    await cesiumViewerUpdatePage.cancel();
  });

  it('should create and save CesiumViewers', async () => {
    const nbButtonsBeforeCreate = await cesiumViewerComponentsPage.countDeleteButtons();

    await cesiumViewerComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await cesiumViewerUpdatePage.save();
    expect(await cesiumViewerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cesiumViewerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CesiumViewer', async () => {
    const nbButtonsBeforeDelete = await cesiumViewerComponentsPage.countDeleteButtons();
    await cesiumViewerComponentsPage.clickOnLastDeleteButton();

    cesiumViewerDeleteDialog = new CesiumViewerDeleteDialog();
    expect(await cesiumViewerDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Cesium Viewer?');
    await cesiumViewerDeleteDialog.clickOnConfirmButton();

    expect(await cesiumViewerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
