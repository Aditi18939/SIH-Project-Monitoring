import React, { useEffect, useState } from "react";
import "./SmartAlerts.css";

function SmartAlerts({ project, onBack }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!project?._id) return;

    fetch(`http://localhost:5000/api/alerts/${project._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("ALERT DATA:", data);
        setAlerts(data);
      })
      .catch((error) => {
        console.log("Error fetching alerts:", error);
      });
  }, [project]);

  const highAlerts = alerts.filter(
    (alert) => alert.type === "High"
  ).length;

  const mediumAlerts = alerts.filter(
    (alert) => alert.type === "Medium"
  ).length;

  return (
    <div className="alerts-page">

      <header className="alerts-header">
        <div>
          <h1>Smart Alerts</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button onClick={onBack}>
          Back to Project Details
        </button>
      </header>

      <main className="alerts-content">

        <div className="alerts-title">
          <h2>{project?.name}</h2>
          <p>Project Manager: {project?.manager}</p>
        </div>

        {/* Alert Summary */}

        <div className="alerts-summary">

          <div className="alert-summary-card">
            <h3>Total Alerts</h3>
            <strong>{alerts.length}</strong>
            <p>Active alerts</p>
          </div>

          <div className="alert-summary-card">
            <h3>High Priority</h3>
            <strong>{highAlerts}</strong>
            <p>Requires immediate attention</p>
          </div>

          <div className="alert-summary-card">
            <h3>Medium Priority</h3>
            <strong>{mediumAlerts}</strong>
            <p>Requires monitoring</p>
          </div>

        </div>

        {/* Alerts List */}

        <div className="alerts-list">

          <h2>Project Alerts</h2>

          {alerts.map((alert) => (
            <div className="alert-card" key={alert._id}>

              <div className="alert-info">
                <h3>{alert.title}</h3>
                <p>{alert.message}</p>
              </div>

              <span
                className={`alert-badge ${alert.type.toLowerCase()}`}
              >
                {alert.type} Priority
              </span>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}

export default SmartAlerts;