// app/testAPI.js
import React, { useEffect, useState } from 'react';

const TestAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from your API or perform any necessary action
    fetch('https://vercel-api-powebapp.vercel.app/api/getData')  // Replace with your actual endpoint if different
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
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

export default TestAPI;
