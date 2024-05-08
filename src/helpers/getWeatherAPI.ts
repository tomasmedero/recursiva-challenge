import { CityData } from '../interfaces/interfaces'

type Props = {
  cityName: string
}

export const getWeatherAPI = async (props: Props) => {
  const { cityName } = props

  const apiKey = import.meta.env.VITE_APP_OPENWEATHER_APIKEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=es&units=metric`

  try {
    const resp = await fetch(url)

    const { name, sys, main, weather, rain, wind, message, cod } =
      await resp.json()

    if (cod == 200) {
      const weatherData: CityData = {
        name,
        country: sys.country,
        info: [
          {
            temp: main.temp,
            visual: weather[0].description,
            humidity: main.humidity,
            precipitation: rain ? rain['3h'] : 0,
            wind: wind.speed,
            sensation: main.feels_like,
            icon: weather[0].icon,
          },
        ],
      }

      return {
        weatherData,
        message,
        cod,
      }
    } else {
      const weatherData: CityData = {
        name: '',
        country: '',
        info: [],
      }
      return { cod, message, weatherData }
    }
  } catch (error) {
    console.error(error)
  }
}
