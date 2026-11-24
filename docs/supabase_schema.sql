-- Execute no SQL Editor do Supabase
-- Ajuste nomes de colunas conforme seu schema real

CREATE TABLE IF NOT EXISTS questoes (
  id_questao    SERIAL PRIMARY KEY,
  titulo        TEXT NOT NULL,
  enunciado     TEXT,
  vestibular    VARCHAR(100),
  ano           INTEGER CHECK (ano >= 1990 AND ano <= 2030),
  palavra_chave TEXT,
  topico        VARCHAR(100),
  dificuldade   VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_questoes_vestibular ON questoes (vestibular);
CREATE INDEX IF NOT EXISTS idx_questoes_ano ON questoes (ano);

-- View de compatibilidade (se o código usar BUSCA ou nomes antigos)
CREATE OR REPLACE VIEW "BUSCA" AS
  SELECT
    id_questao AS id_q,
    titulo AS nome_q,
    enunciado AS enunciado_q,
    palavra_chave AS palavra_chave_q,
    topico AS nome_t,
    dificuldade AS nome_d,
    ano,
    vestibular
  FROM questoes;
