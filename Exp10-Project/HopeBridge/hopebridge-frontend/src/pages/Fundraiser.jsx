import React, { useState } from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

const Fundraiser = () => {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Medical',
    goalAmount: 1,
    imageUrl: '',
  });
  
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let newValue;
    
    if (name === 'goalAmount') {
      newValue = parseFloat(value) || 1; 
    } else {
      newValue = value;
    }
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('Submitting...');

    const payload = {
      ...formData,
      goalAmount: formData.goalAmount > 0 ? formData.goalAmount : 1, 
      currentAmount: 0.0,
    };

    console.log("Final Payload being sent:", payload); 

    try {
      const response = await fetch('http://localhost:8080/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionStatus('Success! Your fundraiser has been created.');
        setFormData({
          title: '',
          description: '',
          category: 'Medical',
          goalAmount: 1,
          imageUrl: '',
        });
      } else {
        const errorData = await response.json(); 
        setSubmissionStatus(`Failed to create fundraiser: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setSubmissionStatus('A network error occurred. Please check your backend connection.');
    }
  };

  return (
    <>
      <Header />
      <main className="fundraiser-main">
        <h1>Start Your Fundraiser</h1>
        
        {submissionStatus && (
            <p className={`status-message ${submissionStatus.includes('Success') ? 'status-success' : 'status-error'}`}>
                {submissionStatus}
            </p>
        )}
        
        <form onSubmit={handleSubmit} className="fundraiser-form">
          
          <div className="form-group">
            <label htmlFor="title">Campaign Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid-cols-2">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Medical">Medical</option>
                <option value="Education">Education</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="goalAmount">Funding Goal ($)</label>
              <input
                type="number"
                name="goalAmount"
                id="goalAmount"
                value={formData.goalAmount}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (Optional)</label>
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="e.g., /images/placeholder.png"
            />
          </div>

          <button
            type="submit"
            className="fundraiser-submit-btn" 
          >
            Launch Campaign
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Fundraiser;