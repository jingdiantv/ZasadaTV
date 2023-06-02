import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamTabs from "../components/Tabs/TeamTabs/TeamTabs";
import Trophies from "../components/Trophies/Trophies";
import { Link } from "react-router-dom";
import Player from "./Player/Player"
import "./Team.css"
import InfoContainer from "./InfoContainer/InfoContainer";
import Login from "../Login/Login";
import { useState } from "react";
import { request, getStoredPlayerNick } from "../components/MyAxios/MyAxios";
import { getListImgText, applHeaders } from "../components/Helper/Helper";

function Team() {

  const params = useParams();

  const [trophies, setTrophies] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  const [matchesUpcoming, setMatchesUpcoming] = useState(null);
  const [matchesEnded, setMatchesEnded] = useState(null);

  const [ongoingEvents, setOngoingEvents] = useState(null);
  const [endedEvents, setEndedEvents] = useState(null);

  const [lanEvents, setLanEvents] = useState(null);
  const [onlineEvents, setOnlineEvents] = useState(null);

  const [exPlayers, setExPlayers] = useState(null);

  const [emptyPlayer, setEmptyPlayer] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false); // true false
  const [isParticipant, setIsParticipant] = useState(false); // true false
  const [isCaptain, setIsCaptain] = useState(false); // true false

  const [isCapAdmin, setIsCapAdmin] = useState(false); // true false

  const [teamLogo, setTeamLogo] = useState(null);

  function getTeam(){
    request("GET", "/getTeamInfo/" + params.id, {}, applHeaders).then((resp) => {

      request("GET", "/getImage/" + params.id + "/type", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
        // resp.data["logo"] = URL.createObjectURL(response.data);
        setTeamLogo(URL.createObjectURL(response.data));
      });

      request("GET", "/getImage/" + resp.data.country + "/mini", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
        resp.data["flagPath"] = URL.createObjectURL(response.data);
      });

      resp.data.players.map((player) =>{
        request("GET", "/getImage/" + player.country + "/mini", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
          player["flagPath"] = URL.createObjectURL(response.data);
        });

        request("GET", "/getImage/" + player.name + "/type", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
          player["photo"] = URL.createObjectURL(response.data);
        });
      
        setTeamInfo(resp.data);
      });

      if (resp.data.players.length === 0){
        setTeamInfo(resp.data);
      }
    })
  }

  function getTeamMatches(type, setMatches){
    request("GET", "/getTeamMatches/" + params.id + type, {}, applHeaders).then((resp) =>{
        for (let i = 0; i < resp.data.length; ++i){
            let event = resp.data[i];
            
            for (let j = 0; j < event.matches.length; ++j){
                let match = event.matches[j];
                request("GET", "/getImage/" + match["leftTeam"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    match["leftTeamSrc"] = URL.createObjectURL(response.data);
                });
                request("GET", "/getImage/" + match["rightTeam"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    match["rightTeamSrc"] = URL.createObjectURL(response.data);
                });
                event.matches[j] = match;
            }
            resp.data[i] = event;
            setMatches(resp.data);
        }
    });
  }

  function getTeamEventsByType(type, setEvents){
    request("GET", "/getTeamEventsByType/" + params.id + type, {}, applHeaders).then((resp) =>{
        for (let i = 0; i < resp.data.length; ++i){
            let event = resp.data[i];
            request("GET", "/getImage/" + event.name + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                event["logo"] = URL.createObjectURL(response.data);
            });
            
            if (type !== "/ended"){
                for (let j = 0; j < event.participants.length; ++j){
                    let part = event.participants[j];
                    request("GET", "/getImage/" + part.name + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        part["src"] = URL.createObjectURL(response.data);
                    });
                    event.participants[j] = part;
                }
            }
            resp.data[i] = event;
            setEvents(resp.data);
        }
    });
  }

  function getTeamAchievements(type, setAchievements){
    request("GET", "/getTeamAchievements/" + params.id + type, {}, applHeaders).then((resp) =>{
        for (let i = 0; i < resp.data.length; ++i){
            let event = resp.data[i];

            request("GET", "/getImage/" + event.name + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                event["logo"] = URL.createObjectURL(response.data);
            });
            resp.data[i] = event;
            setAchievements(resp.data);
        }
    });
  }

  function getRosters(){
    request("GET", "/getRosters/" + params.id, {}, applHeaders).then((resp) => {
      resp.data.map((player) =>{
        request("GET", "/getImage/" + player.country + "/mini", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
          player["flagPath"] = URL.createObjectURL(response.data);
        });

        request("GET", "/getImage/" + player.nick + "/type", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
          player["photo"] = URL.createObjectURL(response.data);
        });
        setExPlayers(resp.data);
      });
    });
  }

  function getEmptyPlayer(){;
    let empty = {name: "?"}
    request("GET", "/getImage/" + "NonPhoto" + "/NonPhoto", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
      empty["photo"] = URL.createObjectURL(response.data);
      setEmptyPlayer(empty);
    });
  }

  function getIsParticipant(){
    request("GET", "/isParticipant/" + params.id + "/" + getStoredPlayerNick(), {}, applHeaders).then((resp) =>{
      setIsParticipant(resp.data);
    })
  }

  function getIsCaptain(){
    request("GET", "/isCaptain/" + params.id + "/" + getStoredPlayerNick(), {}, applHeaders).then((resp) =>{
      setIsCaptain(resp.data);
      if (resp.data){
        setIsCapAdmin(true);
      }
    })
  }

  function getIsAdmin(){
    if(getStoredPlayerNick() !== null && getStoredPlayerNick() !== "null" && getStoredPlayerNick() !== "undefined"){
        request("GET", "/isAdmin/" + getStoredPlayerNick(), {}, applHeaders).then((resp) =>{
            setIsAdmin(resp.data);
            if (resp.data){
              setIsCapAdmin(true);
            }
        });
    }
  }

  useEffect(() => {
    getEmptyPlayer();
    getIsParticipant();
    getIsCaptain();
    getTeam();
    getIsAdmin();
    getListImgText("/getTeamTrophies/" + params.id, "/trophy", "alt", setTrophies);
    getTeamMatches("/upcoming", setMatchesUpcoming);
    getTeamMatches("/ended", setMatchesEnded);
    getTeamEventsByType("/upcoming", setOngoingEvents);
    getTeamEventsByType("/ended", setEndedEvents);
    getTeamAchievements("/lan", setLanEvents);
    getTeamAchievements("/online", setOnlineEvents);
    getRosters();
  }, []); 

  
  function drawPlayers(){
    let content = [];

    teamInfo.players.map((player) => 
      !isCaptain ?
        content.push(
          <Link to={"/player/" + player.nick} style={{textDecoration: "none"}} target="_blank" rel="noopener noreferrer" >
              <Player {...player} isCap={false}/>
          </Link> 
        )
      :
        content.push(
          <Player {...player} isCap={true}/>
        )
      )

      if (teamInfo.players.length < 5){
        
        var emptyPlayers = 5 - teamInfo.players.length;

        for (let i = 0; i < emptyPlayers; ++i){
          content.push(
            <Player {...emptyPlayer} isCap={false}/>
          )
        }
      }

      return content;
  }

    const [leaveWindowActive, setLeaveWindowActive] = useState(false);
    
    const handleApprove = (nick) => {
      request("POST", "/leftTeam", 
        {
            nick: nick,
            team: params.id
        }).then((resp) => {
          let tempTeam = teamInfo;
      
          for (let i = 0; i < tempTeam.players.length; ++i){
            if (tempTeam.players[i].name === nick){
              tempTeam.players.splice(i, 1);
              setTeamInfo(tempTeam);
            }
          }
        });
      setLeaveWindowActive(!leaveWindowActive);
    };

    


    return(
        <div >
          <div>
            <div className="team_rectangle">
                {teamInfo !== null && emptyPlayer !== null ?
                  drawPlayers()
                : 
                  <></>
                }
            </div>

            <div className="devider_line"></div>

            {teamInfo !== null ? <InfoContainer {...teamInfo} isCapAdmin={isCapAdmin} setTeamLogo={setTeamLogo} teamLogo={teamLogo}/> : <></>}

            <div className="devider_line"></div>

            <Trophies items={trophies}/>

        </div>
          
        {teamInfo !== null ?
          <TeamTabs
          isCapAdmin={isCapAdmin}
          description={teamInfo.description}
          players={teamInfo.players} 
          matches_upcoming={matchesUpcoming} 
          matches_ended={matchesEnded}
          ongoing_events={ongoingEvents}
          ended_events={endedEvents}
          lan_events={lanEvents}
          online_events={onlineEvents}
          ex_players={exPlayers}
          team={params.id}
          />
        : 
          <></>
        }

        {isParticipant && 
        <div className="leave_team" onClick={() => setLeaveWindowActive(true)}>
          <p>Покинуть команду</p>
        </div>}
        
        <Login active={leaveWindowActive} setActive={setLeaveWindowActive}>
          <div className="header_splash_window">
            <div className="logo_splash_window"></div>
          </div>
          <div className="info_text">
            {teamInfo !== null ? <p>Вы уверены, что хотите покинуть команду {teamInfo.name}?</p> : <></>}
          </div>
          <div className="small_buttons_wrapper">
                <div className="small_dark_button">
                    <input type="submit" value="Нет" onClick={() => leaveWindowActive ? setLeaveWindowActive(!leaveWindowActive) : null}/>
                </div>
                <div className="small_grey_button">
                    <input type="submit" value="Да" onClick={() => handleApprove(getStoredPlayerNick())}/>
                </div>
            </div>
          
        </Login>
    </div>
    )
    
};

export default Team;
