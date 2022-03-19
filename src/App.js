
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import Login from './component/user/Login/Login';
import SignUp from './component/user/Signup/SignUp';
import Home from './component/user/Home/Home';
//admin 
import AdminHome from './component/admin/adminHome/AdminHome';
import AdminLogin from '../../UserManagement/src/component/admin/adminLogin/AdminLogin'
import EditUser from './component/admin/EditUser/EditUser';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/admin/Edit-user/:id' element={<EditUser />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
