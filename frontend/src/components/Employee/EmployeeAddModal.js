import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Label from '../Label';
import Input from '../Input';
import { saveEmployee } from '../../services/EmployeeService';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loaderSlice';
import { toast } from 'react-toastify';
import { displayEmployeeRerender } from '../../redux-store/employeeSlice';

function EmployeeAddModal(props) {

    const dispatch = useDispatch();
    const { employeeRerender } = useSelector(state => state.employeeStore)
    const [isValidFullName, setIsValidFullName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
    const [isValidMonthlySalary, setIsValidMonthlySalary] = useState(true);
    const [employee, setEmployee] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        monthlySalary: ''
    })

    const handleInputs = e => {
        setEmployee((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const displayMessage = response => {
        if (response.status === 200) toast.success(response.message);
        if (response.status === 401) toast.error(response.message);
        if (response.status === 404) toast.warning(response.message);
        if (response.status === 500) toast.error(response.message);
    }

    const save = async () => {

        // Validate email using regular expression
        const regexExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

        // Flag all inputs separate to show message later in JSX
        !employee.fullName ? setIsValidFullName(false) : setIsValidFullName(true);
        !employee.email ? setIsValidEmail(false) : setIsValidEmail(true);
        !regexExp.test(employee.email) ? setIsValidEmail(false) : setIsValidEmail(true);
        !employee.phoneNumber ? setIsValidPhoneNumber(false) : setIsValidPhoneNumber(true);
        !employee.dateOfBirth ? setIsValidDateOfBirth(false) : setIsValidDateOfBirth(true);
        !employee.monthlySalary ? setIsValidMonthlySalary(false) : setIsValidMonthlySalary(true);

        // When at least one condition is bad just show message in JSX and do not go further
        if (!employee.fullName || !employee.email || !regexExp.test(employee.email) || !employee.phoneNumber || !employee.dateOfBirth || !employee.monthlySalary) return;

        dispatch(showLoader(true));
        props.setIsEmployeeAddModal(false);

        // Save employee by going to the service witch will go to the backend using axios
        let response;
        try {
            response = await saveEmployee(employee);
        } catch (err) {
            console.log(err, 'ERROR');
        }

        dispatch(showLoader(false));
        response && displayMessage(response);
        if (response.status === 200) dispatch(displayEmployeeRerender(!employeeRerender));
        setEmployee({
            fullName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            monthlySalary: ''
        })
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <Label
                                    htmlFor='fullName'
                                    style={isValidFullName ? true : false}
                                    innerText={isValidFullName ? 'Full Name' : 'Full Name is required'} />
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="exp. Josh Smith"
                                    onChange={handleInputs} />
                            </div>

                            <div className="form-group col-md-6">
                                <Label
                                    htmlFor='email'
                                    style={isValidEmail ? true : false}
                                    innerText={isValidEmail ? 'Email' : 'Email is not valid'} />
                                <Input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor='phoneNumber'
                                style={isValidPhoneNumber ? true : false}
                                innerText={isValidPhoneNumber ? 'Phone Number' : 'Phone Number is required'} />
                            <Input
                                type="number"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder='exp. +381604324642'
                                onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor='dateOfBirth'
                                style={isValidDateOfBirth ? true : false}
                                innerText={isValidDateOfBirth ? 'Date of birth' : 'Date of birth is required'} />
                            <Input
                                type="date"
                                className="form-control"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                placeholder="Birth date"
                                onChange={handleInputs} />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <Label
                                    htmlFor='monthlySalary'
                                    style={isValidMonthlySalary ? true : false}
                                    innerText={isValidMonthlySalary ? 'Monthly salary' : 'Monthly salary is required'} />
                                <Input
                                    type='number'
                                    id="monthlySalary"
                                    name="monthlySalary"
                                    placeholder='exp. 4500'
                                    onChange={handleInputs} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Input type="submit" value="Save employee" onClick={save} />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeAddModal
