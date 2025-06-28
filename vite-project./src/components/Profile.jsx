import React, { useState, useEffect, useContext } from 'react';
import { FiEdit, FiSave, FiLock, FiMail, FiUser, FiPhone, FiGlobe, FiStar, FiTrash2 } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import { auth } from '../firebase/config';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, loading: favoritesLoading, removeFromFavorites } = useFavorites();
  const [watchlistCoins, setWatchlistCoins] = useState([]);

  // Load user profile and watchlist
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setProfile({
          name: user.displayName || '',
          email: user.email || '',
          phone: user.phoneNumber || '',
          bio: '',
          location: '',
          password: '',
          newPassword: '',
          confirmPassword: ''
        });
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Simulate loading watchlist coin details
  useEffect(() => {
    if (activeTab === 'watchlist' && favorites.length > 0) {
      setIsLoading(true);
      const mockCoinData = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: '$58,432', change: '+2.4%' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: '$3,120', change: '+1.2%' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: '$1.25', change: '-0.8%' },
        { id: 'solana', name: 'Solana', symbol: 'SOL', price: '$132.50', change: '+5.3%' },
      ].filter(coin => favorites.includes(coin.id));

      setTimeout(() => {
        setWatchlistCoins(mockCoinData);
        setIsLoading(false);
      }, 1000);
    }
  }, [activeTab, favorites]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const user = auth.currentUser;
      
      await updateProfile(user, {
        displayName: profile.name
      });

      if (user.email !== profile.email) {
        await updateEmail(user, profile.email);
      }

      if (profile.newPassword) {
        await updatePassword(user, profile.newPassword);
      }

      setIsEditing(false);
      setProfile(prev => ({ ...prev, password: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        ...errors,
        general: error.message || 'Failed to update profile. Please try again.'
      });
    }
  };

  const handleRemoveFromWatchlist = (coinId) => {
    removeFromFavorites(coinId);
    setWatchlistCoins(prev => prev.filter(coin => coin.id !== coinId));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg font-primary">
      <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'profile' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Settings
        </button>
        <button
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'watchlist' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('watchlist')}
        >
          My Watchlist
        </button>
      </div>

      {activeTab === 'profile' ? (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-100">Profile Information</h2>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit /> <span className="hidden sm:inline">Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setErrors({});
                  }}
                  className="px-3 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiSave /> <span className="hidden sm:inline">Save Changes</span>
                </button>
              </div>
            )}
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-900 text-red-100 rounded-lg">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <FiUser /> Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.name ? 'border-red-500' : 'border-gray-700'} ${!isEditing ? 'opacity-70' : ''}`}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <FiMail /> Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.email ? 'border-red-500' : 'border-gray-700'} ${!isEditing ? 'opacity-70' : ''}`}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <FiPhone /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.phone ? 'border-red-500' : 'border-gray-700'} ${!isEditing ? 'opacity-70' : ''}`}
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <FiGlobe /> Location
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.location ? 'border-red-500' : 'border-gray-700'} ${!isEditing ? 'opacity-70' : ''}`}
              />
              {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="block text-gray-300">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="3"
              className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.bio ? 'border-red-500' : 'border-gray-700'} ${!isEditing ? 'opacity-70' : ''}`}
            />
            {errors.bio && <p className="text-red-400 text-sm">{errors.bio}</p>}
          </div>

          {isEditing && (
            <div className="mt-8 border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center gap-2">
                <FiLock /> Change Password
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-300">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={profile.newPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.newPassword ? 'border-red-500' : 'border-gray-700'}`}
                    placeholder="Leave blank to keep current"
                  />
                  {errors.newPassword && <p className="text-red-400 text-sm">{errors.newPassword}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'}`}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-100">My Watchlist</h2>
            <div className="flex items-center gap-2 text-yellow-400">
              <FiStar /> {favorites.length} {favorites.length === 1 ? 'Coin' : 'Coins'}
            </div>
          </div>

          {favoritesLoading || isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12">
              <FiStar className="mx-auto text-4xl text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-400">Your watchlist is empty</h3>
              <p className="text-gray-500">Start adding coins to track their performance</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Coin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">24h Change</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {watchlistCoins.map((coin) => (
                    <tr key={coin.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="font-medium text-gray-200">{coin.symbol}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">{coin.name}</div>
                            <div className="text-sm text-gray-400">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        {coin.price}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {coin.change}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleRemoveFromWatchlist(coin.id)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <FiTrash2 /> <span className="hidden sm:inline">Remove</span>
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