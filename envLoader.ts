const ENV = process.env.ENV || 'test';

if (!ENV) {
    throw new Error('Environment variable ENV is not defined.');
}

export { ENV };