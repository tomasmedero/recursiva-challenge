interface ForecastData {
    temp: number
    visual: string
    humidity: number
    icon: string
    precipitation: number
    sensation: number
    wind: number

}



export interface CityData {
    name: string
    country: string
    info: ForecastData[]
}