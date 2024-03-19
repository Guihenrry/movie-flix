import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './routes/protected-route'
import SignIn from './routes/sign-in'
import SignUp from './routes/sign-up'
import Root from './routes/root'
import Search from './routes/search'
import Watched from './routes/watched'
import Indicate from './routes/indicate'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Root />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Search />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/indicate" element={<Indicate />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}
