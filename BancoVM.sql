show databases;

create database gol_futuro;

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



create view vw_maiores_torcidas as 
select timeSelecionado, COUNT(*) as quantidade
from quiz
group by timeSelecionado;

create view vw_ligas_assistidas as 
select liga, COUNT(*) as quantidade
from quiz
group by liga;


alter table usuario add constraint 

select * from vw_ligas_assistidas;


