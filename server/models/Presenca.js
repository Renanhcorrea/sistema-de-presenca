const Presenca = class {
  constructor(idAula, codAluno, presente) {
    this.idAula = idAula;
    this.codAluno = codAluno;
    this.presente = presente;
  }

  // get all classes
  static async getPresencas(conn) {
    try {
      const [rows, fields] = await conn.execute("SELECT dataAula, p.idAula AS idAula, nomeDisciplina, c.nome AS nomeProf, CONCAT(anoTurma,codTurma) AS turma, al.nome AS nomeAluno, presente FROM tb_presenca p LEFT JOIN tb_aula a ON p.idAula = a.idAula LEFT JOIN tb_disciplina b ON a.codDisciplina = b.codDisciplina LEFT JOIN tb_professor c ON a.codProfessor = c.codProfessor LEFT JOIN tb_aluno al ON p.codAluno = al.codAluno LEFT JOIN tb_turma t ON al.idTurma = t.idTurma"
      );
      return rows;
    } catch (error) {
      console.error("Erro ao obter presencas:", error);
      throw error;
    }
  }

  // get presencas by codAluno
  static async getPresencasByAluno(conn, codAluno) {
    try {
        const [rows, fields] = await conn.execute("SELECT dataAula, p.idAula AS idAula, nomeDisciplina, nome AS nomeProf, presente FROM tb_presenca p LEFT JOIN tb_aula a ON p.idAula = a.idAula LEFT JOIN tb_disciplina b ON a.codDisciplina = b.codDisciplina LEFT JOIN tb_professor c ON a.codProfessor = c.codProfessor WHERE p.codAluno = ?", [codAluno]);
        return rows;
    } catch (error) {
        console.error("Erro ao obter presencas:", error);
        throw error;
    }
  }

  // set presence
  static async setPresenca(conn, idAula, codAluno, presente) {
    try {
      const [rows, fields] = await conn.execute("INSERT INTO tb_presenca (idAula, codAluno, presente) VALUES (?, ?, ?)", [idAula, codAluno, presente]);
      return rows;
    } catch (error) {
      console.error("Erro ao inserir presenca:", error);
      throw error;
    }
  }
}

module.exports = Presenca;