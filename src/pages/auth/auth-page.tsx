import { AuthCard } from "components"
import { Center } from "@mantine/core"
import { User } from "interfaces/user-interface"
import { setAuthValue, setUserValue, useAppDispatch } from "redux/authService"

export const AuthPage = () => {
  const dispatch = useAppDispatch()
  const onAuthentication = (user: User) => {
    dispatch(setAuthValue(true))
    dispatch(setUserValue(user))
  }
  return <>
    <Center>
      <AuthCard onAuthentication={onAuthentication} />
    </Center>
  </>
}