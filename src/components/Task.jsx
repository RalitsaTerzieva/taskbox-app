import React from 'react';

export default function Task({task: {id, title, state}, onArchiveTask, onPinTask}) {
    return (
        <div className={`list-item ${state}`}>
            <label htmlFor="checked" aria-label={`archivedTask-#${id}`} classname="checkbox">
                <input type="checkbox" disabled={true} value={title} readOnly={true} name="checked" id={`archivedTask-#${id}`} checked={state === "TASK_ARCHIVED"} />
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