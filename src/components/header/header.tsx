import { Button, Header as MantineHeader, Group } from "@mantine/core"
import { Logo } from "components"
import { Link } from 'react-router-dom'

export const Header = () => {
    return <MantineHeader height={56} p="xs">
        <Group position="apart" >
            <Link to="/">
                <Logo />
            </Link>
            <Group>
                <Link to='/login'>
                    <Button variant='light'> Log-in </Button>
                </Link>
            </Group>
        </Group>
    </MantineHeader>
}