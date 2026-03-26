import { Page } from "@playwright/test";
import TransactionsBasePage, { ButtonType } from "./transactionsBase.page";

export default class ExpensesPage extends TransactionsBasePage {
    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("/Documents/Expenses");
    }

    async navigateToExpensesSection(): Promise<void> {
        await this.clickButton(ButtonType.ExpensesTab);
    }

    async createNewExpenseClaim(): Promise<void> {
        await this.clickButton(ButtonType.ExpensesPlusButton);
    }
}