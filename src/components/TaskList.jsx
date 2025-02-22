/* eslint-disable react/prop-types */
import Task from './Task';

export default function TaskList({ loading, tasks, onPinTask, onArchiveTask}) {
    const events = {
        onPinTask,
        onArchiveTask
    };

    const LoadingRow = (
        <div className='loading-item'>
            <span className='glow-checkbox' />
            <span className='glow-text'>
                <span>Loading</span><span>cool</span><span>state</span>
            </span>
        </div>
    )

    if(loading) {
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

    const taskInOrder = [
        ...tasks.filter((task) => task.state === 'TASK_PINNED'),
        ...tasks.filter((task) => task.state !== 'TASK_PINNED'),
    ]

    return (
        <div className='list-items'>
            {taskInOrder.map(task => (
                <Task key={task.id} task={task} {...events}/>
            ))}
        </div>
    );
}