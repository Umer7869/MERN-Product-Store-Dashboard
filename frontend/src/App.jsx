import {Box} from "@/components/ui/box"
import {Route, Routes} from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
function App() {
  return (
    <Box minH={"100vh"} >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
