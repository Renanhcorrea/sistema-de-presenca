import './Sidebar.css';
import professor_foto from '../../assets/professor.png';
import { useEffect, useState } from 'react';
import { getProfessor } from '../../api/utils';

export default function Sidebar() {
  const [professor, setProfessor] = useState({});

  useEffect(() => {
    const fetchProfessor = async () => {
      const professorData = await getProfessor();
      if (professorData) {
        setProfessor(professorData);
      }
    }
    fetchProfessor();
  }, []);

  return (
    <div className="sidebar">
      <div className="dados-usuario">
        <img src={professor_foto} alt="Foto do Usuário" />
        <div className="informacoes-usuario">
          <h2>{professor.nome}</h2>
          <p>Professor(a)</p>
        </div>
      </div>
    </div>
  )
}