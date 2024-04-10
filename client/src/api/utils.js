import axios from 'axios';
//const API_URL = 'http://15.228.148.167:3000';
const API_URL = 'http://localhost:3000'
const codProfessor = 'P002';

export const getProfessor = async () => {
  try {
    const response = await axios.get(`${API_URL}/professores/${codProfessor}`);
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
}

export const getProfessores = async () => {
  try {
    const response = await axios.get(`${API_URL}/professores`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAulasByProfessor = async () => {
  try {
    const response = await axios.get(`${API_URL}/aulas/professor/${codProfessor}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAlunosByTurma = async (idTurma) => {
  try {
    const response = await axios.get(`${API_URL}/alunos/${idTurma}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAlunos = async () => {
  try {
    const response = await axios.get(`${API_URL}/alunos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getTurmas = async () => {
  try {
    const response = await axios.get(`${API_URL}/turmas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getDisciplinas = async () => {
  try {
    const response = await axios.get(`${API_URL}/disciplinas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPresencas = async () => {
  try {
    const response = await axios.get(`${API_URL}/presencas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPresencasByAluno = async (codAluno) => {
  try {
    const response = await axios.get(`${API_URL}/presencas/${codAluno}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const setPresenca = async (codAluno, idAula, presente) => {
  try {
    await axios.post(`${API_URL}/presencas`, {
      idAula,
      codAluno,
      presente
    });
  } catch (error) {
    console.error(error);
  }
}