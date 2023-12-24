import React, { useEffect, useState } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase.js';
import './App.css';

const App = () => {
  const [dengueCount, setDengueCount] = useState(0);
  const [dengueCountdb, setDengueCountdb] = useState(0);
  const [dengueDeathCount, setDengueDeathCount] = useState(0);
  const [dengueDeathCountdb, setDengueDeathCountdb] = useState(0);
  const [malariaCount, setMalariaCount] = useState(0);
  const [malariaCountdb, setMalariaCountdb] = useState(0);
  const [malariaDeathCount, setMalariaDeathCount] = useState(0);
  const [malariaDeathCountdb, setMalariaDeathCountdb] = useState(0);

  const fetchData = async () => {
    try {
      const dmtdisplayRef = doc(db, 'DMT', 'dmtdisplay');
      const docSnap = await getDoc(dmtdisplayRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDengueCountdb(data.dengueCount);
        setDengueDeathCountdb(data.dengueDeathCount)
        setMalariaCountdb(data.malariaCount);
        setMalariaDeathCountdb(data.malariaDeathCount)
      } else {
        console.log("Document 'dmtdisplay' does not exist");
      }
    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const updateCounts = async (e) => {
    e.preventDefault();
    try {
      await fetchData(); // Fetch data before updating
      const dmtdisplayRef = doc(db, 'DMT', 'dmtdisplay');
      await setDoc(dmtdisplayRef, {
        dengueCount: Number(dengueCountdb) + Number(dengueCount),
        dengueDeathCount: Number(dengueDeathCountdb) + Number(dengueDeathCount),
        malariaCount: Number(malariaCountdb) + Number(malariaCount),
        malariaDeathCount: Number(malariaDeathCountdb) + Number(malariaDeathCount),
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
      <label htmlFor="dengueDeathCount">Dengue Death Count:</label>
      <input
        type="number"
        id="dengueDeathCount"
        value={dengueDeathCount}
        onChange={(e) => setDengueDeathCount(e.target.value)}
      />
      <label htmlFor="malariaCount">Malaria Count:</label>
      <input
        type="number"
        id="malariaCount"
        value={malariaCount}
        onChange={(e) => setMalariaCount(e.target.value)}
      />
      <label htmlFor="malariaDeathCount">Malaria Death Count:</label>
      <input
        type="number"
        id="malariaDeathCount"
        value={malariaDeathCount}
        onChange={(e) => setMalariaDeathCount(e.target.value)}
      />
      <button onClick={updateCounts}>Update Counts</button>
    </div>
  );
};

export default App;
