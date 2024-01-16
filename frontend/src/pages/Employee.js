import { useEffect, useState } from "react"
import EmployeeTable from "../components/Employee/EmployeeTable"
import EmployeeAddModal from "../components/Employee/EmployeeAddModal"
import EmployeeEditModal from "../components/Employee/EmployeeEditModal"
import EmployeeDeleteModal from "../components/Employee/EmployeeDeleteModal"

function Employee({ isEmployeeAddModal, setIsEmployeeAddModal, setIsTaskPage, setIsEmployeePage }) {

    const [employeeFlag, setEmployeeFlag] = useState(false);
    const [isEmployeeEditModal, setIsEmployeeEditModal] = useState(false);
    const [isEmployeeDeleteModal, setIsEmployeeDeleteModal] = useState(false);

    useEffect(() => {
        setIsTaskPage(false);
        setIsEmployeePage(true);
    }, []);

    return (
        <>
            <EmployeeTable
                employeeFlag={employeeFlag}
                setIsEmployeeEditModal={setIsEmployeeEditModal}
                setIsEmployeeDeleteModal={setIsEmployeeDeleteModal} />
            <EmployeeAddModal
                show={isEmployeeAddModal}
                onHide={() => setIsEmployeeAddModal(false)}
                setIsEmployeeAddModal={setIsEmployeeAddModal} />
            <EmployeeEditModal
                show={isEmployeeEditModal}
                onHide={() => setIsEmployeeEditModal(false)}
                setIsEmployeeEditModal={setIsEmployeeEditModal} />
            <EmployeeDeleteModal
                employeeFlag={employeeFlag}
                setEmployeeFlag={setEmployeeFlag}
                show={isEmployeeDeleteModal}
                onHide={() => setIsEmployeeDeleteModal(false)}
                setIsEmployeeDeleteModal={setIsEmployeeDeleteModal} />
        </>
    )
}

export default Employee
