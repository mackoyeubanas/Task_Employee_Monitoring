import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Label from '../Label';
import Input from '../Input';
import { saveTask } from '../../services/TaskService';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loaderSlice';
import { toast } from 'react-toastify';
import { getAllEmployees } from '../../services/EmployeeService';
import { displayTaskRerender } from '../../redux-store/taskSlice';

function TaskAddModal(props) {

    const [allEmployees, setAllEmployees] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await getAllEmployees()
            setAllEmployees(response);
        }
        fetchEmployees()
    }, [])

    const dispatch = useDispatch();
    const { taskRerender } = useSelector(state => state.taskStore)
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidDescription, setIsValidDescription] = useState(true);
    const [isValidAssignee, setIsValidAssignee] = useState(true);
    const [isValidDueDate, setIsValidDueDate] = useState(true);
    const [task, setTask] = useState({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        employeeID: ''
    })

    const handleInputs = e => {
        setTask((prev) => ({
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

        // Flag all inputs separate to show message later in JSX
        !task.title ? setIsValidTitle(false) : setIsValidTitle(true);
        !task.description ? setIsValidDescription(false) : setIsValidDescription(true);
        !task.assignee ? setIsValidAssignee(false) : setIsValidAssignee(true);
        !task.dueDate ? setIsValidDueDate(false) : setIsValidDueDate(true);

        // When at least one condition is bad just show message in JSX and do not go further
        if (!task.title || !task.description || !task.assignee || !task.dueDate) return;

        dispatch(showLoader(true));
        props.setIsTaskAddModal(false);

        // Save employee by going to the service witch will go to the backend using axios
        let response;
        try {
            response = await saveTask(task);
        } catch (err) {
            console.log(err, 'ERROR');
        }

        dispatch(showLoader(false));
        response && displayMessage(response);
        
        if (response.status === 200) dispatch(displayTaskRerender(!taskRerender));
        setTask({
            title: '',
            description: '',
            assignee: '',
            dueDate: '',
            employeeID: ''
        })
    }

    function selectEmployee(e) {
        setTask((prev) => ({ ...prev, assignee: e.target.value, employeeID: e.target.options[e.target.selectedIndex].id }))
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <Label
                                    htmlFor='title'
                                    style={isValidTitle ? true : false}
                                    innerText={isValidTitle ? 'Title' : 'Title is required'} />
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    onChange={handleInputs} />
                            </div>

                            <div className="form-group col-md-6">
                                <Label
                                    htmlFor='description'
                                    style={isValidDescription ? true : false}
                                    innerText={isValidDescription ? 'Description' : 'Description is not valid'} />
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder="Description..."
                                    onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor='assignee'
                                style={isValidAssignee ? true : false}
                                innerText={isValidAssignee ? 'Assignee task to' : 'Assignee one employee'} />
                            <select onChange={function (e) { selectEmployee(e) }}>
                                <option value="">Choose employee</option>
                                {allEmployees ?
                                    allEmployees.map(function (employee, index) {
                                        return <option key={index + 1} id={employee._id} value={employee.fullName}>{employee.fullName}</option>
                                    }) :
                                    null
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor='dueDate'
                                style={isValidDueDate ? true : false}
                                innerText={isValidDueDate ? 'Due date' : 'Due date is required'} />
                            <Input
                                type="date"
                                className="form-control"
                                id="dueDate"
                                name="dueDate"
                                placeholder="Due date"
                                onChange={handleInputs} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Input type="submit" value="Save task" onClick={save} />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TaskAddModal
