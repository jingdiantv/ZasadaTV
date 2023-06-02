import React from "react";
import './Footer.css'

const Footer = () =>(
    <footer >
        <div className="container">
          <div className="grid grid-col-2 footer">
            <div className="copyright">
              <span>© 2023 Компьютерный клуб «Zasada»</span>
              <div>Бубенца 20/1, Пугачев</div>
            </div>
            <div className="contact">
              <address className="contact-address">
                <span>Группа </span>
                <a href="https://vk.com/zasada_pugachev">ВКонтакте</a>
              </address>
              <div className="contact-telephone">
                +7-937-240-45-93</div>
            </div>
          </div>
        </div>
      </footer>
);

export default Footer;