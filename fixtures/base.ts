import { test as base } from "@playwright/test";
import SignInPage from "../pom/onboarding/signIn.page";
import WizardUserInfoPage from "../pom/onboarding/wizard.1userInfo.page";
import WizardRequiredDocsPage from "../pom/onboarding/wizard.2requiredDocs.page";
import WizardCompanyInfoPage from "../pom/onboarding/wizard.3companyInfo.page";



type MyFixtures = {
    signInPage: SignInPage;
    wizardUserInfoPage: WizardUserInfoPage;
    wizardRequiredDocsPage: WizardRequiredDocsPage;
    wizardCompanyInfoPage: WizardCompanyInfoPage;
}

export const test = base.extend<{
    signInPage: SignInPage, 
    wizardUserInfoPage: WizardUserInfoPage, 
    wizardRequiredDocsPage: WizardRequiredDocsPage,
    wizardCompanyInfoPage: WizardCompanyInfoPage}>({

    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    wizardUserInfoPage: async ({ page }, use) => {
        await use(new WizardUserInfoPage(page));
    },
    wizardRequiredDocsPage: async ({ page }, use) => {
        await use(new WizardRequiredDocsPage(page));
    },
    wizardCompanyInfoPage: async ({ page }, use) => {
        await use(new WizardCompanyInfoPage(page));
    }


})