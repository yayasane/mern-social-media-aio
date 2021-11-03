import axios from 'axios'
import {
  LoginFaillure,
  LoginStart,
  LoginSuccess,
} from './contexts/auth/auth.actions'

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(LoginStart())
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/auth/login`,
      userCredentials,
    )
    dispatch(LoginSuccess(data))
  } catch (err) {
    dispatch(LoginFaillure(err.message))
  }
}
