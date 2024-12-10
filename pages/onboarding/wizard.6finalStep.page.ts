import { expect, Page } from "@playwright/test";

export default class Wizard6FinalStepPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    // Locators 
    private finishButton = () => this.page.locator('.Finish');
   

    // Actions 

    // finish Button 
    public async clickFinish(){
        await this.finishButton().click();
    }

}