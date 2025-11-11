import React from 'react';
import { Link } from 'react-router-dom';

const CampaignCard = ({ id, img, title, description, current, goal, progressValue }) => {
    const safeCurrent = current || 0;
    const safeGoal = goal || 1;
    
    const progress = (safeCurrent / safeGoal) * 100;
    
    return (
        <div className="card">
            <Link to={`/campaigns/${id}`}> 
                
                <img src={img} alt={title} />
                
                <div className="card-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    
                    <label htmlFor={`progress-${id}`}>
                        ${safeCurrent.toFixed(2)} of ${safeGoal.toFixed(2)}
                    </label>
                    <progress 
                        id={`progress-${id}`} 
                        max="100" 
                        value={progress}
                    >
                        {progress.toFixed(0)}%
                    </progress>
                </div>
            </Link>
        </div>
    );
};

export default CampaignCard;