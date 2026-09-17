import React from "react";
import "./ProjectsDetails.css";

function ProjectDetails({ project, onBack,onMilestones,onRiskPredictor,onSmartAlerts,onReportAnalytics}) {
  return (
    <div className="details-page">

      <header className="details-header">
        <div>
          <h1>Project Details</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button onClick={onBack}>
          Back to Projects
        </button>
        <button onClick={onMilestones}>Milestone Tracking</button>
        <button onClick={onRiskPredictor}>
            Overrun & Risk Predictor
        </button>
        <button onClick={onSmartAlerts}>
           Update & Alerts
        </button>
         <button onClick={onReportAnalytics}>
          Report
        </button>
      </header>

      <main className="details-content">

        <div className="project-title">
          <div>
            <h2>{project.name}</h2>
            <p>Project Manager: {project.manager}</p>
          </div>

          <span className={`detail-status ${project.status
            .toLowerCase()
            .replace(" ", "-")}`}>
            {project.status}
          </span>
        </div>

        <div className="detail-cards">

          <div className="detail-card">
            <h3>Progress</h3>
            <strong>{project.progress}%</strong>

            <div className="detail-progress">
              <div
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Budget</h3>
            <strong>₹25 Crore</strong>
            <p>Allocated Budget</p>
          </div>

          <div className="detail-card">
            <h3>Timeline</h3>
            <strong>18 Months</strong>
            <p>Project Duration</p>
          </div>

          <div className="detail-card">
            <h3>Milestones</h3>
            <strong>8 / 12</strong>
            <p>Milestones Completed</p>
          </div>

        </div>

        <div className="project-information">
          <h2>Project Information</h2>

          <div className="info-grid">

            <div>
              <span>Project Manager</span>
              <strong>{project.manager}</strong>
            </div>

            <div>
              <span>Start Date</span>
              <strong>01 January 2026</strong>
            </div>

            <div>
              <span>Expected End Date</span>
              <strong>30 June 2027</strong>
            </div>

            <div>
              <span>Current Progress</span>
              <strong>{project.progress}%</strong>
            </div>

          </div>
        </div>

        <div className="milestone-preview">
          <h2>Milestone Overview</h2>

          <div className="milestone">
            <span>Planning & Approval</span>
            <b>Completed</b>
          </div>

          <div className="milestone">
            <span>Infrastructure Development</span>
            <b>In Progress</b>
          </div>

          <div className="milestone">
            <span>Testing & Deployment</span>
            <b>Pending</b>
          </div>

        </div>

      </main>

    </div>
  );
}

export default ProjectDetails;