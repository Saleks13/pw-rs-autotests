import { Page } from "@playwright/test";

export class FooterPage {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    get $footertext(){
        return this.page.locator("[method='post'] .footer");    
    }
}



