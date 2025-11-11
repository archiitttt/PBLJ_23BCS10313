import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt');
  };

  return (
    <>
      <Header />
      <main className="login-main">
        <h1>Login</h1>
        <p>Enter your account credentials below</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
          <a href="#">Forgot password?</a>
          <button className="btns">Login</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;