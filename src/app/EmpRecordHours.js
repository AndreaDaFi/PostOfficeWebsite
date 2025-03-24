import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is defined elsewhere

const EmpRecordHours = () => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext); // Fetching user object from AuthContext

  useEffect(() => {
    if (!user?.employees_id || !user?.po_id) {
      setError("⚠ Missing employee ID or post office ID.");
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !hours) {
      setError("⚠ Please fill in both date and hours worked.");
      return;
    }

    setLoading(true);

    const data = {
      date,
      hours,
      employees_id: user.employees_id,
      po_id: user.po_id,
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
      if (!response.ok) throw new Error(result.error || "Failed to record hours");

      setError(null);
      alert('Hours recorded successfully!');
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmpRecordHours;
