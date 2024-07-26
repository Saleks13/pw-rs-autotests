import { expect, Page } from "@playwright/test";

export default class WizardRequiredDocsPage 
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    // Locators 

    cancelButton = () => this.page.locator('.prev.btnmargin');
    continueButton = () => this.page.locator('.continue');



    // Actions 

    //Continue button
    public async clickContinueButton() {
        await this.continueButton().click();
    }


}