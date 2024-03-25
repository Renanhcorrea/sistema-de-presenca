const Aluno = class {
    constructor (codAluno, nome, ano, codTurma){
        this.codAluno = codAluno;
        this.nome = nome;
        this.ano = ano;
        this.codTurma = codTurma;
    }
}

module.export = Aluno;