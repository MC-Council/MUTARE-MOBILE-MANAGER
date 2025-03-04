import React, { useContext } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import ApplyDevice from './pages/ApplyDevice';
import Applications from './pages/Applications';
import AdminLogin from './components/AdminLogin';
import { AppContext } from './context/AppContext';
import ViewApplications from './pages/ViewApplications';
import ManageDevices from './pages/ManageDevices';
import Dashboard from './pages/Dashboard';
import AddDevice from './pages/AddDevice';
import 'quill/dist/quill.snow.css';

const App = () => {


  const { showAdminLogin } = useContext(AppContext);





  return (
    <div>
      {showAdminLogin && <AdminLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-device/:id" element={<ApplyDevice />} />
        <Route path="/applications" element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='add-device' element={<AddDevice />} /> {/* No leading slash */}
          <Route path='manage-devices' element={<ManageDevices />} /> {/* No leading slash */}
          <Route path='view-applications' element={<ViewApplications />} /> {/* No leading slash */}
          <Route index element={<ManageDevices />} /> {/*If you want the dashboard page to render something by default when no child route is provided*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
