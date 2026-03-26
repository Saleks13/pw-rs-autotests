import { Page } from "@playwright/test";
import FooterPage from "../page-components/footer.component";

export default class ReportsPage 
{
    page: Page;
    footer: FooterPage;


    constructor(page: Page) {
        this.page = page;
        this.footer = new FooterPage(page);
    }

    // go to sign in page 
    public async goto(){
        await this.page.goto("/Reports/Reports");
    }
}
