import { AuthPage } from "pages/auth/auth-page"
import { FeedPage } from "pages/feed/feed-page"
import { HomePage } from "pages/homepage/homepage"
import { Route, Routes } from "react-router-dom"
import { setAuthValue, setUserValue, useAppSelector } from 'redux/authService'
import { tokenAuth } from "backend/adapters"
import { useAppDispatch } from "redux/authService"
import { userDatabase } from "backend/adapters/user-database/user-database"

export const Layout = () => {
  const authenticated = useAppSelector(state => state.authentication.isAuthenticated)
  const dispatch = useAppDispatch();
  tokenAuth.isAuthenticated().then(async uid => {
    const user = await userDatabase.getPublicUserInfo(uid)
    dispatch(setUserValue(user))
    dispatch(setAuthValue(true))
  })
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