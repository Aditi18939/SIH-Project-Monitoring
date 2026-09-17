import React from "react";
import "./Dashboard.css";

function Dashboard({ onLogout,onProjects }) {
  return (
    <div className="dashboard">

      <header className="header">
        <div>
          <h1>Integrated Project Monitoring Platform</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="welcome">
        <h2>Project Monitoring Dashboard</h2>
        <p>Track project progress, delays and risks in one place.</p>

         <button onClick={onProjects}>
          View All Projects
         </button>
      </div>

      <div className="stats">

        <div className="card">
          <h3>Total Projects</h3>
          <strong>24</strong>
        </div>

        <div className="card">
          <h3>On Track</h3>
          <strong>18</strong>
        </div>

        <div className="card">
          <h3>Delayed</h3>
          <strong>3</strong>
        </div>

        <div className="card">
          <h3>At Risk</h3>
          <strong>3</strong>
        </div>

      </div>

      <div className="projects">
        <h2>Recent Projects</h2>

        <div className="project-row">
          <div>
            <h3>Digital Infrastructure Project</h3>
            <p>Progress: 75%</p>
          </div>
          <span className="status ontrack">On Track</span>
        </div>

        <div className="project-row">
          <div>
            <h3>Smart City Development</h3>
            <p>Progress: 52%</p>
          </div>
          <span className="status delayed">Delayed</span>
        </div>

        <div className="project-row">
          <div>
            <h3>National Data Platform</h3>
            <p>Progress: 38%</p>
          </div>
          <span className="status risk">At Risk</span>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;