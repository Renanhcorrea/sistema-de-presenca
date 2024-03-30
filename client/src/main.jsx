import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './pages/home/Home.jsx';
import RegistrarPresencas from './pages/registrar_presencas/RegistrarPresencas.jsx';
import RelatorioGeral from './pages/relatorio_geral/RelatorioGeral.jsx';
import RelatorioAluno from './pages/relatorio_aluno/RelatorioAluno.jsx';
import RelatorioAlunoFiltros from './pages/relatorio_aluno_filtros/RelatorioAlunoFiltros.jsx';

const router = createBrowserRouter([
  ...[
    { 
      path: '/', 
      element: <Home /> 
    },
    {
      path: '/registrar-presencas',
      element: <RegistrarPresencas />
    },
    {
      path: '/relatorio-geral',
      element: <RelatorioGeral />
    },
    {
      path: '/relatorio-aluno',
      element: <RelatorioAluno />
    },
    {
      path: '/relatorio-aluno-filtros',
      element: <RelatorioAlunoFiltros />
    }
  ]
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
