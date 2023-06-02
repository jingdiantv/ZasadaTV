import {Routes, Route} from 'react-router-dom'
import Matches from '../Matches/Matches'
import Tournaments from '../Tournaments/Tournaments'
import Results from '../Results/Results'
import Top from '../Top/Top'
import Player from '../Player/Player'
import Event from '../Event/Event'
import Team from '../Team/Team'

import TeamResults from '../Team/TeamResults'
import Match from '../Match/Match'

import TeamEvents from '../Team/TeamEvents'
import PlayerResults from '../Player/PlayerResults'
import PlayerEvents from '../Player/PlayerEvents'
import './Main.css'

const Main = () => (
    <main>
        <Routes>
            <Route path="/tournaments/*" element={<Tournaments/>} />
            <Route exact path="/" element={<Matches/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/top" element={<Top/>} />
            <Route path="/player/:id/*" element={<Player/>} />
            <Route path="/team/:id/*" element={<Team/>} />
            {/* <Route path="/player" element={<Player/>} /> */}
            <Route path="/event/:id/*" element={<Event/>} />
            <Route path="/team_results/:id" element={<TeamResults/>} />
            <Route path="/match/:id/:name" element={<Match/>} />
            <Route path="/team_events/:id" element={<TeamEvents/>} />
            <Route path="/player_results/:id" element={<PlayerResults/>} />
            <Route path="/player_events/:id" element={<PlayerEvents/>} />
        </Routes>
      </main>
);

export default Main;