/* eslint-disable react/prop-types */
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import {updateTaskState} from '../lib/store';

export default function TaskList() {
    
    const tasks = useSelector((state) => {
        const taskInOrder = [
            ...state.taskbox.tasks.filter((task) => task.state === 'TASK_PINNED'),
            ...state.taskbox.tasks.filter((task) => task.state !== 'TASK_PINNED'),
        ]

        const filteredTask = [...taskInOrder.filter(
            (task) => task.state === 'TASK_INNBOX' ||
            task.state === 'TASK_PINNED'),
            ...taskInOrder.filter(
                (task) => task.state === 'TASK_ARCHIVED'),
        ]

        return filteredTask;
    })

    const { status } = useSelector((state) => state.taskbox);

    const dispatch = useDispatch();

    const pinnedTask = (value) => {
        dispatch(updateTaskState({id: value, newTaskState: 'TASK_PINNED'}))
    }

    const archivedTask = (value) => {
        dispatch(updateTaskState({id: value, newTaskState: 'TASK_ARCHIVED'}))
    }

    const LoadingRow = (
        <div className='loading-item'>
            <span className='glow-checkbox' />
            <span className='glow-text'>
                <span>Loading</span><span>cool</span><span>state</span>
            </span>
        </div>
    )

    if(status === 'loading') {
        return <div className='list-items' data-testid='loading' key={'loading'}>
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            </div>
    }

    if(tasks?.length === 0) {
        return <div className='list-items' key={'empty'} data-testid='empty'>
                <div className='wrapper-message'>
                    <span className='icon-check'/>
                    <p className='title-message'>You have no task.</p>
                    <p className='subtitle-message'>Sit back and relax.</p>
                </div>
            </div>
    }

    return (
        <div className='list-items'>
            {tasks.map(task => (
                <Task 
                key={task.id} 
                task={task} 
                onPinTask={(task) => pinnedTask(task)}
                onArchivedTask={(task) => archivedTask(task)}
                />
            ))}
        </div>
    );
}