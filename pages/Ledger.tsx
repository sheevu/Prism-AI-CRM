import React, { useMemo } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { mockTransactions } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIPanel: React.FC = () => {
    const { t } = useLocalization();
    return (
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="text-transparent bg-clip-text bg-header-gradient">SUDARSHAN</span> AI
            </h3>
            <h4 className="font-semibold text-sm mb-2">{t('aiFinancialSummary')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                "This week your sales are strong, but expenses on raw materials are high. Consider negotiating with suppliers or finding alternatives to improve profitability."
            </p>
             <h4 className="font-semibold text-sm mb-2">Spending/Saving Tips:</h4>
             <ul className="text-sm space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
                <li>Review utility bills for savings.</li>
                <li>Buy raw materials in bulk for discounts.</li>
                <li>Explore digital marketing over print ads.</li>
             </ul>
        </div>
    );
}

const Ledger: React.FC = () => {
  const { t } = useLocalization();
  
  const { profitOrLoss } = useMemo(() => {
    const totalSales = mockTransactions.reduce((acc, tx) => acc + tx.sale, 0);
    const totalCosts = mockTransactions.reduce((acc, tx) => acc + tx.purchase + tx.expense, 0);
    return { profitOrLoss: totalSales - totalCosts };
  }, []);

  const chartData = [ /* ... (unchanged) ... */ ];

  const handleExportCSV = () => {
    const headers = "Date,Party Name,Items,Sale,Purchase,Expense,Dues\n";
    const csvContent = mockTransactions.map(tx => 
        [tx.date, tx.partyName, `"${tx.items}"`, tx.sale, tx.purchase, tx.expense, tx.dues].join(',')
    ).join('\n');
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "ledger_export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-grow space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t('ledger')}</h2>
          <button onClick={handleExportCSV} className="px-4 py-2 rounded-lg bg-kpi-green text-white font-semibold hover:opacity-90 transition-opacity">
            {t('exportCSV')}
          </button>
        </div>

        <div className={`p-6 rounded-lg shadow-lg text-white ${profitOrLoss >= 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
          <h3 className="text-lg font-semibold">{t('profitAndLoss')}</h3>
          <p className="text-4xl font-extrabold mt-2">
              {profitOrLoss >= 0 ? `+ ₹${profitOrLoss.toLocaleString('en-IN')}` : `- ₹${Math.abs(profitOrLoss).toLocaleString('en-IN')}`}
          </p>
           <p className="text-sm opacity-90 mt-1">{profitOrLoss >= 0 ? 'Total Profit' : 'Total Loss'}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Daily/Weekly/Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4b5563', borderRadius: '0.5rem', color: '#ffffff' }} />
              <Legend />
              <Line type="monotone" dataKey="Sale" stroke="#4BC0C0" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Purchase" stroke="#FF6384" />
              <Line type="monotone" dataKey="Expense" stroke="#FFCE56" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {/* ... (table unchanged) ... */}
            </table>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
          <AIPanel />
      </div>
    </div>
  );
};

export default Ledger;
