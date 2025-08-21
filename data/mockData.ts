import { Contact, Lead, LeadStatus, Task, TaskStatus, Transaction, Activity } from '../types';

// Utility to get date strings
const getToday = () => new Date().toISOString().split('T')[0];
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};
const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
}

export const mockContacts: Contact[] = [
  { id: 1, name: 'Ramesh Gupta', phone: '9876543210', businessType: 'Kirana Store', area: 'Mumbai', gstUdyam: '27ABCDE1234F1Z5', topProducts: ['Rice', 'Sugar'], purchaseHistory: 15000, rating: 5 },
  { id: 2, name: 'Sita Sharma', phone: '9876543211', businessType: 'Boutique', area: 'Delhi', gstUdyam: '07HIJKL5678M1Z9', topProducts: ['Kurtis', 'Sarees'], purchaseHistory: 25000, rating: 4 },
  { id: 3, name: 'Amit Patel', phone: '9876543212', businessType: 'Hardware', area: 'Ahmedabad', gstUdyam: '24PQRST9012N1Z3', topProducts: ['Pipes', 'Paint'], purchaseHistory: 8000, rating: 3 },
  { id: 4, name: 'Priya Singh', phone: '9876543213', businessType: 'Electronics', area: 'Bangalore', gstUdyam: '29UVWXYZ3456P1Z7', topProducts: ['Mobiles', 'Headphones'], purchaseHistory: 50000, rating: 5 },
];

export const mockLeads: Lead[] = [
  { id: 1, name: 'Anjali Verma', phone: '9123456780', source: 'Facebook', value: 10000, followUpDate: getToday(), status: LeadStatus.New },
  { id: 7, name: 'Sunita Devi', phone: '9123456786', source: 'JustDial', value: 12000, followUpDate: getToday(), status: LeadStatus.New },
  { id: 8, name: 'Mohan Kumar', phone: '9123456787', source: 'Walk-in', value: 7500, followUpDate: getYesterday(), status: LeadStatus.New },
  { id: 2, name: 'Vikram Rathore', phone: '9123456781', source: 'Referral', value: 25000, followUpDate: getTomorrow(), status: LeadStatus.Qualified },
  { id: 3, name: 'Meena Kumari', phone: '9123456782', source: 'JustDial', value: 15000, followUpDate: getTomorrow(), status: LeadStatus.Quotation },
  { id: 4, name: 'Sanjay Mishra', phone: '9123456783', source: 'Walk-in', value: 5000, followUpDate: '2024-08-02', status: LeadStatus.Negotiation },
  { id: 5, name: 'Kavita Reddy', phone: '9123456784', source: 'Referral', value: 30000, followUpDate: 'N/A', status: LeadStatus.Won },
  { id: 6, name: 'Rajesh Khanna', phone: '9123456785', source: 'Facebook', value: 8000, followUpDate: 'N/A', status: LeadStatus.Lost, lostReason: 'PriceTooHigh' },
];

export const mockTasks: Task[] = [
  { id: 1, title: 'Follow up with Anjali Verma', dueDate: getToday(), leadId: 1, completed: false, category: 'Follow-up', priority: 'High', status: 'To Do' },
  { id: 2, title: 'Send quotation to Meena Kumari', dueDate: getYesterday(), leadId: 3, completed: false, category: 'Meeting', priority: 'High', status: 'To Do' },
  { id: 3, title: 'Collect payment from Priya Singh', dueDate: getToday(), contactId: 4, completed: false, category: 'Payment', priority: 'Medium', status: 'In Progress' },
  { id: 4, title: 'Schedule catalog demo with Vikram', dueDate: getTomorrow(), leadId: 2, completed: false, category: 'Follow-up', priority: 'Low', status: 'To Do' },
  { id: 5, title: 'Finalize deal with Sanjay Mishra', dueDate: getYesterday(), leadId: 4, completed: true, category: 'Meeting', priority: 'Medium', status: 'Completed' },
];

export const mockTransactions: Transaction[] = [
    { id: 1, date: '2024-07-28', partyName: 'Sita Sharma', items: 'Kurtis Pack of 10', sale: 5000, purchase: 0, expense: 0, dues: 0 },
    { id: 2, date: '2024-07-28', partyName: 'Fabric Supplier', items: 'Raw materials', sale: 0, purchase: 2000, expense: 0, dues: 0 },
    { id: 3, date: '2024-07-28', partyName: 'Landlord', items: 'Shop Rent', sale: 0, purchase: 0, expense: 10000, dues: 0 },
    { id: 4, date: '2024-07-27', partyName: 'Priya Singh', items: 'Mobile Phone x5', sale: 50000, purchase: 0, expense: 0, dues: 10000 },
    { id: 5, date: '2024-07-27', partyName: 'Wholesaler', items: 'Mobile Phone Stock', sale: 0, purchase: 35000, expense: 0, dues: 0 },
    { id: 6, date: '2024-07-26', partyName: 'Ramesh Gupta', items: 'Grocery Items', sale: 2500, purchase: 0, expense: 0, dues: 500 },
    { id: 7, date: '2024-07-26', partyName: 'Electricity Bill', items: 'Utilities', sale: 0, purchase: 0, expense: 1500, dues: 0 },
];

export const mockSalesData = [
    { name: 'Mon', sales: 4000, target: 4500 },
    { name: 'Tue', sales: 3000, target: 3500 },
    { name: 'Wed', sales: 5000, target: 4800 },
    { name: 'Thu', sales: 4500, target: 5000 },
    { name: 'Fri', sales: 6000, target: 5500 },
    { name: 'Sat', sales: 8000, target: 7000 },
];

export const mockActivityFeed: Activity[] = [
    { id: 1, description: "New order received from Priya Singh for ₹50,000.", timestamp: "2 hours ago" },
    { id: 2, description: "Task 'Collect payment from Priya Singh' marked as due.", timestamp: "4 hours ago" },
    { id: 3, description: "New lead 'Sunita Devi' added from JustDial.", timestamp: "8 hours ago" },
    { id: 4, description: "Follow-up completed with Sanjay Mishra.", timestamp: "Yesterday" },
    { id: 5, description: "Sent quotation to Meena Kumari.", timestamp: "Yesterday" },
];