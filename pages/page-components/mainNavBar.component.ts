import { expect, Page } from "@playwright/test";
import OverviewGeneral from "../overview/overviewGeneral.page";

export default class MainNavBar {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    overviewTab = () => this.page.locator("#mnbm1");
    transactionsTab = () => this.page.locator("#mnbm2");
    reportsTab = () => this.page.locator("#mnbm3");
    contactsTab = () => this.page.locator("#mnbm4");
    findAndRecodeTab = () => this.page.locator("#mnbm6");
    settingsTab = () => this.page.locator("#mnbm5");


    // Check logo visible
    public async isOverviewTabVisible() {
        await expect(this.overviewTab()).toBeVisible();
    }

    // OPEN PAGES 
    // Click Overview tab
    public async clickOverviewTab() {
        await this.overviewTab().click();
    }
    // Click Transactions tab
    public async clickTransactionsTab() {
        await this.transactionsTab().click();
    }
    // Click Reports tab
    public async clickReportsTab() {
        await this.reportsTab().click();
    }
    // Click Contacts tab
    public async clickContactsTab() {
        await this.contactsTab().click();
    }
    // Click Fin&Recode tab
    public async clickFindRecodeTab() {
        await this.findAndRecodeTab().click();
    }
    // Click Settings tab
    public async clickSettingsTab() {
        await this.settingsTab().click();
    }

    // ASSERT PAGE OPENED
    // Overview
    public async isOverviewHeaderVisible() {
        const overviewPage = new OverviewGeneral(this.page);
        await expect(overviewPage.pageHeader()).toBeVisible();
    }
    // Transactions
    public async isTransactionsHeaderVisible() {
        const overviewPage = new OverviewGeneral(this.page);
        return expect(await this.transactionsTab().isVisible());
    }


}



