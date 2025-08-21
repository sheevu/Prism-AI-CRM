import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { QrCode, X } from 'lucide-react';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-slate-700 pb-3 mb-4">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const WhatsAppConnectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useLocalization();
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fadeInUp">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <X size={24} />
                </button>
                <h3 className="text-xl font-bold text-center mb-4">{t('scanQRCode')}</h3>
                <div className="flex justify-center my-6">
                    <div className="p-4 bg-white rounded-lg border">
                        {/* QR Code Placeholder */}
                        <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                           <QrCode size={64} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">{t('scanInstruction')}</p>
                <div className="text-center mt-6">
                    <a href="#" className="text-sm text-kpi-blue hover:underline">{t('linkWithPhone')}</a>
                </div>
            </div>
        </div>
    );
};


const Settings: React.FC = () => {
  const { t } = useLocalization();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <WhatsAppConnectModal onClose={() => setIsModalOpen(false)} />}
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold">{t('settings')}</h2>
        
        <SettingsSection title={t('sendTemplates')}>
          <p className="text-gray-500 dark:text-gray-400">Manage your WhatsApp and email templates here.</p>
          <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-md">
            <p>Placeholder for template management UI.</p>
          </div>
        </SettingsSection>
        
        <SettingsSection title={t('topTrendingItems')}>
          <p className="text-gray-500 dark:text-gray-400">View your top selling products and services.</p>
           <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-md">
            <p>Placeholder for a list or chart of top items.</p>
          </div>
        </SettingsSection>

        <SettingsSection title={t('pipelineStages')}>
          <p className="text-gray-500 dark:text-gray-400">Customize the stages in your sales pipeline.</p>
          {/* Placeholder for editable list */}
          <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-md">
            <p>Leads → Prospect Customer → Sales pitch → Sales/Close → Review/Refer → Repeat</p>
          </div>
        </SettingsSection>

        <SettingsSection title={t('whatsappIntegration')}>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
              Connect your WhatsApp account to send automated messages, reminders, and offers directly from PRISM AI.
          </p>
          {/* This is a UI placeholder. Real implementation requires a backend service like whatsapp-web.js */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-kpi-green text-white font-semibold hover:opacity-90 transition-opacity"
          >
              {t('connectWhatsApp')}
          </button>
        </SettingsSection>
      </div>
    </>
  );
};

export default Settings;