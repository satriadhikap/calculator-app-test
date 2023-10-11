import React, { useState, useEffect, useContext, useRef } from 'react';

// Membuat konteks untuk menyimpan riwayat perhitungan
const HistoryContext = React.createContext();

// Komponen untuk menampilkan riwayat perhitungan
function History() {
  const { history } = useContext(HistoryContext);
  
  return (
    <div>
      <h2>Riwayat Perhitungan</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

// Komponen utama aplikasi
function Calculator() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  // Menambahkan angka ketika tombol "Tambah" ditekan
  const addNumbers = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (!isNaN(num1) && !isNaN(num2)) {
      const sum = num1 + num2;
      setResult(sum);

      // Menambahkan riwayat perhitungan
      setHistory([...history, `${num1} + ${num2} = ${sum}`]);
    }
  };

  // Efek samping untuk fokus pada input setelah rendering
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Kalkulator Sederhana</h1>
      <input
        type="number"
        value={number1}
        onChange={(e) => setNumber1(e.target.value)}
        ref={inputRef}
      />
      <input
        type="number"
        value={number2}
        onChange={(e) => setNumber2(e.target.value)}
      />
      <button onClick={addNumbers}>Tambah</button>
      <div>Hasil: {result}</div>
      
      <HistoryContext.Provider value={{ history }}>
        <History />
      </HistoryContext.Provider>
    </div>
  );
}

export default Calculator;