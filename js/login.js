/* ===== Login Component ===== */

const LoginIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const ROLES = [
  { value: 'student', label: 'Student', icon: '🎓' },
  { value: 'warden', label: 'Chief Warden', icon: '👨‍💼' },
  { value: 'management', label: 'Hostel Management Committee', icon: '🏛️' },
  { value: 'accountant', label: 'Hostel Office / Accountant', icon: '💼' },
];

function LoginPage({ onLogin }) {
  const [role, setRole] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) { setError('Please select a role'); return; }
    if (!username.trim()) { setError('Please enter your username'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    setIsLoading(true);
    setError('');
    setTimeout(() => { setIsLoading(false); onLogin(role); }, 800);
  };

  return (
    <div className="min-h-screen login-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-white/5"></div>
      <div className="absolute bottom-[-120px] left-[-60px] w-96 h-96 rounded-full bg-white/5"></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 rounded-full bg-white/5"></div>

      <div className="w-full max-w-md fade-in">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-4 border border-white/20">
            <LoginIcon />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">SDMCET</h1>
          <p className="text-blue-100 text-sm font-medium tracking-wide">Hostel Management System</p>
          <p className="text-blue-200/70 text-xs mt-1">SDM College of Engineering & Technology, Dharwad</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to access your dashboard</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2 fade-in">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="role-select">Login As</label>
              <select
                id="role-select"
                value={role}
                onChange={e => { setRole(e.target.value); setError(''); }}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:border-blue-500 transition-smooth appearance-none cursor-pointer"
              >
                <option value="">— Select your role —</option>
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{r.icon} {r.label}</option>
                ))}
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="username-input">Username / USN</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2"><UserIcon /></div>
                <input id="username-input" type="text" placeholder="e.g., 2SD21CS001" value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password-input">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2"><LockIcon /></div>
                <input id="password-input" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" />
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-button"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-smooth btn-press disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner"></div> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">© 2026 SDMCET Dharwad. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
