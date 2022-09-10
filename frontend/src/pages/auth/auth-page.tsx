import { AuthCard } from "components"
import { Center } from "@mantine/core"
import { UserBackend } from "backend/interfaces"
import { setAuthValue, setUserValue, useAppDispatch } from "redux/authService"
import { useNavigate } from "react-router-dom"

export const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onAuthentication = (user: UserBackend) => {
    dispatch(setAuthValue(true))
    dispatch(setUserValue(user))
    navigate('/')

  }
  return <>
    <Center>
      <AuthCard onAuthentication={onAuthentication} />
    </Center>
  </>
}