import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Header />
      {/* Add a wrapper class for glass effect and centering */}
      <div className="about-wrapper glass"> 
        <main className="about-content">
          <h1>About HopeBridge</h1>
          
          <section className="mission-statement">
            <p className="lead-paragraph">
              HopeBridge is a purpose-driven fundraising platform designed to connect meaningful causes with compassionate supporters. By offering powerful tools for campaign creation, transparent tracking, and seamless donor engagement, it empowers individuals and organizations to turn their vision for change into reality. With a focus on trust, clarity, and community impact, HopeBridge transforms generosity into measurable progress and inspires people to make a lasting difference.
            </p>
          </section>

          <section className="values-section">
            <h2>Our Core Values</h2>
            <ul>
              <li>
                <strong>Transparency:</strong> Ensuring every donor knows exactly where their money goes.
              </li>
              <li>
                <strong>Impact:</strong> Focusing resources on causes that deliver measurable, lasting change.
              </li>
              <li>
                <strong>Community:</strong> Building a network of trust and support between creators and donors.
              </li>
            </ul>
          </section>

          <p className="contact-info">
            Learn more about our team and history on our dedicated <a href="#">Team Page</a>.
          </p>

        </main>
      </div>
      <Footer />
    </>
  );
};

export default About;