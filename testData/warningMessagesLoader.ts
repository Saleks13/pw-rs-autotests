import warningMessages from '../testData/warningMessages.json'; // Adjust the path as needed

export class WarningMessagesLoader {
  private static getMessages(lang: keyof typeof warningMessages) {
    const messages = warningMessages[lang];
    if (!messages) {
      throw new Error(`Warning messages for language "${lang}" are not defined.`);
    }
    return messages;
  }

  private static determineLanguage(): keyof typeof warningMessages {
    const locale = process.env.LOCALE || 'EN';

    if (!locale) {
      console.warn(`Locale is not defined. Falling back to default language: EN`);
      return 'EN';
    }

    const localization = locale.toUpperCase();
    if (warningMessages.hasOwnProperty(localization)) {
      return localization as keyof typeof warningMessages;
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
}
