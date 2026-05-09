/* ===== Management Committee Dashboard Component ===== */

function ManagementDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = React.useState('analytics');
  const [rules, setRules] = React.useState(HOSTEL_RULES);
  const [newRule, setNewRule] = React.useState('');
  const [editIdx, setEditIdx] = React.useState(-1);
  const [editText, setEditText] = React.useState('');

  const totalCapacity = HOSTEL_LIST.reduce((s, h) => s + h.capacity, 0);
  const totalOccupied = HOSTEL_LIST.reduce((s, h) => s + h.occupied, 0);
  const occupancyPct = Math.round((totalOccupied / totalCapacity) * 100);

  const addRule = () => {
    if (!newRule.trim()) return;
    setRules(prev => [...prev, newRule.trim()]);
    setNewRule('');
  };

  const saveEdit = (idx) => {
    if (!editText.trim()) return;
    setRules(prev => prev.map((r, i) => i === idx ? editText.trim() : r));
    setEditIdx(-1); setEditText('');
  };

  const deleteRule = (idx) => setRules(prev => prev.filter((_, i) => i !== idx));

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'rules', label: 'Rules & Regulations', icon: '📜' },
    { id: 'mess', label: 'Santrupti Mess', icon: '🍽️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">MC</div>
            <div><h1 className="text-lg font-bold text-gray-800 leading-tight">SDMCET Hostel</h1><p className="text-xs text-gray-500">Management Committee</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">🏛️ Committee</span>
            <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="fade-in space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
              {[
                { label: 'Total Capacity', value: totalCapacity, icon: '🏘️', color: 'blue' },
                { label: 'Occupied', value: totalOccupied, icon: '👥', color: 'green' },
                { label: 'Vacant', value: totalCapacity - totalOccupied, icon: '🔓', color: 'yellow' },
                { label: 'Occupancy Rate', value: `${occupancyPct}%`, icon: '📈', color: 'purple' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 card-hover fade-in">
                  <span className="text-2xl">{s.icon}</span>
                  <p className={`text-2xl font-bold text-${s.color}-600 mt-2`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Hostel-wise breakdown */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hostel-wise Occupancy</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Hostel</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Type</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Capacity</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Occupied</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Vacant</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Occupancy</th>
                  </tr></thead>
                  <tbody>
                    {HOSTEL_LIST.map(h => {
                      const pct = Math.round((h.occupied / h.capacity) * 100);
                      return (
                        <tr key={h.id} className="border-b border-gray-100 table-row-hover">
                          <td className="px-5 py-3 font-medium text-gray-800">{h.name}</td>
                          <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${h.type === "Women's" ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>{h.type}</span></td>
                          <td className="px-5 py-3 text-gray-600">{h.capacity}</td>
                          <td className="px-5 py-3 text-gray-600">{h.occupied}</td>
                          <td className="px-5 py-3 font-medium text-emerald-600">{h.capacity - h.occupied}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }}></div></div>
                              <span className="text-xs font-medium text-gray-600">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mess Status */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Santrupti Mess Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-xs text-gray-500">Mess Capacity</p>
                  <p className="text-xl font-bold text-orange-700">{SANTRUPTI_MESS.capacity}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-xs text-gray-500">Current Enrolled</p>
                  <p className="text-xl font-bold text-green-700">{SANTRUPTI_MESS.currentStrength}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-gray-500">Available Slots</p>
                  <p className="text-xl font-bold text-blue-700">{SANTRUPTI_MESS.capacity - SANTRUPTI_MESS.currentStrength}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="fade-in space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rules & Regulations Editor</h3>
              {/* Add new rule */}
              <div className="flex gap-2 mb-6">
                <input type="text" placeholder="Add a new rule..." value={newRule} onChange={e => setNewRule(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addRule()}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-emerald-500 transition-smooth" id="new-rule-input" />
                <button onClick={addRule}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-smooth btn-press">
                  + Add
                </button>
              </div>
              {/* Rules list */}
              <div className="space-y-2">
                {rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg group hover:bg-blue-50 transition-smooth">
                    <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200 flex-shrink-0 mt-0.5">{idx + 1}</span>
                    {editIdx === idx ? (
                      <div className="flex-1 flex gap-2">
                        <input type="text" value={editText} onChange={e => setEditText(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-blue-300 focus:border-blue-500 text-sm" autoFocus />
                        <button onClick={() => saveEdit(idx)} className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">Save</button>
                        <button onClick={() => setEditIdx(-1)} className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-300">Cancel</button>
                      </div>
                    ) : (
                      <>
                        <p className="flex-1 text-sm text-gray-700">{rule}</p>
                        <div className="hidden group-hover:flex gap-1">
                          <button onClick={() => { setEditIdx(idx); setEditText(rule); }} className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded">Edit</button>
                          <button onClick={() => deleteRule(idx)} className="px-2 py-1 text-xs text-red-600 hover:bg-red-100 rounded">Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
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
                <h4 className="font-semibold text-gray-800 mb-3">📜 Temple of Food — Guidelines</h4>
                <ul className="space-y-2">
                  {SANTRUPTI_MESS.guidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>{g}
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
