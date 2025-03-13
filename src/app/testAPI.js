const TestAPI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    <div>
      <h1>Test API Page</h1>
      <p>Data from the API:</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data && data.success ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default TestAPI;
