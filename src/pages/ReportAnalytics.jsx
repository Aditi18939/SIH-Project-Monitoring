import React, { useEffect, useState } from "react";
import "./ReportsAnalytics.css";

function ReportsAnalytics({ project, onBack }) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!project?._id) return;

    fetch(`https://sih-project-monitoring.onrender.com/api/reports/${project._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("REPORT DATA:", data);
        setReport(data);
      })
      .catch((error) => {
        console.log("Error fetching report:", error);
      });
  }, [project]);

  if (!report) {
    return <div>Loading report...</div>;
  }

  const { project: projectData, milestoneSummary, riskSummary } = report;

  const budgetAllocated = projectData.budget;
  const budgetUtilized = budgetAllocated * 0.74;
  const remainingBudget = budgetAllocated - budgetUtilized;

  return (
    <div className="reports-page">

      <header className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button onClick={onBack}>
          Back to Project Details
        </button>
      </header>

      <main className="reports-content">

        <div className="reports-title">
          <h2>{projectData.name}</h2>
          <p>Project Manager: {projectData.manager}</p>
        </div>

        {/* Overview */}

        <div className="analytics-cards">

          <div className="analytics-card">
            <h3>Project Progress</h3>
            <strong>{projectData.progress}%</strong>

            <div className="analytics-bar">
              <div
                style={{ width: `${projectData.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Budget Allocated</h3>
            <strong>₹{budgetAllocated} Cr</strong>
            <p>Total approved budget</p>
          </div>

          <div className="analytics-card">
            <h3>Budget Utilized</h3>
            <strong>₹{budgetUtilized.toFixed(1)} Cr</strong>
            <p>74% of allocated budget</p>
          </div>

          <div className="analytics-card">
            <h3>Milestones</h3>
            <strong>
              {milestoneSummary.completed} / {milestoneSummary.total}
            </strong>
            <p>Completed milestones</p>
          </div>

        </div>

        {/* Project Status */}

        <div className="report-box">

          <h2>Project Status Overview</h2>

          <div className="status-bars">

            <div className="status-row">
              <span>On Track</span>

              <div className="status-bar">
                <div
                  className="status-fill ontrack-fill"
                  style={{
                    width:
                      projectData.status === "On Track" ? "100%" : "0%"
                  }}
                ></div>
              </div>

              <strong>
                {projectData.status === "On Track" ? "100%" : "0%"}
              </strong>
            </div>

            <div className="status-row">
              <span>Delayed</span>

              <div className="status-bar">
                <div
                  className="status-fill delayed-fill"
                  style={{
                    width:
                      projectData.status === "Delayed" ? "100%" : "0%"
                  }}
                ></div>
              </div>

              <strong>
                {projectData.status === "Delayed" ? "100%" : "0%"}
              </strong>
            </div>

            <div className="status-row">
              <span>At Risk</span>

              <div className="status-bar">
                <div
                  className="status-fill risk-fill"
                  style={{
                    width:
                      projectData.status === "At Risk" ? "100%" : "0%"
                  }}
                ></div>
              </div>

              <strong>
                {projectData.status === "At Risk" ? "100%" : "0%"}
              </strong>
            </div>

          </div>

        </div>

        {/* Budget Analysis */}

        <div className="report-box">

          <h2>Budget Analysis</h2>

          <div className="budget-info">

            <div>
              <span>Allocated Budget</span>
              <strong>₹{budgetAllocated} Crore</strong>
            </div>

            <div>
              <span>Utilized Budget</span>
              <strong>₹{budgetUtilized.toFixed(1)} Crore</strong>
            </div>

            <div>
              <span>Remaining Budget</span>
              <strong>₹{remainingBudget.toFixed(1)} Crore</strong>
            </div>

          </div>

          <div className="budget-bar">
            <div style={{ width: "74%" }}></div>
          </div>

          <p className="budget-note">
            74% of the allocated project budget has been utilized.
          </p>

        </div>

        {/* Milestone Analytics */}

        <div className="report-box">

          <h2>Milestone Completion</h2>

          <div className="milestone-stats">

            <div>
              <strong>{milestoneSummary.completed}</strong>
              <span>Completed</span>
            </div>

            <div>
              <strong>{milestoneSummary.inProgress}</strong>
              <span>In Progress</span>
            </div>

            <div>
              <strong>{milestoneSummary.pending}</strong>
              <span>Pending</span>
            </div>

          </div>

        </div>

        {/* Risk Analytics */}

        <div className="report-box">

          <h2>Risk Summary</h2>

          <div className="milestone-stats">

            <div>
              <strong>{riskSummary.high}</strong>
              <span>High Risk</span>
            </div>

            <div>
              <strong>{riskSummary.medium}</strong>
              <span>Medium Risk</span>
            </div>

            <div>
              <strong>{riskSummary.low}</strong>
              <span>Low Risk</span>
            </div>

          </div>

        </div>

        {/* Report Summary */}

        <div className="report-box">

          <h2>Report Summary</h2>

          <p className="summary-text">
            The project is currently at {projectData.progress}% completion.
            The project status is {projectData.status}. A total of{" "}
            {milestoneSummary.total} milestones are being monitored, with{" "}
            {milestoneSummary.completed} completed. The system has identified{" "}
            {riskSummary.total} project risks that require monitoring.
          </p>

        </div>

      </main>

    </div>
  );
}

export default ReportsAnalytics;