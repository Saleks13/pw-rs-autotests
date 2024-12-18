import { expect, Page } from "@playwright/test";

export default class FooterPage {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    footerText = () => this.page.locator("#footer p");

    //Check footer contains text
    public async isFooterContainsText(text: string) {
        return expect(await this.footerText().innerText()).toContain(text);
    }
}



