import TaskList from './TaskList';

import * as TaskStories from './Task.stories';

import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const MockState = {
    tasks: [
      { id: '1', title: 'Task 1', state: 'TASK_INBOX' },
      { id: '2', title: 'Task 2', state: 'TASK_INBOX' },
      { id: '3', title: 'Task 3', state: 'TASK_PINNED' },
      { id: '4', title: 'Task 4', state: 'TASK_INBOX' },
      { id: '5', title: 'Task 5', state: 'TASK_PINNED' },
      { id: '6', title: 'Task 6', state: 'TASK_INBOX' }
    ],
    status: 'idle',
    error: null
  };

// eslint-disable-next-line react/prop-types
const MockStore = ({taskboxState, children}) => (
    <Provider store={configureStore({
        name: 'taskbox',
        initialState: taskboxState,
        reducer: {
            taskbox: createSlice({
                name: 'taskbox',
                initialState: taskboxState,
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
  decorators: [
    (story) => (
        
            <MockStore
            taskboxState={{...MockState, status: 'loading'}}
            >
                {story()}
            </MockStore>
    )
  ]
};

export const Empty  = {
    decorators: [
      (story) => (
        <MockStore
          taskboxState={{
            ...MockState,
            tasks: [],
            status: 'idle'
          }}
        >
          {story()}
        </MockStore>
      )
    ]
  };
  