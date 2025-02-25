import { configureStore, createSlice, createAsyncThunk, } from "@reduxjs/toolkit";


const TaskBoxData = {
    tasks: [],
    status: 'idle',
    error: null
}

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?userId=1'
    );
    const data = await response.json();
    const result = data.map((task) => ({
      id: `${task.id}`,
      title: task.title,
      state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
    }));
    return result;
  });

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
        },
        addNewTask: (state, action) => {
            const { newTask } = action.payload;
          
            // Create a new copy of the tasks array
            const newTasks = [...state.tasks];
          
            // Push the new task into the new array
            newTasks.push({
              id: state.tasks.length + 1,
              title: newTask,
              state: 'TASK_INBOX',
            });
          
            // Assign the new array to the tasks state variable
            state.tasks = newTasks;
          },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchTasks.pending, (state) => {
          state.status = 'loading';
          state.error = null;
          state.tasks = [];
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.error = null;
          // Add any fetched tasks to the array
          state.tasks = action.payload;
         })
        .addCase(fetchTasks.rejected, (state) => {
          state.status = 'failed';
          state.error = "Something went wrong";
          state.tasks = [];
        });
     },
})

export const {updateTaskState} = TaskSlice.actions;
export const { addNewTask } = TaskSlice.actions;

const store = configureStore({
    reducer: {
        taskbox: TaskSlice.reducer
    },
})

export default store;