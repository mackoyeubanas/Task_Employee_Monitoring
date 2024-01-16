import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Label from '../Label';
import Input from '../Input';
import { editEmployee } from '../../services/EmployeeService';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loaderSlice';
import { toast } from 'react-toastify';
import { displayEmployeeRerender } from '../../redux-store/employeeSlice';
import { editAssignee } from '../../services/TaskService';

function EmployeeEditModal(props) {

    const dispatch = useDispatch();
    const employeeStore = useSelector(state => state.employeeStore.employee);
    const { employeeRerender } = useSelector(state => state.employeeStore);
    const [isValidFullName, setIsValidFullName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
    const [isValidMonthlySalary, setIsValidMonthlySalary] = useState(true);
    const [employee, setEmployee] = useState({ ...employeeStore } || '');

    // When comming to edit modal set "employee" to be "employeeStore" from redux
    // TODO When I click on the edit button in the state, I set the employee from redux. However, that information is delayed, it is asynchronous, so when I click on the button, it doesn't show me the employee I just clicked on, but the previous one I clicked on. The problem occurs in "useEffect" because while my state is being updated, the code is already executed and it shows the last employee. I tried to solve this, but I had to continue doing other things so it remained like this due to lack of time.
    useEffect(() => {
        setEmployee({ ...employeeStore });
    }, [employeeStore.fullName, employeeStore.email, employeeStore.phoneNumber, employeeStore.dateOfBirth, employeeStore.monthlySalary])

    // Handle inputs on change
    const handleInputs = e => {
        setEmployee((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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
        props.setIsEmployeeEditModal(false);

        // Save employee by going to the service witch will go to the backend using axios
        // TODO this i had to do at one async fuction instead doing it in two
        let response;
        try {
            response = await editEmployee(employee);
        } catch (err) {
            console.log(err, 'ERROR');
        }

        try {
            const gg = await editAssignee(employee);
        } catch (err) {
            console.log(err, 'ERROR');
        }

        dispatch(showLoader(false));
        response && displayMessage(response);

        // Rerender all employee on "employeeTable" component in regard to "employeeRerender"
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
                                    defaultValue={employee.fullName}
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
                                    defaultValue={employee.email}
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
                                defaultValue={employee.phoneNumber}
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
                                defaultValue={employee.dateOfBirth}
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
                                    defaultValue={employee.monthlySalary}
                                    onChange={handleInputs} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Input type="submit" value="Edit employee" onClick={save} />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeEditModal
