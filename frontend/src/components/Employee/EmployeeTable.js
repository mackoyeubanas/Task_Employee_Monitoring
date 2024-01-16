import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../../redux-store/employeeSlice';
import { showLoader } from '../../redux-store/loaderSlice';
import { getAllEmployees, getEmployee } from '../../services/EmployeeService';

function EmployeeTable({ setIsEmployeeEditModal, setIsEmployeeDeleteModal, employeeFlag }) {

    const dispatch = useDispatch();
    const { employeeRerender } = useSelector(state => state.employeeStore)
    const [allEmployees, setAllEmployees] = useState(null);

    // Rerender all employees when add, edit or delete
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllEmployees();
            if (response.length > 0) setAllEmployees(response);
            else setAllEmployees(null);
        }
        fetchData();
    }, [employeeRerender, employeeFlag]);

    // Display all employees
    const dispalyAllEmployees = () => {
        return allEmployees.map((employee, index) => {
            return <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{employee.fullName}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.dateOfBirth.slice(0, 10)}</td>
                <td>{employee.monthlySalary}</td>
                <td>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className="btn btn-warning" onClick={(e) => getOne(e, employee._id)}>Edit</button>
                        <button className="btn btn-danger" onClick={(e) => getOne(e, employee._id)}>Delete</button>
                    </div>
                </td>
            </tr>
        });
    }

    // Get one employee for edit employee or delete employee
    const getOne = async (e, id) => {
        e.target.innerHTML === 'Edit' ? setIsEmployeeEditModal(true) : setIsEmployeeDeleteModal(true);

        dispatch(showLoader(true))
        try {
            const employee = await getEmployee(id);
            dispatch(setEmployee(employee));
        } catch (err) {
            // todo - display toastify error
        }
        dispatch(showLoader(false))
    }

    return (
        <>
            {
                allEmployees ?
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Full name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone number</th>
                                <th scope="col">Date of birth</th>
                                <th scope="col">Monthly salary</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dispalyAllEmployees()}
                        </tbody>
                    </table> :
                    <div style={{ color: '#000' }}>You have no employees at the moment go and add some!</div>
            }
        </>
    )
}

export default EmployeeTable
