import React, { useState } from 'react';
import { setDoc, doc, getDoc } from "firebase/firestore";
import {db} from './firebase.js';
import './App.css'; // Make sure to adjust the path if necessary

const App = () => {
  const [dengueCount, setDengueCount] = useState('');
  const [malariaCount, setMalariaCount] = useState('');
  const [dengueCountdb, setDengueCountdb] = useState('');
  const [malariaCountdb, setMalariaCountdb] = useState('');

  const fetchData = async () => {
    try {
      const dmtdisplayRef = doc(db, 'DMT', 'dmtdisplay');
      const docSnap = await getDoc(dmtdisplayRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDengueCountdb(data.dengueCount || 0);
        setMalariaCountdb(data.malariaCount || 0);
      } else {
        console.log("Document 'dmtdisplay' does not exist");
      }
    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  };

  const updateCounts = async (e) => {
    e.preventDefault();
    try {
      fetchData(); // Fetch data before updating
      const dmtdisplayRef = doc(db, 'DMT', 'dmtdisplay');
      await setDoc(dmtdisplayRef, {
        dengueCount: Number(dengueCountdb) + Number(dengueCount),
        malariaCount: Number(malariaCountdb) + Number(malariaCount),
      });
      console.log("Document 'dmtdisplay' updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <div>
      <h1>Update Counts</h1>
      <label htmlFor="dengueCount">Dengue Count:</label>
      <input
        type="number"
        id="dengueCount"
        value={dengueCount}
        onChange={(e) => setDengueCount(e.target.value)}
      />
      <label htmlFor="malariaCount">Malaria Count:</label>
      <input
        type="number"
        id="malariaCount"
        value={malariaCount}
        onChange={(e) => setMalariaCount(e.target.value)}
      />
      <button onClick={updateCounts}>Update Counts</button>
    </div>
  );
};

export default App;