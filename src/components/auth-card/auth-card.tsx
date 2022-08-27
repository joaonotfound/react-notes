import { Card, PasswordInput, Text, TextInput, Button, Group, Anchor, Divider } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { UserAuthentication } from "adapters"
import { User } from "interfaces/user-interface"
import { useState, FC } from "react"
import { FcGoogle } from 'react-icons/fc'
import { MdAlternateEmail } from 'react-icons/md'

interface IProps {
  onAuthentication?: (user: User) => void
}

export const AuthCard: FC<IProps> = (props) => {
  const userAuth = new UserAuthentication()

  const [type, toggleType] = useToggle(['login', 'register']);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitButton = () => {
    if (type === 'register') {
      userAuth.createUserWithEmailAndPassword(username, email, password).then(user => {
        props.onAuthentication?.(user!)
      })
    } else {
      userAuth.signInWithEmailAndPassword(email, password).then(user => {
        props.onAuthentication?.(user!)
      })
    }
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
        type === "register" ? "Welcome!" : "Welcome back!"
      }</Text>

      <Group grow mb='md'>
        <Button variant="default" radius='lg' leftIcon={<FcGoogle />} onClick={() => userAuth.signInWithGoogle()}> Sign in with google </Button>
      </Group>

      <Divider labelPosition="center" my='sm' label="or sign with email"></Divider>

      <form onSubmit={() => { }}>
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
        />
        <PasswordInput required label='Password'
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />


        <Group position="apart" mt='xl'>
          <Anchor size='xs' onClick={() => toggleType()}>
            {type === 'login' ? "Don't have an account yet?" : "Already have an account?"}
          </Anchor>
          <Button onClick={handleSubmitButton}>  {type === 'login' ? "Login" : "Sign up"}</Button>
        </Group >
      </form >
    </Card >
  </>

}