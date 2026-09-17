import React, { useEffect, useState } from "react";
import "./RiskPredictor.css";

function RiskPredictor({ project, onBack }) {

  const [risks, setRisks] = useState([]);

  useEffect(() => {
    if (!project?._id) return;

    fetch(`https://sih-project-monitoring.onrender.com/api/risks/${project._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("RISK DATA:", data);
        setRisks(data);
      })
      .catch((error) => {
        console.log("Error fetching risks:", error);
      });
  }, [project]);

  const highRisks = risks.filter(
    (risk) => risk.riskLevel === "High"
  ).length;

  const mediumRisks = risks.filter(
    (risk) => risk.riskLevel === "Medium"
  ).length;

  const overallRisk =
    highRisks > 0 ? "High" : mediumRisks > 0 ? "Medium" : "Low";

  return (
    <div className="risk-page">

      <header className="risk-header">

        <div>
          <h1>Overrun & Risk Predictor</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button onClick={onBack}>
          Back to Project Details
        </button>

      </header>

      <main className="risk-content">

        <div className="risk-title">
          <h2>{project?.name}</h2>
          <p>Project Manager: {project?.manager}</p>
        </div>

        {/* Risk Summary */}

        <div className="risk-summary">

          <div className="risk-card">
            <h3>Overall Risk</h3>

            <strong
              className={
                overallRisk === "High"
                  ? "high-risk"
                  : overallRisk === "Medium"
                  ? "medium-risk"
                  : "low-risk"
              }
            >
              {overallRisk}
            </strong>

            <p>
              {overallRisk === "High"
                ? "Immediate attention required"
                : "Monitor project regularly"}
            </p>
          </div>

          <div className="risk-card">
            <h3>High Risks</h3>
            <strong>{highRisks}</strong>
            <p>Requires attention</p>
          </div>

          <div className="risk-card">
            <h3>Medium Risks</h3>
            <strong>{mediumRisks}</strong>
            <p>Requires monitoring</p>
          </div>

          <div className="risk-card">
            <h3>Project Progress</h3>
            <strong>{project?.progress}%</strong>
            <p>Current completion</p>
          </div>

        </div>

        {/* Risk Analysis */}

        <div className="analysis-box">

          <h2>Risk Analysis</h2>

          {risks.map((risk) => (

            <div
              className="analysis-row"
              key={risk._id}
            >

              <div>
                <h3>{risk.riskType}</h3>

                <p>
                  {risk.description}
                </p>

                <small>
                  Probability: {risk.probability}%
                </small>
              </div>

              <span
                className={`risk-badge ${risk.riskLevel.toLowerCase()}`}
              >
                {risk.riskLevel} Risk
              </span>

            </div>

          ))}

        </div>

        {/* Risk Factors */}

        <div className="factors-box">

          <h2>Identified Risk Factors</h2>

          <ul>

            {risks.map((risk) => (
              <li key={risk._id}>
                {risk.riskType}: {risk.description}
              </li>
            ))}

          </ul>

        </div>

        {/* Recommendations */}

        <div className="recommendation-box">

          <h2>Recommended Actions</h2>

          {risks.map((risk) => (

            <p key={risk._id}>
              <strong>{risk.riskType}:</strong>{" "}
              {risk.recommendation}
            </p>

          ))}

        </div>

      </main>

    </div>
  );
}

export default RiskPredictor;