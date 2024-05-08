import { useState } from "react"
import { CityData } from "../interfaces/interfaces"
import { dayAbbreviations, forecastIconMap, getDayOfWeek, getForecastAPI, getFormattedDate, getNextDayDate, getWeatherAPI } from "../helpers"
import Swal from "sweetalert2"

export const WeatherCardComponent = () => {

    const [cityQuery, setCityQuery] = useState<string>('')
    const [forecastInfo, setForecastInfo] = useState<CityData>({ name: '', country: '', info: [] })
    const [weatherInfo, setWeatherInfo] = useState<CityData>({ name: '', country: '', info: [] })

    const handleAPI = async (cityName: string) => {

        const weatherResponse = await getWeatherAPI({ cityName })
        const forecastResponse = await getForecastAPI({ cityName })


        if (weatherResponse && weatherResponse.cod == 200) {

            const { weatherData } = weatherResponse
            setWeatherInfo(weatherData)
        } else if (weatherResponse) {

            const { message } = weatherResponse
            Swal.fire('Error en la búsqueda', message, 'error');

        }

        if (forecastResponse && forecastResponse.cod == 200) {

            const { forecastData } = forecastResponse
            setForecastInfo(forecastData)


        } else if (forecastResponse) {

            const { message } = forecastResponse

            Swal.fire('Error en la búsqueda', message, 'error');
        }

    }

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {

            if (cityQuery.trim().length <= 1) return
            await handleAPI(cityQuery)
            setCityQuery('')

        } catch (error) {
            console.error(error)

        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityQuery(e.target.value)
    }

    return (
        <>
            <form className='form-city' onSubmit={handleSearchSubmit}>
                <input
                    className='input-city'
                    type='text'
                    placeholder='Buscar Ciudad..'
                    value={cityQuery}
                    name='cityQuery'
                    onChange={handleChange}
                />
                <div className='btn-container'>
                    <button className='loc-button'>Buscar</button>
                </div>
            </form>
            <div className='container'>
                <div className='left-info'>
                    <div className='pic-gradient'></div>
                    <div className='today-info'>
                        <h2>{getDayOfWeek(new Date())}</h2>
                        <span>{getFormattedDate(new Date())}</span>

                        <div className='current-time'>
                            <i className='bx bx-time'></i>
                            <span>
                                {new Date().toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </span>
                        </div>
                        <div className='current-city'>
                            {weatherInfo.name && (
                                <>
                                    <i className='bx bx-current-location'> </i>
                                    <span>
                                        {weatherInfo.name}, {weatherInfo.country}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='today-weather'>
                        {weatherInfo.name && (
                            <i
                                className={`bx bx-${forecastIconMap[weatherInfo.info[0].icon]}`}
                            ></i>
                        )}

                        <h1 className='weather-temp'>
                            {weatherInfo.name
                                ? `${Math.round(weatherInfo.info[0].temp)}°C`
                                : '- °C'}
                        </h1>
                        <h3>
                            {weatherInfo.name
                                ? weatherInfo.info[0].visual.charAt(0).toUpperCase() +
                                weatherInfo.info[0].visual.slice(1)
                                : '-'}
                        </h3>
                    </div>
                </div>

                <div className='right-info'>
                    <div className='day-info'>
                        <div>
                            <span className='title'>Sensacion Termica</span>
                            <span className='value'>
                                {weatherInfo.name
                                    ? `${Math.round(weatherInfo.info[0].sensation)} °C`
                                    : '-'}
                            </span>
                        </div>
                        <div>
                            <span className='title'>Precipitacion</span>
                            <span className='value'>
                                {weatherInfo.name
                                    ? `${Math.round(weatherInfo.info[0].precipitation)} %`
                                    : '-'}
                            </span>
                        </div>
                        <div>
                            <span className='title'>Humedad</span>
                            <span className='value'>
                                {weatherInfo.name ? `${weatherInfo.info[0].humidity} %` : '-'}
                            </span>
                        </div>
                        <div>
                            <span className='title'>Velocidad Viento</span>
                            <span className='value'>
                                {weatherInfo.name
                                    ? `${(weatherInfo.info[0].wind * 3.6).toFixed(1)} km/h`
                                    : '-'}
                            </span>
                        </div>
                    </div>

                    <ul className='days-list'>
                        {[1, 2, 3, 4].map((value, index) => (
                            <li key={index}>
                                {forecastInfo.name ? (
                                    <i
                                        className={`bx bx-${forecastIconMap[forecastInfo.info[value].icon]
                                            }`}
                                    />
                                ) : (
                                    <i className='bx bx-dots-horizontal-rounded'></i>
                                )}
                                <span>{dayAbbreviations[getNextDayDate(value).getDay()]}</span>
                                <span className='day-temp'>
                                    {forecastInfo.name
                                        ? `${Math.round(forecastInfo.info[value].temp)}°C`
                                        : '- °C'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
