import React, { useState, useMemo } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { mockContacts } from '../data/mockData';
import type { Contact } from '../types';
import { Search, Star, Edit, Trash2, MessageSquare, X, PlusCircle, Filter } from 'lucide-react';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
    ))}
  </div>
);

const ContactModal: React.FC<{ contact: Partial<Contact> | null, onClose: () => void, onSave: (contact: Partial<Contact>) => void }> = ({ contact, onClose, onSave }) => {
    const { t } = useLocalization();
    const [formData, setFormData] = useState(contact || {});

    if (!contact) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{contact.id ? t('edit') : t('addNewContact')}</h3>
                    <button onClick={onClose}><X size={24}/></button>
                </div>
                <div className="space-y-4">
                    <input type="text" name="name" placeholder={t('contactName')} value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    <input type="text" name="phone" placeholder={t('phone')} value={formData.phone || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    {/* Add other form fields here */}
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700">Cancel</button>
                    <button onClick={() => onSave(formData)} className="px-4 py-2 rounded-lg bg-kpi-blue text-white">Save</button>
                </div>
            </div>
        </div>
    );
};

const AIPanel: React.FC<{ selectedContact: Contact | null }> = ({ selectedContact }) => {
    const { t } = useLocalization();
    return (
        <div className="w-full lg:w-1/4 xl:w-1/5 space-y-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                   <span className="text-transparent bg-clip-text bg-header-gradient">SUDARSHAN</span> AI
                </h3>
                {selectedContact ? (
                    <div>
                        <h4 className="font-semibold">{selectedContact.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Based on purchase history, suggest:</p>
                        <ul className="text-sm space-y-2 list-disc list-inside">
                           <li>Bundle offer on {selectedContact.topProducts[0]}</li>
                           <li>Upsell new 'Premium {selectedContact.topProducts[0]}'</li>
                           <li>Cross-sell related accessories</li>
                        </ul>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select a contact to see AI-powered insights and offer suggestions.</p>
                )}
            </div>
        </div>
    );
}

const Contacts: React.FC = () => {
  const { t } = useLocalization();
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalContact, setModalContact] = useState<Partial<Contact> | null>(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, contacts]);

  const handleSaveContact = (contactData: Partial<Contact>) => {
      if(contactData.id) {
          setContacts(contacts.map(c => c.id === contactData.id ? {...c, ...contactData} as Contact : c));
      } else {
          const newContact: Contact = { id: Date.now(), rating: 1, ...contactData } as Contact;
          setContacts([newContact, ...contacts]);
      }
      setModalContact(null);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {modalContact && <ContactModal contact={modalContact} onClose={() => setModalContact(null)} onSave={handleSaveContact} />}
      
      {/* Main Content */}
      <div className="flex-grow bg-white dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-bold">{t('contacts')}</h2>
          <div className="w-full sm:w-auto flex gap-2">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder={t('searchContacts')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-kpi-purple"
                />
            </div>
            <button onClick={() => setModalContact({})} className="flex-shrink-0 px-4 py-2 bg-kpi-blue text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                <PlusCircle size={18} /> {t('addNewContact')}
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
             <Filter size={16} /> <span className="font-semibold">{t('filterBy')}:</span>
             <select className="px-3 py-1 border rounded-lg text-sm dark:bg-slate-700 dark:border-slate-600"><option>{t('customerRating')}</option></select>
             <select className="px-3 py-1 border rounded-lg text-sm dark:bg-slate-700 dark:border-slate-600"><option>{t('purchaseFrequency')}</option></select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-gray-300">
              <tr>
                {['contactName', 'phone', 'businessType', 'area', 'purchaseHistory', 'rating', 'actions'].map(key => (
                  <th key={key} scope="col" className="px-6 py-3">{t(key as any)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact: Contact) => (
                <tr key={contact.id} onClick={() => setSelectedContact(contact)} className={`border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{contact.name}</td>
                  <td className="px-6 py-4">{contact.phone}</td>
                  <td className="px-6 py-4">{contact.businessType}</td>
                  <td className="px-6 py-4">{contact.area}</td>
                  <td className="px-6 py-4">₹{contact.purchaseHistory.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4"><StarRating rating={contact.rating} /></td>
                  <td className="px-6 py-4">
                      <div className="flex gap-2">
                          <button onClick={(e) => { e.stopPropagation(); setModalContact(contact); }} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded"><Edit size={16}/></button>
                          <a href={`https://wa.me/91${contact.phone}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1.5 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 rounded"><MessageSquare size={16}/></a>
                          <button onClick={(e) => { e.stopPropagation(); if(confirm('Are you sure?')) { setContacts(contacts.filter(c => c.id !== contact.id)) } }} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded"><Trash2 size={16}/></button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* AI Panel */}
      <AIPanel selectedContact={selectedContact} />
    </div>
  );
};

export default Contacts;
