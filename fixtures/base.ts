import { test as base } from "@playwright/test";
import SignInPage from "../pages/onboarding/signIn.page";
import Wizard1UserInfoPage from "../pages/onboarding/wizard.1userInfo.page";
import Wizard2RequiredDocsPage from "../pages/onboarding/wizard.2requiredDocs.page";
import Wizard3CompanyInfoPage from "../pages/onboarding/wizard.3companyInfo.page";
import Wizard4FinancialInfoPage from "../pages/onboarding/wizard.4financialInfo.page";
import Wizard5MobilePhonePage from "../pages/onboarding/wizard.5mobilePhone.page";
import Wizard6FinalStepPage from "../pages/onboarding/wizard.6finalStep.page";

import { FooterPage } from "../pages/page components/footer.component";
import OverviewHello from "../pages/welcome/overviewHello.page";


type MyFixtures = {
    signInPage: SignInPage;
    wizard1UserInfoPage: Wizard1UserInfoPage;
    wizard2RequiredDocsPage: Wizard2RequiredDocsPage;
    wizard3CompanyInfoPage: Wizard3CompanyInfoPage;
    wizard4FinancialInfoPage: Wizard4FinancialInfoPage;
    wizard5MobilePhonePage: Wizard5MobilePhonePage;
    wizard6FinalStepPage: Wizard6FinalStepPage;
    overviewHello: OverviewHello;
    footerPage: FooterPage;
}

export const test = base.extend<MyFixtures>({

    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    wizard1UserInfoPage: async ({ page }, use) => {
        await use(new Wizard1UserInfoPage(page));
    },
    wizard2RequiredDocsPage: async ({ page }, use) => {
        await use(new Wizard2RequiredDocsPage(page));
    },
    wizard3CompanyInfoPage: async ({ page }, use) => {
        await use(new Wizard3CompanyInfoPage(page));
    },
    wizard4FinancialInfoPage: async ({ page }, use) => {
        await use(new Wizard4FinancialInfoPage(page));
    },
    wizard5MobilePhonePage: async ({ page }, use) => {
        await use(new Wizard5MobilePhonePage(page));
    },
    wizard6FinalStepPage: async ({ page }, use) => {
        await use(new Wizard6FinalStepPage(page));
    },
    overviewHello: async ({ page }, use) => {
        await use(new OverviewHello(page));
    },
    footerPage: async ({ page }, use) => {
        await use(new FooterPage(page));
    }
})

test.beforeAll(async ({ baseURL }) => {
    console.log("BASE_URL =", baseURL);    
});

test.beforeEach(async ({ context }) => {
    await context.clearCookies();
})

test.afterEach(async ({ page, context }, testInfo) => {

    // Capture screenshot
    const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath });

    testInfo.attach('screenshot', {
        path: screenshotPath,
        contentType: `image/png`,
    })

    await context.close();
})


export const expect = test.expect;