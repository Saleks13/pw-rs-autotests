import { Page } from "@playwright/test";
import { FooterPage } from "../page components/footer.component";

export default class SignInPage 
{
    page: Page;
    footer: FooterPage;

    constructor(page: Page) {
        this.page = page;
        this.footer = new FooterPage(page);
    }


}