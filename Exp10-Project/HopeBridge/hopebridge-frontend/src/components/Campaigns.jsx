import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/campaigns') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCampaigns(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching campaigns:", err);
                setError("Failed to load campaigns. Check server connection.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="glass"><div className="featured" id="featured"><h2>Campaigns</h2><p>Loading campaigns...</p></div></div>;
    }

    if (error) {
        return <div className="glass"><div className="featured" id="featured"><h2>Campaigns</h2><p style={{color: 'red'}}>{error}</p></div></div>;
    }

    return (
        <div className="glass">
            <div className="featured" id="featured">
                <h2>Campaigns</h2>
                <div className="card-container">
                    {campaigns.map((campaign) => (
                        <CampaignCard 
                            key={campaign.id} 
                            id={campaign.id}
                            img={campaign.imageUrl} 
                            title={campaign.title} 
                            description={campaign.description} 
                            current={campaign.currentAmount} 
                            goal={campaign.goalAmount} 
                            progressValue={(campaign.currentAmount / campaign.goalAmount) * 100} 
                        />
                    ))}

                    {campaigns.length === 0 && <p>No active campaigns found. Please seed the MongoDB database.</p>}
                </div>
            </div>
        </div>
    );
};

export default Campaigns;