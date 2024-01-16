const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [20, 'Description must have more than 20 characters'],
        maxlength: [70, 'Description must have less than 70 characters']
    },
    assignee: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    employeeID: {
        type: String
    }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;