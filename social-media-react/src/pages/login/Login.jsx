import './login.css'
import { useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../contexts/auth/AuthContext'
import { CircularProgress } from '@mui/material'
const Login = () => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext)
  const email = useRef()
  const password = useRef()
  const handleClick = (e) => {
    e.preventDefault()
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
    )
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Scinsocial</h3>
          <span className="loginDesc">
            Connectez-vous avec vos amis et le monde qui vous entoure sur
            Scinsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              required
              min={6}
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="15px" />
              ) : (
                'Se connecter'
              )}
            </button>
            <span className="loginForgot">Mot de passe oublié?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="15px" />
              ) : (
                'Créer un nouveau compte'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
