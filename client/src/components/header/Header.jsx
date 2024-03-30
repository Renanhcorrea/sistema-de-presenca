import './Header.css'
import logo from '../../assets/logo_branco-trbg.png'

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <header>
          <img src={logo} alt="Logotipo da Escola Octógono" />
          <h1>Sistema de Registro de Presença</h1>
        </header>
      </div>
    </header>
  )
}