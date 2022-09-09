import { AuthPage } from "pages/auth/auth-page"
import { FeedPage } from "pages/feed/feed-page"
import { HomePage } from "pages/homepage/homepage"
import { Route, Routes } from "react-router-dom"
import { useAppSelector } from "redux/authService"
export const Layout = () => {
  const authenticated = useAppSelector(state => state.authentication.isAuthenticated)
  return <>
    <Routes>
      <Route path="/" element={
        authenticated
          ? <FeedPage />
          : <HomePage />
      } />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  </>
}