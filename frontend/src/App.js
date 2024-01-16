import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import Employee from './pages/Employee';
import Task from './pages/Task';
import Statistics from './pages/Statistics';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, useNavigate } from "react-router-dom";


import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isEmployeePage, setIsEmployeePage] = useState(true);
  const [isTaskPage, setIsTaskPage] = useState(false);
  const [isEmployeeAddModal, setIsEmployeeAddModal] = useState(false);
  const [isTaskAddModal, setIsTaskAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/employees')
  }, [])

  return (
    <>
      <Loader />
      <div div className='container'>
        <Navbar
          isTaskPage={isTaskPage}
          isEmployeePage={isEmployeePage}
          setIsTaskAddModal={setIsTaskAddModal}
          setIsEmployeeAddModal={setIsEmployeeAddModal} />
        <Routes>
          <Route
            path="/employees"
            element={<Employee
              setIsTaskPage={setIsTaskPage}
              setIsEmployeePage={setIsEmployeePage}
              isEmployeeAddModal={isEmployeeAddModal}
              setIsEmployeeAddModal={setIsEmployeeAddModal} />} />
          <Route
            path="/tasks"
            element={<Task
              setIsTaskPage={setIsTaskPage}
              setIsEmployeePage={setIsEmployeePage}
              isTaskAddModal={isTaskAddModal}
              setIsTaskAddModal={setIsTaskAddModal} />} />
          <Route
            path="/statistics"
            element={<Statistics
              setIsTaskPage={setIsTaskPage}
              setIsEmployeePage={setIsEmployeePage} />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      </div >
    </>
  );
}

export default App;
