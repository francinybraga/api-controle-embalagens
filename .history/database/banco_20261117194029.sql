CREATE DATABASE controle_embalagens;
use controle_embalagens;
CREATE TABLE embalagem (
id_embalagem int not null AUTO_INCREMENT primary key,
descricao VARCHAR(100) not null,
material varchar(100) not null,
capacidade varchar(1000) not null
);

CREATE TABLE maquina (
id_maquina int not null AUTO_INCREMENT primary key,
nome varchar(100) not null,
patrimonio varchar(100) not null,
status_maquina varchar(100) not null
);

CREATE TABLE operador (
id_operador int not null AUTO_INCREMENT primary key,
nome varchar(100) not null,
matricula varchar(100) not null,
turno varchar(100) not null
);