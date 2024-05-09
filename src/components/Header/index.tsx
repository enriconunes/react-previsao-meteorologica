import { useState } from "react";

// icons
import { MdMenu } from "react-icons/md";

interface headerProps{
    lang: string
    handleChangeLang: (lang: string) => void;
}

export default function Header({handleChangeLang, lang}: headerProps){

    const [menuView, setMenuView] = useState(false)

    return(
        <>
            <header className="w-full bg-cyan-700 h-12 flex items-center justify-between px-2 md:px-5 text-white">
                
                <div className="font-medium text-xl">
                    <span>Wit Weather</span>
                </div>

                <div onClick={() => setMenuView(!menuView)}>
                    <MdMenu className="hover:cursor-pointer" size={30}/>
                </div>

            </header>

            <div className={`h-full flex flex-col ${menuView ? "" : "hidden"} absolute w-full z-50 text-white`}>
                <ul className="w-full h-fit bg-cyan-800 py-3 px-4 md:px-5 shadow-lg">

                    <li>
                        <div className="w-full flex flex-col items-end">
                            <span>{lang === 'pt' ? "Idioma" : "Language"}</span>
                            <div className="flex gap-x-2 mt-1">

                                <button
                                className={`h-5 w-8 ${lang === 'pt' ? "border border-gray-300" : "brightness-50"}`}
                                onClick={() => handleChangeLang('pt')}>
                                    <img className="h-full w-full" src="./assets/br.png" alt="" />
                                </button>

                                <button
                                className={`h-5 w-8 ${lang === 'en' ? "border border-gray-300" : "brightness-50"}`}
                                onClick={() => handleChangeLang('en')}>
                                    <img className="h-full w-full" src="./assets/us.png" alt="" />
                                </button> 

                            </div>
                        </div>
                    </li>
                </ul>

                {/* out of menu */}
                <div
                className="h-full w-full"
                onClick={() => setMenuView(!menuView)}>

                </div>
            </div>
        </>
    )

}