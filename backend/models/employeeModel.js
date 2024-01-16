const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowerCase: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    monthlySalary: {
        type: Number,
        required: [true, 'Monthly salary is required'],
    }
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);

module.exports = EmployeeModel;