-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE gol_futuro;

USE gol_futuro;


CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50) unique,
	senha VARCHAR(50)
);




create table quiz (
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
	liga varchar(30),
    timeSelecionado varchar(30),
    fkUsuario int,
    foreign key (fkUsuario) references usuario(id)
);


use gol_futuro;
select * from usuario;
truncate table quiz;

create view vw_maiores_torcidas as 
select timeSelecionado, COUNT(*) as quantidade
from quiz
group by timeSelecionado;

create view vw_ligas_assistidas as 
select liga, COUNT(*) as quantidade
from quiz
group by liga;


select * from vw_ligas_assistidas;
select * from vw_maiores_torcidas;


create view  vw_liga_mais_assistidas as 
select liga, COUNT(*) as total 
from quiz 
group by liga 
order by total desc limit 1;

select * from vw_liga_mais_assistidas;






