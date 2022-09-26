
import { useAppSelector } from "redux/auth-service"
export const FeedPage = () => {
  const username = useAppSelector(state => state.authentication.user?.name)
  return <p>Welcome back @{username}</p>
}