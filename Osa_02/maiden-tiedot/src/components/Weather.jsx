import getWeather from '../services/weather'
import { useState, useEffect } from 'react'

export const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    getWeather(capital)
      .then(data => {
        setWeatherData(data)
      })
  }, [capital])

  if (!weatherData) {
    return <p>Loading weather data...</p>
  }

  return (
    <div>
      <div>Temperature: {weatherData.main.temp} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
      <div>Wind: {weatherData.wind.speed} m/s</div>
    </div>
  )
}