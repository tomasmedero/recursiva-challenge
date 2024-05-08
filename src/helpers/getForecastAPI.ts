import { CityData } from '../interfaces/interfaces'

type Props = {
  cityName: string
}

export const getForecastAPI = async (props: Props) => {
  const { cityName } = props

  const apiKey = import.meta.env.VITE_APP_OPENWEATHER_APIKEY
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=es&units=metric`

  try {
    const resp = await fetch(url)

    const { city, list, message, cod } = await resp.json()

    if (cod == 200) {
      const forecastData: CityData = {
        name: city.name,
        country: city.country,
        info: [],
      }

      for (let i = 0; i < 5; i++) {
        const dayData = list[i * 8]

        if (dayData) {
          forecastData.info.push({
            temp: dayData.main.temp,
            visual: dayData.weather[0].description,
            humidity: dayData.main.humidity,
            precipitation: dayData.rain ? dayData.rain['3h'] : 0,
            wind: dayData.wind.speed,
            sensation: dayData.main.feels_like,
            icon: dayData.weather[0].icon,
          })
        }
      }

      return {
        forecastData,
        message,
        cod,
      }
    } else {
      const forecastData: CityData = {
        name: '',
        country: '',
        info: [],
      }
      return { cod, message, forecastData }
    }
  } catch (error) {
    console.error(error)
  }
}
