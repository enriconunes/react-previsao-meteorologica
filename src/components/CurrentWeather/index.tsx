import { ForecastResponse } from "../../utils/types/response"

interface currentWeatherProps{
    unit: string,
    response: ForecastResponse
}

export default function CurrentWeather({unit, response}: currentWeatherProps){

    return(
        <div className='w-full px-4 flex justify-between items-center'>

            <div className='flex flex-col text-white'>
                {unit === 'C' ? (
                    <span className='text-5xl font-medium'>{response?.current.temp_c}º<span>{unit}</span></span>
                ):(
                    <span className='text-5xl font-medium'>{response?.current.temp_f}º<span>{unit}</span></span> 
                )}

                <span className='font-medium leading-4 mt-1'>
                    {response?.current.condition.text}
                </span>
                
                <span className='mt-3 leading-5'>
                    {response?.location.name}, {response?.location.country}
                </span>
                {unit === 'C' ? (
                    <span>
                        {response?.forecast.forecastday[0].day.maxtemp_c}º<span>{unit} </span>
                        / {response?.forecast.forecastday[0].day.mintemp_c}º<span>{unit}</span>
                    </span>
                ):(
                    <span>
                    {response?.forecast.forecastday[0].day.maxtemp_f}º<span>{unit} </span>
                    / {response?.forecast.forecastday[0].day.mintemp_f}º<span>{unit}</span>
                    </span>
                )}  
            </div>

            <div className='w-40 '>
                <img className='w-full hover:scale-110 hover:rotate-3 hover:duration-150 animate-pulse-slow ' src={response?.current.condition.icon} alt="" />
            </div>

        </div>
    )

}