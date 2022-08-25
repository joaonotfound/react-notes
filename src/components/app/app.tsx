import { AppShell, MantineThemeOverride, MantineProvider } from "@mantine/core"
import { Header } from "../header/header"
import { Layout } from "hoc";
import { Text } from "@mantine/core";

const globalTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  defaultRadius: 'sm',
  primaryColor: "blue"
}

function App() {
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

export default App;
