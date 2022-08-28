import { Button, Header as MantineHeader, Group } from "@mantine/core"
import { Logo } from "components"
import { Link } from 'react-router-dom'
import { useAppSelector } from "redux/authService"
import { HeaderAvatar } from "./header-avatar"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const authenticated = useAppSelector(state => state.authentication.isAuthenticated)
    const navigate = useNavigate()
    return <MantineHeader height={56} p="xs">
        <Group position="apart" >
            <div onClick={() => navigate('/')}>
                <Logo />
            </div>
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
    </MantineHeader >
}