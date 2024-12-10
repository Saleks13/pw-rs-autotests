import { Page, expect } from "@playwright/test";
import { FooterPage } from "../page components/footer.component";

export default class OverviewHello
{
    page: Page;
    footer: FooterPage;

    constructor(page: Page) {
        this.page = page;
        this.footer = new FooterPage(page);
    }

    public async goto()
    {
        await this.page.goto("/Logo/Main");
    }

    // Locators 
    helloUsername = () => this.page.locator('#wrapper1 h2');
    companyNameHeading = () => this.page.locator('.CompanyName');

    // Actions

    // Assertions
    public async isHelloMessageEqual(text: string) {
        return expect(await this.helloUsername().innerText()).toEqual(text);
    }

    public async isCompanyNameEqual(text: string) {
        return expect(await this.companyNameHeading().innerText()).toEqual(text);
    }


}