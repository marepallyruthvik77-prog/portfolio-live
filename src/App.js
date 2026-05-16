import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // This fetches data from your backend server running on port 5000
    axios.get('http://127.0.0.1:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="portfolio" style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>My Personal Portfolio</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Full-Stack Developer Project</p>
      </header>

      <section className="projects-section">
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', color: '#444' }}>My Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {projects.length === 0 ? (
            <p>No projects found in the database. Add some documents to your MongoDB collection!</p>
          ) : (
            projects.map((project, index) => (
              <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: '0', color: '#0070f3' }}>{project.title}</h3>
                <p style={{ color: '#555' }}>{project.description}</p>
                <p><strong>Built with:</strong> {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</p>
                {project.link && <a href={project.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '10px', padding: '8px 16px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>View Project</a>}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
