import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HealthWorkerDashboard from './components/dashboards/HealthWorkerDashboard';
import RegistryDashboard from './components/dashboards/RegistryDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={
        user?.role === 'health_worker' ? <Navigate to="/health-worker" replace /> :
        user?.role === 'registry_staff' ? <Navigate to="/registry" replace /> :
        user?.role === 'parent' ? <Navigate to="/parent" replace /> :
        <Navigate to="/login" replace />
      } />
      <Route path="/health-worker" element={user?.role === 'health_worker' ? <HealthWorkerDashboard /> : <Navigate to="/" replace />} />
      <Route path="/registry" element={user?.role === 'registry_staff' ? <RegistryDashboard /> : <Navigate to="/" replace />} />
      <Route path="/parent" element={user?.role === 'parent' ? <ParentDashboard /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;