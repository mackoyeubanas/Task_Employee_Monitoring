import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showLoader } from '../redux-store/loaderSlice';
import { getStatistics } from '../services/StatisticsService';
import IMG from '../assets/wpf_statistics.png'

function Statistics({ setIsTaskPage, setIsEmployeePage }) {

    const [stats, setStats] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setIsEmployeePage(false);
        setIsTaskPage(false);

        dispatch(showLoader(true));
        const fetchData = async () => {
            setStats(await getStatistics());
        }
        fetchData();
        dispatch(showLoader(false));
    }, []);

    const displayTop5Employees = () => {
        return stats.top5.map((employee, index) => {
            return <p>{index + 1}. {employee._id} <span style={{ color: '#797373', fontStyle: 'italic' }}>- {employee.finishedTasksInLastMonth} tasks done</span></p>
        })
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'baseline'}}>
                <img style={{ width: '30px', height: '30px', marginRight: '10px' }} src={IMG} alt="" />
                <h1 style={{ marginTop: '20px' }}>Statistics</h1>
            </div>
            {stats ? <p style={{ color: '#797373', fontStyle: 'italic' }}>Our company spends {stats.salary.sumSalary} euros per month on employee salaries.</p> : null}

            <h3 style={{ margin: '40px 0 30px 0' }}><span style={{ color: '#00A0DF' }}>Top 5 employee</span> with most tasks done in last month</h3>
            {stats && <div style={{ textIndent: '50px' }}>{displayTop5Employees()}</div>}
            {
                stats ?
                    <>
                        <p style={{ marginTop: '30px' }}>The average salary of our employees is {stats.salary.avgSalary} euros, while the highest recorded salary is {stats.salary.maxSalary} euros, the lowest is {stats.salary.minSalary} euros.</p>
                    </>
                    : null
            }
        </>
    )
}

export default Statistics
