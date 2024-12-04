// warningMessagesLoader.ts
import enMessages from '../localization/en.json';
import deMessages from '../localization/de.json';

export class LocalizationLoader {
  private static messages: Record<string, Record<string, string>> = {
    EN: enMessages,
    DE: deMessages,
  };

  private static getMessages(lang: keyof typeof LocalizationLoader.messages) {
    const messages = LocalizationLoader.messages[lang];
    if (!messages) {
      throw new Error(`Warning messages for language "${lang}" are not defined.`);
    }
    return messages;
  }

  private static determineLanguage(): keyof typeof LocalizationLoader.messages {
    const locale = process.env.LOCALE || 'EN';

    if (!locale) {
      console.warn(`Locale is not defined. Falling back to default language: EN`);
      return 'EN';
    }

    const localization = locale.toUpperCase();
    if (LocalizationLoader.messages.hasOwnProperty(localization)) {
      return localization as keyof typeof LocalizationLoader.messages;
    } else {
      console.warn(`Invalid locale provided: ${locale}. Falling back to default language: EN`);
      return 'EN';
    }
  }

  static getMessage(key: string) {
    const lang = this.determineLanguage();
    const messages = this.getMessages(lang);
    const message = messages[key as keyof typeof messages];
    if (!message) {
      throw new Error(`Message key "${key}" is not defined for language "${lang}".`);
    }
    return message;
  }

  static formatMessage(
    key: string,
    variables: Record<string, string>
  ) {
    const lang = this.determineLanguage();
    let message = this.getMessage(key);

    Object.entries(variables).forEach(([placeholder, value]) => {
      if (typeof value !== 'string') {
        throw new Error(`Variable value for placeholder "${placeholder}" must be a string.`);
      }
      message = message.replace(`{{${placeholder}}}`, value);
    });

    return message;
  }

  static getHelloText(firstName: string, lastName: string) {
    return this.formatMessage('helloText', { firstName, lastName });
  }
}