import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loaderSlice';
import { setTask } from '../../redux-store/taskSlice';
import { getAllTasks, getTask } from '../../services/TaskService';

function TaskTable({ setIsTaskEditModal, setIsTaskDeleteModal, taskFlag }) {

    const dispatch = useDispatch();
    const { taskRerender } = useSelector(state => state.taskStore)
    const [allTasks, setAllTasks] = useState(null);

    // Rerender all employees when add, edit or delete
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllTasks();
            if (response.length > 0) setAllTasks(response);
            else setAllTasks(null);
        }
        fetchData();
    }, [taskRerender, taskFlag]);

    // Display all tasks
    const dispalyAllTasks = () => {
        return allTasks.map((task, index) => {
            return <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.assignee}</td>
                <td>{task.dueDate.slice(0, 10)}</td>
                <td>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className="btn btn-warning" onClick={(e) => getOne(e, task._id)}>Edit</button>
                        <button className="btn btn-danger" onClick={(e) => getOne(e, task._id)}>Delete</button>
                    </div>
                </td>
            </tr>
        });
    }

    // Get one employee for edit or delete employee
    const getOne = async (e, id) => {
        e.target.innerHTML === 'Edit' ? setIsTaskEditModal(true) : setIsTaskDeleteModal(true);

        dispatch(showLoader(true))
        try {
            const task = await getTask(id);
            dispatch(setTask(task));
        } catch (err) {
            // todo - display toastify error
        }
        dispatch(showLoader(false))
    }

    return (
        <>
            {
                allTasks ?
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Assignee to</th>
                                <th scope="col">Due date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dispalyAllTasks()}
                        </tbody>
                    </table> :
                    <div style={{ color: '#000' }}>You have no tasks at the moment go and add some!</div>
            }
        </>
    )
}

export default TaskTable
