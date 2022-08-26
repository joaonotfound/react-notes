import { AppShell, MantineThemeOverride, MantineProvider } from "@mantine/core"
import { Header } from "../header/header"
import { Layout } from "hoc"
import { BrowserRouter as Router } from "react-router-dom"
import { Store } from "redux/authService"
import { Provider } from "react-redux"

const globalTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  defaultRadius: 'sm',
  primaryColor: "blue"
}

export const App = () => {
  return (
    <Router>
      <Provider store={Store}>
        <MantineProvider theme={globalTheme} withGlobalStyles withNormalizeCSS>
          <AppShell
            padding='md'
            header={<Header />}
          >
            <Layout />
          </AppShell>
        </MantineProvider>
      </Provider>
    </Router>
  );
}
