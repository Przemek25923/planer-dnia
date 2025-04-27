import { useState, useEffect } from 'react';
import axios from 'axios';

function FormularzPlanowania() {
  const dniTygodnia = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela'
  ];

  const [dzien, setDzien] = useState('Poniedziałek');
  const [nauka, setNauka] = useState('');
  const [praca, setPraca] = useState('');
  const [odpoczynek, setOdpoczynek] = useState('');
  const [relaks, setRelaks] = useState('');
  const [sen, setSen] = useState('');
  const [plany, setPlany] = useState([]);

  // Załaduj plany z localStorage przy starcie
  useEffect(() => {
    const savedPlans = localStorage.getItem('planyDnia');
    if (savedPlans) {
      setPlany(JSON.parse(savedPlans));
    }
  }, []);

  // Obsługa wysyłki formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/plan', {
        nauka: Number(nauka) || 0,
        praca: Number(praca) || 0,
        odpoczynek: Number(odpoczynek) || 0,
        relaks: Number(relaks) || 0,
        sen: Number(sen) || 0,
      });

      const nowyPlan = {
        dzien,
        plan: response.data,
      };

      const nowePlany = [...plany, nowyPlan];
      setPlany(nowePlany);
      localStorage.setItem('planyDnia', JSON.stringify(nowePlany));

      // Resetuj pola formularza
      setNauka('');
      setPraca('');
      setOdpoczynek('');
      setRelaks('');
      setSen('');
    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
    }
  };

  // Kasowanie wszystkich planów
  const resetujPlany = () => {
    setPlany([]);
    localStorage.removeItem('planyDnia');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Planer Dnia 📅</h1>

        {/* FORMULARZ */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <select
            value={dzien}
            onChange={(e) => setDzien(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {dniTygodnia.map((dzienTygodnia) => (
              <option key={dzienTygodnia} value={dzienTygodnia}>
                {dzienTygodnia}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Ile godzin na naukę?"
            value={nauka}
            onChange={(e) => setNauka(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Ile godzin na pracę?"
            value={praca}
            onChange={(e) => setPraca(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Ile godzin na odpoczynek?"
            value={odpoczynek}
            onChange={(e) => setOdpoczynek(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Ile godzin na relaks?"
            value={relaks}
            onChange={(e) => setRelaks(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Ile godzin na sen?"
            value={sen}
            onChange={(e) => setSen(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
            Zapisz plan dnia
          </button>

          <button type="button" onClick={resetujPlany} className="bg-red-400 text-white p-3 rounded-lg hover:bg-red-500">
            Wyczyść wszystkie plany
          </button>
        </form>

        {/* WYŚWIETLANIE PLANÓW */}
        {plany.length > 0 && (
          <div className="space-y-6">
            {plany.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-blue-700 mb-2">{item.dzien}</h2>
                <ul className="list-disc list-inside space-y-1">
                  {item.plan.map((p, idx) => (
                    <li key={idx} className="text-gray-700">
                      {p.od} - {p.do}: {p.aktywnosc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormularzPlanowania;
