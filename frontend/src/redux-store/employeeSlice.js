import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: {},
        employeeRerender: false
    },
    reducers: {
        displayEmployeeRerender: (state, action) => {
            state.employeeRerender = action.payload;
        },
        setEmployee: (state, action) => {
            state.employee = action.payload;
        }
    }
});

export const { displayEmployeeRerender, setEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;