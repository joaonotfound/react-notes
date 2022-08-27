import { Center, Text, Group, Button, Card, Anchor } from "@mantine/core"
import { BrandGitlab } from "tabler-icons-react"
import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  const gitlabUrl = 'https://gitlab.com/joaonotfound'
  const repositroyUrl = 'https://gitlab.com/joaonotfound/notes-app'
  const navigate = useNavigate()
  return <Center p="lg">
    <Card
      shadow="md"
      p='xl'
      style={{
        maxWidth: 500
      }}
    >
      <Text weight="bold" pb="lg" size={30}>Notes</Text>

      <Text size="md">It's a free and open-source project intended to be a simple alternative to the notion and obsidian app</Text>
      <Text py="xs"> It's focused on privacy and secury despite it isn't anyhow secure so far. </Text>
      <Text size="sm" mt="md">You might want to checkout the repository here:  <Anchor<'a'> italic size="sm" href={repositroyUrl}>Gitlab repository</Anchor></Text>
      <Text size="sm"> It's currently beign developer only by me {<Anchor<'a'> italic href={gitlabUrl}>@joaonotfound</Anchor>}</Text>

      <Group position="apart" pt="xl">
        <Group>
          <Anchor<'a'>
            href={gitlabUrl}
            color="gray"
          >
            <BrandGitlab />
          </Anchor>
        </Group>
        <Button onClick={() => { navigate('/login') }}>Sign in</Button>
      </Group>
    </Card>
  </Center >
}