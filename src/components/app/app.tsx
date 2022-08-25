import { AppShell, MantineThemeOverride, MantineProvider } from "@mantine/core"
import { Header } from "../header/header"
import { Layout } from "hoc"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthenticationContext } from "context/authentication-context"

const globalTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  defaultRadius: 'sm',
  primaryColor: "blue"
}

export const App = () => {
  return (
    <AuthenticationContext>
      <Router>
        <MantineProvider theme={globalTheme} withGlobalStyles withNormalizeCSS>
          <AppShell
            padding='md'
            header={<Header />}
          >
            <Layout />
          </AppShell>
        </MantineProvider>
      </Router>
    </AuthenticationContext>
  );
}
