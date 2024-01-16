const Task = require('../models/taskModel');

exports.saveTask = async (req, res) => {
    try {
        const task = await Task.findOne(req.body);
        if (!task) {
            const newTask = new Task({ ...req.body })
            const saveNewTask = await newTask.save();
            return res.status(200).json({
                status: 'success',
                message: 'Task successfuly added',
                task: saveNewTask
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'Task already exist'
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

exports.getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({});

        if (allTasks.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'All tasks successfuly displayed',
                allTasks
            });
        } else {
            res.status(401).json({
                status: 'fail',
                message: 'No tasks at all'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong, please try again'
        });
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) res.status(200).json({
            status: 'success',
            message: 'Task successfuly fetched',
            task
        });
        else res.status(401).json({
            status: 'fail',
            message: 'Something went wrong, please try again.'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Task does not exist',
            err
        })
    }
}

exports.editTask = async (req, res) => {
    const editedTask = req.body;

    try {
        await Task.updateOne({ _id: editedTask._id }, {
            $set: {
                title: editedTask.title,
                description: editedTask.description,
                assignee: editedTask.assignee,
                dueDate: editedTask.dueDate,
                employeeID: editedTask.employeeID
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Successfuly updated task'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong, please try again.'
        });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id })
        res.status(200).json({
            status: 'success',
            message: 'Successfuly deleted'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Task not found'
        });
    }
}

exports.editAssignee = async (req, res) => {
    try {
        await Task.updateMany({ employeeID: req.body._id }, { $set: { assignee: req.body.fullName } })
        res.status(200).json({
            status: 'success',
            message: 'Assignee successfuly edited'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Task not found'
        });
    }
}