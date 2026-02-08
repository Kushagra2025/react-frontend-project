import React, { useState } from 'react';
import './App.css';

const MOCK_DATA = {
  BUILD: { status: "success", items: ["App.jsx", "package.json", "utils.js"] },
  TEST: { status: "pending", items: ["auth.spec.js", "api.test.js"] },
  DEPLOY: { status: "warning", items: ["Dockerfile", "main.yml"] },
  MONITOR: { status: "idle", items: ["prometheus.yml", "logs/"] }
};

function App() {
  return (
    <div className="dashboard">
      <h1>Repo Visualizer: {`my-cool-project`}</h1>
      
      <div className="grid">
        {Object.entries(MOCK_DATA).map(([category, data]) => (
          <div key={category} className={`card ${data.status}`}>
            <div className="card-header">
              <h2>{category}</h2>
              <span className="status-indicator"></span>
            </div>
            
            <ul className="item-list">
              {data.items.map(item => (
                <li key={item}>
                  <input type="checkbox" /> {item}
                </li>
              ))}
            </ul>
            
            <div className="activity">
              <small>Latest: 2 hours ago</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;