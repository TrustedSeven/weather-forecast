import { Wrapper } from '@googlemaps/react-wrapper';
import React ,{useState, useEffect}from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

const APIKey ='6e52daf8438d59fb4873293fd664ddc4';

const Map = () => {
    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <img src='/map.png' alt='Google Map' style={{position: 'absolute', objectFit: 'cover', width: '100%', height: '100%'}}></img>
        </div>
    )
}

const App = () => {
    const [query, setQuery]=useState('');
    const [weather,setWeather]=useState('');
    const search =async(e)=>{
        if(e.key==='Enter')
        {
            const data= await fetchWeather(query);
            setWeather(data);
            setQuery('');

        }
    }
  
    return (
        <div className="row">
            <div className="main-container col-md-4" style={{height:"100vh"}}>
                <input 
                type="text"
                placeholder="Search City ..."
                className="search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                onKeyPress={search}

                />
                {weather.main && (
                    <div className="city">
                        <h2 className="city-name">
                            <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup>
                        </h2>
                        <div className="city-temp">
                            {
                                Math.round((weather.main.temp)-273.15)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className="info">
                            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>
                )}        
            </div>
             <div className='col-md-8' style={{padding: '0px'}}>
                <Wrapper apiKey='API_KEY'>
                    <Map></Map>
                </Wrapper>
             </div>
        </div>
    )
}

export default App
