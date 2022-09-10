import { Card, Box, Center, PasswordInput, Text, TextInput, Button, Group, Anchor, Divider } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { useState, FC } from "react"
import { FcGoogle } from 'react-icons/fc'
import { MdAlternateEmail } from 'react-icons/md'
import { IconArrowLeft } from '@tabler/icons'

import { userAuth, AuthErrorsCodes } from "backend/adapters"
import { UserBackend } from "backend/interfaces"

interface IProps {
  onAuthentication: (user: UserBackend) => void
}

export const AuthCard: FC<IProps> = (props) => {
  const [type, toggleType] = useToggle(['login', 'register']);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")

  const catchPasswordErrors = (errorMessage: string): string | null => {
    switch (errorMessage) {
      case AuthErrorsCodes.WeakPassword:
        return "Weak password, at least 6 character"
      case AuthErrorsCodes.WrongPassword:
        return "Wrong password"
      default:
        return null
    }
  }
  const catchEmailErrors = (errorMessage: string): string | null => {
    switch (errorMessage) {
      case AuthErrorsCodes.EmailAreadyInUse:
        return "E-mail already in use"
      case AuthErrorsCodes.InvaildEmail:
        return "Invalid e-mail"
      case AuthErrorsCodes.UserNotFound:
        return "User not found"
      default:
        return null
    }
  }
  const googleSigninPopup = async () => {
    const res = await userAuth.signInWithGoogle();
    props.onAuthentication(res)
  }
  const handleSubmitButton = async (event: any) => {
    event.preventDefault?.()
    let user;
    if (type === "register") {
      user = await userAuth.createUserWithEmailAndPassword(username, email, password)
    } else {
      user = await userAuth.signInWithEmailAndPassword(email, password)
    }
    props.onAuthentication(user)
  }
  return <>
    <Card withBorder
      radius="sm"
      p='xl'
      shadow="sm"
      style={{
        minWidth: 400
      }}

    >
      <Text size='xl' mb="md" weight={700}>{
        type === "register" ? "Create your account!" : "Welcome back!"
      }</Text>
      <Group grow mb='md'>
        <Button variant="default"
          radius='lg' leftIcon={<FcGoogle />}
          onClick={() => googleSigninPopup()}>
          Sign in with google </Button>
      </Group>

      <Divider labelPosition="center" my='sm' label="or sign with email"></Divider>

      <form onSubmit={handleSubmitButton}>
        {type === 'register' && (
          <TextInput required label="Username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <TextInput required label="Email"
          rightSection={<MdAlternateEmail />}
          placeholder="your-email@email.com"
          onChange={(e) => setEmail(e.target.value)}
          error={catchEmailErrors(error)}
        />
        <PasswordInput required label='Password'
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          error={catchPasswordErrors(error)}
        />

        <Group position="apart" mt='xl'>
          <Anchor size='xs' onClick={() => toggleType()}>
            {
              type === 'login'
                ? "Don't have an account yet?"
                : <Center inline color="blue">
                  <IconArrowLeft size={12} stroke={1.5} />
                  <Box ml={5}>Back to login page</Box>
                </Center>}
          </Anchor>
          <Button type="submit">  {type === 'login' ? "Login" : "Sign up"}</Button>
        </Group >
      </ form>
    </Card >
  </>

}