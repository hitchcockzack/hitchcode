import React from 'react';

interface LineItem {
  description: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

interface InvoicePaperProps {
  companyName?: string;
  companyLogoUrl?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  client?: string;
  clientCompany?: string;
  clientAddress?: string;
  email?: string;
  lineItems?: LineItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  paymentInstructions?: string;
  terms?: string;
  fieldsToShow: string[];
  sent?: boolean;
}

export default function InvoicePaper({
  companyName = 'Your Company Name',
  companyLogoUrl,
  companyAddress = '123 Main St, City, State',
  companyPhone = '(555) 123-4567',
  companyEmail = 'info@company.com',
  invoiceNumber = '001',
  invoiceDate = '2024-06-01',
  dueDate = '2024-06-15',
  client = '',
  clientCompany = '',
  clientAddress = 'Client Address',
  email = '',
  lineItems = [{ description: 'Service', qty: 1, unitPrice: 1000, lineTotal: 1000 }],
  subtotal = 1000,
  tax = 0,
  total = 1000,
  paymentInstructions = 'Bank: 123456, Routing: 654321 | PayPal: you@company.com',
  terms = 'Payment due in 30 days. Late fee may apply.',
  fieldsToShow,
  sent
}: InvoicePaperProps) {
  return (
    <div
      className="relative bg-white text-gray-900 shadow-2xl rounded-lg mx-auto border border-gray-200 overflow-hidden flex flex-col items-center"
      style={{
        width: 'min(100%, 420px)',
        height: 'min(100vw * 1.294, 594px)', // 8.5x11 ratio
        minHeight: 320,
        maxWidth: 420,
        maxHeight: 594,
        padding: '2rem 1.5rem',
        boxSizing: 'border-box',
        fontFamily: 'serif',
        background: 'linear-gradient(135deg, #fff 80%, #f3f4f6 100%)',
        position: 'relative',
        margin: '0 auto',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Scrollable Content Area */}
      <div className="w-full flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100% - 40px)' }}>
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-2">
          {fieldsToShow.includes('companyLogo') && companyLogoUrl && (
            <img src={companyLogoUrl} alt="Company Logo" className="h-10 mb-2" />
          )}
          {fieldsToShow.includes('companyName') && (
            <div className="text-xl font-bold tracking-wide text-blue-700 mb-1">{companyName}</div>
          )}
          {fieldsToShow.includes('companyAddress') && (
            <div className="text-xs text-gray-500 text-center mb-1">{companyAddress}</div>
          )}
          {fieldsToShow.includes('companyPhone') && (
            <div className="text-xs text-gray-500 text-center mb-1">{companyPhone}</div>
          )}
          {fieldsToShow.includes('companyEmail') && (
            <div className="text-xs text-gray-500 text-center mb-2">{companyEmail}</div>
          )}
          <div className="flex w-full justify-between items-center mt-2 mb-2">
            {fieldsToShow.includes('invoiceNumber') && (
              <div className="text-xs text-gray-700 font-semibold">Invoice #: {invoiceNumber}</div>
            )}
            {fieldsToShow.includes('invoiceDate') && (
              <div className="text-xs text-gray-700 font-semibold">Date: {invoiceDate}</div>
            )}
            {fieldsToShow.includes('dueDate') && (
              <div className="text-xs text-gray-700 font-semibold">Due: {dueDate}</div>
            )}
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-2" />
        </div>
        {/* Bill To */}
        <div className="w-full mb-2">
          {fieldsToShow.includes('client') && (
            <div className="font-semibold text-gray-700">Bill To:</div>
          )}
          {fieldsToShow.includes('client') && (
            <div className="text-sm">{client}</div>
          )}
          {fieldsToShow.includes('clientCompany') && clientCompany && (
            <div className="text-sm">{clientCompany}</div>
          )}
          {fieldsToShow.includes('clientAddress') && (
            <div className="text-sm">{clientAddress}</div>
          )}
          {fieldsToShow.includes('email') && (
            <div className="text-sm">{email}</div>
          )}
        </div>
        {/* Line Items Table */}
        {fieldsToShow.includes('lineItems') && (
          <div className="w-full my-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b border-gray-300 py-1 px-2 text-left">Description</th>
                  <th className="border-b border-gray-300 py-1 px-2 text-right">Qty</th>
                  <th className="border-b border-gray-300 py-1 px-2 text-right">Unit Price</th>
                  <th className="border-b border-gray-300 py-1 px-2 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1 px-2 border-b border-gray-100">{item.description}</td>
                    <td className="py-1 px-2 border-b border-gray-100 text-right">{item.qty}</td>
                    <td className="py-1 px-2 border-b border-gray-100 text-right">${item.unitPrice.toLocaleString()}</td>
                    <td className="py-1 px-2 border-b border-gray-100 text-right">${item.lineTotal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Summary */}
        {fieldsToShow.includes('summary') && (
          <div className="w-full flex flex-col items-end gap-1 mb-2">
            <div className="flex gap-4 w-full justify-end text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex gap-4 w-full justify-end text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold">${tax.toLocaleString()}</span>
            </div>
            <div className="flex gap-4 w-full justify-end text-base">
              <span className="text-gray-800 font-bold">Total:</span>
              <span className="font-bold text-blue-700 text-lg">${total.toLocaleString()}</span>
            </div>
          </div>
        )}
        {/* Payment Instructions */}
        {fieldsToShow.includes('paymentInstructions') && (
          <div className="w-full text-xs text-gray-700 mt-2 mb-1">
            <span className="font-semibold">Payment Instructions:</span> {paymentInstructions}
          </div>
        )}
        {/* Terms */}
        {fieldsToShow.includes('terms') && (
          <div className="w-full text-xs text-gray-500 mb-2">
            <span className="font-semibold">Terms:</span> {terms}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="absolute bottom-4 left-0 w-full flex flex-col items-center pointer-events-none">
        <div className="text-xs text-gray-400 bg-white/80 px-2 rounded">Thank you for your business!</div>
      </div>
      {/* Sent Stamp */}
      {sent && (
        <div
          className="fixed md:absolute top-8 right-4 md:right-[-32px] rotate-[-18deg] bg-green-100 border-2 border-green-400 text-green-700 font-bold px-6 py-2 text-lg shadow-lg rounded-lg animate-bounce z-[60] pointer-events-none"
          style={{
            boxShadow: '0 2px 16px #22c55e33',
            maxWidth: '90vw',
            minWidth: 80,
            right: 'max(4px, min(16px, 100vw - 100% + 32px))',
          }}
        >
          SENT
        </div>
      )}
    </div>
  );
}
