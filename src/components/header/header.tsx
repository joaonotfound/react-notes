import { Header as MantineHeader } from "@mantine/core"
import { Logo } from "../logo/logo"

export const Header = () => {
    return <MantineHeader height={60} p="xs" ><Logo /></MantineHeader>
}