import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  DEV: z.coerce.boolean().default(false),
  DATABASE_URL: z.string(),
  DATABASE_URL_TEST: z.string().optional(),
  CLIENT_ID: z.string(),
  TOKEN: z.string(),
  CLIENT_ID_TEST: z.string().optional(),
  TOKEN_TEST: z.string().optional(),
  GUILD_ID: z.string().optional(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

if (_env.data.DEV) {
  console.log('🚀 Running in DEV mode')
  _env.data.DATABASE_URL = _env.data.DATABASE_URL_TEST
    ? _env.data.DATABASE_URL_TEST
    : _env.data.DATABASE_URL

  _env.data.CLIENT_ID = _env.data.CLIENT_ID_TEST
    ? _env.data.CLIENT_ID_TEST
    : _env.data.CLIENT_ID

  _env.data.TOKEN = _env.data.TOKEN_TEST
    ? _env.data.TOKEN_TEST
    : _env.data.TOKEN
}

export const env = _env.data
