import { Page, expect } from "@playwright/test";
import FooterPage from "../page-components/footer.component";

export default class HelloPage
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
    public async assertHelloMessageEqualTo(expectedText: string) {
        const actualText = await this.helloUsername().innerText();
        expect(actualText).toEqual(expectedText);
    }

    public async assertCompanyNameEqualTo(expectedText: string) {
        const actualText = await this.companyNameHeading().innerText();
        expect(actualText).toEqual(expectedText);
    }


}