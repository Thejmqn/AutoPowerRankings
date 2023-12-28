import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  const load = async () => {
    const api = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/12/statistics";
    try {
      await axios.get(api).then(res => {console.log(res); setData(res.data);});
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <button onClick={load}>Load</button>
      <br></br>
      {data == null ? "Not Loaded." : data.splits.categories[1].stats[5].displayValue}
    </div>
  );
}

export default App;
