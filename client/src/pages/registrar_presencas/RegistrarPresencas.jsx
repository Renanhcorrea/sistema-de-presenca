import { useState, useEffect } from 'react';
import './RegistrarPresencas.css';
import { getAulasByProfessor, getAlunosByTurma, setPresenca, getDisciplinas } from '../../api/utils';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';

export default function RegistrarPresencas() {
  // useState para armazenar a lista de aulas
  const [aulas, setAulas] = useState([]);
  // useState para armazenar a lista de alunos	
  const [alunos, setAlunos] = useState([]);
  // useState para armazenar a aula selecionada
  const [selectedAula, setSelectedAula] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [fontSize, setFontSize] = useState(16); 

  // useEffect para buscar a lista de aulas
  useEffect(() => {
    const fetchAulasData = async () => {
      const aulasData = await getAulasByProfessor();
      if (aulasData) {
        setAulas(aulasData);
      }
    };

    fetchAulasData();
  }, []);

  // useEffect para buscar a lista de alunos de acordo com a turma da aula selecionada
  useEffect(() => {
    const fetchAlunosByTurma = async () => {
      if (selectedAula) {
        const aulaSelecionada = aulas.find(aula => aula.idAula === Number(selectedAula));
        if (aulaSelecionada) {
          const alunosData = await getAlunosByTurma(aulaSelecionada.idTurma);
          if (alunosData) {
            setAlunos(alunosData);
          }
        }
      }
    };

    fetchAlunosByTurma();
  }, [selectedAula, aulas]);

  // Função para lidar com a mudança de aula selecionada
  const handleAulaChange = (event) => {
    setSelectedAula(event.target.value);
  };

  // Função para marcar as presenças
  const marcarPresencas = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (!isAnyChecked) {
      setShowAlert(true); // Ativar o alerta se nenhum checkbox estiver marcado
      setTimeout(() => setShowAlert(false), 5000); // Desativar o alerta após 5 segundos
      return; // Parar a execução da função aqui
    }

    const confirmacao = confirm('Deseja confirmar o envio das faltas e presenças marcadas?');
    if (confirmacao) {
      checkboxes.forEach((checkbox, index) => {
        setPresenca(alunos[index].codAluno, selectedAula, checkbox.checked);
      });
      alert('Presenças marcadas com sucesso!');
      window.location.href = "/";
    }
  };

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 1, 10));

  return (
    <div className="registrar-presencas" style={{ fontSize: `${fontSize}px` }}>
      <Header />
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container>
            <Button onClick={increaseFontSize} variant="outline-primary" style={{ margin: '5px' }}>A+</Button>
            <Button onClick={decreaseFontSize} variant="outline-secondary" style={{ margin: '5px' }}>A-</Button>
            <h1 className="mb-3">Registrar Presenças</h1>
            <label htmlFor="select-aula">Selecione a aula:</label>
            <select id="select-aula" className="ms-2 mb-3" onChange={handleAulaChange} style={{ fontSize: `${fontSize}px` }}>
              <option value="">Selecione uma aula</option>
              {aulas.map(aula => (
                <option key={aula.idAula} value={aula.idAula}>
                  {`${aula.nomeDisciplina} - ${aula.horaInicio} às ${aula.horaFim} - ${aula.anoTurma}${aula.codTurma}`}
                </option>
              ))}
            </select>
            <Table bordered hover style={{ fontSize: `${fontSize}px` }}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Presença</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.codAluno}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.codAluno}</td>
                    <td><input type="checkbox" style={{ fontSize: `${fontSize}px` }}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {showAlert && (
              <Alert variant="warning" style={{ fontSize: `${fontSize}px` }}>
                Registre a presença de pelo menos um aluno.
              </Alert>
            )}
            <Button variant="secondary" type="submit" className='w-25' onClick={marcarPresencas} style={{ fontSize: `${fontSize}px` }}>Marcar Presenças</Button>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
