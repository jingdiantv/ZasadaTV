import React from "react";
import "./Stats.css"

function Stats(props){
    return(
        <div>
            {props.stats !== null ?
                <div className="stats_box">
                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Всего убийств</span>
                            <p>{props.stats.kills}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Всего смертей</span>
                            <p>{props.stats.deaths}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Убийства / Смерти</span>
                            <p style={{color: props.stats.kd > 1 ? 'var(--base-11)' : props.stats.kd < 0 ? 'red' : 'white'}}>{props.stats.kd}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Убийства - Смерти</span>
                            <p style={{color: props.stats.kdd > 0 ? 'var(--base-11)' : props.stats.kdd < 0 ? 'red' : 'white'}}>{props.stats.kdd}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Убийства в голову %</span>
                            <p style={{color: props.stats.hsp > 50 ? 'var(--base-11)' : 'red'}}>{props.stats.hsp}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Урон / Раунд</span>
                            <p style={{color: props.stats.dpr > 60 ? 'var(--base-11)' : 'red'}}>{props.stats.dpr}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Сыграно карт</span>
                            <p>{props.stats.maps}</p>
                        </div>
                        <div className="devider_subline"></div>
                    </div>

                    <div className="devider_stats">
                        <div className="devider_stats_line">
                            <span>Убийства / Матч</span>
                            <p style={{color: props.stats.dpr >= 17 ? 'var(--base-11)' : 'red'}}>{props.stats.dpr}</p>
                        </div>
                    </div>
                </div>
            :
                <></>
            }
        </div>
    );
}

export default Stats;