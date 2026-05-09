/* ===== Chief Warden Dashboard Component ===== */

function ChiefWardenDashboard({ onLogout }) {
  const [applications, setApplications] = React.useState(PENDING_APPLICATIONS);
  const [selectedApp, setSelectedApp] = React.useState(null);
  const [allotHostel, setAllotHostel] = React.useState('');
  const [allotRoom, setAllotRoom] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('pending');
  const [successMsg, setSuccessMsg] = React.useState('');

  const pending = applications.filter(a => a.status === 'pending');
  const approved = applications.filter(a => a.status === 'approved');

  const handleApprove = () => {
    if (!allotHostel || !allotRoom) { alert('Select hostel and room type.'); return; }
    setApplications(prev => prev.map(a => a.id === selectedApp.id ? { ...a, status: 'approved', hostel: allotHostel, roomAllotted: allotRoom } : a));
    setSuccessMsg(`${selectedApp.name} allotted to ${allotHostel} (${allotRoom})`);
    setSelectedApp(null); setAllotHostel(''); setAllotRoom('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleReject = (id) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
  };

  const tabs = [
    { id: 'pending', label: 'Pending', count: pending.length, icon: '⏳' },
    { id: 'approved', label: 'Approved', count: approved.length, icon: '✅' },
    { id: 'allotment', label: 'Room Allotment', icon: '🏠' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">CW</div>
            <div><h1 className="text-lg font-bold text-gray-800 leading-tight">SDMCET Hostel</h1><p className="text-xs text-gray-500">Chief Warden Dashboard</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">👨‍💼 Chief Warden</span>
            <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 stagger-children">
          {[
            { label: 'Total Applications', value: applications.length, color: 'blue', icon: '📋' },
            { label: 'Pending Review', value: pending.length, color: 'yellow', icon: '⏳' },
            { label: 'Approved', value: approved.length, color: 'green', icon: '✅' },
            { label: 'Total Hostels', value: HOSTEL_LIST.length, color: 'purple', icon: '🏛️' },
          ].map((s, i) => (
            <div key={i} className={`bg-white rounded-xl shadow-md border border-gray-100 p-4 card-hover fade-in`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-2xl font-bold text-${s.color}-600`}>{s.value}</span>
              </div>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3 fade-in">
            <span className="text-lg">✅</span><span className="font-medium">{successMsg}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
              <span>{tab.icon}</span>{tab.label}
              {tab.count !== undefined && <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Pending Tab */}
        {activeTab === 'pending' && (
          <div className="fade-in space-y-4">
            {pending.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400">
                <p className="text-4xl mb-3">🎉</p><p className="font-medium">All applications have been reviewed!</p>
              </div>
            ) : pending.map(app => (
              <div key={app.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 card-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">{app.name.charAt(0)}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{app.name}</h4>
                      <p className="text-sm text-gray-500">{app.usn} • {app.branch}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Sem {app.semester}</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">Pref: {app.roomPref}</span>
                        <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">Applied: {app.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedApp(app); setActiveTab('allotment'); }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-smooth btn-press">
                      Allot Room
                    </button>
                    <button onClick={() => handleReject(app.id)}
                      className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-smooth btn-press">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approved Tab */}
        {activeTab === 'approved' && (
          <div className="fade-in">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Student</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">USN</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Hostel</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Room Type</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                  </tr></thead>
                  <tbody>
                    {approved.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-12 text-gray-400">No approved applications yet.</td></tr>
                    ) : approved.map(a => (
                      <tr key={a.id} className="border-b border-gray-100 table-row-hover">
                        <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
                        <td className="px-5 py-3 text-gray-600">{a.usn}</td>
                        <td className="px-5 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{a.hostel}</span></td>
                        <td className="px-5 py-3 text-gray-600">{a.roomAllotted}</td>
                        <td className="px-5 py-3"><span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">✓ Approved</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Allotment Tab */}
        {activeTab === 'allotment' && (
          <div className="fade-in grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Allotment Tool</h3>
              {selectedApp ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="font-semibold text-blue-800">{selectedApp.name}</p>
                    <p className="text-sm text-blue-600">{selectedApp.usn} • {selectedApp.branch}</p>
                    <p className="text-sm text-blue-600 mt-1">Preferred: {selectedApp.roomPref}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="allot-hostel">Assign Hostel</label>
                    <select id="allot-hostel" value={allotHostel} onChange={e => setAllotHostel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth">
                      <option value="">Select Hostel</option>
                      {HOSTEL_LIST.map(h => <option key={h.id} value={h.name}>{h.name} ({h.type} — {h.capacity - h.occupied} vacant)</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="allot-room">Room Type</label>
                    <select id="allot-room" value={allotRoom} onChange={e => setAllotRoom(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 transition-smooth">
                      <option value="">Select Room Type</option>
                      {ROOM_CODES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                  <button onClick={handleApprove}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-smooth btn-press">
                    ✓ Confirm Allotment
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-3">🏠</p><p className="font-medium">Select an application from Pending tab to allot a room.</p>
                </div>
              )}
            </div>
            {/* Hostel Vacancy Overview */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hostel Vacancy Overview</h3>
              <div className="space-y-4">
                {HOSTEL_LIST.map(h => {
                  const pct = Math.round((h.occupied / h.capacity) * 100);
                  return (
                    <div key={h.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <div><span className="font-medium text-gray-800">{h.name}</span><span className="ml-2 text-xs text-gray-500">{h.type}</span></div>
                        <span className="text-sm font-medium text-gray-600">{h.occupied}/{h.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full transition-all duration-500 ${pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{h.capacity - h.occupied} beds vacant • {pct}% occupied</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
