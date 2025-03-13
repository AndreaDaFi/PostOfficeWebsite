import React, { useEffect, useState } from 'react';

const testAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Fetching data from API...');
    fetch('https://vercel-api-powebapp.vercel.app/api/testDB')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Data:', data);  // Log the data to see what is returned
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData({ error: error.message });  // Handle error gracefully
      });
  }, []);

  return (
    <div>
      <h1>Test API Page</h1>
      <p>Data from the API:</p>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default testAPI;