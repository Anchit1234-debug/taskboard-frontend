import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/healthcheck');
      setStatus(response.data);
    } catch (err) {
      setError('Failed to reach service');
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TaskBoard Service</h1>
        
        <div className="status-container">
          <h2>Service Status</h2>
          
          {loading ? (
            <p className="loading">Checking service health...</p>
          ) : (
            <>
              <div className={`status-badge ${status ? 'healthy' : 'unhealthy'}`}>
                {status ? '✓ Healthy' : '✗ Unhealthy'}
              </div>
              {error && <p className="error-message">{error}</p>}
            </>
          )}

          <button onClick={checkHealth} className="refresh-button">
            Check Status
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
