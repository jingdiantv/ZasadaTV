import {Link, NavLink} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Login from '../Login/Login'
import { request, setAuthToken, getAuthToken, setStoredPlayerNick,  getStoredPlayerNick } from '../components/MyAxios/MyAxios';
import { getListImgText } from '../components/Helper/Helper';
import './Header.css';


const Header = () => {
    const [loginActive, setLoginActive, children1] = useState(false); //Состояния модального окна "логин"
    const [signupActive, setSignupActive, children2] = useState(false); // Состояния модального окна "регистрации"


    const [selectorActive, setSelectorActive] = useState(false); // Состояния селектора стран
    const toggleClass = () => { // функция toggle для селектора
        setSelectorActive(!selectorActive);
    };
    const [value, setValue] = useState('Выберите страну'); //"Значение" в селекторе
    // База Стран для селектора
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        getListImgText("/country", "/mini", "countryRU", setCountries);
    }, []);
    
    // window.localStorage.setItem("auth_token", null);
    // window.localStorage.setItem("player_nick", null);

    const [isAuthorized, setIsAuthorized] = useState(getAuthToken() !== null && getAuthToken() !== "null" && getAuthToken() !== "undefined"); //Для проверки на авторизованность
    const [playerNick, setPlayerNick] = useState((getStoredPlayerNick() !== null && getStoredPlayerNick() !== "null" && getStoredPlayerNick() !== "undefined") ? getStoredPlayerNick() : "");

    
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const nickRef = useRef(null);

    const nickLoginRef = useRef(null);
    const passwordLoginRef = useRef(null);

    const onLogin = () =>{
        request("POST", "/auth/login", 
        {
            password: passwordLoginRef.current.value,
            nick: nickLoginRef.current.value
        }).then((resp) => {
            setIsAuthorized(true);
            setAuthToken(resp.data.token);
            setStoredPlayerNick(resp.data.nick);
            setPlayerNick(resp.data.nick);
        }).catch((error) => {
            setIsAuthorized(false);
            setAuthToken(null);
        });
        setLoginActive(!loginActive);
    }

    const onRegistration = () =>{
        request("POST", "/auth/register", 
        {
            firstName: nameRef.current.value,
            lastName: surnameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            nick: nickRef.current.value,
            country: value
        }).then((resp) => {
            setIsAuthorized(true);
            setAuthToken(resp.data.token);
            setStoredPlayerNick(resp.data.nick);
            setPlayerNick(resp.data.nick);
        }).catch((error) => {
            setIsAuthorized(false);
            setAuthToken(null);
        });
        setSignupActive(!signupActive);
    }


    return(
        <header className='Header'>
            <div className='Header-content'>
                <div className="Header-logo"></div>
                <nav className='Navigation'>
                    <ul className='Navigation-list'>
                        <li className='Navigation-link'>
                            <NavLink to='/tournaments' style={({ isActive }) => ({  // Если вкладка активна, то текст становится белым
                                color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                            Турниры
                            </NavLink>
                        </li>
                        <li className='Navigation-link'>
                            <NavLink to='/' style={({ isActive }) => ({ 
                                color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                                    Матчи
                            </NavLink>
                        </li>
                        <li className='Navigation-link' >
                            <NavLink to='/results' style={({ isActive }) => ({ 
                                color: isActive ? 'var(--text-01)' : 'var(--text-02)' })}>
                                    Результаты
                            </NavLink>
                        </li>
                        <li className='Navigation-link'>
                            <NavLink to='/top' style={({ isActive }) => ({ 
                                color: isActive ? 'var(--text-01)' : 'var(--text-02)' })}>
                                    Топ команд
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="Login">
                    {isAuthorized ? 
                            <Link to={"/player/" + playerNick} style={{textDecoration: "none"}}>
                                <div className='Authorized'>
                                    <p>{playerNick}</p>
                                </div>
                            </Link>
                        :
                            <button className="Login-btn" onClick={() => {setLoginActive(true)}}>
                                <span className="Login-btn-name" >
                                    <a>Личный кабинет</a>
                                </span>
                                <div className="Login-btn-icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M10.4674 4.49769C10.5238 4.27849 10.5779 4.21386 10.6862 4.08461C10.9595 3.75817 11.3053 3.48953 11.6801 3.30592C12.3045 3 13.1163 3 14.7399 3H16.2599C17.8835 3 18.6952 3 19.3197 3.30592C19.9176 3.59882 20.4011 4.08229 20.694 4.68018C20.9999 5.30464 20.9999 6.11642 20.9999 7.74V16.26C20.9999 17.8836 20.9999 18.6954 20.694 19.3198C20.4011 19.9177 19.9176 20.4012 19.3197 20.6941C18.6952 21 17.8835 21 16.2599 21H14.7399C13.1163 21 12.3045 21 11.6801 20.6941C11.3053 20.5105 10.9595 20.2418 10.6862 19.9154C10.5779 19.7861 10.5238 19.7215 10.4674 19.5023C10.4271 19.3459 10.4501 19.0195 10.512 18.8702C10.5986 18.6611 10.7155 18.556 10.9491 18.3457L17.174 12.7433C17.6154 12.346 17.6154 11.6539 17.174 11.2567L10.9491 5.65434C10.7155 5.44402 10.5986 5.33886 10.512 5.12976C10.4501 4.98051 10.4271 4.65414 10.4674 4.49769ZM14.5 12C14.5 11.5899 14.253 11.2374 13.8997 11.0831L10.6402 8.36687C9.98886 7.8241 9 8.28725 9 9.13509V11L3 11.0001C2.44771 11.0001 2 11.4478 2 12.0001C2 12.5523 2.44772 13.0001 3 13.0001L9 13V14.865C9 15.7128 9.98886 16.176 10.6402 15.6332L13.8997 12.917C14.253 12.7627 14.5 12.4102 14.5 12Z" />
                                    </svg>
                                </div>
                            </button>
                    }
                </div>
            </div>
            {/*Окно логина*/}
            <Login active={loginActive} setActive={setLoginActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="col_center_gap30">
                    <div className="col_right_gap20">
                        <div className="col_center_gap10">
                            <div className="text-field">
                                <input className="text-field_input" type="text" name="login" id="loginLogin" placeholder="Никнейм пользователя" ref={nickLoginRef}/>
                            </div>
                            <div className="text-field">
                                <input className="text-field_input" type="password" name="password" id="passwordLogin" placeholder="Пароль" ref={passwordLoginRef}/>
                            </div>
                        </div>
                    </div>
                    <div className="keeplogin">
                        <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping"/>
                        <label for="loginkeeping">Запомнить меня</label>
                    </div>
                    </div>
                    <div className ="col_center_gap_20">
                    <div className="full_grey_button">
                        <input type="submit" id="loginsubmit" value="Войти" onClick={onLogin}/>
                    </div>
                    <div className="transparent_grey_border_button text">
                        <a className="close">
                        <input type="submit" id="loginsubmit" value="Регистрация"  onClick={() => {setSignupActive(true); setLoginActive(false)}} />
                        </a>
                    </div>
                    </div>
                
            </Login>
            {/* Окно регистрации */}
            <Login active={signupActive} setActive={setSignupActive} >
                <div className="header_splash_window" onClick={() => selectorActive ? toggleClass() : null}>
                    <div className="logo_splash_window"></div>
                </div>
                <div className="col_center_gap30" onClick={() => selectorActive ? toggleClass() : null}>
                    <div className="col_center_gap10">
                        <div className="row_center_6">
                            <div className="text-field_half">
                                <input className="text-field_half input" type="text" name="name" id="name" placeholder="Имя пользователя" ref={nameRef}/>
                            </div>
                            <div className="text-field_half">
                                <input className="text-field_half input" type="text" name="surname" id="surname" placeholder="Фамилия пользователя" ref={surnameRef}/>
                            </div>
                        </div>
                        <div className="row_center_6">
                            <div className="text-field_half">
                                <input className="text-field_half input" type="password" name="password" id="passwordRegistration" placeholder="Пароль" ref={passwordRef}/>
                            </div>
                            <div className="text-field_half">
                                <input className="text-field_half input" type="email" name="email" id="email" placeholder="Почта" ref={emailRef}/>
                            </div>
                        </div>
                        <div className="row_center_6">
                            <div className="text-field_half">
                                <input className="text-field_half input" type="text" name="nick" id="nickRegistration" placeholder="Никнейм пользователя" ref={nickRef}/>
                            </div>
                            <div className="text-field_half">
                                <div className="text-field_half_selector">
                                    <div className="text_field_half_select" onClick={() => toggleClass()}>
                                        <p className={value === "Выберите страну" ? "onStart" : "choosed"}>{value}</p>
                                        <img src="../../img/arrow.svg" id="arrowIcon" className={selectorActive ? 'rotate' : null} alt="arrow"/>
                                    </div>
                                    <ul className={ selectorActive ? 'select_list' : 'select_list hide'}>
                                        {countries !== null ? 
                                            countries.map((country) =>
                                                <li key={country.countryRU} className='text_field_half_options' onClick={setValue.bind(this, country.countryRU)}>
                                                    <img src={country.src} alt={country.countryRU}/>
                                                    <p>{country.countryRU}</p>
                                                </li>
                                            )
                                        : 
                                            <></>
                                        }   
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full_grey_button">
                        <input type="submit" id="loginsubmit" value="Зарегистрироваться" onClick={onRegistration}/>
                    </div>
                </div>
            </Login>
        </header>
    )
    
    
};

export default Header;