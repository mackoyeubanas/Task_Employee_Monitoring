const Employee = require('../models/employeeModel');

exports.saveEmployee = async (req, res) => {
    const { email } = req.body;

    try {
        const employee = await Employee.findOne({ email: email });
        if (!employee) {
            const newEmployee = new Employee({ ...req.body })
            const saveNewEmployee = await newEmployee.save();
            return res.status(200).json({
                status: 'success',
                message: 'Employee successfuly added',
                user: saveNewEmployee
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'User already exist'
            });
        }

    } catch (err) {
        const message = err.message

        res.status(401).json({
            status: 'fail',
            message: message,
        });
    }
}

exports.getAllEmployee = async (req, res) => {
    try {
        const allEmployee = await Employee.find({})

        if (allEmployee.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'All employee successfuly displayed',
                allEmployee
            });
        } else {
            res.status(401).json({
                status: 'fail',
                message: 'No employee at all'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong, please try again'
        });
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) res.status(200).json({
            status: 'success',
            message: 'Employee successfuly fetched',
            employee
        });
        else res.status(401).json({
            status: 'fail',
            message: 'Something went wrong, please try again.'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Employee does not exist',
            err
        })
    }
}

exports.editEmployee = async (req, res) => {
    const editedEmployee = req.body;

    try {
        await Employee.updateOne({ _id: editedEmployee._id }, {
            $set: {
                fullName: editedEmployee.fullName,
                email: editedEmployee.email,
                phoneNumber: editedEmployee.phoneNumber,
                dateOfBirth: editedEmployee.dateOfBirth,
                monthlySalary: editedEmployee.monthlySalary
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Successfuly updated employee'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong, please try again.'
        });
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.deleteOne({ _id: req.params.id })
        res.status(200).json({
            status: 'success',
            message: 'Successfuly deleted'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Employee not found'
        });
    }
}