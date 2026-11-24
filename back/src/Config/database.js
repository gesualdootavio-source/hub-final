const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const { Pool } = require('pg');

/**
 * Prioridade: DATABASE_URL (Supabase) > variáveis DB_*
 */
function buildPoolConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };
  }

  const dbPassword = process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : undefined;
  const dbPort = Number.isNaN(Number(process.env.DB_PORT)) ? 5432 : parseInt(process.env.DB_PORT, 10);

  if (!dbPassword) {
    console.error('❌ DB_PASSWORD não definida. Configure .env ou DATABASE_URL.');
  }

  return {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hdpa',
    password: dbPassword,
    port: dbPort,
    ssl: process.env.DB_HOST?.includes('supabase') ? { rejectUnauthorized: false } : false,
  };
}

const pool = new Pool(buildPoolConfig());

pool
  .connect()
  .then((client) => {
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME || 'via DATABASE_URL (Supabase)'}`);
    client.release();
  })
  .catch((erro) => {
    console.error('❌ Erro ao conectar:', erro.message);
  });

module.exports = pool;
