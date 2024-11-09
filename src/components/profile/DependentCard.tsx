import React, { useState } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface Dependent {
  id: string;
  name: string;
  relation: string;
  dob: string;
}

const DependentCard: React.FC = () => {
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDependent, setCurrentDependent] = useState<Dependent | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {!showForm && dependents.length < 4 && (
        <div className="flex justify-end">
          <Button
            icon={Plus}
            onClick={() => {
              setCurrentDependent(null);
              setShowForm(true);
            }}
          >
            Add Dependent
          </Button>
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Users}
            label="Full Name"
            placeholder="Dependent's full name"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Relation"
              placeholder="e.g., Spouse, Child"
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              required
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
              Save Dependent
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {dependents.map((dependent) => (
            <div
              key={dependent.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{dependent.name}</h3>
                  <p className="text-sm text-gray-600">
                    {dependent.relation} • Born {new Date(dependent.dob).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="danger"
                  icon={Trash2}
                  onClick={() => {
                    setDependents(dependents.filter(d => d.id !== dependent.id));
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {dependents.length === 0 && (
            <p className="text-gray-500 text-center">
              No dependents added yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DependentCard;