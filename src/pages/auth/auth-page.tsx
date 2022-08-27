import { AuthCard } from "components"
import { Center } from "@mantine/core"
import { User } from "interfaces/user-interface"
import { setAuthValue, setUserValue, useAppDispatch } from "redux/authService"
import { useNavigate } from "react-router-dom"

export const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onAuthentication = (user: User) => {
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