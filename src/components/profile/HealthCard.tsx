import React, { useState } from 'react';
import { Heart, Plus, X } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

const mockConditions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Allergies',
  'Heart Disease',
  'Arthritis'
];

const HealthCard: React.FC = () => {
  const [conditions, setConditions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = mockConditions.filter(
        condition => condition.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addCondition = (condition: string) => {
    if (!conditions.includes(condition)) {
      setConditions([...conditions, condition]);
    }
    setSearchTerm('');
    setSuggestions([]);
  };

  const removeCondition = (condition: string) => {
    setConditions(conditions.filter(c => c !== condition));
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          icon={Heart}
          label="Search Health Conditions & Allergies"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => addCondition(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {conditions.map((condition) => (
          <div
            key={condition}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full"
          >
            <span>{condition}</span>
            <button
              onClick={() => removeCondition(condition)}
              className="p-1 hover:bg-indigo-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {conditions.length === 0 && (
        <p className="text-gray-500 text-center">
          No health conditions or allergies added yet
        </p>
      )}
    </div>
  );
};

export default HealthCard;