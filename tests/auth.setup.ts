import { test as setup } from '../fixtures/onboarding.fixture';
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, '../.auth/user.json');
const AUTH_MAX_AGE_DAYS = 7;

function isAuthFileFresh(): boolean {
    if (!fs.existsSync(authFile)) return false;
    const ageMs = Date.now() - fs.statSync(authFile).mtimeMs;
    return ageMs < AUTH_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

setup('authenticate', async ({ page, signInPage, overviewGeneral }) => {
    setup.skip(isAuthFileFresh(), `Auth state is fresh (< ${AUTH_MAX_AGE_DAYS} days), skipping login`);

    await signInPage.goto();
    await signInPage.fillUsername(process.env.USERS_USERSINGLEORG_EMAIL || "");
    await signInPage.fillPassword(process.env.USERS_USERSINGLEORG_PASSWORD || "");
    await signInPage.clickLoginButton();

    await overviewGeneral.assertPageTitleVisible();

    await page.context().storageState({ path: authFile });
})