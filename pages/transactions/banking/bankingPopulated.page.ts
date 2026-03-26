import { Page } from "@playwright/test";
import { BankingPage } from "./banking.page";

export default class BankingPopulatedPage extends BankingPage {
    constructor(page: Page) {
        super(page);
    }

}