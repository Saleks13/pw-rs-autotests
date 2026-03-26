import { Page } from "@playwright/test";
import TransactionsBasePage, { ButtonType } from "./transactionsBase.page";

export default class PurchasesPage extends TransactionsBasePage {
    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("/Documents/Purchases");
    }

    async navigateToPurchasesSection(): Promise<void> {
        await this.clickButton(ButtonType.PurchasesTab);
    }

    async createNewPurchaseInvoice(): Promise<void> {
        await this.clickButton(ButtonType.PurchasesPlusButton);
    }
}