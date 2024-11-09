import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface PaymentMethod {
  type: 'credit' | 'debit' | 'upi';
  cardNumber?: string;
  nameOnCard?: string;
  expiryDate?: string;
  cardType?: string;
  upiId?: string;
}

const PaymentCard: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'credit'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4 mb-6">
        {[
          { type: 'credit', label: 'Credit Card' },
          { type: 'debit', label: 'Debit Card' },
          { type: 'upi', label: 'UPI' }
        ].map(({ type, label }) => (
          <button
            key={type}
            type="button"
            className={`px-4 py-2 rounded-lg ${
              paymentMethod.type === type
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setPaymentMethod({ type })}
          >
            {label}
          </button>
        ))}
      </div>

      {(paymentMethod.type === 'credit' || paymentMethod.type === 'debit') && (
        <div className="space-y-4">
          <Input
            icon={CreditCard}
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name on Card"
              type="text"
              placeholder="John Doe"
            />

            <Input
              label="Card Type"
              type="select"
              placeholder="Select card type"
            />
          </div>

          <Input
            label="Expiry Date"
            type="month"
            placeholder="MM/YY"
          />
        </div>
      )}

      {paymentMethod.type === 'upi' && (
        <Input
          label="UPI ID"
          type="text"
          placeholder="username@upi"
        />
      )}

      <div className="flex justify-end">
        <Button type="submit">Save Payment Method</Button>
      </div>
    </form>
  );
};

export default PaymentCard;