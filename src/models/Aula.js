const Aula = class {
    constructor (data, turma, professor, disciplina, codAula){
        this.data = data;
        this.turma = turma;
        this.professor = professor;
        this.disciplina = disciplina;
        this.codAula = codAula;
    }
}

module.export = Aula;