import { AuthPage } from "pages/auth/auth-page"
import { FeedPage } from "pages/feed/feed-page"
import { HomePage } from "pages/homepage/homepage"
import { Route, Routes } from "react-router-dom"
import { setAuthValue, useAppSelector } from 'redux/authService'
import { tokenAuth } from 'adapters/token-auth/token-auth'
import { useAppDispatch } from "redux/authService"

export const Layout = () => {
  const authenticated = useAppSelector(state => state.authentication.isAuthenticated)
  const dispatch = useAppDispatch();
  tokenAuth.isAuthenticated().then(() => dispatch(setAuthValue(true)))
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