import { DeepReadonly } from 'ts-essentials';
import config from '../env.config.json';

type ConfigVars = DeepReadonly<typeof config>;
type Environment = keyof typeof config;
type User = keyof ConfigVars['test']['USERS']; // This assumes the same user structure for all environments


export class ConfigReader {
  private static readonly _envVars: ConfigVars = config;

  static getEnvVars(environment: Environment = process.env.env as Environment || 'test'): Readonly<ConfigVars[Environment]> {
    const env = this._envVars[environment];
    if (!env) {
      throw new Error(`Invalid environment: ${environment}`);
    }
    return Object.freeze(env);
  }

  static get APP_URL(): string {
    return ConfigReader.getEnvVars().APP_URL;
  }

  static getEmail(user: User): string {
    return ConfigReader.getEnvVars().USERS[user].EMAIL;
  }

  static getPassword(user: User): string {
    return ConfigReader.getEnvVars().USERS[user].PASSWORD;
  }

  static get COMPANYPREFIX(): string {
    return ConfigReader.getEnvVars().COMPANYPREFIX;
  }
}