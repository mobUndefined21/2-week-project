import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <div className="home-banner"
      style={{backgroundImage: 
        `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),
        url('https://images.unsplash.com/photo-1550635707-e8c55839e834?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}
      >
        <div className="container">
          <h1 className="banner-title">Music-Box</h1>
          <h4 className="banner-subtitle">The place where you can find and connect with awesome musicians</h4>
        </div>
      </div>
    </div>
  )
}

export default HomePage
