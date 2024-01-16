import Modal from 'react-bootstrap/Modal';
import Input from '../Input';
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';
import { deleteEmployee } from '../../services/EmployeeService';

function EmployeeDeleteModal(props) {

    const { employee } = useSelector(state => state.employeeStore);

    const displayMessage = response => {
        if (response.status === 200) toast.success(response.message);
        if (response.status === 401) toast.error(response.message);
        if (response.status === 404) toast.warning(response.message);
        if (response.status === 500) toast.error(response.message);
    }

    const deleteOne = async () => {
        //todo - I'm not sure why dispatch bothers me when I want to rerender, so I created "props.employeeFlag" for this one
        // dispatch(showLoader(true))
        props.setIsEmployeeDeleteModal(false);

        let response;
        try {
            response = await deleteEmployee(employee._id);
            console.log(response, 'response FRONT');
        } catch (err) {
        }
        //todo - I'm not sure why dispatch bothers me when I want to rerender, so I created "props.employeeFlag" for this one
        // dispatch(showLoader(false))
        // if (response.status === 200) dispatch(displayEmployeeRerender(!employeeRerender));
        response && displayMessage(response);
        if (response.status === 200) props.setEmployeeFlag(!props.employeeFlag);
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure u want to delete {employee.fullName} employee?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Input type="submit" value="Delete" onClick={deleteOne} />
                    <Input type="submit" value="Cancel" onClick={() => props.setIsEmployeeDeleteModal(false)} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmployeeDeleteModal;