// import React, { useState } from 'react';
// import './App.css';

// const MOCK_DATA = {
//   BUILD: { status: "success", items: ["App.jsx", "package.json", "utils.js"] },
//   TEST: { status: "pending", items: ["auth.spec.js", "api.test.js"] },
//   DEPLOY: { status: "warning", items: ["Dockerfile", "main.yml"] },
//   MONITOR: { status: "idle", items: ["prometheus.yml", "logs/"] }
// };

// function App() {
//   return (
//     <div className="dashboard">
//       <h1>Repo Visualizer: {`my-cool-project`}</h1>
      
//       <div className="grid">
//         {Object.entries(MOCK_DATA).map(([category, data]) => (
//           <div key={category} className={`card ${data.status}`}>
//             <div className="card-header">
//               <h2>{category}</h2>
//               <span className={`status-indicator pulse ${data.status}`}></span>
//             </div>
            
//             <ul className="item-list">
//               {data.items.map(item => (
//                 <li key={item}>
//                   <input type="checkbox" /> {item}
//                 </li>
//               ))}
//             </ul>
            
//             <div className="activity">
//               <small>Latest: 2 hours ago</small>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css';

// const MOCK_DATA = {
//   BUILD: { status: "success", items: ["App.jsx", "package.json", "utils.js"] },
//   TEST: { status: "pending", items: ["auth.spec.js", "api.test.js"] },
//   DEPLOY: { status: "warning", items: ["Dockerfile", "main.yml"] },
//   MONITOR: { status: "idle", items: ["prometheus.yml", "logs/"] }
// };

// function App() {
//   return (
//     <div className="dashboard">
//       <h1>Repo Visualizer: {`my-cool-project`}</h1>
      
//       <div className="grid">
//         {Object.entries(MOCK_DATA).map(([category, data]) => (
//           <div key={category} className={`card ${data.status}`}>
//             <div className="card-header">
//               <h2>{category}</h2>
//               {/* FIXED: Changed "" to `` to allow the variable to work */}
//               <span className={`status-indicator pulse ${data.status}`}></span>
//             </div>
            
//             <ul className="item-list">
//               {data.items.map(item => (
//                 <li key={item}>
//                   <input type="checkbox" /> {item}
//                 </li>
//               ))}
//             </ul>
            
//             <div className="activity">
//               <small>Latest: 2 hours ago</small>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import './App.css';

// const MOCK_DATA = {
//   BUILD: { status: "success", items: ["App.jsx", "package.json"], lastUpdated: "2026-02-08T14:00:00Z" },
//   TEST: { status: "pending", items: ["auth.spec.js"], lastUpdated: "2026-02-08T19:45:00Z" }, // This is the newest
//   DEPLOY: { status: "warning", items: ["Dockerfile"], lastUpdated: "2026-02-07T10:00:00Z" },
//   MONITOR: { status: "idle", items: ["logs/"], lastUpdated: "2026-02-05T08:00:00Z" }
// };

// function App() {
//   // Logic to find the ID of the most recently updated block
//   const latestCategory = Object.keys(MOCK_DATA).reduce((a, b) => 
//     new Date(MOCK_DATA[a].lastUpdated) > new Date(MOCK_DATA[b].lastUpdated) ? a : b
//   );

//   return (
//     <div className="dashboard">
//       <h1>Repo Visualizer: {`my-cool-project`}</h1>
      
//       <div className="grid">
//         {Object.entries(MOCK_DATA).map(([category, data]) => {
//           const isRecentlyUpdated = category === latestCategory;
          
//           return (
//             <div key={category} className={`card ${data.status} ${isRecentlyUpdated ? 'latest-highlight' : ''}`}>
//               {isRecentlyUpdated && <span className="recent-badge">RECENT ACTIVITY</span>}
              
//               <div className="card-header">
//                 <h2>{category}</h2>
//                 <span className={`status-indicator pulse ${data.status}`}></span>
//               </div>
              
//               <ul className="item-list">
//                 {data.items.map(item => (
//                   <li key={item}><input type="checkbox" /> {item}</li>
//                 ))}
//               </ul>
              
//               <div className="activity">
//                 <small>Updated: {new Date(data.lastUpdated).toLocaleString()}</small>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';

// --- CONFIGURATION ---
// const GITHUB_TOKEN = "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"; 
const REPO_OWNER = "Mshandev";
const REPO_NAME = "Food-Delivery";

function App() {
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        // 1. Get the default branch (usually main)
        const branchRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/branches/main`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const branchData = await branchRes.json();
        const treeSha = branchData.commit.sha;

        // 2. Get the full tree recursively
        const treeRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${treeSha}?recursive=1`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const treeData = await treeRes.json();

        // 3. Categorize the items
        const categorized = categorizeItems(treeData.tree);
        setRepoData(categorized);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  const categorizeItems = (items) => {
    const categories = {
      BUILD: { status: "success", items: [], lastUpdated: new Date().toISOString() },
      TEST: { status: "pending", items: [], lastUpdated: new Date().toISOString() },
      DEPLOY: { status: "warning", items: [], lastUpdated: new Date().toISOString() },
      MONITOR: { status: "idle", items: [], lastUpdated: new Date().toISOString() }
    };

    const patterns = {
      BUILD: /(src|app|lib|bin|build|pkg|package\.json|pyproject\.toml|main\.py|utils\.py|__init__\.py)/i,
      TEST: /(test|spec|qa|pytest|unittest|conftest\.py)/i,
      DEPLOY: /(deploy|docker|k8s|terraform|yml|yaml|workflow|jenkins|Dockerfile)/i,
      MONITOR: /(logs|monitor|grafana|prometheus|alert|health|metrics|login|logout)/i
    };

    items.forEach(item => {
      const name = item.path.split('/').pop();
      for (const [key, regex] of Object.entries(patterns)) {
        if (regex.test(name)) {
          // Limit to showing 5 items per block for UI cleanliness
          if (categories[key].items.length < 5) {
            categories[key].items.push(name);
          }
          break;
        }
      }
    });

    return categories;
  };

  if (loading) return <div className="dashboard"><h1>Scanning Repository...</h1></div>;

  const latestCategory = repoData ? Object.keys(repoData)[0] : null; // Simplified for test

  return (
    <div className="dashboard">
      <h1>Repo Visualizer: {REPO_NAME}</h1>
      <div className="grid">
        {repoData && Object.entries(repoData).map(([category, data]) => {
          const isRecentlyUpdated = category === latestCategory;
          return (
            <div key={category} className={`card ${data.status} ${isRecentlyUpdated ? 'latest-highlight' : ''}`}>
              {isRecentlyUpdated && <span className="recent-badge">RECENT ACTIVITY</span>}
              <div className="card-header">
                <h2>{category}</h2>
                <span className={`status-indicator pulse ${data.status}`}></span>
              </div>
              <ul className="item-list">
                {data.items.map((item, idx) => (
                  <li key={idx}><input type="checkbox" /> {item}</li>
                ))}
              </ul>
              <div className="activity">
                <small>Live Data Sync</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;