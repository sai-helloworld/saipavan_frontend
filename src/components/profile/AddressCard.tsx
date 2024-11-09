import React, { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface Address {
  id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  landmark: string;
}

const AddressCard: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {!showForm && (
        <div className="flex justify-end">
          <Button
            icon={Plus}
            onClick={() => {
              setCurrentAddress(null);
              setShowForm(true);
            }}
          >
            Add New Address
          </Button>
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={MapPin}
            label="Address Line 1"
            placeholder="Street address"
            required
          />
          <Input
            label="Address Line 2"
            placeholder="Apartment, suite, etc. (optional)"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="City"
              required
            />
            <Input
              label="State"
              placeholder="State"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              placeholder="ZIP Code"
              required
            />
            <Input
              label="Landmark"
              placeholder="Nearby landmark (optional)"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Address
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium">{address.line1}</p>
                  {address.line2 && <p className="text-gray-600">{address.line2}</p>}
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  {address.landmark && (
                    <p className="text-gray-600">Landmark: {address.landmark}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    icon={Pencil}
                    onClick={() => {
                      setCurrentAddress(address);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    icon={Trash2}
                    onClick={() => {
                      setAddresses(addresses.filter(a => a.id !== address.id));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressCard;