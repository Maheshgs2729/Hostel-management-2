/* ===== Hostel Office / Accountant Dashboard Component ===== */

function AccountantDashboard({ onLogout }) {
  const [records, setRecords] = React.useState(PAYMENT_RECORDS);
  const [activeTab, setActiveTab] = React.useState('verify');
  const [newPayment, setNewPayment] = React.useState({
    studentName: '', usn: '', amountReceived: '', paymentMode: '', receiptNo: '', ddCashNo: '', date: '',
  });
  const [showAddSuccess, setShowAddSuccess] = React.useState(false);

  const updatePayment = (field, value) => setNewPayment(prev => ({ ...prev, [field]: value }));

  const handleVerify = (id) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, verified: true } : r));
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const record = { ...newPayment, id: Date.now(), amountReceived: parseFloat(newPayment.amountReceived), verified: false };
    setRecords(prev => [...prev, record]);
    setNewPayment({ studentName: '', usn: '', amountReceived: '', paymentMode: '', receiptNo: '', ddCashNo: '', date: '' });
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const verified = records.filter(r => r.verified);
  const unverified = records.filter(r => !r.verified);
  const totalCollected = records.reduce((s, r) => s + r.amountReceived, 0);
  const totalVerified = verified.reduce((s, r) => s + r.amountReceived, 0);

  const tabs = [
    { id: 'verify', label: 'Verify Payments', count: unverified.length, icon: '🔍' },
    { id: 'add', label: 'Add Payment', icon: '➕' },
    { id: 'records', label: 'All Records', icon: '📋' },
    { id: 'fees', label: 'Fee Structure', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold text-sm">₹</div>
            <div><h1 className="text-lg font-bold text-gray-800 leading-tight">SDMCET Hostel</h1><p className="text-xs text-gray-500">Hostel Office / Accountant</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">💼 Accountant</span>
            <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 stagger-children">
          {[
            { label: 'Total Collected', value: `₹${totalCollected.toLocaleString()}`, icon: '💰', color: 'blue' },
            { label: 'Verified Amount', value: `₹${totalVerified.toLocaleString()}`, icon: '✅', color: 'green' },
            { label: 'Pending Verification', value: unverified.length, icon: '⏳', color: 'yellow' },
            { label: 'Total Receipts', value: records.length, icon: '🧾', color: 'purple' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 card-hover fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
              </div>
              <p className={`text-xl font-bold text-${s.color}-600`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-amber-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
              <span>{tab.icon}</span>{tab.label}
              {tab.count !== undefined && <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Verify Tab */}
        {activeTab === 'verify' && (
          <div className="fade-in space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Fee Payment Verification</h3>
            {unverified.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400">
                <p className="text-4xl mb-3">🎉</p><p className="font-medium">All payments verified!</p>
              </div>
            ) : unverified.map(r => (
              <div key={r.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 card-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 font-bold text-lg">{r.studentName.charAt(0)}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{r.studentName}</h4>
                      <p className="text-sm text-gray-500">{r.usn}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">₹{r.amountReceived.toLocaleString()}</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{r.paymentMode}: {r.ddCashNo}</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">Receipt: {r.receiptNo}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Date: {r.date}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleVerify(r.id)}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-smooth btn-press shadow-md">
                    ✓ Verify Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Payment Tab */}
        {activeTab === 'add' && (
          <div className="fade-in">
            {showAddSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3 fade-in">
                <span className="text-lg">✅</span><span className="font-medium">Payment record added successfully!</span>
              </div>
            )}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Payment Record</h3>
              <form onSubmit={handleAddPayment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-name">Student Name</label>
                    <input id="pay-name" type="text" placeholder="Full Name" value={newPayment.studentName} onChange={e => updatePayment('studentName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-usn">USN</label>
                    <input id="pay-usn" type="text" placeholder="e.g., 2SD21CS001" value={newPayment.usn} onChange={e => updatePayment('usn', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-amount">Amount Received (₹)</label>
                    <input id="pay-amount" type="number" placeholder="e.g., 45000" value={newPayment.amountReceived} onChange={e => updatePayment('amountReceived', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-mode">Payment Mode</label>
                    <select id="pay-mode" value={newPayment.paymentMode} onChange={e => updatePayment('paymentMode', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required>
                      <option value="">Select Mode</option>
                      <option value="Cash">Cash</option>
                      <option value="DD">Demand Draft (DD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-ddcash">DD / Cash No</label>
                    <input id="pay-ddcash" type="text" placeholder="DD or Cash reference number" value={newPayment.ddCashNo} onChange={e => updatePayment('ddCashNo', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-receipt">Receipt No</label>
                    <input id="pay-receipt" type="text" placeholder="e.g., RCP-2026-006" value={newPayment.receiptNo} onChange={e => updatePayment('receiptNo', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pay-date">Date</label>
                    <input id="pay-date" type="date" value={newPayment.date} onChange={e => updatePayment('date', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 transition-smooth" required />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-smooth btn-press">
                    Add Payment Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* All Records Tab */}
        {activeTab === 'records' && (
          <div className="fade-in">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Student</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">USN</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Mode</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">DD/Cash No</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Receipt</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  </tr></thead>
                  <tbody>
                    {records.map(r => (
                      <tr key={r.id} className="border-b border-gray-100 table-row-hover">
                        <td className="px-4 py-3 font-medium text-gray-800">{r.studentName}</td>
                        <td className="px-4 py-3 text-gray-600">{r.usn}</td>
                        <td className="px-4 py-3 font-medium text-green-600">₹{r.amountReceived.toLocaleString()}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.paymentMode === 'DD' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{r.paymentMode}</span></td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{r.ddCashNo}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{r.receiptNo}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{r.date}</td>
                        <td className="px-4 py-3">{r.verified
                          ? <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">✓ Verified</span>
                          : <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">Pending</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Fee Structure Tab */}
        {activeTab === 'fees' && (
          <div className="fade-in">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Structure by Room Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {ROOM_CODES.map(r => (
                  <div key={r.value} className="p-4 bg-gray-50 rounded-xl border border-gray-200 card-hover text-center">
                    <p className="text-lg font-bold text-blue-600">{r.value}</p>
                    <p className="text-xs text-gray-500 mb-2">{r.label.split(' - ')[1]}</p>
                    <p className="text-xl font-bold text-gray-800">₹{FEE_STRUCTURE[r.value].toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">per year</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
