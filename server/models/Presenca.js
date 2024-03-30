const Presenca = class {
  constructor(idAula, codAluno, presente) {
    this.idAula = idAula;
    this.codAluno = codAluno;
    this.presente = presente;
  }

  // get all classes
  static async getPresencas(conn) {
    try {
      const [rows, fields] = await conn.execute("SELECT * FROM tb_presenca");
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