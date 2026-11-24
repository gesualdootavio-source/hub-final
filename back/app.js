const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cors = require('cors');
const { logMiddleware, errorMiddleware } = require('./src/Middleware/Middleware');
const authRoutes = require('./src/Routes/authRoutes');
const buscaRoutes = require('./src/Routes/buscaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================================
// CORS
// ======================================================
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8081',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Permite mobile, Postman e origins configurados
      if (!origin || allowedOrigins.some((o) => origin.startsWith(o.replace(/\/$/, '')))) {
        return cb(null, true);
      }
      return cb(null, true); // Em produção você pode restringir
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(logMiddleware);

// ======================================================
// ROTAS API
// ======================================================
app.use('/auth', authRoutes);
app.use('/busca', buscaRoutes);

app.get('/api', (req, res) => {
  res.json({
    mensagem: 'API Hub do Conhecimento / Moléculas em Prova',
    versao: '4.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: process.env.DATABASE_URL ? 'Supabase (PostgreSQL)' : 'PostgreSQL local',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ======================================================
// FRONTEND (build do Vite ou pasta front)
// ======================================================
const frontDist = path.join(__dirname, '..', 'front', 'dist');
const frontPublic = path.join(__dirname, '..', 'front', 'public');
const frontRoot = path.join(__dirname, '..', 'front');

// Serve assets estáticos
app.use(express.static(frontDist));
app.use(express.static(frontPublic));
app.use(express.static(frontRoot));

// SPA fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/auth') || req.path.startsWith('/busca') || req.path.startsWith('/api') || req.path.startsWith('/health')) {
    return res.status(404).json({ mensagem: 'Endpoint não encontrado' });
  }
  const indexPath = path.join(frontDist, 'index.html');
  const fallback = path.join(frontRoot, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.sendFile(fallback, (err2) => {
      if (err2) next();
    });
  });
});

app.use(errorMiddleware);

// Local vs Vercel
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Servidor rodando!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`💾 Banco: ${process.env.DATABASE_URL ? 'Supabase' : process.env.DB_NAME}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('='.repeat(50));
  });
}

module.exports = app;
