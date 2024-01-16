import TaskTable from '../components/Task/TaskTable';
import TaskAddModal from '../components/Task/TaskAddModal';
import TaskEditModal from '../components/Task/TaskEditModal';
import TaskDeleteModal from '../components/Task/TaskDeleteModal';
import { useEffect, useState } from 'react';

function Task({ isTaskAddModal, setIsTaskAddModal, setIsTaskPage, setIsEmployeePage }) {

    const [taskFlag, setTaskFlag] = useState(false);
    const [isTaskEditModal, setIsTaskEditModal] = useState(false);
    const [isTaskDeleteModal, setIsTaskDeleteModal] = useState(false);

    useEffect(() => {
        setIsEmployeePage(false);
        setIsTaskPage(true);
    }, []);

    return (
        <>
            <TaskTable
                taskFlag={taskFlag}
                setIsTaskEditModal={setIsTaskEditModal}
                setIsTaskDeleteModal={setIsTaskDeleteModal} />
            <TaskAddModal
                show={isTaskAddModal}
                onHide={() => setIsTaskAddModal(false)}
                setIsTaskAddModal={setIsTaskAddModal} />
            <TaskEditModal
                show={isTaskEditModal}
                onHide={() => setIsTaskEditModal(false)}
                setIsTaskEditModal={setIsTaskEditModal} />
            <TaskDeleteModal
                taskFlag={taskFlag}
                setTaskFlag={setTaskFlag}
                show={isTaskDeleteModal}
                onHide={() => setIsTaskDeleteModal(false)}
                setIsTaskDeleteModal={setIsTaskDeleteModal} />
        </>
    )
}

export default Task
