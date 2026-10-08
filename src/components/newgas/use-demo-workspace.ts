'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { initialData, money, Role, Worker, Product, orderStages } from '@/lib/demo-data';
import { getDemoRoleCookie, setDemoRoleCookie } from '@/lib/demo-auth';
import type { ActionConfig } from './action-dialog';

export function useDemoWorkspace() {
  const [data, setData] = useState(initialData);
  const [role, setRole] = useState<Role>('owner');
  const [page, setPage] = useState('Overview');
  const [roleReady, setRoleReady] = useState(false);

  useEffect(() => {
    const savedRole = getDemoRoleCookie();
    if (savedRole) {
      setRole(savedRole);
      setPage(savedRole === 'owner' ? 'Overview' : savedRole === 'worker' ? 'My tasks' : 'Products');
    }
    setRoleReady(true);
  }, []);

  useEffect(() => {
    if (roleReady) setDemoRoleCookie(role);
  }, [role, roleReady]);
  const [dialog, setDialog] = useState<ActionConfig | null>(null);
  const workerId = 'w1';
  const client = 'Greenfield Foods';
  const close = () => setDialog(null);
  const done = (message: string) => { close(); toast.success(message, { description: 'Saved in this demo session only.' }); };
  const workerOptions = data.workers.map(w => ({ value:w.id, label:w.name }));
  const productOptions = data.products.map(p => ({ value:p.id, label:`${p.name} · ${p.size} (${p.stock} available)` }));
  function workerForm(worker?: Worker) {
    setDialog({ title: worker ? 'Edit worker' : 'Add a team member', description: 'Demo team record only. This does not create a Neon Auth account or send an invitation.', fields: [
      { key:'name', label:'Full name', value:worker?.name }, { key:'email', label:'Email address', type:'email', value:worker?.email },
      { key:'phone', label:'Phone number', value:worker?.phone }, { key:'title', label:'Job title', value:worker?.title },
      { key:'start', label:'Start date', type:'date', value:worker?.start }, { key:'salary',label:'Monthly salary (₦)',type:'number',value:String(worker?.salary ?? 0),min:0 },
      { key:'commission',label:'Sales commission (%)',type:'number',value:String(worker?.commission ?? 0),min:0,max:100 },
    ], onSubmit: values => { const record = { ...values, id:worker?.id ?? crypto.randomUUID(), salary:Number(values.salary), commission:Number(values.commission) } as Worker; setData(d => ({...d, workers:worker ? d.workers.map(w => w.id === worker.id ? record : w) : [...d.workers,record]})); done(worker ? 'Worker updated' : 'Team member added'); } });
  }
  function removeWorker(id: string) {
    if (id === workerId || data.tasks.some(t => t.workerId === id) || data.transactions.some(t => t.workerId === id) || data.orders.some(o => o.workerId === id)) { toast.error('This worker has linked activity. Keep their record to preserve the audit history.'); return; }
    if (window.confirm('Remove this demo worker?')) { setData(d => ({ ...d, workers:d.workers.filter(w => w.id !== id) })); toast.success('Worker removed'); }
  }
  function addTask() {
    if (!data.workers.length) return toast.error('Add a worker first.');
    setDialog({ title:'Assign a task', description:'Give your team a clear next step.', submit:'Assign task', fields:[{key:'title',label:'Task description'},{key:'workerId',label:'Assigned worker',options:workerOptions},{key:'due',label:'Due date & time',type:'datetime-local'},{key:'priority',label:'Priority',options:[{value:'Normal',label:'Normal'},{value:'High',label:'High'}]}], onSubmit:values => { setData(d => ({...d,tasks:[...d.tasks,{id:crypto.randomUUID(),title:values.title,workerId:values.workerId,due:values.due,priority:values.priority,status:'Pending'}]})); done('Task assigned'); } });
  }
  function toggleTask(id: string) { setData(d => ({...d,tasks:d.tasks.map(t => t.id !== id ? t : {...t,status:t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Pending'})})); }
  function addSale() {
    setDialog({ title:'Log a transaction', description:'Product pricing calculates the total. Recording a sale also updates demo inventory.', submit:'Record transaction',fields:[{key:'productId',label:'Product',options:productOptions},{key:'quantity',label:'Quantity',type:'number',min:0.01}, ...(role === 'owner' ? [{key:'workerId',label:'Worker',options:workerOptions}] : []),{key:'method',label:'Payment method',options:['Cash','Bank transfer','Card'].map(value => ({value,label:value}))}],onSubmit:values => {
      const product = data.products.find(p => p.id === values.productId)!; const quantity = Number(values.quantity);
      if (quantity > product.stock || (product.name !== 'Bulk LPG' && !Number.isInteger(quantity))) return toast.error('Enter a valid quantity within available stock. Cylinders must be whole units.');
      setData(d => ({...d,products:d.products.map(p => p.id === product.id ? {...p,stock:p.stock-quantity}:p),transactions:[{id:`TX-${crypto.randomUUID().slice(0,8)}`,workerId:role === 'worker' ? workerId : values.workerId,productId:product.id,quantity,amount:product.price*quantity,method:values.method,status:'Completed',created:'2026-05-18T12:00:00.000Z'},...d.transactions]})); done('Transaction recorded');
    }});
  }
  function stockForm(product: Product) {
    setDialog({title:`Manage ${product.name} · ${product.size}`, description:'Update current stock, pricing, and the low-stock threshold.', fields:[{key:'stock',label:'Available stock',type:'number',value:String(product.stock),min:0},{key:'threshold',label:'Low-stock alert threshold',type:'number',value:String(product.threshold),min:0},{key:'price',label:'Unit price (₦)',type:'number',value:String(product.price),min:0.01}],onSubmit:values => { if(product.name !== 'Bulk LPG' && !Number.isInteger(Number(values.stock))) return toast.error('Cylinder stock must be a whole number.'); setData(d => ({...d,products:d.products.map(p => p.id !== product.id ? p : {...p,stock:Number(values.stock),threshold:Number(values.threshold),price:Number(values.price)})})); done('Inventory updated'); }});
  }
  function placeOrder(product?: Product) {
    setDialog({title:'Place a delivery order', description:'Pay on delivery. Demo only — no dispatch or payment will be initiated.', submit:'Place demo order', fields:[{key:'productId',label:'Product',options:productOptions,value:product?.id},{key:'quantity',label:'Quantity',type:'number',min:1},{key:'address',label:'Delivery address',value:'24 Market Street, Riverside'}],onSubmit:values => { const p = data.products.find(p => p.id === values.productId)!; const quantity = Number(values.quantity); if(quantity > p.stock || (p.name !== 'Bulk LPG' && !Number.isInteger(quantity))) return toast.error('Please choose an available quantity. Cylinders must be whole units.'); setData(d => ({...d,products:d.products.map(item => item.id === p.id ? {...item,stock:item.stock-quantity}:item),orders:[{id:crypto.randomUUID().slice(0,6).toUpperCase(),client,productId:p.id,quantity,address:values.address,workerId:'',amount:p.price*quantity,history:[{status:'Order Received',time:new Date().toISOString()}]},...d.orders]})); done('Order placed · stock reserved'); setPage('My orders'); }});
  }
  function manageOrder(id: string) {
    const order = data.orders.find(o => o.id === id)!; const current = order.history.at(-1)!.status; const next = orderStages[orderStages.indexOf(current as typeof orderStages[number])+1];
    setDialog({title:`Manage order #${id}`,description:`${order.client} · ${order.address}. Current status: ${current}.`,submit:next ? `Move to ${next}` : 'Update assignment',fields:[{key:'workerId',label:'Assigned worker',value:order.workerId || undefined,options:workerOptions}],onSubmit:values => { setData(d => ({...d,orders:d.orders.map(o => o.id === id ? {...o,workerId:values.workerId,history:next ? [...o.history,{status:next,time:new Date().toISOString()}]:o.history}:o)})); done(next ? `Order ${next.toLowerCase()}` : 'Assignment updated'); }});
  }
  function fundWallet() {
    setDialog({title:'Add demo funds',description:'Add simulated funds to the company wallet for payroll testing. This does not charge a card or move real money.',submit:'Add demo funds',fields:[{key:'amount',label:'Amount (₦)',type:'number',min:1}],onSubmit:values=>{const amount=Number(values.amount);setData(d=>({...d,walletBalance:d.walletBalance+amount}));done('Demo funds added to company wallet');}});
  }
  function paySalary(workerIdToPay?: string) {
    const period = new Date().toISOString().slice(0,7);
    const workersToPay = data.workers.filter(worker=>!workerIdToPay||worker.id===workerIdToPay).filter(worker=>!data.payrollPayments.some(payment=>payment.workerId===worker.id&&payment.period===period));
    if (!workersToPay.length) return toast.error('There are no unpaid salaries for this pay period.');
    const total = workersToPay.reduce((sum,worker)=>sum+worker.salary,0);
    if (total > data.walletBalance) return toast.error(`Insufficient demo funds. Add ${money(total-data.walletBalance)} to cover these salaries.`);
    const paidAt = new Date().toISOString();
    setData(d=>({...d,walletBalance:d.walletBalance-total,workerBalances:workersToPay.reduce((balances,worker)=>({...balances,[worker.id]:(balances[worker.id]??0)+worker.salary}),{...d.workerBalances}),payrollPayments:[...workersToPay.map(worker=>({id:crypto.randomUUID(),workerId:worker.id,amount:worker.salary,period,date:paidAt})),...d.payrollPayments]}));
    done(workersToPay.length===1?`Salary paid to ${workersToPay[0].name}`:`${workersToPay.length} salaries paid`);
  }
  function giftCustomer() {
    const clients=Array.from(new Set(data.orders.map(order=>order.client)));
    if (!clients.length) return toast.error('Add a customer order before creating a customer gift.');
    setDialog({title:'Create a customer gift',description:'Prepare a demo customer reward for a special occasion. No real discount or delivery is issued.',submit:'Create gift',fields:[{key:'client',label:'Customer',options:clients.map(value=>({value,label:value}))},{key:'occasion',label:'Special occasion'},{key:'date',label:'Gift date',type:'date',value:new Date().toISOString().slice(0,10)},{key:'reward',label:'Gift or reward'},{key:'message',label:'Message for customer'}],onSubmit:values=>{setData(d=>({...d,gifts:[{id:crypto.randomUUID(),client:values.client,occasion:values.occasion,reward:values.reward,message:values.message,date:values.date},...d.gifts]}));done('Customer gift created');}});
  }
  function requestWithdrawal() {
    const available = data.workerBalances[workerId] ?? 0;
    if (available <= 0) return toast.error('There is no paid salary available to withdraw yet.');
    setDialog({title:'Withdraw to personal account',description:`Available paid salary: ${money(available)}. This demo simulates a withdrawal only. Do not enter bank details; no real transfer occurs.`,submit:'Complete demo withdrawal',fields:[{key:'amount',label:'Amount (₦)',type:'number',min:1,max:available},{key:'destination',label:'Destination',options:[{value:'Personal account',label:'Personal account'},{value:'Other personal account',label:'Other personal account'}]}],onSubmit:values=>{const amount=Number(values.amount);if(amount>available)return toast.error('Withdrawal exceeds your available paid balance.');setData(d=>({...d,workerBalances:{...d.workerBalances,[workerId]:(d.workerBalances[workerId]??0)-amount},withdrawals:[{id:crypto.randomUUID(),workerId,amount,destination:values.destination,status:'Completed · demo only',date:new Date().toISOString()},...d.withdrawals]}));done('Demo withdrawal completed');}});
  }
  return {data,role,setRole,page,setPage,dialog,close,workerId,client,workerForm,removeWorker,addTask,toggleTask,addSale,stockForm,placeOrder,manageOrder,fundWallet,paySalary,giftCustomer,requestWithdrawal};
}
export type Workspace = ReturnType<typeof useDemoWorkspace>;
