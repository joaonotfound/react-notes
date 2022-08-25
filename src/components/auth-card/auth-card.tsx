import { Card, PasswordInput, Text, TextInput, Button, Group, Anchor, Divider } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { FcGoogle } from 'react-icons/fc'

export const AuthCard = () => {
  const [type, toggleType] = useToggle(['login', 'register']);

  return <>
    <Card withBorder
      style={{
        maxWidth: 400
      }}
      radius="sm"
    >
      <Text size='xl' mb="md" weight={700}>Welcome!</Text>

      <Group grow mb='md'>
        <Button variant="default" radius='lg' leftIcon={<FcGoogle />}> Sign in with google </Button>
      </Group>

      <Divider labelPosition="center" my='sm' label="or sign with email"></Divider>

      <form onSubmit={() => { }}>
        {type === 'register' && (
          <TextInput required label="Username" placeholder="Insert your username" />
        )}
        <TextInput required label="Email" placeholder="your better email" />
        <PasswordInput required label='Password' placeholder="your most secure password" />

        <Group position="apart" mt='xl'>
          <Anchor onClick={() => toggleType()}>
            {type === 'login' ? "Don't have an account yet?" : "Already have an account?"}
          </Anchor>
          <Button type="submit">  {type === 'login' ? "Login" : "Sign up"}</Button>
        </Group >

      </form >
    </Card >
  </>

}