import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// components
import Header from '../../components/Header';
import ToggleUnit from '../../components/ToggleUnit';
import Title from '../../components/Title';
import InputCity from '../../components/InputCity';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastToday from '../../components/ForecastToday';
import Graph from '../../components/Graph';
import ForecastWeek from '../../components/ForecastWeek';
import Footer from '../../components/Footer';

// api config
import apiClient from '../../utils/api/setupApiClient';

// types
import { ForecastResponse } from '../../utils/types/response';


export default function Home(){

    const [response, setResponse] = useState<ForecastResponse>();
    const [city, setCity] = useState("Lisboa")
    const [lang, setLang] = useState("pt")
    const [unit, setUnit] = useState("C")
    const [toastMessage, setToastMessage] = useState("Nenhuma cidade foi encontrada com esse nome.")

    // switch between 'C' and 'F'
    function handleChangeUnit(newUnit: string){
        if(unit === newUnit){
            return
        }
        setUnit(newUnit)
    }

    // switch between 'en' and 'pt'
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

    // api request
    async function handleSearch(inputValue: string){
        try {
            const response = await apiClient.get(`forecast.json?key=4998fbbc09584e6e8f1191247240705&q=${inputValue}&days=5&aqi=no&alerts=no&lang=${lang}`);
            setResponse(response.data)
            setCity(inputValue)
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
            {/* set head */}
            <Helmet>
                <title>Previsão do tempo</title>
            </Helmet>

            <main className='min-h-screen bg-gradient-to-b from-cyan-600 to-sky-300'>
                
                <Header
                lang={lang}
                handleChangeLang={handleChangeLang}
                />

                {/* main container */}
                <div className='flex flex-col items-center justify-center px-4 py-2 md:pt-8 pb-6 md:max-w-2xl md:mx-auto'>

                    {/* component to switch measurement units */}
                    <div className="w-full flex flex-col pb-3">
                        <ToggleUnit
                        unit={unit}
                        handleChangeUnit={handleChangeUnit}
                        />       
                    </div>

                    <Title lang={lang}/>

                    <InputCity
                    handleSearch={handleSearch}
                    lang={lang}
                    />

                    {/* component to display current weather information. */}
                    <div className='w-full mt-8'>
                        {response && (
                            <CurrentWeather
                            response={response}
                            unit={unit}
                            />
                        )}
                    </div>

                    {/* component to display information throughout the day */}
                    <div className='w-full mt-8'>
                        {response && (
                            <ForecastToday
                            response={response}
                            unit={unit}
                            />
                        )}
                    </div>

                    {/* component to display temperature variation graph */}
                    <Graph
                    variation={response?.forecast.forecastday[0].hour!}
                    lang={lang}
                    unit={unit}
                    />

                    {/* component to display weekly weather forecast */}
                    <div className='w-full mt-5'>
                        {response && (
                            <ForecastWeek
                            response={response}
                            unit={unit}
                            convertToDayOfWeek={convertToDayOfWeek}
                            />
                        )}
                    </div>

                </div>

                <Footer />
                
            </main>
        </>
    )

}