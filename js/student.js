/* ===== Student Dashboard Component ===== */

function StudentDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = React.useState('application');
  const [formData, setFormData] = React.useState({
    name: '', usn: '', branch: '', semester: '',
    SGPA_1: '', SGPA_2: '', SGPA_3: '', SGPA_4: '',
    SGPA_5: '', SGPA_6: '', SGPA_7: '', SGPA_8: '',
    roomPreference: '', antiRagging: false,
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.antiRagging) { alert('Please accept the Anti-Ragging Undertaking.'); return; }
    setShowSuccess(true);
    setSubmitted(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const avgSGPA = () => {
    const vals = SEMESTERS.map(s => parseFloat(formData[`SGPA_${s}`]) || 0).filter(v => v > 0);
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : '—';
  };

  const tabs = [
    { id: 'application', label: 'Application Form', icon: '📝' },
    { id: 'status', label: 'My Status', icon: '📊' },
    { id: 'mess', label: 'Santrupti Mess', icon: '🍽️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm">S</div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-tight">SDMCET Hostel</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">🎓 Student</span>
            <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
              <span className="mr-1.5">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Success banner */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3 fade-in">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-lg">✅</div>
            <div><p className="font-semibold">Application Submitted!</p><p className="text-sm text-green-600">Your hostel application has been received and is under review.</p></div>
          </div>
        )}

        {/* Application Form Tab */}
        {activeTab === 'application' && (
          <div className="fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">1</span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="student-name">Full Name</label>
                    <input id="student-name" type="text" placeholder="Enter your full name" value={formData.name} onChange={e => updateField('name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="student-usn">USN</label>
                    <input id="student-usn" type="text" placeholder="e.g., 2SD21CS001" value={formData.usn} onChange={e => updateField('usn', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="student-branch">Branch</label>
                    <select id="student-branch" value={formData.branch} onChange={e => updateField('branch', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" required>
                      <option value="">Select Branch</option>
                      {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="student-semester">Current Semester</label>
                    <select id="student-semester" value={formData.semester} onChange={e => updateField('semester', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" required>
                      <option value="">Select Semester</option>
                      {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* SGPA Section */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">2</span>
                  Academic Record (SGPA)
                </h3>
                <p className="text-sm text-gray-500 mb-4 ml-10">Enter SGPA for completed semesters only</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {SEMESTERS.map(s => (
                    <div key={s}>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor={`sgpa-${s}`}>Sem {s}</label>
                      <input id={`sgpa-${s}`} type="number" step="0.01" min="0" max="10" placeholder="0.00"
                        value={formData[`SGPA_${s}`]} onChange={e => updateField(`SGPA_${s}`, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth text-center" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                  <span className="text-blue-600 font-medium text-sm">Average SGPA:</span>
                  <span className="text-blue-800 font-bold">{avgSGPA()}</span>
                </div>
              </div>

              {/* Room Preference & Anti-Ragging */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">3</span>
                  Room Preference & Compliance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="room-pref">Room Preference</label>
                    <select id="room-pref" value={formData.roomPreference} onChange={e => updateField('roomPreference', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth" required>
                      <option value="">Select Room Type</option>
                      {ROOM_CODES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    {formData.roomPreference && (
                      <p className="mt-2 text-sm text-gray-500">
                        Estimated Fee: <span className="font-semibold text-blue-600">₹{(FEE_STRUCTURE[formData.roomPreference] || 0).toLocaleString()}</span>/year
                      </p>
                    )}
                  </div>
                  <div className="flex items-start pt-6">
                    <label className="flex items-start gap-3 cursor-pointer group" htmlFor="anti-ragging-cb">
                      <input id="anti-ragging-cb" type="checkbox" checked={formData.antiRagging} onChange={e => updateField('antiRagging', e.target.checked)}
                        className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-smooth">Anti-Ragging Undertaking</p>
                        <p className="text-xs text-gray-500 mt-0.5">I hereby declare that I shall not indulge in any form of ragging as per UGC regulations and AICTE norms.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button type="submit" disabled={submitted}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-smooth btn-press disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitted ? '✓ Application Submitted' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="fade-in space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
              {submitted ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl badge-pulse">⏳</div>
                    <div><p className="font-medium text-yellow-800">Application Under Review</p><p className="text-sm text-yellow-600">Submitted on {new Date().toLocaleDateString()}</p></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500">Room Preference</p><p className="font-semibold text-gray-800">{formData.roomPreference || '—'}</p></div>
                    <div className="p-4 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500">Branch</p><p className="font-semibold text-gray-800">{formData.branch || '—'}</p></div>
                    <div className="p-4 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500">Anti-Ragging</p><p className="font-semibold text-green-600">✓ Accepted</p></div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-3">📋</p>
                  <p className="font-medium">No application submitted yet.</p>
                  <p className="text-sm">Go to the Application Form tab to apply.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mess Tab */}
        {activeTab === 'mess' && (
          <div className="fade-in space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl shadow-md border border-orange-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">🍛</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{SANTRUPTI_MESS.name}</h3>
                  <p className="text-orange-600 font-medium text-sm italic">"{SANTRUPTI_MESS.tagline}"</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-800 mb-3">🕐 Meal Timings</h4>
                <div className="space-y-3">
                  {Object.entries(SANTRUPTI_MESS.timings).map(([meal, time]) => (
                    <div key={meal} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="capitalize font-medium text-gray-700">{meal}</span>
                      <span className="text-sm text-blue-600 font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-800 mb-3">📜 Guidelines — Temple of Food</h4>
                <ul className="space-y-2">
                  {SANTRUPTI_MESS.guidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>{g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
