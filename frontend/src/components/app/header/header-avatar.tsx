
import { Avatar, Menu } from "@mantine/core"
import { IconSettings, IconLogout } from '@tabler/icons'
import { useAppSelector } from "redux/auth-service"
import { userAuth } from "backend/adapters"

export const HeaderAvatar = () => {
  const username = useAppSelector(state => state.authentication.user?.name)
  return <Menu
    shadow="sm"
    radius={0}
  >
    <Menu.Target>
      <Avatar color="blue" radius={100}>{username?.at(0)}</Avatar>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Config</Menu.Label>
      <Menu.Item icon={<IconSettings />}>Settings</Menu.Item>
      <Menu.Item icon={<IconLogout />} onClick={userAuth.logout}>Log out</Menu.Item>
    </Menu.Dropdown >
  </Menu >
}