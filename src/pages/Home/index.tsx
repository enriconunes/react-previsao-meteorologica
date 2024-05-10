import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';

// components
import Header from '../../components/Header';
import InputCity from '../../components/InputCity';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import Graph from '../../components/Graph';

// api config
import apiClient from '../../utils/api/setupApiClient';

// types
import { ForecastResponse } from '../../utils/types/response';

// react toastfy
import { toast } from 'react-toastify';


export default function Home(){

    const [response, setResponse] = useState<ForecastResponse>();
    const [city, setCity] = useState("Lisboa")
    const [lang, setLang] = useState("pt")
    const [unit, setUnit] = useState("C")
    const [toastMessage, setToastMessage] = useState("Nenhuma cidade foi encontrada com esse nome.")

    function handleChangeUnit(newUnit: string){
        if(unit === newUnit){
            return
        }

        setUnit(newUnit)
    }

    function handleChangeLang(lang: string){
        setLang(lang)
    }

    function convertToDayOfWeek(day: string){

        let country = "pt-BR"

        if(lang === "en"){
            country = "en-US"
        }

        const date = new Date(day);

        const dayOfWeek = date.toLocaleDateString(country, { weekday: 'long' });

        return dayOfWeek
    }

    async function handleSearch(inputValue: string){
        try {
            const response = await apiClient.get(`forecast.json?key=4998fbbc09584e6e8f1191247240705&q=${inputValue}&days=5&aqi=no&alerts=no&lang=${lang}`);
            setResponse(response.data)
        } catch (error) {
            toast.error(toastMessage)
            return
        }
    }

    useEffect(() => {

        handleSearch(city);

    }, [city, lang]);

    useEffect(() => {

        if(lang === 'pt'){
            setToastMessage("Nenhuma cidade foi encontrada com esse nome.")
        } else{
            setToastMessage("No city was found with that name.")
        }

    }, [lang])

    return(
        <>
            <Helmet>
                <title>Previsão do tempo</title>
            </Helmet>

            <main className='min-h-screen bg-gradient-to-b from-cyan-600 to-sky-300'>
                
                <Header
                lang={lang}
                handleChangeLang={handleChangeLang}
                />

                {/* container */}
                <div className='flex flex-col items-center justify-center px-4 py-2 md:pt-8 pb-6 md:max-w-2xl md:mx-auto'>

                    <div className="w-full flex flex-col text-white pb-3">
                        <div className="flex gap-x-2">
                            <div className={`h-5 w-8 bg-cyan-800 flex items-center justify-center hover:cursor-pointer ${unit === 'C' ? 'ring-1 ring-sky-600' : 'brightness-75 ring-0'}`}
                            onClick={() => {handleChangeUnit('C')}}>
                                ºC
                            </div>
                            <div className={`h-5 w-8 bg-cyan-800 flex items-center justify-center hover:cursor-pointer ${unit === 'F' ? 'ring-1 ring-sky-600' : 'brightness-75'}`}
                            onClick={() => {handleChangeUnit('F')}}>
                                ºF
                            </div>                        
                        </div>
                    </div>

                    <Title lang={lang}/>

                    <InputCity
                    handleSearch={handleSearch}
                    lang={lang}/>

                    <div className='w-full mt-8 px-4 flex justify-between items-center'>

                        <div className='flex flex-col text-white'>
                            {unit === 'C' ? (
                                <span className='text-5xl font-medium'>{response?.current.temp_c}º<span>{unit}</span></span>
                            ):(
                               <span className='text-5xl font-medium'>{response?.current.temp_f}º<span>{unit}</span></span> 
                            )}
                            <span className='font-medium leading-4 mt-1'>{response?.current.condition.text}</span>
                            
                            <span className='mt-3 leading-5'>{response?.location.name}, {response?.location.country}</span>
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

                    <div className='w-full mt-8 px-4 bg-cyan-600 bg-opacity-40 shadow-md rounded-sm'>

                        <div className='flex w-full py-4 overflow-x-scroll md:no-scrollbar'>
                            {response?.forecast.forecastday[0].hour.map((hour) => (
                                <div key={hour.time} className='min-w-18 flex flex-col flex-shrink-0 items-center text-white text-sm font-medium'>
                                    <span className='-mb-1'>{hour.time.slice(11, 16)}</span>
                                    <img className='w-full hover:scale-110 hover:rotate-3 hover:duration-150' src={hour.condition.icon} alt="" />
                                    <span className='-mt-1 text-xs'>{unit === 'C' ? hour.temp_c : hour.temp_f} º{unit}</span>
                                </div>
                            ))}                   
                        </div>

                    </div>

                    <Graph
                    variation={response?.forecast.forecastday[0].hour!}
                    lang={lang}
                    unit={unit}
                    />

                    <div className='w-full mt-5 px-4 pt-1 pb-3 bg-cyan-600 bg-opacity-40 shadow-md rounded-sm text-white'>
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

                </div>

                <Footer />
                
            </main>
        </>
    )

}