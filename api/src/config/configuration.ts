// config/configuration.ts

import Joi from 'joi';

export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    // type: process.env.DATABASE_TYPE || 'postgres',
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    // url: process.env.DATABASE_URL,
  },
});

// Validação de ambiente
export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_TYPE: Joi.string().default('postgres'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
