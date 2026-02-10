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
// import React, { useState, useEffect } from 'react';
// import './App.css';

// --- CONFIGURATION ---
// const GITHUB_TOKEN = ""; 
// const REPO_OWNER = "Mshandev";
// const REPO_NAME = "Food-Delivery";

// function App() {
//   const [repoData, setRepoData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRepoData = async () => {
//       try {
//         // 1. Get the default branch (usually main)
//         const branchRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/branches/main`, {
//           headers: { Authorization: `token ${GITHUB_TOKEN}` }
//         });
//         const branchData = await branchRes.json();
//         const treeSha = branchData.commit.sha;

//         // 2. Get the full tree recursively
//         const treeRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${treeSha}?recursive=1`, {
//           headers: { Authorization: `token ${GITHUB_TOKEN}` }
//         });
//         const treeData = await treeRes.json();

//         // 3. Categorize the items
//         const categorized = categorizeItems(treeData.tree);
//         setRepoData(categorized);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching GitHub data:", error);
//         setLoading(false);
//       }
//     };

//     fetchRepoData();
//   }, []);

//   const categorizeItems = (items) => {
//     const categories = {
//       BUILD: { status: "success", items: [], lastUpdated: new Date().toISOString() },
//       TEST: { status: "pending", items: [], lastUpdated: new Date().toISOString() },
//       DEPLOY: { status: "warning", items: [], lastUpdated: new Date().toISOString() },
//       MONITOR: { status: "idle", items: [], lastUpdated: new Date().toISOString() }
//     };

//     const patterns = {
//       BUILD: /(src|app|lib|bin|build|pkg|package\.json|pyproject\.toml|main\.py|utils\.py|__init__\.py)/i,
//       TEST: /(test|spec|qa|pytest|unittest|conftest\.py)/i,
//       DEPLOY: /(deploy|docker|k8s|terraform|yml|yaml|workflow|jenkins|Dockerfile)/i,
//       MONITOR: /(logs|monitor|grafana|prometheus|alert|health|metrics|login|logout)/i
//     };

//     items.forEach(item => {
//       const name = item.path.split('/').pop();
//       for (const [key, regex] of Object.entries(patterns)) {
//         if (regex.test(name)) {
//           // Limit to showing 5 items per block for UI cleanliness
//           if (categories[key].items.length < 5) {
//             categories[key].items.push(name);
//           }
//           break;
//         }
//       }
//     });

//     return categories;
//   };

//   if (loading) return <div className="dashboard"><h1>Scanning Repository...</h1></div>;

//   const latestCategory = repoData ? Object.keys(repoData)[0] : null; // Simplified for test

//   return (
//     <div className="dashboard">
//       <h1>Repo Visualizer: {REPO_NAME}</h1>
//       <div className="grid">
//         {repoData && Object.entries(repoData).map(([category, data]) => {
//           const isRecentlyUpdated = category === latestCategory;
//           return (
//             <div key={category} className={`card ${data.status} ${isRecentlyUpdated ? 'latest-highlight' : ''}`}>
//               {isRecentlyUpdated && <span className="recent-badge">RECENT ACTIVITY</span>}
//               <div className="card-header">
//                 <h2>{category}</h2>
//                 <span className={`status-indicator pulse ${data.status}`}></span>
//               </div>
//               <ul className="item-list">
//                 {data.items.map((item, idx) => (
//                   <li key={idx}><input type="checkbox" /> {item}</li>
//                 ))}
//               </ul>
//               <div className="activity">
//                 <small>Live Data Sync</small>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App; Working Best till now

// import React, { useState, useEffect } from 'react';
// import './App.css';

// // It's best to handle the token via a secure input on the landing page
// const GITHUB_TOKEN = ""; 
// const REPO_OWNER = "AmoghNexTurn";

// function App() {
//   const [repoList, setRepoList] = useState([]);
//   const [selectedRepo, setSelectedRepo] = useState(null);
//   const [repoData, setRepoData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch repositories for the landing page
//   useEffect(() => {
//     fetch(`https://api.github.com/users/${REPO_OWNER}/repos`, {
//       headers: { Authorization: `token ${GITHUB_TOKEN}` }
//     })
//       .then(res => res.json())
//       .then(data => setRepoList(data))
//       .catch(err => console.error("Error fetching repos:", err));
//   }, []);

//   const handleSelectRepo = async (repoName) => {
//     setLoading(true);
//     setSelectedRepo(repoName);
    
//     try {
//       // Calling your FastAPI backend with Query Parameters
//       const response = await fetch(
//         `http://localhost:8000/tree?owner=${REPO_OWNER}&repo=${repoName}&token=${GITHUB_TOKEN}`
//       );
//       const data = await response.json();
      
//       // Process the 'tree' array from Amogh's API structure
//       const processed = {};
//       data.tree.forEach(node => {
//         processed[node.name] = {
//           status: node.status || "success",
//           items: node.children ? node.children.map(c => c.name) : [],
//           lastUpdated: node.last_modified || new Date().toISOString()
//         };
//       });

//       setRepoData(processed);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading dashboard:", error);
//       setLoading(false);
//     }
//   };

//   // View logic...
//   if (!selectedRepo) {
//     return (
//       <div className="landing-page">
//         <h1>Select a Repository</h1>
//         <div className="repo-list">
//           {repoList.map(repo => (
//             <div key={repo.id} className="repo-card" onClick={() => handleSelectRepo(repo.name)}>
//               <h3>{repo.name}</h3>
//               <p>{repo.description || "Project folder structure visualizer"}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (loading) return <div className="dashboard"><h1>Analyzing {selectedRepo}...</h1></div>;

//   return (
//     <div className="dashboard">
//        <button className="back-btn" onClick={() => {setSelectedRepo(null); setRepoData(null);}}>
//          ← Back to Projects
//        </button>
//        <h1>Dashboard: {selectedRepo}</h1>
//        <div className="grid">
//          {repoData && Object.entries(repoData).map(([name, info]) => (
//            <div key={name} className={`card ${info.status}`}>
//               <div className="card-header">
//                 <h2>{name}</h2>
//                 <span className={`status-indicator pulse ${info.status}`}></span>
//               </div>
//               <ul className="item-list">
//                 {info.items.slice(0, 5).map((item, i) => (
//                   <li key={i}><input type="checkbox" /> {item}</li>
//                 ))}
//               </ul>
//               <div className="activity">
//                 <small>Last Update: {new Date(info.lastUpdated).toLocaleString()}</small>
//               </div>
//            </div>
//          ))}
//        </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- Configuration State ---
  const [config, setConfig] = useState({ token: '', owner: '' });
  const [isConnected, setIsConnected] = useState(false);
  
  const [repoList, setRepoList] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch repos ONLY when the user clicks 'Connect'
  const handleConnect = () => {
    if (!config.token || !config.owner) {
      alert("Please enter both Owner name and Personal Access Token.");
      return;
    }
    
    setLoading(true);
    fetch(`https://api.github.com/users/${config.owner}/repos`, {
      headers: { Authorization: `token ${config.token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized or User not found");
        return res.json();
      })
      .then(data => {
        setRepoList(data);
        setIsConnected(true);
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  };

  const handleSelectRepo = async (repoName) => {
    setLoading(true);
    setSelectedRepo(repoName);
    
    try {
      // Passing user-provided config to your FastAPI backend
      const response = await fetch(
        `http://localhost:8000/tree?owner=${config.owner}&repo=${repoName}&token=${config.token}`
      );
      const data = await response.json();
      
      const processed = {};
      data.tree.forEach(node => {
        processed[node.name] = {
          status: node.status || "success",
          items: node.children ? node.children.map(c => c.name) : [],
          lastUpdated: node.last_modified || new Date().toISOString()
        };
      });

      setRepoData(processed);
      setLoading(false);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setLoading(false);
    }
  };

  // --- VIEW 1: CONFIGURATION / LANDING PAGE ---
  if (!selectedRepo) {
    return (
      <div className="landing-page">
        <h1>GitHub Repo Visualizer</h1>
        
        {!isConnected ? (
          <div className="config-form">
            <input 
              type="text" 
              placeholder="GitHub Owner (e.g. AmoghNexTurn)" 
              value={config.owner}
              onChange={(e) => setConfig({...config, owner: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Personal Access Token" 
              value={config.token}
              onChange={(e) => setConfig({...config, token: e.target.value})}
            />
            <button onClick={handleConnect}>Connect to GitHub</button>
          </div>
        ) : (
          <>
            <div className="user-info">
              <p>Connected as: <strong>{config.owner}</strong></p>
              <button className="small-btn" onClick={() => setIsConnected(false)}>Change User</button>
            </div>
            <div className="repo-list">
              {repoList.map(repo => (
                <div key={repo.id} className="repo-card" onClick={() => handleSelectRepo(repo.name)}>
                  <h3>{repo.name}</h3>
                  <p>{repo.description || "No description provided."}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // --- VIEW 2: DASHBOARD (Existing logic) ---
  if (loading) return <div className="dashboard"><h1>Processing Data...</h1></div>;

  return (
    <div className="dashboard">
       <button className="back-btn" onClick={() => {setSelectedRepo(null); setRepoData(null);}}>
         ← Back to Projects
       </button>
       <h1 style={{color: '#2c3e50'}}>Dashboard: {selectedRepo}</h1>
       <div className="grid">
         {repoData && Object.entries(repoData).map(([name, info]) => (
           <div key={name} className={`card ${info.status}`}>
              <div className="card-header">
                <h2>{name}</h2>
                <span className={`status-indicator pulse ${info.status}`}></span>
              </div>
              <ul className="item-list">
                {info.items.slice(0, 5).map((item, i) => (
                  <li key={i}><input type="checkbox" /> {item}</li>
                ))}
              </ul>
              <div className="activity">
                <small>Last Update: {new Date(info.lastUpdated).toLocaleString()}</small>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
}

export default App;
