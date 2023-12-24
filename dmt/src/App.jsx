import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import {db} from './firebase.js';
import './App.css'; // Import your stylesheet

const App = () => {
  const [dengueCount, setDengueCount] = useState('Loading...');
  const [malariaCount, setMalariaCount] = useState('Loading...');

  const fetchData = async () => {
    try {
      const dmtdisplayRef = doc(db, 'DMT', 'dmtdisplay');
      const docSnap = await getDoc(dmtdisplayRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDengueCount(data.dengueCount || 0);
        setMalariaCount(data.malariaCount || 0);
      } else {
        console.log("Document 'dmtdisplay' does not exist");
      }
    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <h1>Count Display</h1>
      <div id="counts-container">
        <p id="dengueCount">Dengue Count: {dengueCount}</p>
        <p id="malariaCount">Malaria Count: {malariaCount}</p>
      </div>
    </div>
  );
};

export default App;