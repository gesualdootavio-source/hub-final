# Documentação Técnica — Hub do Conhecimento (Moléculas em Prova)

**Curso Técnico em Desenvolvimento de Sistemas — Projeto Final**

## 1. Arquitetura

```
[ App Mobile Expo ] ──HTTPS──► [ API Express na Vercel ] ──PostgreSQL──► [ Supabase ]
[ Frontend React  ] ──────────►          │
                                         └── domínio próprio + SSL
```

## 2. Modelagem de dados

A API consome a view/tabela de questões (campos mapeados no controller):

| Campo (API)     | Origem possível          | Descrição              |
|-----------------|--------------------------|------------------------|
| id_q            | id_q / id_questao        | PK                     |
| nome_q          | nome_q / titulo          | Título                 |
| enunciado_q     | enunciado_q / enunciado  | Enunciado              |
| palavra_chave_q | palavra_chave_q / ...    | Palavras-chave         |
| topico / nome_t | topico / nome_t          | Tópico                 |
| dificuldade     | dificuldade / nome_d     | Nível                  |
| ano             | ano                      | Ano da prova           |
| vestibular      | vestibular               | Nome do vestibular     |

Recomenda-se PRIMARY KEY, índices em vestibular/ano e CHECK no ano. RLS opcional; controle principal via API.

## 3. Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api | Info da API |
| GET | /health | Health check |
| POST | /auth/login | Login → token |
| GET | /auth/validate | Valida token |
| GET | /busca | Lista questões |
| GET | /busca/:id | Por ID |
| GET | /busca/vestibular/:vestibular | Filtro |
| GET | /busca/ano/:ano | Filtro |
| GET | /busca/palavra-chave/:palavra | Filtro |

## 4. Deploy

### Supabase
1. Criar projeto → SQL Editor → criar tabelas/views
2. Connection string (URI) → variável `DATABASE_URL` na Vercel

### Vercel
1. Repositório GitHub conectado
2. Root Directory: `back` (ou monorepo)
3. Env vars: DATABASE_URL, JWT_SECRET, AUTH_USER, AUTH_PASSWORD, FRONTEND_URL, NODE_ENV=production
4. Domínio personalizado + DNS (A/CNAME) → SSL automático

### Mobile
Trocar `API_BASE_URL` em `mobile/src/constants/api.js` para o domínio de produção.

## 5. Instalação local

```bash
# Backend
cd back && cp .env.example .env && npm i && npm run dev

# Frontend
cd front && npm i && npm run dev

# Mobile
cd mobile && npm i && npx expo start
```

## 6. Segurança
- `.env` no `.gitignore`
- Credenciais só em variáveis de ambiente da Vercel
- CORS configurado
- Token Bearer no header Authorization
