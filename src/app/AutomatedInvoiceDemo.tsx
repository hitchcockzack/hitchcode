import React, { useState } from 'react';
import InvoicePaper from './InvoicePaper';
import { sendNotification } from '../lib/notifications';

const sampleJobs = [
  {
    client: 'Green Thumb Gardens',
    clientCompany: 'Green Thumb Gardens',
    clientAddress: '789 Oak Lane, Springfield, USA',
    email: 'contact@greenthumb.com',
    lineItems: [
      { description: 'Lawn Mowing', qty: 2, unitPrice: 60, lineTotal: 120 },
      { description: 'Seasonal Planting', qty: 1, unitPrice: 200, lineTotal: 200 },
    ],
    subtotal: 320,
    tax: 16,
    total: 336,
  },
  {
    client: 'Sunrise Catering',
    clientCompany: 'Sunrise Catering Co.',
    clientAddress: '456 Maple Ave, Centerville, USA',
    email: 'info@sunrisecatering.com',
    lineItems: [
      { description: 'Event Catering (50 guests)', qty: 1, unitPrice: 1200, lineTotal: 1200 },
      { description: 'Tableware Rental', qty: 1, unitPrice: 150, lineTotal: 150 },
    ],
    subtotal: 1350,
    tax: 67.5,
    total: 1417.5,
  },
  {
    client: 'Bright Cleaners',
    clientCompany: 'Bright Cleaners LLC',
    clientAddress: '321 Pine St, Lakeview, USA',
    email: 'service@brightcleaners.com',
    lineItems: [
      { description: 'Office Cleaning', qty: 4, unitPrice: 80, lineTotal: 320 },
      { description: 'Window Washing', qty: 10, unitPrice: 15, lineTotal: 150 },
    ],
    subtotal: 470,
    tax: 23.5,
    total: 493.5,
  },
  {
    client: 'Tech Solutions',
    clientCompany: 'Tech Solutions Inc.',
    clientAddress: '1010 Silicon Blvd, Tech City, USA',
    email: 'support@techsolutions.com',
    lineItems: [
      { description: 'IT Support', qty: 3, unitPrice: 100, lineTotal: 300 },
      { description: 'Network Setup', qty: 1, unitPrice: 400, lineTotal: 400 },
    ],
    subtotal: 700,
    tax: 35,
    total: 735,
  },
  {
    client: 'Happy Paws',
    clientCompany: 'Happy Paws Pet Care',
    clientAddress: '222 Pet Lane, Dogtown, USA',
    email: 'hello@happypaws.com',
    lineItems: [
      { description: 'Dog Walking', qty: 5, unitPrice: 20, lineTotal: 100 },
      { description: 'Pet Sitting', qty: 2, unitPrice: 50, lineTotal: 100 },
    ],
    subtotal: 200,
    tax: 10,
    total: 210,
  },
  {
    client: 'Fresh Bites',
    clientCompany: 'Fresh Bites Deli',
    clientAddress: '555 Foodie St, Flavor Town, USA',
    email: 'orders@freshbites.com',
    lineItems: [
      { description: 'Catering Service', qty: 1, unitPrice: 800, lineTotal: 800 },
      { description: 'Beverage Package', qty: 1, unitPrice: 120, lineTotal: 120 },
    ],
    subtotal: 920,
    tax: 46,
    total: 966,
  },
  {
    client: 'Urban Movers',
    clientCompany: 'Urban Movers LLC',
    clientAddress: '888 Move Ave, Big City, USA',
    email: 'contact@urbanmovers.com',
    lineItems: [
      { description: 'Moving Service', qty: 1, unitPrice: 600, lineTotal: 600 },
      { description: 'Packing Materials', qty: 1, unitPrice: 80, lineTotal: 80 },
    ],
    subtotal: 680,
    tax: 34,
    total: 714,
  },
  {
    client: 'Elite Tutors',
    clientCompany: 'Elite Tutors Group',
    clientAddress: '333 Study Rd, College Town, USA',
    email: 'info@elitetutors.com',
    lineItems: [
      { description: 'Math Tutoring', qty: 4, unitPrice: 50, lineTotal: 200 },
      { description: 'Science Tutoring', qty: 2, unitPrice: 60, lineTotal: 120 },
    ],
    subtotal: 320,
    tax: 16,
    total: 336,
  },
];

const columns = [
  { key: 'client', label: 'Client Name' },
  { key: 'clientCompany', label: 'Company' },
  { key: 'clientAddress', label: 'Address' },
  { key: 'email', label: 'Email' },
  { key: 'lineItems', label: 'Jobs' },
  { key: 'total', label: 'Total' },
];

const FIELD_SEQUENCE = [
  'companyName',
  'companyAddress',
  'companyPhone',
  'companyEmail',
  'invoiceNumber',
  'invoiceDate',
  'dueDate',
  'client',
  'clientCompany',
  'clientAddress',
  'email',
  'lineItems',
  'summary',
  'paymentInstructions',
  'terms',
];

const FIELD_TO_COLUMN: Record<string, string> = {
  client: 'client',
  clientCompany: 'clientCompany',
  clientAddress: 'clientAddress',
  email: 'email',
  lineItems: 'lineItems',
  summary: 'total',
};

export default function AutomatedInvoiceDemo() {
  const [animating, setAnimating] = useState(false);
  const [highlighted, setHighlighted] = useState<{row: number, col: string} | null>(null);
  const [invoiceStates, setInvoiceStates] = useState<{fields: string[], sent: boolean}[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleGenerate = () => {
    sendNotification('📊 Invoice Demo triggered');
    setAnimating(true);
    setInvoiceStates(Array(sampleJobs.length).fill(null).map(() => ({ fields: [], sent: false })));
    setHighlighted(null);
    sampleJobs.forEach((job, idx) => {
      setTimeout(() => animateInvoice(idx), idx * 800);
    });
  };

  function animateInvoice(idx: number) {
    let fieldIdx = 0;
    function typeNextField() {
      if (fieldIdx < FIELD_SEQUENCE.length) {
        const field = FIELD_SEQUENCE[fieldIdx];
        if (Object.prototype.hasOwnProperty.call(FIELD_TO_COLUMN, field)) {
          setHighlighted({ row: idx, col: FIELD_TO_COLUMN[field] });
        } else {
          setHighlighted(null);
        }
        setTimeout(() => {
          setInvoiceStates(prev => {
            const next = [...prev];
            next[idx] = {
              ...next[idx],
              fields: [...next[idx].fields, field],
              sent: false,
            };
            return next;
          });
          fieldIdx++;
          typeNextField();
        }, 220);
      } else {
        setHighlighted(null);
        setTimeout(() => {
          setInvoiceStates(prev => {
            const next = [...prev];
            next[idx] = {
              ...next[idx],
              sent: true,
            };
            return next;
          });
        }, 350);
      }
    }
    typeNextField();
  }

  const showInvoices = animating || invoiceStates.some(s => s && (s.fields.length > 0 || s.sent));

  // Carousel navigation handlers
  const goPrev = () => setActiveIdx(idx => Math.max(0, idx - 1));
  const goNext = () => setActiveIdx(idx => Math.min(sampleJobs.length - 1, idx + 1));

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-2 md:px-6">
      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full text-sm md:text-base rounded-lg border border-gray-200 bg-white font-sans shadow-sm" style={{ boxShadow: '0 2px 8px 0 rgba(60,64,67,0.08)' }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left text-gray-700 font-semibold bg-gray-50 border-b border-gray-200 sticky top-0 z-10"
                  style={{
                    background: 'linear-gradient(180deg, #f8fafc 90%, #f1f5f9 100%)',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleJobs.map((job, rowIdx) => {
              const isRowGreen = invoiceStates[rowIdx]?.sent;
              return (
                <tr
                  key={rowIdx}
                  className={
                    'transition-colors group' +
                    (isRowGreen
                      ? ' bg-green-100/80'
                      : rowIdx % 2 === 1
                      ? ' bg-gray-50'
                      : ' bg-white')
                  }
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                >
                  <td className={`px-4 py-2 transition-all duration-300 border-r border-gray-100 ${highlighted && highlighted.row === rowIdx && highlighted.col === 'client' ? 'bg-yellow-200 text-yellow-900 font-bold ring-2 ring-yellow-400/60' : 'text-gray-900'}`}>{job.client}</td>
                  <td className={`px-4 py-2 transition-all duration-300 border-r border-gray-100 ${highlighted && highlighted.row === rowIdx && highlighted.col === 'clientCompany' ? 'bg-yellow-200 text-yellow-900 font-bold ring-2 ring-yellow-400/60' : 'text-gray-900'}`}>{job.clientCompany}</td>
                  <td className={`px-4 py-2 transition-all duration-300 border-r border-gray-100 ${highlighted && highlighted.row === rowIdx && highlighted.col === 'clientAddress' ? 'bg-yellow-200 text-yellow-900 font-bold ring-2 ring-yellow-400/60' : 'text-gray-900'}`}>{job.clientAddress}</td>
                  <td className={`px-4 py-2 transition-all duration-300 border-r border-gray-100 ${highlighted && highlighted.row === rowIdx && highlighted.col === 'email' ? 'bg-yellow-200 text-yellow-900 font-bold ring-2 ring-yellow-400/60' : 'text-gray-900'}`}>{job.email}</td>
                  <td className={`px-4 py-2 transition-all duration-300 border-r border-gray-100 ${highlighted && highlighted.row === rowIdx && highlighted.col === 'lineItems' ? 'bg-yellow-200 text-yellow-900 font-bold ring-2 ring-yellow-400/60' : 'text-gray-900'}`}>{job.lineItems.map(item => item.description).join(', ')}</td>
                  <td className={`px-4 py-2 transition-all duration-300 ${highlighted && highlighted.row === rowIdx && highlighted.col === 'total' ? 'bg-yellow-200 text-yellow-900 font-bold ring-2 ring-yellow-400/60' : 'text-gray-900'}`}>${job.total.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleGenerate}
        disabled={animating}
      >
        Generate Invoices and Send
      </button>
      {showInvoices && (
        <div className="relative w-full flex justify-center items-center" style={{ minHeight: 620 }}>
          {/* Carousel navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow px-2 py-1 md:px-3 md:py-2 font-bold text-lg md:text-2xl disabled:opacity-40"
            onClick={goPrev}
            disabled={activeIdx === 0}
            aria-label="Previous Invoice"
          >
            &#8592;
          </button>
          <div className="relative flex justify-center items-center w-full max-w-2xl h-[620px]">
            {sampleJobs.map((job, idx) => {
              // Only render cards within 2 positions of the active card for performance
              if (Math.abs(idx - activeIdx) > 2) return null;
              // Stacking logic
              const offset = idx - activeIdx;
              const z = 10 - Math.abs(offset);
              const scale = offset === 0 ? 1 : 0.92 - 0.04 * Math.abs(offset);
              const translateX = offset * 80; // wider horizontal spread
              const translateY = Math.abs(offset) * 32; // more vertical offset
              const blur = offset === 0 ? 'none' : 'blur(1.5px)';
              const boxShadow = offset === 0 ? '0 8px 32px 0 rgba(60,64,67,0.12)' : '0 2px 8px 0 rgba(60,64,67,0.08)';
              return (
                <div
                  key={idx}
                  className={`absolute left-1/2 top-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${offset === 0 ? 'cursor-default' : 'cursor-pointer'}`}
                  style={{
                    zIndex: z,
                    transform: `translate(-50%, ${translateY}px) scale(${scale}) translateX(${translateX}px)`,
                    filter: blur,
                    boxShadow,
                    opacity: offset < 3 ? 1 : 0,
                    pointerEvents: offset === 0 ? 'auto' : 'auto',
                  }}
                  onClick={() => offset !== 0 && setActiveIdx(idx)}
                  tabIndex={offset === 0 ? -1 : 0}
                  aria-label={offset === 0 ? 'Active Invoice' : `Show Invoice ${idx + 1}`}
                >
                  <InvoicePaper
                    companyName= "General Services LLC"
                    companyAddress="123 Main St, Springfield, USA"
                    companyPhone="(555) 123-4567"
                    companyEmail="info@generalservices.com"
                    invoiceNumber={String(1001 + idx)}
                    invoiceDate="2024-06-01"
                    dueDate="2024-06-15"
                    client={job.client}
                    clientCompany={job.clientCompany}
                    clientAddress={job.clientAddress}
                    email={job.email}
                    lineItems={job.lineItems}
                    subtotal={job.subtotal}
                    tax={job.tax}
                    total={job.total}
                    paymentInstructions="Bank: 987654, Routing: 123456 | PayPal: billing@generalservices.com"
                    terms="Payment due in 30 days. Late fee may apply."
                    fieldsToShow={invoiceStates[idx]?.fields || []}
                    sent={invoiceStates[idx]?.sent}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow px-2 py-1 md:px-3 md:py-2 font-bold text-lg md:text-2xl disabled:opacity-40"
            onClick={goNext}
            disabled={activeIdx === sampleJobs.length - 1}
            aria-label="Next Invoice"
          >
            &#8594;
          </button>
        </div>
      )}
      {invoiceStates.every(s => s && s.sent) && animating && (
        <div className="mt-6 text-green-400 text-lg font-bold animate-fade-in">All invoices sent!</div>
      )}
    </div>
  );
}
