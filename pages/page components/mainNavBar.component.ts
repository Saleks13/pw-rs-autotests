import { expect, Page } from "@playwright/test";

export default class MainNavBar {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    overviewTab = () => this.page.locator("#mnbm1");
    transactionsTab = () => this.page.locator("#mnbm2");
    reportsTab = () => this.page.locator("#mnbm3");
    contactsTab = () => this.page.locator("#mnbm4");
    findAndRecodeTab = () => this.page.locator("#mnbm6");
    settingsTab = () => this.page.locator("#mnbm5");
   

    //Check logo visible
    public async isOverviewTabVisible() {
        return expect(await this.overviewTab().isVisible());
    }

}



