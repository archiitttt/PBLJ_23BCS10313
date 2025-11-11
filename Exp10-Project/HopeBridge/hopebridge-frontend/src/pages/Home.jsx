import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Campaigns from '../components/Campaigns';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CATEGORIES_DATA = [
    { img: "/images/category-images/medical.png", name: "Medical" },
    { img: "/images/category-images/education.png", name: "Education" },
    { img: "/images/category-images/disaster-relief.png", name: "Disaster Relief" },
    { img: "/images/category-images/other.png", name: "Other" },
];

const HOW_IT_WORKS_DATA = [
    { img: "/images/category2-images/announcement.png", title: "Create a Campaign", description: "Start a fundraising campaign for your cause." },
    { img: "/images/category2-images/social.png", title: "Share with Others", description: "Spread the word about your campaign." },
    { img: "/images/category2-images/donate.png", title: "Donate", description: "Contribute to the campaigns you care about." },
];

const HeroSection = () => (
    <div className="hero">
        <h1>HopeBridge<br/>A Fundraising Platform</h1>
        <p>Connecting compassionate donors with verified fundraisers for humanitarian and social causes.</p>
        <div className="donate-btns">
            <Link 
                to="/fundraiser" 
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    width: '13rem',
                    display: 'block'
                }}
            > 
                <button className="btn">Start a Fundraiser</button>
            </Link>
            
            <Link to="/#featured" style={{ 
                    textDecoration: 'none', 
                    color: 'white', 
                    width: '13rem', 
                    display: 'block' 
                }}>
                <button className="btn">Donate Now</button>
            </Link>
        </div>
    </div>
);

const CategoryBrowse = () => (
    <div className="glass">
        <div className="content">
            <h2>Browse by Category</h2>
            <ul>
                {CATEGORIES_DATA.map((category, index) => (
                    <li key={index}>
                        <img src={category.img} alt={category.name} />
                        <p>{category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const HowItWorks = () => (
    <div className="glass">
        <div className="content2">
            <h2>How it Works</h2>
            <ul>
                {HOW_IT_WORKS_DATA.map((step, index) => (
                    <li key={index}>
                        <img src={step.img} alt={step.title} />
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const JoinHopeBridge = () => (
    <div className="join-hopebridge">
        <div>
            <h2>Join HopeBridge</h2>
            <p>Start or Support a Campaign for a better world.</p>
        </div>
        <Link to="/fundraiser">
            <button className="btns btn">Join Now</button>
        </Link>
    </div>
);

const Home = () => {
    const location = useLocation(); 

    useEffect(() => {
        if (location.hash === '#featured') {
            const element = document.getElementById('featured');
            
            if (element) {
                setTimeout(() => { 
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100); 
            }
        }
    }, [location]);


    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <CategoryBrowse />
                <HowItWorks />
                <Campaigns /> 
                <JoinHopeBridge />
                <hr />
            </main>
            <Footer />
        </>
    );
};

export default Home;