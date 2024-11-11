import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User, CreditCard, MapPin, Heart, Users, LogOut,
  Phone, Plus, X} from 'lucide-react';
import toast from 'react-hot-toast';

const HEALTH_CONDITIONS = [
  'Diabetes', 'Hypertension', 'Asthma', 'Arthritis',
  'Heart Disease', 'Cancer', 'Depression', 'Anxiety',
  'COPD', 'Obesity', 'Migraine', 'Thyroid Disorders'
];

const ALLERGIES = [
  'Peanuts', 'Dairy', 'Eggs', 'Shellfish', 'Soy',
  'Wheat', 'Tree Nuts', 'Fish', 'Penicillin',
  'Latex', 'Dust Mites', 'Pollen', 'Pet Dander'
];

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('contact');
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const [contactInfo, setContactInfo] = useState({
    mobile: '',
    email: '',
    preferredContact: 'mobile'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    cardType: 'visa',
    expiryDate: '',
    upiId: ''
  });

  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zipCode: '',
    landmark: ''
  });

  const [dependents, setDependents] = useState([
    { name: '', relation: '', dob: '' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (section: string) => {
    toast.success(`${section} information saved successfully`);
  };

  const filteredConditions = HEALTH_CONDITIONS.filter(condition =>
    condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAllergies = ALLERGIES.filter(allergy =>
    allergy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addDependent = () => {
    if (dependents.length < 4) {
      setDependents([...dependents, { name: '', relation: '', dob: '' }]);
    } else {
      toast.error('Maximum 4 dependents allowed');
    }
  };

  const removeDependent = (index: number) => {
    setDependents(dependents.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <User className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Member Profile</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <nav className="flex space-x-4 p-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('contact')}
              className={`${
                activeTab === 'contact'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`${
                activeTab === 'payment'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payment
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`${
                activeTab === 'address'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Address
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`${
                activeTab === 'health'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
            >
              <Heart className="h-4 w-4 mr-2" />
              Health
            </button>
            <button
              onClick={() => setActiveTab('dependents')}
              className={`${
                activeTab === 'dependents'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
            >
              <Users className="h-4 w-4 mr-2" />
              Dependents
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={contactInfo.mobile}
                    onChange={(e) => setContactInfo({ ...contactInfo, mobile: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Contact Method
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="mobile"
                        name="contact-method"
                        type="radio"
                        checked={contactInfo.preferredContact === 'mobile'}
                        onChange={() => setContactInfo({ ...contactInfo, preferredContact: 'mobile' })}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="mobile" className="ml-3">
                        <span className="block text-sm font-medium text-gray-700">Mobile</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="email"
                        name="contact-method"
                        type="radio"
                        checked={contactInfo.preferredContact === 'email'}
                        onChange={() => setContactInfo({ ...contactInfo, preferredContact: 'email' })}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="email" className="ml-3">
                        <span className="block text-sm font-medium text-gray-700">Email</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="text"
                        name="contact-method"
                        type="radio"
                        checked={contactInfo.preferredContact === 'text'}
                        onChange={() => setContactInfo({ ...contactInfo, preferredContact: 'text' })}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="text" className="ml-3">
                        <span className="block text-sm font-medium text-gray-700">Text Message</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setContactInfo({ mobile: '', email: '', preferredContact: 'mobile' })}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Contact')}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Payment Method</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Type
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={paymentInfo.cardType}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardType: e.target.value })}
                  >
                    <option value="visa">Credit Card (Visa)</option>
                    <option value="mastercard">Credit Card (Mastercard)</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>

                {paymentInfo.cardType !== 'upi' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="month"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="username@upi"
                      value={paymentInfo.upiId}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, upiId: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPaymentInfo({
                    cardName: '',
                    cardNumber: '',
                    cardType: 'visa',
                    expiryDate: '',
                    upiId: ''
                  })}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Payment')}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Delivery Address</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={address.line2}
                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Landmark
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setAddress({
                    line1: '',
                    line2: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    landmark: ''
                  })}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Address')}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Health Conditions & Allergies</h3>
              
              {/* Search and Add Section */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search conditions or allergies..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSearch(true);
                    }}
                  />
                  {showSearch && searchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium">Health Conditions</div>
                      {filteredConditions.map((condition) => (
                        <div
                          key={condition}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                          onClick={() => {
                            if (!selectedConditions.includes(condition)) {
                              setSelectedConditions([...selectedConditions, condition]);
                            }
                            setSearchTerm('');
                            setShowSearch(false);
                          }}
                        >
                          <span className="block truncate">{condition}</span>
                        </div>
                      ))}
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium">Allergies</div>
                      {filteredAllergies.map((allergy) => (
                        <div
                          key={allergy}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                          onClick={() => {
                            if (!selectedAllergies.includes(allergy)) {
                              setSelectedAllergies([...selectedAllergies, allergy]);
                            }
                            setSearchTerm('');
                            setShowSearch(false);
                          }}
                        >
                          <span className="block truncate">{allergy}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Conditions */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Selected Health Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConditions.map((condition) => (
                      <span
                        key={condition}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {condition}
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                          onClick={() => setSelectedConditions(selectedConditions.filter(c => c !== condition))}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selected Allergies */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Selected Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAllergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                      >
                        {allergy}
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center p-0.5 rounded-full text-red-400 hover:bg-red-200 hover:text-red-500 focus:outline-none"
                          onClick={() => setSelectedAllergies(selectedAllergies.filter(a => a !== allergy))}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedConditions([]);
                    setSelectedAllergies([]);
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Health')}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === 'dependents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Dependent Information</h3>
                <button
                  type="button"
                  onClick={addDependent}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Dependent
                </button>
              </div>

              <div className="space-y-6">
                {dependents.map((dependent, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeDependent(index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={dependent.name}
                          onChange={(e) => {
                            const newDependents = [...dependents];
                            newDependents[index].name = e.target.value;
                            setDependents(newDependents);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Relation
                        </label>
                        <select
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={dependent.relation}
                          onChange={(e) => {
                            const newDependents = [...dependents];
                            newDependents[index].relation = e.target.value;
                            setDependents(newDependents);
                          }}
                        >
                          <option value="">Select Relation</option>
                          <option value="spouse">Spouse</option>
                          <option value="child">Child</option>
                          <option value="parent">Parent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={dependent.dob}
                          onChange={(e) => {
                            const newDependents = [...dependents];
                            newDependents[index].dob = e.target.value;
                            setDependents(newDependents);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setDependents([{ name: '', relation: '', dob: '' }])}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray- 700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Dependents')}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}