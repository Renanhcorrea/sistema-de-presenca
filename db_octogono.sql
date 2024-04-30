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
('R004', 'João Pereira', 'joao.pereira@example.com', 321987654),
('R005', 'Fernanda Costa', 'fernanda.costa@example.com', 111222333),
('R006', 'Pedro Rodrigues', 'pedro.rodrigues@example.com', 444555666),
('R007', 'Juliana Oliveira', 'juliana.oliveira@example.com', 777888999),
('R008', 'Ricardo Martins', 'ricardo.martins@example.com', 101010101),
('R009', 'Amanda Pereira', 'amanda.pereira@example.com', 202020202),
('R010', 'Lucas Ferreira', 'lucas.ferreira@example.com', 303030303),
('R011', 'Patricia Santos', 'patricia.santos@example.com', 404040404),
('R012', 'Guilherme Silva', 'guilherme.silva@example.com', 505050505),
('R013', 'Laura Oliveira', 'laura.oliveira@example.com', 606060606),
('R014', 'Márcio Gonçalves', 'marcio.goncalves@example.com', 707070707),
('R015', 'Camila Almeida', 'camila.almeida@example.com', 808080808),
('R016', 'Felipe Rodrigues', 'felipe.rodrigues@example.com', 909090909),
('R017', 'Vanessa Costa', 'vanessa.costa@example.com', 121212121),
('R018', 'Anderson Santos', 'anderson.santos@example.com', 131313131),
('R019', 'Tatiane Oliveira', 'tatiane.oliveira@example.com', 141414141),
('R020', 'Roberto Silva', 'roberto.silva@example.com', 151515151),
('R021', 'Larissa Pereira', 'larissa.pereira@example.com', 161616161),
('R022', 'Marcos Ferreira', 'marcos.ferreira@example.com', 171717171),
('R023', 'Carolina Martins', 'carolina.martins@example.com', 181818181),
('R024', 'Renato Oliveira', 'renato.oliveira@example.com', 191919191),
('R025', 'Mariana Silva', 'mariana.silva@example.com', 202122232),
('R026', 'Leonardo Oliveira', 'leonardo.oliveira@example.com', 212223242),
('R027', 'Beatriz Santos', 'beatriz.santos@example.com', 222324252),
('R028', 'Rafael Pereira', 'rafael.pereira@example.com', 232425262),
('R029', 'Luiza Costa', 'luiza.costa@example.com', 242526272),
('R030', 'Mateus Rodrigues', 'mateus.rodrigues@example.com', 252627282),
('R031', 'Isabela Oliveira', 'isabela.oliveira@example.com', 262728292),
('R032', 'Felipe Martins', 'felipe.martins@example.com', 272829303),
('R033', 'Ana Paula Ferreira', 'ana.paula.ferreira@example.com', 282930313),
('R034', 'Gabriel Santos', 'gabriel.santos@example.com', 293031323),
('R035', 'Carla Almeida', 'carla.almeida@example.com', 303132333),
('R036', 'Diego Silva', 'diego.silva@example.com', 313233343),
('R037', 'Patrícia Costa', 'patricia.costa@example.com', 323334353);

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
('P001', 'D002'), -- José da Silva é professor de Portugues
('P006', 'D002'), -- Ricardo Souza é professor de Português
('P003', 'D003'), -- Carlos Santos é professor de Ciências
('P004', 'D004'), -- Ana Pereira é professora de História
('P005', 'D005'), -- Fernanda Lima é professora de Geografia
('P005', 'D004'), -- Fernanda Lima é professora de História
('P002', 'D006'); -- Maria Oliveira é professora de Inglês
--

insert into tb_aula (dataAula, horaInicio, horaFim, idTurma, codProfessor, codDisciplina) values
('2024-03-29', '07:30', '08:30', 1, 'P001', 'D001'), -- Aula de Matemática com José da Silva para a Turma A do Ano 1
('2024-03-30', '07:30', '08:30', 2, 'P002', 'D006'), -- Aula de Inglês com Maria Oliveira para a Turma B do Ano 1
('2024-03-31', '10:00', '11:00', 3, 'P003', 'D003'), -- Aula de Ciências com Carlos Santos para a Turma A do Ano 2
('2024-04-01', '11:00', '12:00', 4, 'P004', 'D004'), -- Aula de História com Ana Pereira para a Turma B do Ano 2
('2024-04-02', '07:30', '08:30', 5, 'P005', 'D005'), -- Aula de Geografia com Fernanda Lima para a Turma C do Ano 3
('2024-04-03', '08:30', '09:30', 6, 'P006', 'D002'), -- Aula de Português com Ricardo Souza para a Turma D do Ano 3
('2024-03-30', '10:00', '11:00', 1, 'P002', 'D006'), -- Aula de Inglês com Maria Oliveira para a Turma A do Ano 1
('2024-03-31', '07:30', '08:30', 4, 'P002', 'D006'), -- Aula de Inglês com Maria Oliveira para a Turma B do Ano 2
('2024-03-31', '10:00', '11:00', 3, 'P002', 'D006'), -- Aula de Inglês com Maria Oliveira para a Turma A do Ano 2
('2024-04-01', '07:30', '08:30', 5, 'P002', 'D006'), -- Aula de Inglês com Maria Oliveira para a Turma C do Ano 3
('2024-04-01', '10:00', '11:00', 6, 'P002', 'D006'), -- Aula de Inglês com Maria Oliveira para a Turma D do Ano 3
('2024-04-02', '07:30', '08:30', 1, 'P002', 'D006'), 
('2024-04-02', '10:00', '11:00', 2, 'P002', 'D006'), 
('2024-04-03', '07:30', '08:30', 3, 'P002', 'D006'), 
('2024-04-03', '10:00', '11:00', 4, 'P002', 'D006'), 
('2024-04-04', '07:30', '08:30', 5, 'P002', 'D006'), 
('2024-04-04', '10:00', '11:00', 6, 'P002', 'D006'), 
('2024-05-01', '07:30', '08:30', 3, 'P002', 'D006'), 
('2024-05-01', '10:00', '11:00', 6, 'P002', 'D006'), 
('2024-05-02', '07:30', '08:30', 1, 'P002', 'D006'), 
('2024-05-02', '10:00', '11:00', 2, 'P002', 'D006'), 
('2024-05-03', '07:30', '08:30', 3, 'P002', 'D006'), 
('2024-05-03', '10:00', '11:00', 4, 'P002', 'D006'), 
('2024-05-04', '07:30', '08:30', 5, 'P002', 'D006'), 
('2024-05-04', '10:00', '11:00', 6, 'P002', 'D006'), 
('2024-05-05', '07:30', '08:30', 2, 'P002', 'D006'), 
('2024-05-05', '10:00', '11:00', 3, 'P002', 'D006'), 
('2024-05-06', '07:30', '08:30', 4, 'P002', 'D006'), 
('2024-05-06', '10:00', '11:00', 5, 'P002', 'D006'), 
('2024-05-07', '07:30', '08:30', 6, 'P002', 'D006'), 
('2024-05-07', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-08', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-08', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-09', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-09', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-10', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-10', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-11', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-11', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-12', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-12', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-13', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-13', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-14', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-14', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-15', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-15', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-16', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-16', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-17', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-17', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-18', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-18', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-19', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-19', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-20', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-20', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-21', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-21', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-22', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-22', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-23', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-23', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-24', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-25', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-25', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-26', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-26', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-27', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-27', '10:00', '11:00', 1, 'P002', 'D006'),
('2024-05-28', '07:30', '08:30', 2, 'P002', 'D006'),
('2024-05-28', '10:00', '11:00', 3, 'P002', 'D006'),
('2024-05-29', '07:30', '08:30', 4, 'P002', 'D006'),
('2024-05-29', '10:00', '11:00', 5, 'P002', 'D006'),
('2024-05-30', '07:30', '08:30', 6, 'P002', 'D006'),
('2024-05-30', '10:00', '11:00', 1, 'P002', 'D006');

-- Inserindo dados na tabela tb_aluno
insert into tb_aluno (codAluno, codResp, nome, idTurma) values
('A001', 'R001', 'João', 1),
('A002', 'R002', 'Maria', 2),
('A003', 'R003', 'Pedro', 1),
('A004', 'R001', 'Ana', 2),
('A005', 'R002', 'Carlos', 3),
('A006', 'R003', 'Fernanda', 3),
('A007', 'R004', 'Lucas', 4),
('A008', 'R005', 'Juliana', 4),
('A009', 'R006', 'Ricardo', 5),
('A010', 'R007', 'Amanda', 5),
('A011', 'R008', 'Patricia', 6),
('A012', 'R009', 'Guilherme', 6),
('A013', 'R010', 'Laura', 1),
('A014', 'R011', 'Márcio', 2),
('A015', 'R012', 'Camila', 3),
('A016', 'R013', 'Felipe', 4),
('A017', 'R014', 'Vanessa', 5),
('A018', 'R015', 'Anderson', 6),
('A019', 'R016', 'Tatiane', 1),
('A020', 'R017', 'Roberto', 2),
('A021', 'R018', 'Larissa', 3),
('A022', 'R019', 'Marcos', 4),
('A023', 'R020', 'Carolina', 5),
('A024', 'R021', 'Renato', 6);


-- inserindo dados na tabela tb_presenca
INSERT INTO tb_presenca (idAula, codAluno, presente) VALUES
(1, 'A001', 1),
(1, 'A003', 1),
(1, 'A013', 0),
(1, 'A019', 1),
(2, 'A002', 0),
(2, 'A004', 0),
(2, 'A014', 0),
(2, 'A020', 0),
(3, 'A005', 1),
(3, 'A006', 1),
(3, 'A015', 0),
(3, 'A021', 1),
(4, 'A007', 0),
(4, 'A008', 1),
(4, 'A016', 1),
(4, 'A022', 1),
(5, 'A009', 0),
(5, 'A010', 0),
(5, 'A017', 0),
(5, 'A023', 1),
(6, 'A011', 1),
(6, 'A012', 0),
(6, 'A018', 1),
(6, 'A024', 0),
(7, 'A001', 1),
(7, 'A003', 1),
(7, 'A013', 0),
(7, 'A019', 1),
(8, 'A007', 1),
(8, 'A008', 0),
(8, 'A016', 1),
(8, 'A022', 1),
(10, 'A009', 0),
(10, 'A010', 1),
(10, 'A017', 0),
(10, 'A023', 1),
(11, 'A011', 0),
(11, 'A012', 0),
(11, 'A018', 0),
(11, 'A024', 0),
(12, 'A001', 1),
(12, 'A003', 1),
(12, 'A013', 0),
(12, 'A019', 1),
(13, 'A002', 0),
(13, 'A004', 1),
(13, 'A014', 1),
(13, 'A020', 0),
(14, 'A005', 1),
(14, 'A006', 0),
(14, 'A015', 0),
(14, 'A021', 1),
(15, 'A007', 1),
(15, 'A008', 1),
(15, 'A016', 0),
(15, 'A022', 1),
(16, 'A009', 1),
(16, 'A010', 1),
(16, 'A017', 0),
(16, 'A023', 1),
(17, 'A011', 0),
(17, 'A012', 1),
(17, 'A018', 0),
(17, 'A024', 1);
