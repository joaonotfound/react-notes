import { AppShell, MantineThemeOverride, MantineProvider } from "@mantine/core"
import { Header } from "../header/header"
import { Layout } from "hoc";

const globalTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  defaultRadius: 'sm',
  primaryColor: "blue"
}

export const App = () => {
  return (
    <MantineProvider theme={globalTheme} withGlobalStyles withNormalizeCSS>
      <AppShell
        padding='md'
        header={<Header />}
      >
        <Layout />
      </AppShell>
    </MantineProvider>
  );
}
