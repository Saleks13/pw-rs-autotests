import { test } from "../../fixtures/overview.fixture";
import OverviewGeneral from "../../pages/overview/overviewGeneral.page";
import { ButtonType } from "../../pages/transactions/transactionsBase.page";
import { LocalizationLoader } from "../../utils/localizationLoader";

test("#MNB-0001 - Check Transactions page opened.", async ({ overviewGeneral, mainNavBar, transactionsBasePage: transctionsBasePage, bankingBlankPage}) => {

    // expected page header
    const expectedText = LocalizationLoader.getMessage("bankingPageHeader");
    
    // check overview header visible 
    await overviewGeneral.goto();
    await mainNavBar.clickTransactionsTab();
    await transctionsBasePage.clickButton(ButtonType.BankingTab);
    const actualText = await bankingBlankPage.getHeaderText();

    console.log("Expected text = ", expectedText);
    console.log("Actual text = ", actualText);    

})

test("#MNB-0002 - Check Reports page opened.", async ({ overviewGeneral, mainNavBar }) => {

})