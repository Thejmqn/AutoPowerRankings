import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [fumbles, setFumbles] = useState([]);

  const load = async () => {
    const api = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";
    try {
      await axios.get(api).then(res => {console.log(res); setData(res.data); getTeams(res.data)});
    } catch (err) {
      console.log(err);
    }
  }

  const getTeams = async (data) => {
    const teamsData = data.sports[0].leagues[0].teams;
    let teams = [];
    for(let i = 0; i < teamsData.length; i++) {
      const team = teamsData[i].team;
      const teamApi = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${team.id}/statistics`;
      try {
        await axios.get(teamApi).then(res => {
          const totalFumbles = res.data.splits.categories[0].stats[0];
          const fumblesLost = res.data.splits.categories[0].stats[1];
          teams.push(<li>Team: {team.displayName}, # Fumbles: {totalFumbles.displayValue} 
          # Fumbles lost: {fumblesLost.displayValue} Loss %: {(fumblesLost.value/totalFumbles.value*100).toFixed(0)}</li>)
        });
      } catch (err) {
        console.log(err);
      }
    }
    console.log(teams);
    setFumbles(teams);  
  }

  return (
    <div className="App">
      <button onClick={load}>Load</button>
      <br></br>
      <ul>{fumbles}</ul>
    </div>
  );
}

export default App;
