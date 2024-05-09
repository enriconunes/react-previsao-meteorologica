import { useState, useEffect } from "react"

interface titleProps{
    lang: string
}

export default function Title({lang}: titleProps){

    const [title, setTitle] = useState("Previsão do tempo")

    useEffect(() => {
        if(lang === 'pt'){
            setTitle("Previsão do tempo")
        } else{
            setTitle("Weather forecast")
        }
    }, [lang])


    return(
        <div className='w-full mb-3'>
            <h1 className='text-3xl font-medium text-white'>{title}</h1>
        </div>
    )

}