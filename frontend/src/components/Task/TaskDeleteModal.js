import Modal from 'react-bootstrap/Modal';
import Input from '../Input';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { deleteTask } from '../../services/TaskService';

function TaskDeleteModal(props) {

    const { task } = useSelector(state => state.taskStore);

    const displayMessage = response => {
        if (response.status === 200) toast.success(response.message);
        if (response.status === 401) toast.error(response.message);
        if (response.status === 404) toast.warning(response.message);
        if (response.status === 500) toast.error(response.message);
    }

    const deleteOne = async () => {
        //todo - I'm not sure why dispatch bothers me when I want to rerender, so I created "props.taskFlag" for this one
        // dispatch(showLoader(true))
        props.setIsTaskDeleteModal(false);

        let response;
        try {
            response = await deleteTask(task._id);
        } catch (err) {
            console.log(err, 'ERROR');
        }
        //todo - I'm not sure why dispatch bothers me when I want to rerender, so I created "props.taskFlag" for this one
        // dispatch(showLoader(false))
        // if (response.status === 200) dispatch(displayTaskRerender(!taskRerender));
        response && displayMessage(response);
        if (response.status === 200) props.setTaskFlag(!props.taskFlag);
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure u want to delete {task.title} task?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Input type="submit" value="Delete" onClick={deleteOne} />
                    <Input type="submit" value="Cancel" onClick={() => props.setIsTaskDeleteModal(false)} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TaskDeleteModal;