import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is defined elsewhere

function EmpRecordHours() {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const { employeeId, postOfficeId } = useContext(AuthContext); // Fetching IDs from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      date,
      hours,
      employees_id: employeeId,
      po_id: postOfficeId,
    };

    try {
      const response = await fetch('https://vercel-api-powebapp.vercel.app/api/empHours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert('Hours recorded successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Record Employee Hours</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Hours Worked:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmpRecordHours;
