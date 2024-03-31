require('dotenv').config()

import axios from 'axios';
const API_URL = process.env.API_URL;
const codProfessor = 'P002';

export const getProfessor = async () => {
  try {
    const response = await axios.get(`${API_URL}/professores/${codProfessor}`);
    return response.data[0];
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

export const getDisciplinas = async () => {
  try {
    const response = await axios.get(`${API_URL}/disciplinas`);
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