import { Page } from "@playwright/test";
import TransactionsBasePage from "../transactionsBase.page";

export class BankingPage extends TransactionsBasePage {
    constructor(page: Page) {
        super(page);
    }

    // go directly to page
    public async goto() {
        await this.page.goto("/Transactions/Banking")
    }

     // Locators specific to blank page
     pageHeader = () => this.page.locator('.contentMain h2'); // blank

     // Get header text
     async getHeaderText() {
         return await this.pageHeader().innerText();
     }

}



