import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/message`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>React + Vite + Express</h1>
      <h2>{message}</h2>
    </div>
  );
}


export default App;
