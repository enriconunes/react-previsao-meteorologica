import { useState, useEffect } from "react";

// icons
import { IoIosSearch } from "react-icons/io";

interface inputProps{
  handleSearch: (inputValue: string) => Promise<void>;
  lang: string
}

export default function InputCity({handleSearch, lang}: inputProps) {

  const [place, setPlace] = useState("Previsão do tempo")

    useEffect(() => {
        if(lang === 'pt'){
            setPlace("Buscar cidade")
        } else{
            setPlace("Search city")
        }
    }, [lang])

  const [inputValue, setInputValue] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();

      if(inputValue === ''){
        return
      }

      handleSearch(inputValue);
  };

  return (

    <form className="relative rounded-sm shadow-sm w-full"
    onSubmit={handleSubmit}>

      <input
        value={inputValue}
        onChange={(e:any) => {setInputValue(e.target.value)}}
        type="text"
        name="city"
        id="city"
        className="block w-full rounded-sm border-0 py-2 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white focus:placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 bg-white bg-opacity-40"
        placeholder={place}
      />
      
      <div className="absolute inset-y-0 right-0 flex items-center px-3 text-white">
        <button
        type="submit">
              <IoIosSearch size={24}/>
        </button>
      </div>

    </form>

  )
}