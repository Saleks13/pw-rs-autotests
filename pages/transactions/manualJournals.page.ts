import { Page } from "@playwright/test";
import TransactionsBasePage, { ButtonType } from "./transactionsBase.page";

export default class ManualJournalsPage extends TransactionsBasePage {
    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("/Documents/ManualJou");
    }

    async navigateToManualJournalsSection(): Promise<void> {
        await this.clickButton(ButtonType.ManualJournalsTab);
    }

    async createNewManualJournal(): Promise<void> {
        await this.clickButton(ButtonType.ManualJournalsPlusButton);
    }
}