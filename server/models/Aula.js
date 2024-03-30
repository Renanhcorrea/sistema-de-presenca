const Aula = class {
    constructor (idAula, dataAula, horaInicio, horaFim, idTurma, codProfessor, codDisciplina){
        this.idAula = idAula;
        this.dataAula = dataAula;
        this.horaInicio = horaInicio;
        this.horaFim = horaFim;
        this.idTurma = idTurma;
        this.codProfessor = codProfessor;
        this.codDisciplina = codDisciplina;
    }

    // get all casses
    static async getAulas (conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_aula");
            return rows;
        } catch (error) {
            console.error("Erro ao obter aulas:", error);
            throw error;
        }
    }

    // get all classes by codProfessor
    static async getAulasByProfessor (conn, codProfessor) {
        try {
            const [rows, fields] = await conn.execute(
                "SELECT idAula, dataAula, horaInicio, horaFim, codTurma, anoTurma, nomeDisciplina, codProfessor, a.idTurma AS idTurma, a.codDisciplina AS codDisciplina FROM tb_aula a INNER JOIN tb_turma t ON a.idTurma = t.idTurma INNER JOIN tb_disciplina d ON a.codDisciplina = d.codDisciplina WHERE codProfessor =  ? AND dataAula = CURDATE()", [codProfessor]);
            return rows;
        } catch (error) {
            console.error("Erro ao obter aulas:", error);
            throw error;
        }
    }
}

module.exports = Aula;