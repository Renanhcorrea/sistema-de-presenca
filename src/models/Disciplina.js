const Disciplina = class {
    constructor (codDisciplina, nome, professor){
        this.codDisciplina = codDisciplina;
        this.nome = nome;
        this.professor = professor;
    }
}

module.export = Disciplina;