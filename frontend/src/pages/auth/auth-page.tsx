import { AuthCard } from "components"
import { Center } from "@mantine/core"
import { UserBackend } from "backend/interfaces"
import { setAuthValue, setUserValue, useAppDispatch } from "redux/auth-service"
import { useNavigate } from "react-router-dom"
import { PublicUser } from "backend/interfaces/public-user-interface"

const convertBackendUserToPublicUser = (backendUser: UserBackend): PublicUser => {
  return {
    name: backendUser.username,
    email: backendUser.email!,
    finishedSignUp: false
  }
}
export const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onAuthentication = (user: UserBackend) => {
    dispatch(setAuthValue(true))
    dispatch(setUserValue(convertBackendUserToPublicUser(user)))
    navigate('/')

  }
  return <>
    <Center>
      <AuthCard onAuthentication={onAuthentication} />
    </Center>
  </>
}