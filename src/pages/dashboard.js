import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '../autocontext'; // Adjust the import path as needed

const GET_USER_DATA = gql`
  query GetUserData($firebase_uid: String!) {
    hospital_admins(where: {firebase_uid: {_eq: $firebase_uid}}) {
      id
      username
      email
      full_name
      address
      contact_number
    }
    medical_shop_admins(where: {firebase_uid: {_eq: $firebase_uid}}) {
      id
      username
      email
      full_name
      address
      contact_number
      medical_shop_id
    }
    citizens(where: {firebase_uid: {_eq: $firebase_uid}}) {
      id
      username
      email
      full_name
      date_of_birth
      address
      phone_number
      emergency_contact
      medical_history
      vaccination_record
    }
    volunteers(where: {firebase_uid: {_eq: $firebase_uid}}) {
      id
      username
      email
      full_name
      date_of_birth
      address
      phone_number
      skills
      availability
    }
    admin_users(where: {firebase_uid: {_eq: $firebase_uid}}) {
      id
      username
      email
      full_name
      role
      address
    }
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { firebase_uid: user?.uid },
    skip: !user,
  });

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userTypes = ['hospital_admins', 'medical_shop_admins', 'citizens', 'volunteers', 'admin_users'];
  let userData;
  let userRole;

  for (const type of userTypes) {
    if (data[type] && data[type].length > 0) {
      userData = data[type][0];
      userRole = type === 'admin_users' ? userData.role : type.slice(0, -1);
      break;
    }
  }

  const renderUserDetails = () => {
    if (!userData) return <p>No user data available.</p>;

    const excludeFields = ['id', 'firebase_uid'];
    return Object.entries(userData).map(([key, value]) => {
      if (excludeFields.includes(key)) return null;
      return (
        <p key={key} className="mb-2">
          <strong>{key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</strong> {value || 'N/A'}
        </p>
      );
    });
  };

  return (
    <div className="container mx-auto mt-20 px-4"> {/* Added top margin for navbar */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
        {userData && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <div className="max-h-96 overflow-y-auto">
              {renderUserDetails()}
            </div>
            <p className="mt-4"><strong>Role:</strong> {userRole}</p>
            <Link
              to={`/profile?email=${encodeURIComponent(userData.email)}&role=${encodeURIComponent(userRole)}`}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View/Edit Profile
            </Link>
          </div>
        )}
      </div>
      {/* Add your dashboard content here */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard Content</h2>
        <p>Add your main dashboard content, statistics, or other relevant information here.</p>
      </div>
    </div>
  );
};

export default Dashboard;