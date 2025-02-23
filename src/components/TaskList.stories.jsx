import TaskList from './TaskList';

import * as TaskStories from './Task.stories';

import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const MockState = {
    tasks: [
        { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
        { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
        { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
        { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
        { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
        { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
    status: 'idle',
    error: null,
}

// eslint-disable-next-line react/prop-types
const MockStore = ({taskboxState, children}) => (
    <Provider store={configureStore({
        name: 'taskbox',
        initialState: taskboxState,
        reducer: {
            taskbox: createSlice({
                reducers: {
                    updateTaskState: (state, action) => {
                        const {id, newTaskState} = action.payload;
                        const task = state.tasks.findIndex((task) => task.id === id);
                        if(task>=0) {
                            state.tasks[task].state = newTaskState
                        }
                    } 
                }
            }).reducer,
        },
    })}>
        {children}
    </Provider>
)

const meta = {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
  tags: ["autodocs"],
  excludeStories: /.*MockState$/,
  args: {
    ...TaskStories.ActionsData,
  },
}

export default meta;

export const Default = {
 decorators: [
    (story) => <MockStore taskboxState={MockState}>{story()}</MockStore>
 ]
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
        const pinnedTasks = [...MockState.tasks.slice(0,5), {id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED'}]
        return (
            <MockStore
            taskboxState={{
                ...MockState,
                tasks: pinnedTasks
            }}
            >
                {story()}
            </MockStore>
        )
    }
  ]
};

export const Loading  = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty  = {
  args: {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
  },
};