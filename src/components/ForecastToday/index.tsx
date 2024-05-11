import { ForecastResponse } from "../../utils/types/response"

interface forecastTodayProps{
    response: ForecastResponse;
    unit: string;
}

export default function ForecastToday({response, unit}: forecastTodayProps){

    return(
        <div className='w-full px-4 bg-cyan-600 bg-opacity-40 shadow-md rounded-sm'>

            <div className='flex w-full py-4 overflow-x-scroll md:no-scrollbar'>

                {response?.forecast.forecastday[0].hour.map((hour) => (
                    <div key={hour.time} className='min-w-18 flex flex-col flex-shrink-0 items-center text-white text-sm font-medium'>

                        <span className='-mb-1'>{hour.time.slice(11, 16)}</span>

                        <img className='w-full hover:scale-110 hover:rotate-3 hover:duration-150' src={hour.condition.icon} alt="" />
                        <span className='-mt-1 text-xs'>
                            {unit === 'C' ? hour.temp_c : hour.temp_f} º{unit}
                        </span>
                    </div>
                ))}   

            </div>

        </div>
    )

}