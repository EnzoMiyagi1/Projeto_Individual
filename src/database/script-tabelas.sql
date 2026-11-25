-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
create database AutoSports;
use AutoSports;

create table usuario (
    id int primary key auto_increment,
    nomeCompleto varchar(120) not null,
    email varchar(120) not null unique,
    senha varchar(120) not null,
    dt_cadastro timestamp default current_timestamp
);

create table tentativa (
    id int primary key auto_increment,
    acertos int not null,
    fk_usuario int not null,
    constraint fk_tentativa_usuario foreign key (fk_usuario) references usuario(id)
);

create table pergunta (
    id int primary key auto_increment,
    enunciado varchar(250) not null unique
);

create table alternativa (
    id int primary key auto_increment,
    descricao varchar(250) not null,
    correta tinyint not null default 0,
    fk_pergunta int not null,
    constraint fk_alternativa_pergunta foreign key (fk_pergunta) references pergunta(id)
);

alter table tentativa add column erros int not null default 0,
						add column dt_tentativa timestamp null default current_timestamp;
                        
                        select * from tentativa;
