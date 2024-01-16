const Employee = require('../models/employeeModel');
const Task = require('../models/taskModel');

exports.getStatistics = async (req, res) => {
    try {
        const salaryStats = await Employee.aggregate([
            {
                $group: {
                    _id: null,
                    avgSalary: { $avg: '$monthlySalary' },
                    minSalary: { $min: '$monthlySalary' },
                    maxSalary: { $max: '$monthlySalary' },
                    sumSalary: { $sum: '$monthlySalary' },
                }
            }
        ]);

        const firstDay = new Date(new Date().setDate(new Date().getDate() - 30));
        const lastDay = new Date(Date.now());

        const top5Stats = await Task.aggregate([
            {
                $match: { dueDate: { $gte: firstDay, $lte: lastDay } }
            },
            {
                $group: {
                    _id: '$assignee',
                    finishedTasksInLastMonth: { $sum: 1 },
                }
            },
            {
                $sort: {
                    finishedTasksInLastMonth: -1
                }
            },
            {
                $limit: 5
            }
        ]);
        res.status(200).json({
            status: 'success',
            message: 'All stats successfuly displayed',
            stats: { salary: salaryStats[0], top5: top5Stats }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong, please try again'
        });
    }
}