import React from "react";
import { Link } from "react-router-dom";
import "./Structure.css";
import '../../../../../Top/Teams/FirstTeam/Player/Player.css';
import '../../../Events/Events.css'

function Structure(props) {
    return(
        <div className="tabcontent_tournaments">
            <div className="head_header"><p>Текущий состав</p></div>
            <div className="players_list">
                {props.roster !== null ?
                    props.roster.map((player) => 
                    <Link to={"/player/" + player.name} style={{textDecoration: "none"}} target="_blank" rel="noopener noreferrer" >
                        <div className="player_top">
                            <div className="players_background_roster">
                                <div className="crop_roster"><img src={player.photo} alt={player.name}/></div>
                            </div>
                            <div className="nick_roster">
                                <img src={player.flagPath} alt={player.country}/>
                                <p>{player.name}</p>
                            </div>
                        </div>
                    </Link>
                    )
                :
                    <></>
                }
            </div>

            <div className="ex_header"><p>Бывшие игроки</p></div>
            <div className="ex_players_list">
                <div className="ex_players">
                    {props.ex_players !== null ?
                        props.ex_players.map((ex) =>
                        <Link to={"/player/" + ex.nick} style={{textDecoration: "none"}} target="_blank" rel="noopener noreferrer" >
                            <div className="player_top">
                                <div className="players_background_roster">
                                    <div className="crop_roster"><img src={ex.photo} alt={ex.nick}/></div>
                                </div>
                                <div className="nick_roster">
                                    <img src={ex.flagPath} alt={ex.country}/>
                                    <p>{ex.nick}</p>
                                </div>
                            </div>
                        </Link>
                    )
                    :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Structure;