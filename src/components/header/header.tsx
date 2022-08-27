import { Button, Header as MantineHeader, Group } from "@mantine/core"
import { Logo } from "components"
import { Link } from 'react-router-dom'
import { useAppSelector } from "redux/authService"
import { HeaderAvatar } from "./header-avatar"

export const Header = () => {
    const authenticated = useAppSelector(state => state.authentication.isAuthenticated)
    return <MantineHeader height={56} p="xs">
        <Group position="apart" >
            <Link to="/">
                <Logo />
            </Link>
            <Group>
                {
                    !authenticated
                        ? <Link to='/login'>
                            <Button variant='light'> Log-in </Button>
                        </Link>
                        : <HeaderAvatar />
                }
            </Group>
        </Group>
    </MantineHeader>
}