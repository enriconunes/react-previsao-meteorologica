import { ForecastResponse } from "../../utils/types/response"

interface forecastResponseProps{
    response: ForecastResponse;
    unit: string;
    convertToDayOfWeek: (date: string) => string;
}

export default function ForecastWeek({response, unit, convertToDayOfWeek}: forecastResponseProps){

    return(
        <div className='w-full px-4 pt-1 pb-3 bg-cyan-600 bg-opacity-40 shadow-md rounded-sm text-white'>
            <div>
                {/* day */}
                {response?.forecast.forecastday.map((day) => (
                    <div key={day.date} className='flex items-center justify-between font-medium -mb-2'>
                        <span className='min-w-28'>{convertToDayOfWeek(day.date)}</span>
                        <div className='space-x-2'>
                            <span>{unit === 'C' ? day.day.maxtemp_c.toFixed(1) : day.day.maxtemp_f.toFixed(1)}º /</span>
                            <span className='text-gray-200'>{unit === 'C' ? day.day.mintemp_c.toFixed(1) : day.day.mintemp_f.toFixed(1)}º</span>
                        </div>
                        <span>
                            <img className='w-10/12' src={day.day.condition.icon} alt="" />
                        </span>
                    </div>
                ))}
                
            </div>
        </div>
    )

}