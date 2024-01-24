import React, { useState, useEffect } from 'react';

const GeneralList = () => {
  // State to store the data from the API
  const [data, setData] = useState([]);
  // State to handle loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to handle any errors
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/general/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json); // Set the data in state
      } catch (e) {
        setError(e); // Handle any errors
      } finally {
        setIsLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty array causes this effect to only run on mount

  if (isLoading) return <p>Loading...</p>; // Display a loading message
  if (error) return <p>Error: {error.message}</p>; // Display an error message

  // Render the data using map
  return (
    <div>
      <h1>General Stock Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <ul>{item.name} - {item.code}</ul>
            <ul>{item.primary_ticker}</ul>

          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default GeneralList;
