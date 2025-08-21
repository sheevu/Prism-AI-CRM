import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { mockLeads } from '../data/mockData';
import { LeadStatus, Lead } from '../types';
import { X } from 'lucide-react';

const LeadCard: React.FC<{ lead: Lead; onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: number) => void }> = ({ lead, onDragStart }) => {
  const { t } = useLocalization();
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = lead.followUpDate !== 'N/A' && lead.followUpDate < today && lead.status !== LeadStatus.Won && lead.status !== LeadStatus.Lost;
  
  return (
    <div 
      draggable 
      onDragStart={(e) => onDragStart(e, lead.id)}
      className={`p-3 mb-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border-l-4 cursor-grab active:cursor-grabbing ${isOverdue ? 'border-red-500' : 'border-blue-500'}`}
    >
      <h4 className="font-bold text-gray-800 dark:text-white text-sm">{lead.name}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">{lead.phone}</p>
      <div className="text-xs mt-2 space-y-1">
        <p><span className="font-semibold">{t('leadSource')}:</span> {lead.source}</p>
        <p><span className="font-semibold">{t('leadValue')}:</span> ₹{lead.value.toLocaleString('en-IN')}</p>
        <p className={isOverdue ? 'text-red-500 font-semibold' : ''}><span className="font-semibold">{t('followUp')}:</span> {lead.followUpDate}</p>
      </div>
    </div>
  );
};

const LostReasonModal: React.FC<{ onSave: (reason: string) => void, onClose: () => void }> = ({ onSave, onClose }) => {
    const { t } = useLocalization();
    const [reason, setReason] = useState('PriceTooHigh');
    const reasons = ['PriceTooHigh', 'BadTiming', 'WentWithCompetitor'];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{t('lostReason')}</h3>
                    <button onClick={onClose}><X size={24}/></button>
                </div>
                <div className="space-y-2">
                    {reasons.map(r => (
                        <label key={r} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                            <input type="radio" name="lostReason" value={r} checked={reason === r} onChange={() => setReason(r)} />
                            {t(r as any)}
                        </label>
                    ))}
                </div>
                <button onClick={() => onSave(reason)} className="w-full mt-6 py-2 rounded-lg bg-kpi-blue text-white">{t('submit')}</button>
            </div>
        </div>
    );
};

const AIPanel: React.FC = () => {
    const { t } = useLocalization();
    return (
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="text-transparent bg-clip-text bg-header-gradient">SUDARSHAN</span> AI
            </h3>
            <h4 className="font-semibold text-sm mb-2">{t('aiNextActions')}</h4>
            <ul className="text-sm space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Send a follow-up WhatsApp with a discount.</li>
                <li>Schedule a call for tomorrow morning.</li>
                <li>Share a positive customer testimonial.</li>
                <li>Create a sense of urgency about the offer.</li>
                <li>Ask about their primary decision factor.</li>
            </ul>
        </div>
    );
}

const Leads: React.FC = () => {
  const { t } = useLocalization();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [showLostModal, setShowLostModal] = useState<Lead | null>(null);

  const pipelineStages: { status: LeadStatus, titleKey: 'newLead' | 'qualified' | 'quotation' | 'negotiation' | 'won' | 'lost' }[] = [
    { status: LeadStatus.New, titleKey: 'newLead' },
    { status: LeadStatus.Qualified, titleKey: 'qualified' },
    { status: LeadStatus.Quotation, titleKey: 'quotation' },
    { status: LeadStatus.Negotiation, titleKey: 'negotiation' },
    { status: LeadStatus.Won, titleKey: 'won' },
    { status: LeadStatus.Lost, titleKey: 'lost' },
  ];
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: number) => {
    e.dataTransfer.setData("leadId", leadId.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData("leadId"));
    const leadToMove = leads.find(lead => lead.id === leadId);

    if (leadToMove) {
        if (newStatus === LeadStatus.Lost) {
            setShowLostModal(leadToMove);
        } else {
            setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus, lostReason: undefined } : lead));
        }
    }
    e.currentTarget.classList.remove('border-kpi-blue');
  };
  
  const handleSaveLostReason = (reason: string) => {
      if(showLostModal) {
          setLeads(leads.map(lead => lead.id === showLostModal.id ? { ...lead, status: LeadStatus.Lost, lostReason: reason } : lead));
      }
      setShowLostModal(null);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.classList.add('border-kpi-blue');
  }
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.classList.remove('border-kpi-blue');
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
        {showLostModal && <LostReasonModal onClose={() => setShowLostModal(null)} onSave={handleSaveLostReason} />}
        
        <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-4">{t('leads')}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 -m-4 p-4">
            {pipelineStages.map(stage => (
                <div 
                    key={stage.status}
                    onDrop={(e) => handleDrop(e, stage.status)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="flex-shrink-0 w-72 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl p-3 border-2 border-transparent transition-colors"
                >
                    <h3 className="font-semibold mb-4 px-1 text-gray-700 dark:text-gray-200">{t(stage.titleKey)} ({leads.filter(lead => lead.status === stage.status).length})</h3>
                    <div className="h-[60vh] overflow-y-auto pr-1">
                        {leads
                            .filter(lead => lead.status === stage.status)
                            .map(lead => <LeadCard key={lead.id} lead={lead} onDragStart={handleDragStart} />)}
                    </div>
                </div>
            ))}
            </div>
        </div>

        <div className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <AIPanel />
        </div>
    </div>
  );
};

export default Leads;
