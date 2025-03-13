import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Cougar from '../components/Cougar.png';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://vercel-api-powebapp.vercel.app/api/testDB')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Data:', data);
        setData(data); // Set the fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <>
      {/* Wrapping everything in a React Fragment or a single parent element */}
      <Container>
        <h1>Testing the API here</h1>
        <Box my={4}>
          {/* Display API data or loading/error messages */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : data && data.success ? (
            <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>No data available.</p>
          )}
        </Box>
      </Container>

      <Container>
        {/* Header Section */}
        <Box my={4}>
          <Typography variant="h1" gutterBottom align="center">
            Welcome to...
          </Typography>

          {/* Cougar Post logo */}
          <figure style={{ textAlign: 'center' }}>
            <img
              src={Cougar}
              alt="Logo"
              className="hover-image"
              style={{
                maxWidth: '600px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
            <figcaption style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
              Reference image:
              <a
                href="https://www.dreamstime.com/cougar-growling-close-up-mountain-lion-image220929865"
                style={{ color: '#D32F2F' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </figcaption>
          </figure>

          <style jsx>{`.hover-image:hover {transform: translateY(-25px);`}</style>

          <Box my={4}></Box>
          <Typography variant="h6" color="textSecondary" align="center">
            We provide the best postal services for all your needs
          </Typography>
        </Box>
      </Container>
    </>
  );
};

// Optional: Add some styles to the pre tag for better formatting
const styles = {
  pre: {
    backgroundColor: '#f4f4f9',
    padding: '20px',
    borderRadius: '5px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#333',
    overflowX: 'auto',
  },
};

export default Home;
