import { Page } from "@playwright/test";
import { BankingPage } from "./banking.page";

export default class BankingBlankPage extends BankingPage {
    constructor(page: Page) {
        super(page);
    }

   

}