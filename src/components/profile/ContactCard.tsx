import React, { useState } from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface ContactInfo {
  mobile: string;
  email: string;
  preferredMethods: {
    mobile: boolean;
    email: boolean;
    text: boolean;
  };
}

const ContactCard: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    mobile: '',
    email: '',
    preferredMethods: {
      mobile: false,
      email: false,
      text: false
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          icon={Phone}
          label="Mobile Number"
          type="tel"
          placeholder="Enter mobile number"
          value={contactInfo.mobile}
          onChange={(e) => setContactInfo(prev => ({
            ...prev,
            mobile: e.target.value
          }))}
        />

        <Input
          icon={Mail}
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={contactInfo.email}
          onChange={(e) => setContactInfo(prev => ({
            ...prev,
            email: e.target.value
          }))}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Preferred Contact Method
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            { key: 'mobile', label: 'Mobile', icon: Phone },
            { key: 'email', label: 'Email', icon: Mail },
            { key: 'text', label: 'Text Message', icon: MessageSquare }
          ].map(({ key, label, icon: Icon }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                checked={contactInfo.preferredMethods[key as keyof ContactInfo['preferredMethods']]}
                onChange={(e) => setContactInfo(prev => ({
                  ...prev,
                  preferredMethods: {
                    ...prev.preferredMethods,
                    [key]: e.target.checked
                  }
                }))}
              />
              <Icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Contact Information</Button>
      </div>
    </form>
  );
};

export default ContactCard;
