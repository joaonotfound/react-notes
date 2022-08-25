import { Card, PasswordInput, Text, TextInput, Button, Group, Anchor, Divider } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { UserAuthentication } from "adapters"
import { FcGoogle } from 'react-icons/fc'
import { MdAlternateEmail } from 'react-icons/md'

export const AuthCard = () => {
  const userAuth = new UserAuthentication()
  const [type, toggleType] = useToggle(['login', 'register']);
  return <>
    <Card withBorder
      radius="sm"
      p='xl'
    >
      <Text size='xl' mb="md" weight={700}>Welcome!</Text>

      <Group grow mb='md'>
        <Button variant="default" radius='lg' leftIcon={<FcGoogle />} onClick={() => userAuth.signInWithGoogle()}> Sign in with google </Button>
      </Group>

      <Divider labelPosition="center" my='sm' label="or sign with email"></Divider>

      <form onSubmit={() => { }}>
        {type === 'register' && (
          <TextInput required label="Username" placeholder="@username" />
        )}
        <TextInput required label="Email" rightSection={<MdAlternateEmail />} placeholder="email" />
        <PasswordInput required label='Password' placeholder="password" />

        <Group position="apart" mt='xl'>
          <Anchor size='sm' onClick={() => toggleType()}>
            {type === 'login' ? "Don't have an account yet?" : "Already have an account?"}
          </Anchor>
          <Button type="submit">  {type === 'login' ? "Login" : "Sign up"}</Button>
        </Group >

      </form >
    </Card >
  </>

}