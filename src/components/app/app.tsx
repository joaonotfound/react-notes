import { AppShell, MantineThemeOverride, MantineProvider } from "@mantine/core"
import { Header } from "../header/header"

const globalTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  defaultRadius: 'sm',
  primaryColor: "blue"
}

function App() {
  return (
    <MantineProvider theme={globalTheme} withGlobalStyles withNormalizeCSS>
      <AppShell
        header={<Header />}
      >
      </AppShell>
    </MantineProvider>
  );
}

export default App;
