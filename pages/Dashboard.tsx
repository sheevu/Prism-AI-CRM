import React, { useState, useEffect, useMemo } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { getDailyGrowthPlan } from '../services/geminiService';
import { mockLeads, mockTasks, mockTransactions, mockSalesData, mockContacts } from '../data/mockData';
import { LeadStatus } from '../types';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { UserPlus, Briefcase, CheckCircle, TrendingUp, AlertCircle, Zap, Mic, Lightbulb, BadgePercent, CalendarDays, ChevronsRight, Crown, PackagePlus, Star } from 'lucide-react';

// --- Reusable Components ---
const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
  <div className={`p-4 rounded-xl shadow-lg flex items-center space-x-4 text-white hover:scale-105 transition-transform duration-300 ${color}`}>
    <div className="p-3 rounded-full bg-white/20">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const DashboardSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-white dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl shadow-md ${className}`}>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
        {children}
    </div>
);

// --- AI Components ---
const AIGrowthPlan: React.FC = () => {
    const { t } = useLocalization();
    const [plan, setPlan] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
        setLoading(true);
        const result = await getDailyGrowthPlan();
        setPlan(result);
        setLoading(false);
        };
        fetchPlan();
    }, []);

    if (loading) {
        return <div className="text-center p-4">{t('generatingPlan')}</div>;
    }

    return (
        <ul className="space-y-3 text-sm">
        {plan.map((step, index) => (
            <li key={index} className="flex items-start">
            <ChevronsRight className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{step}</span>
            </li>
        ))}
        </ul>
    );
};

const AIAgentPanel: React.FC = () => {
    const { t } = useLocalization();
    const [activeTab, setActiveTab] = useState('actionSteps');

    const tabs = [
        { id: 'insights', label: t('insights'), icon: <Lightbulb size={16}/> },
        { id: 'actionSteps', label: t('actionSteps'), icon: <ChevronsRight size={16}/> },
        { id: 'offerSuggestions', label: t('offerSuggestions'), icon: <BadgePercent size={16}/> },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg h-full flex flex-col">
            <div className="text-center mb-2">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-header-gradient tracking-wider">{t('aiAgentTitle')}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Personal Business Tutor</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-2 sm:space-x-4" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-kpi-blue text-kpi-blue'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                            } flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="py-4 flex-grow">
                {activeTab === 'actionSteps' && <AIGrowthPlan />}
                {activeTab === 'insights' && <p className="text-sm text-gray-500">{t('loading')} Placeholder for AI Insights...</p>}
                {activeTab === 'offerSuggestions' && <p className="text-sm text-gray-500">{t('loading')} Placeholder for Offer Suggestions...</p>}
            </div>
             <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 px-4 text-lg font-bold rounded-xl bg-header-gradient text-white hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg">
                <Mic size={24} />
                {t('askAi')}
            </button>
        </div>
    );
};

// --- Dashboard Chart and List Components ---
const SalesChart: React.FC = () => {
    const { t } = useLocalization();
    return (
        <DashboardSection title={t('salesTurnover')}>
            <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={mockSalesData}>
                    <XAxis dataKey="name" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(30, 41, 59, 0.9)',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#fff',
                        }}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Actual" fill="#4BC0C0" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="target" name="Target" stroke="#FF6384" />
                </ComposedChart>
            </ResponsiveContainer>
        </DashboardSection>
    );
};
const TodaysTasks: React.FC = () => {
    const { t } = useLocalization();
    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = mockTasks.filter(task => task.dueDate === today && !task.completed);

    return (
        <DashboardSection title={t('todaysFollowUpsAndTasks')}>
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {todaysTasks.length > 0 ? todaysTasks.map(task => (
                    <div key={task.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">{task.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{task.category}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${task.priority === 'High' ? 'text-red-500' : 'text-yellow-500'}`}>
                            {t((task.priority?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low')}
                        </span>
                    </div>
                )) : <p className="text-sm text-gray-500 dark:text-gray-400">No tasks due today. Great job!</p>}
            </div>
        </DashboardSection>
    );
};
const Alerts: React.FC = () => {
    const { t } = useLocalization();
    const alerts = [
        { id: 1, text: t('overdueLeadsAlert'), icon: <AlertCircle className="text-yellow-500" /> },
        { id: 2, text: t('pendingDuesAlert'), icon: <AlertCircle className="text-red-500" /> },
        { id: 3, text: t('festiveOfferReminder'), icon: <Zap className="text-blue-500" /> },
    ];
    return (
        <DashboardSection title={t('alertsAndNotifications')}>
            <div className="space-y-3">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        {alert.icon}
                        <p className="text-sm">{alert.text}</p>
                    </div>
                ))}
            </div>
        </DashboardSection>
    );
};

const TopCustomers: React.FC = () => {
    const { t } = useLocalization();
    const topCustomers = [...mockContacts].sort((a, b) => b.purchaseHistory - a.purchaseHistory).slice(0, 5);
    return (
        <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg h-full">
            <h4 className="font-bold mb-2 flex items-center gap-2"><Crown size={18} className="text-kpi-yellow"/> {t('top5Customers')}</h4>
            <ul className="text-sm space-y-2">
                {topCustomers.map((customer, index) => (
                    <li key={customer.id} className="flex justify-between items-center">
                        <span>{index + 1}. {customer.name}</span>
                        <span className="font-semibold text-kpi-green">₹{customer.purchaseHistory.toLocaleString('en-IN')}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TopProducts: React.FC = () => {
    const { t } = useLocalization();
    // This is hardcoded for demo, a real app would aggregate this data
    const topProducts = [
        { name: 'Mobile Phones', value: 50000 },
        { name: 'Kurtis & Sarees', value: 25000 },
        { name: 'Rice & Sugar', value: 15000 },
        { name: 'Pipes & Paint', value: 8000 },
    ];
    return (
         <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg h-full">
            <h4 className="font-bold mb-2 flex items-center gap-2"><Star size={18} className="text-kpi-purple"/>{t('top5ProductsSold')}</h4>
            <ul className="text-sm space-y-2">
                {topProducts.map((product, index) => (
                     <li key={product.name} className="flex justify-between items-center">
                        <span>{index + 1}. {product.name}</span>
                        <span className="font-semibold text-kpi-blue">₹{product.value.toLocaleString('en-IN')}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const BundleOpportunities: React.FC = () => {
    const { t } = useLocalization();
    const opportunities = [
        "Mobile + Headphones",
        "Kurtis + Leggings",
        "Paint + Brushes",
        "Rice + Lentils",
    ];
    return (
        <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg h-full">
            <h4 className="font-bold mb-2 flex items-center gap-2"><PackagePlus size={18} className="text-kpi-red"/>{t('top5BundleOpportunities')}</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
                {opportunities.map((item, index) => (
                     <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}


// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
  const { t } = useLocalization();
  
  const metrics = useMemo(() => {
    const newLeadsCount = mockLeads.filter(l => l.status === LeadStatus.New).length;
    const wonDeals = mockLeads.filter(l => l.status === LeadStatus.Won);
    const totalRevenue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
    const totalDues = mockTransactions.reduce((sum, tx) => sum + tx.dues, 0);
    const closedDealsCount = mockLeads.filter(l => l.status === LeadStatus.Won || l.status === LeadStatus.Lost).length;

    return [
        { title: t('newLeads'), value: newLeadsCount.toString(), icon: <UserPlus />, color: 'bg-kpi-blue' },
        { title: t('deals'), value: wonDeals.length.toString(), icon: <Briefcase />, color: 'bg-kpi-purple' },
        { title: t('revenue'), value: `₹${(totalRevenue / 1000).toFixed(1)}k`, icon: <TrendingUp />, color: 'bg-kpi-green' },
        { title: t('dues'), value: `₹${(totalDues / 1000).toFixed(1)}k`, icon: <AlertCircle />, color: 'bg-kpi-yellow' },
        { title: t('closedDeals'), value: closedDealsCount.toString(), icon: <CheckCircle />, color: 'bg-kpi-red' }
    ];
  }, [t]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map(metric => (
                    <MetricCard key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} color={metric.color} />
                ))}
            </div>
            
            <SalesChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TodaysTasks />
                <Alerts />
            </div>

            <DashboardSection title={t('reportsAndInsights')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TopCustomers />
                    <TopProducts />
                    <BundleOpportunities />
                </div>
            </DashboardSection>
        </div>

        {/* Sticky AI Panel */}
        <div className="lg:col-span-1 lg:sticky top-24 h-fit">
            <AIAgentPanel />
        </div>
    </div>
  );
};

export default Dashboard;
