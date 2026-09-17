import React, { useEffect, useState } from "react";
import "./Projects.css";

function Projects({ onBack, onProjectClick }) {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log("PROJECT DATA:", data);
        setProjects(data);
      })
      .catch((error) => {
        console.log("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="projects-page">

      <header className="projects-header">

        <div>
          <h1>Project Monitoring</h1>
          <p>MoSPI | SIH26103</p>
        </div>

        <button onClick={onBack}>
          Back to Dashboard
        </button>

      </header>

      <div className="projects-content">

        <h2>All Projects</h2>

        <p className="subtitle">
          Monitor project progress, status and responsible managers.
        </p>

        <div className="project-list">

          {projects.map((project) => (

            <div
              className="project-card"
              key={project._id}
              onClick={() => onProjectClick(project)}
            >

              <div className="project-info">

                <h3>{project.name}</h3>

                <p>
                  Manager: {project.manager}
                </p>

              </div>

              <div className="progress-section">

                <span>
                  Progress: {project.progress}%
                </span>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${project.progress}%`
                    }}
                  ></div>

                </div>

              </div>

              <span
                className={`project-status ${project.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {project.status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Projects;