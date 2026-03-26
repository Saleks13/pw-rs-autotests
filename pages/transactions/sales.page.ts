import { Page } from "@playwright/test";
import TransactionsBasePage, { ButtonType } from "./transactionsBase.page";

export default class SalesPage extends TransactionsBasePage {
    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("/Documents/Sales");
    }

    async navigateToSalesSection(): Promise<void> {
        await this.clickButton(ButtonType.SalesTab);
    }

    async createNewSalesInvoice(): Promise<void> {
        await this.clickButton(ButtonType.SalesPlusButton);
    }
}