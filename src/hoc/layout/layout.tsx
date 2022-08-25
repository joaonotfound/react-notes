import { AuthPage } from "pages/auth/auth-page"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export const Layout = () => {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<p>homepage</p>} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  </>
}