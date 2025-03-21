import PropTypes from 'prop-types';

export default function Task({task: {id, title, state}, onArchiveTask, onPinTask}) {

    const activeStates = ["TASK_INBOX", "TASK_PINNED"]; 
    
    const isPinnedOrInbox = activeStates.includes(state); 

    return (
        <div className={`list-item ${state}`}>
            <label htmlFor="checked" aria-label={`archivedTask-#${id}`} className="checkbox">
                <input type="checkbox" disabled={true} value={title} readOnly={true} name="checked" id={`archivedTask-#${id}`} checked={state === "TASK_ARCHIVED"} />
                <span className="checkbox-custom" onClick={() => isPinnedOrInbox ? onArchiveTask(id) : null} />
            </label>
            <label htmlFor="title" aria-label={title} className={title}>
                <input type="text" value={title} readOnly={true} name="title" placeholder="Input title" />
            </label>
            {
                state !== "TASK_ARCHIVED" && (
                    <button 
                    className="pin-button" 
                    onClick={() => onPinTask(id)} 
                    id={`pinTask-${id}`} 
                    aria-label={`pinTask-${id}`}
                    key={`pinTask-${id}`}>
                        <span className={`icon-star`}></span>
                    </button>
                )}
        </div>
    )
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
    }),
    onArchiveTask: PropTypes.func,
    onPinTask: PropTypes.func
}