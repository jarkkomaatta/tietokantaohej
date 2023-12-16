import React from 'react';
import { useLocation } from 'react-router-dom';
import './Subtitle.css';

const Subtitle = () => {
    const location = useLocation();
    const path = location.pathname;
  
    let pageTitle = 'Etusivu';
    let description = 'Tee joulu erityiseksi valinnoillamme. Tutustu joulukortteihin, lahjapapereihin ja koristenauhoihin. Luo iloa ja tunnelmaa – aloita ostoksesi nyt!';
  
    if (path.includes('/Joululahjapaperit')) {
      pageTitle = 'Joululahjapaperit'; 
      description = 'Kääri lahjasi näihin upeisiin joululahjapapereihin, jotka tuovat ripauksen juhlavuutta lahjapakettiisi. Monipuoliset kuviot sopivat jokaiseen makuun.';
    } else if (path.includes('/Koristenauhat')) {
      pageTitle = 'Koristenauhat'; 
      description = 'Viimeistele jouluaskartelusi tyylikkäillä koristenauhoillamme. Valikoimassamme on eri värejä ja malleja, jotka lisäävät jouluista loistoa koristeisiisi.';
    } else if (path.includes('/Joulukortit')) {
      pageTitle = 'Joulukortit'; 
      description = 'Lähetä lämpimiä joulutervehdyksiä tyylikkäillä joulukorteillamme. Laadukas painatus ja kauniit designit tekevät kortistamme täydellisen tavan jakaa joulun iloa.';
    } else if (path.includes('/Ostoskori')) {
      pageTitle = 'Ostoskori';
      description = 'Tässä näet valitsemasi tuotteet. Tarkista tiedot ennen kuin jatkat eteenpäin.';
    } else if (path.includes('/Tekijat')) {
      pageTitle = 'Tekijät';
      description = 'Tutustu ihmisiin meidän takana! Katso, ketkä loihtivat verkkokauppamme joulutuotteet.';
    } else if (path.includes('/Yllapito')) {
      pageTitle = 'Ylläpito';
      description = 'Ylläpidä tuotteita. Täällä voit lisätä uuden tuotteen!';
    } 
  
    return (
      <div className="subtitle">
        <h2>{pageTitle}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default Subtitle;