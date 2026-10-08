export type Role = 'owner' | 'worker' | 'client';
export type Worker = { id: string; name: string; email: string; phone: string; title: string; salary: number; commission: number; start: string };
export type Product = { id: string; name: string; size: string; price: number; stock: number; threshold: number; capacity: number };
export type Task = { id: string; title: string; workerId: string; due: string; status: 'Pending' | 'In Progress' | 'Completed'; priority: string };
export type Transaction = { id: string; workerId: string; productId: string; quantity: number; amount: number; method: string; created: string; status: string };
export const orderStages = ['Order Received', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'] as const;
export type Order = { id: string; client: string; productId: string; quantity: number; address: string; workerId: string; history: { status: string; time: string }[]; amount: number };
export type Withdrawal = { id: string; workerId: string; amount: number; destination: string; status: 'Completed · demo only'; date: string };
export type PayrollPayment = { id: string; workerId: string; amount: number; period: string; date: string };
export type CustomerGift = { id: string; client: string; occasion: string; message: string; reward: string; date: string };
export type DemoData = { workers: Worker[]; products: Product[]; tasks: Task[]; transactions: Transaction[]; orders: Order[]; withdrawals: Withdrawal[]; walletBalance: number; workerBalances: Record<string, number>; payrollPayments: PayrollPayment[]; gifts: CustomerGift[] };
export const money = (value: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
export const demoDate = '2026-05-18';
export function initialData(): DemoData {
  const workers: Worker[] = [
    { id: 'w1', name: 'Alex Morgan', email: 'alex@example.com', phone: '+1 555 0101', title: 'Station attendant', salary: 2400, commission: 2, start: '2025-03-01' },
    { id: 'w2', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 555 0102', title: 'Shift supervisor', salary: 3200, commission: 1, start: '2024-10-15' },
    { id: 'w3', name: 'James Wilson', email: 'james@example.com', phone: '+1 555 0103', title: 'Delivery driver', salary: 2600, commission: 1, start: '2025-02-20' },
    { id: 'w4', name: 'Emma Davis', email: 'emma@example.com', phone: '+1 555 0104', title: 'Station attendant', salary: 2400, commission: 2, start: '2025-06-01' },
  ];
  const products: Product[] = [
    { id: 'p1', name: 'LPG Cylinder', size: '12.5 kg', price: 48, stock: 148, threshold: 40, capacity: 200 },
    { id: 'p2', name: 'LPG Cylinder', size: '6 kg', price: 25, stock: 24, threshold: 30, capacity: 150 },
    { id: 'p3', name: 'LPG Cylinder', size: '25 kg', price: 92, stock: 65, threshold: 20, capacity: 100 },
    { id: 'p4', name: 'Bulk LPG', size: 'per kg', price: 3.5, stock: 1250, threshold: 1500, capacity: 5000 },
  ];
  const tasks: Task[] = [
    { id: 't1', title: 'Morning safety inspection', workerId: 'w2', due: '2026-05-18T09:00', status: 'Completed', priority: 'High' },
    { id: 't2', title: 'Restock the 6 kg cylinders', workerId: 'w1', due: '2026-05-18T12:00', status: 'In Progress', priority: 'High' },
    { id: 't3', title: 'Deliver order #1042', workerId: 'w3', due: '2026-05-18T14:30', status: 'Pending', priority: 'Normal' },
    { id: 't4', title: 'Check filling station equipment', workerId: 'w4', due: '2026-05-18T16:00', status: 'Pending', priority: 'Normal' },
  ];
  const transactions: Transaction[] = Array.from({ length: 84 }, (_, i) => {
    const p = products[i % products.length]; const quantity = i % 5 + 1;
    const d = new Date(Date.UTC(2026, 4, 18 - Math.floor(i / 12), 11 - i % 5, 45 - i % 12 * 3));
    return { id: `TX-${2084 - i}`, workerId: workers[i % 4].id, productId: p.id, quantity, amount: quantity * p.price, method: ['Cash', 'Bank transfer', 'Card'][i % 3], created: d.toISOString(), status: 'Completed' };
  });
  const orders: Order[] = [
    { id: '1042', client: 'Greenfield Foods', productId: 'p1', quantity: 20, address: '24 Market Street, Riverside', workerId: 'w3', amount: 960, history: [{ status: 'Order Received', time: '2026-05-18T08:30:00Z' }, { status: 'Confirmed', time: '2026-05-18T09:00:00Z' }] },
    { id: '1041', client: 'Summit Hospitality', productId: 'p3', quantity: 12, address: '18 Summit Avenue, Central', workerId: 'w3', amount: 1104, history: [{ status: 'Order Received', time: '2026-05-18T07:30:00Z' }] },
    { id: '1040', client: 'Greenfield Foods', productId: 'p2', quantity: 10, address: '24 Market Street, Riverside', workerId: 'w1', amount: 250, history: orderStages.map((status, i) => ({ status, time: `2026-05-17T${String(8 + i).padStart(2, '0')}:00:00Z` })) },
  ];
  return { workers, products, tasks, transactions, orders, withdrawals: [], walletBalance: 0, workerBalances: {}, payrollPayments: [], gifts: [] };
}

export function downloadCsv(name: string, rows: (string | number)[][]) {
  const content = rows.map(row => row.map(value => { let text = String(value); if (/^[=+@\-\t\r]/.test(text)) text = `'${text}`; return `"${text.replace(/"/g, '""')}"`; }).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}
