import { Link } from "react-router-dom";
import './navbar.css';

function Navbar({ isEmployeePage, isTaskPage, setIsEmployeeAddModal, setIsTaskAddModal }) {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand">SpectrumTech Solutions</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/employees'>Employee</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/tasks'>Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/statistics'>Statistics</Link>
                            </li>
                        </ul>
                        {isEmployeePage ? <buttona className='btn btn-primary' onClick={() => setIsEmployeeAddModal(true)}>Add employee</buttona> : null}
                        {isTaskPage ? <buttona className='btn btn-primary' onClick={() => setIsTaskAddModal(true)}>Add task</buttona> : null}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
