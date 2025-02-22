import { configureStore, createSlice } from "@reduxjs/toolkit";


const defaultTasks = [
    { id: '1', title: 'Task 1', state: 'TASK_INBOX' },
    { id: '2', title: 'Task 2', state: 'TASK_INBOX' },
    { id: '3', title: 'Task 3', state: 'TASK_INBOX' },
    { id: '4', title: 'Task 4', state: 'TASK_ARCHIVED' },
    { id: '5', title: 'Task 5', state: 'TASK_INBOX' },
    { id: '6', title: 'Task 6', state: 'TASK_PINNED' },
  ];

  
const TaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null
}

const TaskSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state, action) => {
            const {id, newTaskState} = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id);
            if(task>=0) {
                state.tasks[task].state = newTaskState
            }
        } 
    }
})

export const store = configureStore({
    reducer: {
        taskbox: TaskSlice.reducer
    },
  })