import React from 'react';

const Card = (props) => {
    const { country } = props; // = props.country ceci est du destructuring

    const numberFormat = (x) =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g," "); // reggex chaque 3 caractères du place une virgule
    }


    return (
        <li className="card">
            <img src={country.flags.svg} alt="flag" />
            <div className="data-container">
                <ul>
                    <li>{country.name}</li>
                    <li>{country.capital}</li>
                    <li>Pop. {numberFormat(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;