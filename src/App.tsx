import React from 'react';
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

  // 🔑 Role-based route mapping
  const roleRoutes: Record<string, string> = {
    health_worker: '/health-worker',
    registry_staff: '/registry',
    parent: '/parent',
  };

  const roleComponents: Record<string, JSX.Element> = {
    health_worker: <HealthWorkerDashboard />,
    registry_staff: <RegistryDashboard />,
    parent: <ParentDashboard />,
  };

  return (
    <Routes>
      {/* Default redirect based on role */}
      <Route
        path="/"
        element={
          user?.role && roleRoutes[user.role]
            ? <Navigate to={roleRoutes[user.role]} replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Role-specific dashboards */}
      {Object.entries(roleComponents).map(([role, component]) => (
        <Route
          key={role}
          path={roleRoutes[role]}
          element={user?.role === role ? component : <Navigate to="/" replace />}
        />
      ))}

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-blue-500">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
