import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        task: {},
        taskRerender: false
    },
    reducers: {
        displayTaskRerender: (state, action) => {
            state.taskRerender = action.payload;
        },
        setTask: (state, action) => {
            state.task = action.payload;
        }
    }
});

export const { displayTaskRerender, setTask } = taskSlice.actions;
export default taskSlice.reducer;