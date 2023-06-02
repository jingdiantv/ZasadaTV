import React from "react";
import "./ScrollLog.css"
import Log from "./Log/Log";

function ScrollLog({props, map, logs}){
    function colorNick(nick){
        if (nick === "CT")
            return "var(--ct-color)";
        else 
            return "var(--t-color)";
    }
    function weaponImg(weapon){
        return "/img/scrollLog/weapons/" + weapon + ".svg";        
    }
    function addInfoKill(info){
        return "/img/scrollLog/howKilled/" + info + ".svg";
    }
    function thingsImg(thing){
        return "/img/scrollLog/accessories/" + thing + ".svg";        
    }

    return( 
        <div className="scroll_logs" style={{backgroundImage: "url(../../img/maps/scoreboard/"+ map.mapName +".png)"}}>
            <div className="logs_container">
                {logs !== null ?
                    logs.map((log) => {
                        switch(log.type){
                            case "login": 
                                return(
                                    <Log type={"login"}>
                                        <div className="event_text" style={{color: "white"}}>{log.nick}</div><p>зашёл на сервер</p>
                                    </Log>
                                );
                            case "logout":
                                return(
                                    <Log type={"logout"}>
                                        <div className="event_text" style={{color: colorNick(log.side)}}>{log.nick}</div><p>вышел с сервера</p>
                                    </Log>
                                );
                            case "roundStarted":
                                return(
                                    <Log type={"roundBegin"}>
                                        <p>Раунд начался</p>
                                    </Log>
                                );
                            case "suicide":
                                return(
                                    <Log type={log.side === "T" ? "t_suicide" : "ct_suicide"}>
                                        <div className="event_text" style={{color: colorNick(log.side)}}>{log.nick}</div>
                                        <p>совершил суицид</p>
                                    </Log>
                                );
                            case "roundEnd":
                                return(
                                    <Log type={log.winner === "T" ? "t_win" : "ct_win"}>
                                        <p>Раунд завершен - Победитель:</p>
                                        <div className="event_text" style={{color: colorNick(log.winner)}}>{log.winner}</div>
                                        <p>(</p>
                                        <div className="event_text" style={{color: "var(--t-color)"}}>{log.scoreT}</div>
                                        <p>-</p>
                                        <div className="event_text" style={{color: "var(--ct-color)"}}>{log.scoreCT}</div>
                                        <p>) - </p>
                                        <div className="event_text" style={{color: colorNick(log.winner)}}>{log.how}</div>
                                    </Log>
                                );
                            case "bombDefused":
                                return(
                                    <Log type={"defuse"}>
                                        <div className="event_text" style={{color: "var(--ct-color)"}}>{log.nick}</div>
                                        <img src={thingsImg("Defusekit")}/>
                                        <p>разминировал бомбу</p>
                                    </Log>
                                );
                            case "bombPlanted":
                                return(
                                    <Log type={"bomb_planted"}>
                                        <div className="event_text" style={{color: "var(--t-color)"}}>{log.nick}</div>
                                        <img src={thingsImg("Bomb")}/>
                                        <p>поставил бомбу на {log.plant} (</p>
                                        <div className="event_text" style={{color: "var(--t-color)"}}>{log.tAlive}</div>
                                        <p>в</p>       
                                        <div className="event_text" style={{color: "var(--ct-color)"}}>{log.ctAlive}</div>
                                        <p>)</p>
                                    </Log>
                                );
                            case "kill":
                                return(
                                    <Log type={"kill"}>
                                        {log.attackerblind && <img src={addInfoKill("Attackerblind")}/>}
                                        <div className="event_text" style={{color: colorNick(log.killerSide)}}>{log.killer}</div>
                                        {log.assisted !== "" && <p>+</p>}
                                        {log.assisted !== "" && <div className="event_text" style={{color: colorNick(log.assisterSide)}}>{log.assisted}</div>}
                                        {log.flashAssisted !== "" && <p>+</p>}
                                        {log.flashAssisted !== "" && <img src={addInfoKill("FlashAssist")}/>}
                                        {log.flashAssisted !== "" && <div className="event_text" style={{color: colorNick(log.flashAssistedSide)}}>{log.flashAssisted}</div>}
                                        <img src={weaponImg(log.gun)}/>
                                        {log.noscope && <img src={addInfoKill("Noscope")}/>}
                                        {log.penetrated && <img src={addInfoKill("Penetrated")}/>}
                                        {log.throughsmoke && <img src={addInfoKill("Smoke")}/>}
                                        {log.headshot && <img src={addInfoKill("Headshot")}/>}
                                        <div className="event_text" style={{color: colorNick(log.victimSide)}}>{log.victim}</div>
                                    </Log>
                                );
                        }
                    })
                :
                    <></>
                }
            </div> 
        </div>
    )
}

export default ScrollLog;