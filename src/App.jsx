import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import History from './pages/History';
import Tasks from './pages/Task';
import Login from './pages/Login'; 
import ProtectedRoute from './auth/ProtectedRoute';

const domain = 'https://streema.com';


const App = () => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(message => {
      console.log(message, "message")
      // Might not be as easy if there are multiple side panels open
      if (message.action === 'closeSidePanel') {
        window.close();
      }
    
      return true;
    })
    
    chrome.tabs.query({active:true, currentWindow:true}).then(tabs => {
      const tab = tabs[0];
      console.log(tab.url)
    
      if (!tab.url.includes(domain)) {
        window.close();
      }
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protect these routes */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
