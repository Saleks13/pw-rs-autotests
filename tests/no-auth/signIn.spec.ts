import { test, expect } from "../../fixtures/onboarding.fixture";
import { LocalizationLoader } from "../../utils/localizationLoader";

// Which warning element a negative case should assert against.
type WarningTarget = "email" | "password" | "main";

type SignInCase = {
    id: string;
    title: string;
    // Resolve credentials at runtime so secrets stay in env, never in source.
    email: () => string;
    password: () => string;
    // Either a success path (overview visible) or an expected localized warning.
    expected:
        | { outcome: "success" }
        | { outcome: "warning"; target: WarningTarget; messageKey: string };
    // Optional reason to skip; set when a case has a destructive side effect.
    skip?: string;
};

const cases: SignInCase[] = [
    {
        id: "#SI-0001",
        title: "valid single-organization user @smoke",
        email: () => process.env.USERS_USERSINGLEORG_EMAIL || "",
        password: () => process.env.USERS_USERSINGLEORG_PASSWORD || "",
        expected: { outcome: "success" },
    },
    {
        id: "#SI-0002",
        title: "empty e-mail shows required warning",
        email: () => "",
        password: () => "somePassword",
        expected: { outcome: "warning", target: "email", messageKey: "signInEmailRequired" },
    },
    {
        id: "#SI-0003",
        title: "empty password shows required warning",
        email: () => "sergreststep1@gmail.com",
        password: () => "",
        expected: { outcome: "warning", target: "password", messageKey: "signInPasswordRequired" },
    },
    {
        id: "#SI-0004",
        title: "unknown e-mail shows invalid-credentials warning",
        // A non-existent e-mail never matches an account, so this does NOT count
        // toward the 3-attempt lockout — safe to run on every pass.
        email: () => "no-such-user@example.com",
        password: () => "somePassword",
        expected: { outcome: "warning", target: "main", messageKey: "signInInvalidCredentials" },
    },
    {
        id: "#SI-0005",
        title: "valid e-mail + wrong password shows incorrect-password warning",
        email: () => process.env.USERS_USERSINGLEORG_EMAIL || "",
        password: () => "wrongPassword123",
        expected: { outcome: "warning", target: "main", messageKey: "signInIncorrectPassword" },
        // A wrong password on a real account counts toward the 3-attempt lockout,
        // and there is no unlock mechanism yet, so this case is skipped for now.
        skip: "no account-unlock mechanism for the 3-attempt lockout",
    },
];

for (const data of cases) {
    test(`${data.id} - Sign in: ${data.title}`, async ({ signInPage, overviewGeneral }) => {
        test.skip(Boolean(data.skip), data.skip);
        // go to sign in page
        await signInPage.goto();
        // set username email
        await signInPage.fillUsername(data.email());
        // set password
        await signInPage.fillPassword(data.password());
        // click sign in button
        await signInPage.clickLoginButton();

        if (data.expected.outcome === "success") {
            // check overview header visible
            await overviewGeneral.assertPageTitleVisible();
            return;
        }

        const expectedText = LocalizationLoader.getMessage(data.expected.messageKey);
        switch (data.expected.target) {
            case "email":
                expect(await signInPage.getUsernameWarningMsg()).toContain(expectedText);
                break;
            case "password":
                expect(await signInPage.getPasswordWarningMsg()).toContain(expectedText);
                break;
            case "main":
                await signInPage.assertWarningMessageContainsText(expectedText);
                break;
        }
    });
}
