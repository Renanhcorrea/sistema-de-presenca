create database escola_octogono;
use escola_octogono;

-- drop database escola_octogono;
    
-- Criação da tabela tb_responsavel
create table tb_responsavel (
	codResp varchar(10) primary key,
	nome varchar(100),
	email varchar(80),
	telefone int
);

-- Criação da tabela tb_turma
create table tb_turma (
	idTurma int primary key auto_increment,
	codTurma varchar(10),
	anoTurma int
);

-- Criação da tabela tb_professor
create table tb_professor (
	codProfessor varchar(10) primary key,
	nome varchar(100),
	telefone int
);

-- Criação da tabela tb_disciplina
create table tb_disciplina (
	codDisciplina varchar(10) primary key,
	nomeDisciplina varchar(100)
);

-- Criação da tabela de associação entre professor e disciplina (relação muitos para muitos)
create table tb_professor_disciplina (
	codProfessor varchar(10),
	codDisciplina varchar(10),
	primary key (codProfessor, codDisciplina),
	foreign key (codProfessor) references tb_professor(codProfessor),
	foreign key (codDisciplina) references tb_disciplina(codDisciplina)
);

-- Criação da tabela tb_aula
create table tb_aula (
	idAula int primary key auto_increment,
	dataAula varchar(10),
	horaInicio varchar(5),
	horaFim varchar(5),
	idTurma int,
	codProfessor varchar(10),
	codDisciplina varchar(10),
	foreign key (idTurma) references tb_turma(idTurma),
	foreign key (codProfessor) references tb_professor(codProfessor),
	foreign key (codDisciplina) references tb_disciplina(codDisciplina)
);

-- Criação da tabela tb_aluno
create table tb_aluno (
    codAluno varchar(10) primary key,
    codResp varchar(10),
    nome varchar(100),
    idTurma int,
    foreign key (codResp) references tb_responsavel(codResp),
    foreign key (idTurma) references tb_turma(idTurma)
);

-- Criação da tabela tb_presenca
create table tb_presenca (
	idPresenca int primary key auto_increment,
	idAula int,
	codAluno varchar(10),
	presente bool,
	foreign key (idAula) references tb_aula(idAula),
	foreign key (codAluno) references tb_aluno(codAluno)
);

insert into tb_responsavel (codResp, nome, email, telefone) values
('R001', 'Ana Silva', 'ana.silva@example.com', 123456789),
('R002', 'Carlos Oliveira', 'carlos.oliveira@example.com', 987654321),
('R003', 'Maria Santos', 'maria.santos@example.com', 654321987),
('R004', 'João Pereira', 'joao.pereira@example.com', 321987654);

insert into tb_turma (codTurma, anoTurma) values
('A', 1),
('B', 1),
('A', 2),
('B', 2),
('C', 3),
('D', 3);

insert into tb_professor (codProfessor, nome, telefone) values
('P001', 'José da Silva', 123456789),
('P002', 'Maria Oliveira', 987654321),
('P003', 'Carlos Santos', 654321987),
('P004', 'Ana Pereira', 321987654),
('P005', 'Fernanda Lima', 111222333),
('P006', 'Ricardo Souza', 444555666);

insert into tb_disciplina (codDisciplina, nomeDisciplina) values
('D001', 'Matemática'),
('D002', 'Português'),
('D003', 'Ciências'),
('D004', 'História'),
('D005', 'Geografia'),
('D006', 'Inglês');

insert into tb_professor_disciplina (codProfessor, codDisciplina) values
('P001', 'D001'), -- José da Silva é professor de Matemática
('P002', 'D002'), -- Maria Oliveira é professora de Português
('P003', 'D003'), -- Carlos Santos é professor de Ciências
('P004', 'D004'), -- Ana Pereira é professora de História
('P005', 'D005'), -- Fernanda Lima é professora de Geografia
('P006', 'D006'); -- Ricardo Souza é professor de Inglês

insert into tb_aula (dataAula, horaInicio, horaFim, idTurma, codProfessor, codDisciplina) values
('2024-03-29', '08:00', '09:30', 1, 'P001', 'D001'), -- Aula de Matemática com José da Silva para a Turma A do Ano 1
('2024-03-30', '09:00', '10:30', 2, 'P002', 'D002'), -- Aula de Português com Maria Oliveira para a Turma B do Ano 1
('2024-03-31', '10:00', '11:30', 3, 'P003', 'D003'), -- Aula de Ciências com Carlos Santos para a Turma A do Ano 2
('2024-04-01', '11:00', '12:30', 4, 'P004', 'D004'), -- Aula de História com Ana Pereira para a Turma B do Ano 2
('2024-04-02', '13:00', '14:30', 5, 'P005', 'D005'), -- Aula de Geografia com Fernanda Lima para a Turma C do Ano 3
('2024-04-03', '14:00', '15:30', 6, 'P006', 'D006'); -- Aula de Inglês com Ricardo Souza para a Turma D do Ano 3

-- Inserindo dados na tabela tb_aluno
insert into tb_aluno (codAluno, codResp, nome, idTurma) values
('A001', 'R001', 'João', 1),
('A002', 'R002', 'Maria', 2),
('A003', 'R003', 'Pedro', 1),
('A004', 'R001', 'Ana', 2),
('A005', 'R002', 'Carlos', 3),
('A006', 'R003', 'Fernanda', 3);