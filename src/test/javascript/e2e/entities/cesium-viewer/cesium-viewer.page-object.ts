import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CesiumViewerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cesium-viewer div table .btn-danger'));
  title = element.all(by.css('jhi-cesium-viewer div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class CesiumViewerUpdatePage {
  pageTitle = element(by.id('jhi-cesium-viewer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CesiumViewerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cesiumViewer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cesiumViewer'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
