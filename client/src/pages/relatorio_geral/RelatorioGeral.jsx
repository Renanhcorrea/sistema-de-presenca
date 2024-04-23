import { useState, useEffect } from 'react';
import './RelatorioGeral.css';
import { getProfessores, getDisciplinas, getTurmas, getPresencas } from '../../api/utils';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';

export default function RelatorioGeral() {
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [professores, setProfessores] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [relatorio, setRelatorio] = useState({}); // Adicionado estado para armazenar o relatório calculado
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro
  const [fontSize, setFontSize] = useState(16); 

  // Popula filtros
  useEffect(() => {
    const fetchProfessoresData = async () => {
      const professoresData = await getProfessores();
      if (professoresData) {
        setProfessores(professoresData);
      }
    };

    fetchProfessoresData();
  }, []);

  useEffect(() => {
    const fetchDisciplinasData = async () => {
      const disciplinasData = await getDisciplinas();
      if (disciplinasData) {
        setDisciplinas(disciplinasData);
      }
    };

    fetchDisciplinasData();
  }, []);

  useEffect(() => {
    const fetchTurmasData = async () => {
      const turmasData = await getTurmas();
      if (turmasData) {
        setTurmas(turmasData);
      }
    };

    fetchTurmasData();
  }, []);

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
    setShowTable(false); // Resetar a exibição da tabela quando o professor é alterado
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a seleção
  };

  const handleDisciplinaChange = (event) => {
    setSelectedDisciplina(event.target.value);
    setShowTable(false); // Resetar a exibição da tabela quando a disciplina é alterada
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a seleção
  };
  
  const handleTurmaChange = (event) => {
    setSelectedTurma(event.target.value);
    setShowTable(false); // Resetar a exibição da tabela quando a disciplina é alterada
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a seleção
  };

  const handleDataInicialChange = (event) => {
    setDataInicial(event.target.value);
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a seleção
  };

  const handleDataFinalChange = (event) => {
    setDataFinal(event.target.value);
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a seleção
  };

  const handleSubmit = async () => {
    if (!selectedProfessor || !selectedDisciplina || !selectedTurma || !dataInicial || !dataFinal) {
      setErrorMessage('Todos os campos são obrigatórios.');
      setShowTable(false);
    } else if (new Date(dataInicial) >= new Date(dataFinal)) {
      setErrorMessage('A data inicial deve ser menor que a data final.');
      setShowTable(false);
    } else {
      const presencasData = await getPresencas();
      const relatorioFiltrado = presencasData
        .filter(presenca => {
          // Filtra por disciplina
          const filtroDisciplina = selectedDisciplina ? presenca.nomeDisciplina === selectedDisciplina : true;
          // Filtra por professor
          const filtroProfessor = selectedProfessor ? presenca.nomeProf === selectedProfessor : true;
          // Filtra por turma
          const filtroTurma = selectedTurma ? presenca.turma === selectedTurma : true;
          // Filtra por data
          const dataAula = new Date(presenca.dataAula);
          const filtroData = dataInicial && dataFinal ? (dataAula >= new Date(dataInicial) && dataAula <= new Date(dataFinal)) : true;
          
          return filtroDisciplina && filtroProfessor && filtroTurma && filtroData;
        })
        .reduce((acc, presenca) => {
          const chave = presenca.nomeAluno;
          if (!acc[chave]) {
            acc[chave] = { totalAulas: 0, presencas: 0 };
          }
          acc[chave].totalAulas++;
          if (presenca.presente) {
            acc[chave].presencas++;
          }
          return acc;
        }, {});
      
      const relatorioCalculado = Object.entries(relatorioFiltrado).map(([nomeAluno, dados]) => ({
        nomeAluno,
        faltas: dados.totalAulas - dados.presencas,
        frequencia: (dados.presencas / dados.totalAulas * 100).toFixed(2) + '%'
      }));

      setRelatorio(relatorioCalculado);
      setShowTable(true);
      setErrorMessage('');
    }
  };
  
  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 1, 10));

  return (
    <div className="relatorio-geral" style={{ fontSize: `${fontSize}px` }}>
      <Header />
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container>
            <Button onClick={increaseFontSize} variant="outline-primary" style={{ margin: '5px' }}>A+</Button>
            <Button onClick={decreaseFontSize} variant="outline-secondary" style={{ margin: '5px' }}>A-</Button>
            <h1 className="mb-3">Relatório Geral de Faltas</h1>
            <section className = "filtros">
            {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
              <div className='seleciona-datas'>
              <label htmlFor="input-dataInicial">Data inicial:</label>
              <input className="ms-2 mb-3"
                type="date"
                id="input-dataInicial"
                value={dataInicial}
                onChange={handleDataInicialChange}
                style={{ fontSize: `${fontSize}px` }}
              />
              </div>
              <div className = "seleciona-datas">
              <label htmlFor="input-dataFinal">Data final:</label>
                <input className="ms-2 mb-3"
                  type="date"
                  id="input-dataFinal"
                  value={dataFinal}
                  onChange={handleDataFinalChange}
                  style={{ fontSize: `${fontSize}px` }}
                />
              </div>
              <div className='seleciona-professor'>
                <label htmlFor="select-professor">Selecione o professor:</label>
                <select id="select-professor" className="ms-2 mb-3" onChange={handleProfessorChange} style={{ fontSize: `${fontSize}px` }}>
                  <option value="">Selecione um professor</option>
                  {professores.map(professor => (
                    <option key={professor.nome} value={professor.nome}>
                      {`${professor.codProfessor} - ${professor.nome}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className='seleciona-disciplina'>
                <label htmlFor="select-disciplina">Selecione a disciplina:</label>
                <select id="select-disciplina" className="ms-2 mb-3" onChange={handleDisciplinaChange} style={{ fontSize: `${fontSize}px` }}>
                  <option value="">Selecione uma disciplina</option>
                  {disciplinas.map(disciplina => (
                    <option key={disciplina.nomeDisciplina} value={disciplina.nomeDisciplina}>
                      {`${disciplina.codDisciplina} - ${disciplina.nomeDisciplina}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className='seleciona-turma'>
                <label htmlFor="select-turma">Selecione a turma:</label>
                <select id="select-turma" className="ms-2 mb-3" onChange={handleTurmaChange} style={{ fontSize: `${fontSize}px` }}>
                  <option value="">Selecione uma turma</option>
                  {turmas.map(turma => (
                    <option key={turma.anoTurma + turma.codTurma} value={turma.anoTurma + turma.codTurma}>
                      {`${turma.anoTurma}${turma.codTurma}`}
                    </option>
                  ))}
                </select>
              </div>
                <Button variant="secondary" className='w-25' onClick={handleSubmit} style={{ fontSize: `${fontSize}px` }}>Gerar relatório</Button>
            </section>
            {showTable && (
              <Table style={{ fontSize: `${fontSize}px` }}>
                <thead>
                  <tr>
                    <th>Nome do Aluno</th>
                    <th>Total de Faltas</th>
                    <th>Frequência</th>
                  </tr>
                </thead>
                <tbody>
                  {relatorio.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nomeAluno}</td>
                      <td>{item.faltas}</td>
                      <td>{item.frequencia}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
}
