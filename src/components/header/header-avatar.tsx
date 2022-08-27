import { Avatar, Menu } from "@mantine/core"
import { IconSettings } from '@tabler/icons'

export const HeaderAvatar = () => {
  return <Menu
    shadow="sm"
    radius={0}
  >
    <Menu.Target>
      <Avatar color="blue" radius={100}>JK</Avatar>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Config</Menu.Label>
      <Menu.Item icon={<IconSettings />}>Settings</Menu.Item>
    </Menu.Dropdown >
  </Menu >
}