import { Page, expect } from "@playwright/test";
import FooterPage from "../page-components/footer.component";

export default class OverviewGeneral
{
    page: Page;
    footer: FooterPage;

    constructor(page: Page) {
        this.page = page;
        this.footer = new FooterPage(page);
    }

    public async goto()
    {
        await this.page.goto("/Overview/Overview");
    }

    // Locators 
    pageHeader = () => this.page.locator('#wrapper1 h5');
    companyNameHeading = () => this.page.locator('.CompanyName');

    // Actions

    // Assertions
    public async assertPageTitleVisible() {
        await expect(this.pageHeader()).toBeVisible();
    }

    public async isCompanyNameEqual(text: string) {
        return expect(await this.companyNameHeading().innerText()).toEqual(text);
    }


}