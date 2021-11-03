import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { AuthContext } from './contexts/auth/AuthContext'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import React, { useContext } from 'react'
import Messenger from './pages/messenger/Messenger'
import PrivateRoute from './components/PrivateRoutes'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route
          path="/register"
          render={(props) =>
            user ? <Redirect to="/" /> : <Login {...props} />
          }
          exact
        />
        <Route
          path="/login"
          render={(props) =>
            user ? <Redirect to="/" /> : <Login {...props} />
          }
          exact
        />
        <PrivateRoute path={'/profile/:username'} component={Profile} />
        <PrivateRoute path={'/messenger'} component={Messenger} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
