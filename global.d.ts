declare namespace NodeJS {
    interface ProcessEnv {
      USERS_USERSINGLEORG_EMAIL: string;
      USERS_USERSINGLEORG_PASSWORD: string;
      USERS_USERMULTIORG_EMAIL: string;
      USERS_USERMULTIORG_PASSWORD: string;
      LOCALE: string;
      // Add more environment variables here
    }
  }