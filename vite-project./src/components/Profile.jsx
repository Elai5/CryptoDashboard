import React, { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiLock, FiMail, FiUser, FiPhone, FiGlobe, FiStar, FiTrash2 } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Digital asset enthusiast and blockchain developer',
    location: 'New York, USA',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading watchlist data
  useEffect(() => {
    // In a real app, this would come from your API
    const fetchWatchlist = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setWatchlist([
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: '$58,432', change: '+2.4%' },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: '$3,120', change: '+1.2%' },
          { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: '$1.25', change: '-0.8%' },
          { id: 'solana', name: 'Solana', symbol: 'SOL', price: '$132.50', change: '+5.3%' },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    if (activeTab === 'watchlist') {
      fetchWatchlist();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (!profile.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (isEditing && profile.newPassword && profile.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (isEditing && profile.newPassword !== profile.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Profile updated:', profile);
      setIsEditing(false);
      setProfile(prev => ({ ...prev, password: '', newPassword: '', confirmPassword: '' }));
    }
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist(prev => prev.filter(coin => coin.id !== coinId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Settings
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'watchlist' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('watchlist')}
        >
          My Watchlist
        </button>
      </div>

      {activeTab === 'profile' ? (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit /> Edit Profile
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiSave /> Save Changes
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* ... (keep all the existing profile form fields) ... */}
          </div>

          {/* ... (keep the rest of the profile form) ... */}
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Watchlist</h2>
            <div className="flex items-center gap-2 text-yellow-500">
              <FiStar /> {watchlist.length} Coins
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-center py-12">
              <FiStar className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500">Your watchlist is empty</h3>
              <p className="text-gray-400">Start adding coins to track their performance</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {watchlist.map((coin) => (
                    <tr key={coin.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="font-medium">{coin.symbol}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                            <div className="text-sm text-gray-500">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {coin.price}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${coin.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.change}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => removeFromWatchlist(coin.id)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;