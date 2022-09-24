
import LoginRegister from './Pages/LoginPage/LoginRegister';
import Profile from './Pages/Profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientDash from './Pages/Dash/ClientDash';
import AdminDash from './Pages/Dash/AdminDash';
import RestPassword from './Pages/resetPassword/RestPassword';
import CompanyDash from './Pages/Dash/CompanyDash';


function App() {
  return (
    <Router>
        <Routes>
          <Route  exact path="/" element={<LoginRegister/>} /> 
           <Route  exact path="/profile" element={<Profile/>} /> 
           <Route  exact path="/profile/ressetpass/:id/:token" element={<RestPassword/>} /> 
            <Route  exact path="/client/dash/:id" element={<ClientDash/>} />
            <Route  exact path="/admin/dash/:id" element={<AdminDash/>} />
            <Route  exact path="/company/dash/:id" element={<CompanyDash/>} />
          
          
        </Routes>

    </Router>
   
  
  );
}

export default App;
