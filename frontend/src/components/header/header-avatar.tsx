
import { Avatar, Menu } from "@mantine/core"
import { IconSettings } from '@tabler/icons'
import { useAppSelector } from "redux/authService"
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
    </Menu.Dropdown >
  </Menu >
}