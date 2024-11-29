import dotenv from 'dotenv';

const ENV = process.env.ENV || 'prod';

// Load the appropriate .env file
dotenv.config({ path: `.env.${ENV}` });

if (!ENV) {
    throw new Error('Environment variable ENV is not defined.');
}

export { ENV };