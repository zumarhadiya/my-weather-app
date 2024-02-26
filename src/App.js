import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import background from './image.jpg';
import { FaSearchLocation } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { TiWeatherCloudy } from "react-icons/ti";
import { FaTemperatureHigh } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { WiDayCloudyGusts } from "react-icons/wi";
import { RiSpeedUpFill } from "react-icons/ri";


// import { FaCloudSun } from "react-icons/fa";


function App() {
  const [result, setresult] = useState({})
  const [city, setcity] = useState("")
  const [zipp, setzipp] = useState("")
  const [countrycode, setcountrycode] = useState("")
  const [cityid, setcityid] = useState("")


  const API = {
    key: "094c5b1f33828120b7a595e071ce86be",
    url: "https://api.openweathermap.org/data/2.5/weather"
  }
  const handleclick = () => {
    console.log(city, "city");
    fetch(`${API.url}?q=${city}&appid=${API.key}`)
      // fetch(`${API.url}?zip=${zip},${countrycode}&appid=${API.key}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setresult(data)
      })
  }

  const handleclickofzip = () => {
    console.log(zipp, "zip");
    // fetch(`${API.url}?q=${city}&appid=${API.key}`)
    fetch(`${API.url}?zip=${zipp},${countrycode}&appid=${API.key}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setresult(data)
      })
  }
  const handleclickofcityid = () => {
    console.log(cityid, "city id");
    // fetch(`${API.url}?q=${city}&appid=${API.key}`)
    // fetch(`${API.url}?zip=${zipp},${countrycode}&appid=${API.key}`)
    fetch(`${API.url}?id=${cityid}&appid=${API.key}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setresult(data)
      })
  }

  useEffect(() => {
    fetch(`${API.url}?q=karachi&appid=${API.key}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setresult(data)
      })
  }, [])
  console.log(result);
  return (
    <div className='App' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundAttachment: 'fixed' }}>
      <div className='container'>

        <h1 className='mainheading'>WEATHER</h1>
        
        {/* city name */}
        <input type="text" placeholder="write city name" onChange={(e) => setcity(e.target.value)}></input>
        <button type='button' onClick={handleclick} ><FaSearchLocation /></button>
        <h5>OR</h5>
        {/* zip code */}
        <input type="text" placeholder="write zip code" onChange={(e) => setzipp(e.target.value)}></input>
        <button type='button' onClick={handleclickofzip} ><FaSearchLocation /></button>
        <h5>OR</h5>
        {/* city id */}
        <input type="text" placeholder="write city id" onChange={(e) => setcityid(e.target.value)}></input>
        <button type='button' onClick={handleclickofcityid} ><FaSearchLocation /></button>


        <h1><GrLocationPin />{result.main && result.name && result.name.toUpperCase()}</h1>
        <div className='content'>

        <div className='content1'>

          <h1>{result.main && result.weather[0].main}</h1>
          <h1><TiWeatherCloudy />{result.main && result.clouds.all} clouds </h1>
        </div>

        <div className='content2'>
          <h1><FaTemperatureHigh />{result.main && (result.main.temp - 273.15).toFixed(1)}<sup>o</sup>C</h1>
          <h1>FEELS: {result.main && (result.main.feels_like - 273.15).toFixed(1)}<sup>o</sup>C</h1>
        </div>

        </div>
        <div className='content3'>

          <h1><WiHumidity />{result.main && result.main.humidity}%</h1><hr></hr>
          <h1><WiDayCloudyGusts />{result.main && result.main.pressure} hPa</h1><hr></hr>
          <h1><RiSpeedUpFill />{result.main && result.wind.speed}m/s at {result.main && result.wind.deg}<sup>o</sup></h1>
        </div>
      </div>
    </div>
  )
}

export default App;