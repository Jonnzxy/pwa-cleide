-- Banco de Dados Fight App
-- Estrutura completa com exemplos de academias fictícias

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('lutador', 'academia', 'patrocinador') NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academias (
    usuario_id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    biografia TEXT,
    artes_marcial VARCHAR(100),
    foto VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Exemplo de academias fictícias
INSERT INTO usuarios (email, senha, tipo) VALUES
('dojo@dojo.com', 'dojo123', 'academia'),
('gracie@barra.com', 'barra123', 'academia'),
('alpha@team.com', 'alpha123', 'academia');

INSERT INTO academias (usuario_id, nome, cnpj, biografia, artes_marcial, foto) VALUES
(1, 'Dojo Samurai', '12.345.678/0001-95', 'Academia tradicional de artes marciais.', 'Jiu-Jitsu, MMA', 'https://i.imgur.com/1Q9Z1Zm.png'),
(2, 'Gracie Barra', '98.765.432/0001-10', 'Referência mundial em Jiu-Jitsu.', 'Jiu-Jitsu', 'https://i.imgur.com/1Q9Z1Zm.png'),
(3, 'Team Alpha', '11.222.333/0001-44', 'Equipe de campeões.', 'Boxe, MMA', 'https://i.imgur.com/1Q9Z1Zm.png');

-- (Inclua as demais tabelas do modelo anterior aqui, igual ao modelo completo enviado antes)

-- Exemplo de tabela de lutadores, patrocinadores, eventos, etc...
-- ... 