import React, { useEffect, useState } from "react";
import "./MilestoneTracking.css";

function MilestoneTracking({ project, onBack }) {

  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (!project?._id) return;

    fetch(`https://sih-project-monitoring.onrender.com/api/milestones/${project._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("MILESTONE DATA:", data);
        setMilestones(data);
      })
      .catch((error) => {
        console.log("Error fetching milestones:", error);
      });
  }, [project]);

  const completedCount = milestones.filter(
    (milestone) => milestone.status === "Completed"
  ).length;

  const inProgressCount = milestones.filter(
    (milestone) => milestone.status === "In Progress"
  ).length;

  const pendingCount = milestones.filter(
    (milestone) => milestone.status === "Pending"
  ).length;

  return (
    <div className="milestone-page">

      <header className="milestone-header">

        <div>
          <h1>Milestone Tracking</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button onClick={onBack}>
          Back to Project Details
        </button>

      </header>

      <main className="milestone-content">

        <div className="milestone-title">
          <h2>{project?.name}</h2>
          <p>Project Manager: {project?.manager}</p>
        </div>

        <div className="milestone-summary">

          <div className="summary-card">
            <h3>Total Milestones</h3>
            <strong>{milestones.length}</strong>
          </div>

          <div className="summary-card">
            <h3>Completed</h3>
            <strong>{completedCount}</strong>
          </div>

          <div className="summary-card">
            <h3>In Progress</h3>
            <strong>{inProgressCount}</strong>
          </div>

          <div className="summary-card">
            <h3>Pending</h3>
            <strong>{pendingCount}</strong>
          </div>

        </div>

        <div className="milestone-list">

          <h2>Project Milestones</h2>

          {milestones.map((milestone) => (

            <div
              className="milestone-card"
              key={milestone._id}
            >

              <div className="milestone-info">

                <h3>{milestone.title}</h3>

                <p>
                  Due Date:{" "}
                  {new Date(milestone.dueDate).toLocaleDateString("en-IN")}
                </p>

              </div>

              <div className="milestone-progress">

                <div className="progress-text">
                  <span>Progress</span>
                  <strong>{milestone.progress}%</strong>
                </div>

                <div className="milestone-bar">

                  <div
                    className="milestone-fill"
                    style={{
                      width: `${milestone.progress}%`
                    }}
                  ></div>

                </div>

              </div>

              <span
                className={`milestone-status ${milestone.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {milestone.status}
              </span>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default MilestoneTracking;