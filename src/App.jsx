import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectsDetails";
import MilestoneTracking from "./pages/MilestoneTracking";
import RiskPredictor from "./pages/RiskPredictor";
import SmartAlerts from "./pages/SmartAlerts";
import ReportsAnalytics from "./pages/ReportAnalytics";

function App() {
  const [page, setPage] = useState("login");
  const [selectedProject, setSelectedProject] = useState(null);

  // Login Page
  if (page === "login") {
    return (
      <Login
        onLogin={() => setPage("dashboard")}
      />
    );
  }

  // Dashboard Page
  if (page === "dashboard") {
    return (
      <Dashboard
        onLogout={() => setPage("login")}
        onProjects={() => setPage("projects")}
      />
    );
  }

  // Projects Page
  if (page === "projects") {
    return (
      <Projects
        onBack={() => setPage("dashboard")}
        onProjectClick={(project) => {
          setSelectedProject(project);
          setPage("details");
        }}
      />
    );
  }

  // Project Details Page
  if (page === "details") {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setPage("projects")}
        onMilestones={() => setPage("milestones")}
        onRiskPredictor={() => setPage("risk")}
        onSmartAlerts={()=> setPage("alerts")}
        onReportAnalytics={() => setPage("report")}
      />
    );
  }
  if (page==="milestones") {
    return(
      <MilestoneTracking
      project={selectedProject}
      onBack={() => setPage("details")}
      />
    )
  }
  if (page==="risk") {
    return(
      <RiskPredictor
      project={selectedProject}
      onBack={() => setPage("details")}
      />
    )
  }
  if (page==="alerts") {
    return(
      <SmartAlerts
      project={selectedProject}
      onBack={() => setPage("details")}
      />
    )
  }
  if (page==="report") {
    return(
      <ReportsAnalytics
      project={selectedProject}
      onBack={() => setPage("details")}
      />
    )
  }
  
  return null;
}

export default App;