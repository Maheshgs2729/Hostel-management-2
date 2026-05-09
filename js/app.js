/* ===== Main App Component ===== */

function App() {
  const [currentRole, setCurrentRole] = React.useState(null);

  const handleLogin = (role) => setCurrentRole(role);
  const handleLogout = () => setCurrentRole(null);

  if (!currentRole) return <LoginPage onLogin={handleLogin} />;

  switch (currentRole) {
    case 'student':     return <StudentDashboard onLogout={handleLogout} />;
    case 'warden':      return <ChiefWardenDashboard onLogout={handleLogout} />;
    case 'management':  return <ManagementDashboard onLogout={handleLogout} />;
    case 'accountant':  return <AccountantDashboard onLogout={handleLogout} />;
    default:            return <LoginPage onLogin={handleLogin} />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
