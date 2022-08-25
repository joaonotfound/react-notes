import { AuthPage } from "pages/auth/auth-page"
import { Route, Routes } from "react-router-dom"

export const Layout = () => {
  return <>
    <Routes>
      <Route path="/" element={<p>homepage</p>} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  </>
}