interface toggleUnitInterface{
    unit: string,
    handleChangeUnit: (unit: string) => void;
}

export default function ToggleUnit({unit, handleChangeUnit}: toggleUnitInterface){

    return(
        <div className="flex gap-x-2 text-white">
            <div className={`h-5 w-8 bg-cyan-800 flex items-center justify-center hover:cursor-pointer ${unit === 'C' ? 'ring-1 ring-sky-600' : 'brightness-75 ring-0'}`}
            onClick={() => {handleChangeUnit('C')}}>
                ºC
            </div>
            <div className={`h-5 w-8 bg-cyan-800 flex items-center justify-center hover:cursor-pointer ${unit === 'F' ? 'ring-1 ring-sky-600' : 'brightness-75'}`}
            onClick={() => {handleChangeUnit('F')}}>
                ºF
            </div>                        
        </div>
    )

}