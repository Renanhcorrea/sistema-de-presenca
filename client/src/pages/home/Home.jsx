import React, { useState } from 'react';
import './Home.css';

import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Home() {
  const [fontSize, setFontSize] = useState(16);  // tamanho inicial da fonte em pixels

  const increaseFontSize = () => {
    setFontSize(prevFontSize => prevFontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(prevFontSize => Math.max(prevFontSize - 1, 10)); // impede que a fonte seja menor que 10px
  };

  // Estilo personalizado para garantir que a fonte seja aplicada corretamente
  const customStyle = {
    fontSize: `${fontSize}px`
  };

  return (
    <div className="home-container" style={customStyle}>
      <Header />
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10} style={customStyle}>
        <Button onClick={increaseFontSize} variant="outline-primary">A+</Button>
        <Button onClick={decreaseFontSize} variant="outline-secondary">A-</Button>
          <div className="menu-navegacao" style={customStyle}>
            <ul>
              <li><Link to={'/registrar-presencas'}><Button variant="secondary" style={customStyle}>Registrar Presenças</Button></Link></li>
              <li><Link to={'/relatorio-geral'}><Button variant="secondary" style={customStyle}>Gerar Relatório Geral</Button></Link></li>
              <li><Link to={'/relatorio-aluno'}><Button variant="secondary" style={customStyle}>Gerar Relatório de Aluno</Button></Link></li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}
