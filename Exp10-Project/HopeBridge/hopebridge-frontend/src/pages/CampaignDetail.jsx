import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Core Campaign State
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Edit/Update State
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    // Donation State
    const [isDonating, setIsDonating] = useState(false);
    const [donationData, setDonationData] = useState({ amount: 10.0, donorName: 'Anonymous', donorEmail: '' });

    // --- 1. Fetch Campaign Data on Load ---
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/campaigns/${id}`)
            .then(response => {
                if (!response.ok) throw new Error("Campaign not found.");
                return response.json();
            })
            .then(data => {
                setCampaign(data);
                setEditData(data); // Initialize edit state with fetched data
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // --- 2. Handlers for Editing (PUT) ---
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'goalAmount' ? parseFloat(value) || 0 : value;
        setEditData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleUpdate = async () => {
        if (editData.goalAmount <= 0) return alert("Goal must be positive.");

        try {
            const response = await fetch(`http://localhost:8080/api/campaigns/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });

            if (response.ok) {
                const updatedCampaign = await response.json();
                setCampaign(updatedCampaign);
                setIsEditing(false);
                alert("Campaign updated successfully!");
            } else {
                alert("Failed to update campaign.");
            }
        } catch (error) {
            console.error('Update failed:', error);
        }
    };
    
    // --- 3. Handler for Deleting (DELETE) ---
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this campaign?")) return;

        try {
            const response = await fetch(`http://localhost:8080/api/campaigns/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                alert("Campaign successfully deleted.");
                navigate('/'); // Redirect to homepage
            } else {
                alert("Failed to delete campaign. It may not exist.");
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    // --- 4. Handlers for Donation (POST) ---
    const handleDonationChange = (e) => {
        const { name, value } = e.target;
        setDonationData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
    };

    const handleDonateSubmit = async (e) => {
        e.preventDefault();
        
        if (donationData.amount <= 0) return alert("Please enter a valid donation amount.");
        
        try {
            const response = await fetch(`http://localhost:8080/api/donations/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData),
            });

            if (response.ok) {
                const updatedCampaign = await response.json();
                setCampaign(updatedCampaign);
                setIsDonating(false);
                alert(`Thank you for your $${donationData.amount.toFixed(2)} donation!`);
            } else {
                const errorData = await response.json();
                alert(`Donation Failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Donation failed:', error);
            alert('A network error occurred while processing the donation.');
        }
    };

    // --- Render Guards ---
    if (loading) return <p className="message-center">Loading campaign details...</p>;
    if (error) return <p className="message-center error-message">Error: {error}</p>;
    if (!campaign) return <p className="message-center">Campaign data unavailable.</p>;

    // Calculate progress for display
    const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

    return (
        <>
            <Header />
            <main className="campaign-detail-main">
                <h1>{campaign.title}</h1>
                
                {/* Action Button Group */}
                <div className="action-buttons">
                    <button 
                        onClick={() => setIsDonating(true)} 
                        className="btns btn" 
                        style={{width: '200px'}}
                    >
                        Donate Now
                    </button>

                    {isEditing ? (
                        <>
                            <button onClick={handleUpdate} className="btn-save">Save Changes</button>
                            <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)} className="btn-edit">Edit Campaign</button>
                            <button onClick={handleDelete} className="btn-delete">Delete Campaign</button>
                        </>
                    )}
                </div>

                {isEditing ? (
                    // --- Edit Form View ---
                    <form className="edit-form">
                        <label>Title: <input type="text" name="title" value={editData.title || ''} onChange={handleEditChange} required /></label>
                        <label>Description: <textarea name="description" value={editData.description || ''} onChange={handleEditChange} required /></label>
                        <label>Goal ($): <input type="number" name="goalAmount" value={editData.goalAmount || 1} onChange={handleEditChange} required min="1" step="0.01" /></label>
                        <label>Category: <input type="text" name="category" value={editData.category || ''} onChange={handleEditChange} required /></label>
                        <label>Image URL: <input type="url" name="imageUrl" value={editData.imageUrl || ''} onChange={handleEditChange} /></label>
                    </form>
                ) : (
                    // --- Read Only Detail View ---
                    <div className="detail-view"> 
                        <img src={campaign.imageUrl || '/images/placeholder.png'} alt={campaign.title} />
                        
                        <p><strong>Category:</strong> {campaign.category}</p>
                        <p><strong>Description:</strong> {campaign.description}</p>
                        
                        <div className="funding-status">
                            <div>
                                <strong>Goal:</strong> ${campaign.goalAmount ? campaign.goalAmount.toFixed(2) : '0.00'}
                            </div>
                            <div>
                                <strong>Raised:</strong> ${campaign.currentAmount ? campaign.currentAmount.toFixed(2) : '0.00'}
                            </div>
                            <div style={{width: '100%', maxWidth: '300px'}}>
                                <label htmlFor="detail-progress">Progress</label>
                                <progress 
                                    id="detail-progress" 
                                    max="100" 
                                    value={progress}
                                    style={{width: '100%', height: '20px'}}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            {/* --- Donation Modal/Form (Conditional Render) --- */}
            {isDonating && (
                <div className="donation-modal-overlay">
                    <form onSubmit={handleDonateSubmit} className="donation-form-container">
                        <h2>Donate to {campaign.title}</h2>
                        
                        <label>Amount ($):</label>
                        <input 
                            type="number" 
                            name="amount" 
                            value={donationData.amount} 
                            onChange={handleDonationChange} 
                            min="1" 
                            step="0.01" 
                            required 
                        />
                        
                        <label>Your Name (Optional):</label>
                        <input 
                            type="text" 
                            name="donorName" 
                            value={donationData.donorName} 
                            onChange={handleDonationChange} 
                        />
                        
                        <div className="modal-actions">
                            <button type="submit" className="btn-save">Confirm Donation</button>
                            <button type="button" onClick={() => setIsDonating(false)} className="btn-cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            
            <Footer />
        </>
    );
};

export default CampaignDetail;