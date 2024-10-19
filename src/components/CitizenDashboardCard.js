import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useQuery, gql } from '@apollo/client';

const GET_CITIZEN = gql`
  query GetCitizen($id: Int!) {
    citizens_by_pk(id: $id) {
      id
      full_name
      phone_number
    }
  }
`;

const CitizenDashboardCard = ({ citizenId }) => {
  const { loading, error, data } = useQuery(GET_CITIZEN, {
    variables: { id: citizenId },
  });
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    if (data && data.citizens_by_pk) {
      setQrValue(`http://localhost:3000/card/${data.citizens_by_pk.id}`);
    }
  }, [data]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  const { full_name, phone_number } = data.citizens_by_pk;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <img src="../assets/logo2.png" alt="Logo" className="h-12 w-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Citizen Card</h2>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{full_name}</h3>
          <p className="text-gray-600">{phone_number}</p>
        </div>
        <div className="flex justify-center mb-6">
          <QRCodeSVG 
            value={qrValue}
            size={200}
            level={"H"}
            includeMargin={true}
          />
        </div>
        <p className="text-center text-sm text-gray-500">
          Scan to view full health record
        </p>
      </div>
    </div>
  );
};

export default CitizenDashboardCard;