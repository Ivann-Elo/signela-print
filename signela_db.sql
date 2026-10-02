-- ============================================================
-- SIGNELA PRINT — Base de données
-- À importer dans phpMyAdmin (XAMPP)
-- ============================================================

CREATE DATABASE IF NOT EXISTS signela_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE signela_db;

-- Table utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe  VARCHAR(255) NOT NULL,
  prenom        VARCHAR(100) NOT NULL,
  nom           VARCHAR(100) NOT NULL,
  telephone     VARCHAR(30),
  societe       VARCHAR(200),
  siret         VARCHAR(20),
  adresse       VARCHAR(500),
  code_postal   VARCHAR(10),
  ville         VARCHAR(100),
  pays          VARCHAR(100) DEFAULT 'France',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table commandes
CREATE TABLE IF NOT EXISTS commandes (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id  INT UNSIGNED NOT NULL,
  numero          VARCHAR(30) NOT NULL UNIQUE,
  statut          ENUM('en_attente','en_production','expedition','livree','annulee') NOT NULL DEFAULT 'en_attente',
  total_ht        DECIMAL(10,2) NOT NULL DEFAULT 0,
  adresse_livraison TEXT,
  note            TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table articles de commande
CREATE TABLE IF NOT EXISTS articles_commande (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  commande_id     INT UNSIGNED NOT NULL,
  produit_slug    VARCHAR(100) NOT NULL,
  produit_titre   VARCHAR(200) NOT NULL,
  config_label    TEXT,
  config_json     JSON,
  prix_ht         DECIMAL(10,2) NOT NULL,
  quantite        INT UNSIGNED NOT NULL DEFAULT 1,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table tokens de réinitialisation de mot de passe
CREATE TABLE IF NOT EXISTS reset_tokens (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED NOT NULL,
  token      VARCHAR(128) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
