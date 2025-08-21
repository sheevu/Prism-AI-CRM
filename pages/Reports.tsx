import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { BarChart, Bar, FunnelChart, Funnel, LabelList, Tooltip, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const ReportSection: React.FC<{ title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white/80 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
    </div>
);

const AIPanel: React.FC = () => {
    const { t } = useLocalization();
    return (
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="text-transparent bg-clip-text bg-header-gradient">SUDARSHAN</span> AI
            </h3>
            <h4 className="font-semibold text-sm mb-2">{t('aiGrowthActions')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                "Your lead conversion rate is 30%. Focus on the 'Quotation' stage, where most drop-offs occur. Referrals are your highest ROI source—ask top customers for more."
            </p>
             <ul className="text-sm space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Follow up with all leads in 'Quotation' stage.</li>
                <li>Launch a referral campaign for existing customers.</li>
                <li>Analyze lost deals from 'Negotiation'.</li>
             </ul>
        </div>
    );
}

const Reports: React.FC = () => {
    const { t } = useLocalization();

    const funnelData = [ /* ... (unchanged) ... */ ];
    const VIBRANT_COLORS = ['#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];
    const roiData = [ /* ... (unchanged) ... */ ];
    const segmentationData = [ { name: 'High-Value', value: 50 }, { name: 'Repeat', value: 120 }, { name: 'Inactive', value: 30 } ];

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow space-y-6">
                <h2 className="text-2xl font-bold">{t('reports')}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <ReportSection title={t('funnelAnalysis')}>
                        <ResponsiveContainer width="100%" height={300}>
                            <FunnelChart>
                                <Tooltip />
                                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                                    <LabelList position="right" fill="#000" stroke="none" dataKey="name" className="dark:fill-white"/>
                                </Funnel>
                            </FunnelChart>
                        </ResponsiveContainer>
                    </ReportSection>
                    
                    <ReportSection title={t('sourceROI')}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={roiData} layout="vertical" margin={{ left: 10, right: 30 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="source" width={80} stroke="#6b7280" className="dark:stroke-gray-400" />
                                <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4b5563', borderRadius: '0.5rem', color: '#ffffff' }} />
                                <Bar dataKey="roi" barSize={30}>
                                    {roiData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                                    ))}
                                    <LabelList dataKey="roi" position="right" formatter={(value: number) => `${value}%`} className="fill-gray-800 dark:fill-white" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ReportSection>

                     <ReportSection title={t('customerSegmentation')}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={segmentationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {segmentationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </ReportSection>

                     <ReportSection title={t('areaHeatmap')}>
                        <div className="h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-gray-500">Map placeholder</p>
                        </div>
                    </ReportSection>

                     <ReportSection title={t('teamPerformance')}>
                         <div className="h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-gray-500">Team performance charts placeholder</p>
                        </div>
                    </ReportSection>
                </div>
            </div>
             <div className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
                <AIPanel />
            </div>
        </div>
    );
};

export default Reports;
