import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useState, useEffect } from 'react';
import { Hour } from '../../utils/types/response';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface VariationProps {
  variation: Hour[];
  lang: string;
  unit: string;
}

export default function Graph({ variation, lang, unit }: VariationProps) {

  const [labels, setLabels] = useState<any>([]);
  const [tempValues, setTempValues] = useState<any>([]);
  const [unitToTitle, setUnitToTitle] = useState(unit)
  const [title, setTitle] = useState(`Temperatura ao longo do dia de hoje (º${unit})`)

  useEffect(() => {

    let hours = [];
    let temps = [];

    if (variation) {

      for (let cnt = 1; cnt < variation.length; cnt += 2) {
        hours.push(variation[cnt].time.slice(11, 16));

        if(unit === 'C'){
          temps.push(variation[cnt].temp_c);
        } else{
          temps.push(variation[cnt].temp_f);
        }
      }

      setLabels(hours);
      setTempValues(temps);      
    }

  }, [variation, unit]);

  useEffect(() => {
    // Atualiza os dados do gráfico sempre que labels ou tempValues mudarem
    updateChartData();
  }, [labels, tempValues]);

  useEffect(() => {

    if(lang === 'pt'){
      setTitle(`Temperatura ao longo do dia de hoje (º${unitToTitle})`)
    } else{
      setTitle(`Today's temperature trend (º${unitToTitle})`)
    }

  }, [lang, unitToTitle])

  useEffect(() => {

    setUnitToTitle(unit)

  }, [unit])

  const updateChartData = () => {
    const newData = {
      labels: labels,
      datasets: [
        {
          fill: true,
          label: '',
          data: Object.fromEntries(labels.map((label: string, index: number) => [label, tempValues[index]])),
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      ],
    };

    setChartData(newData);
  };

  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] }); 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        color: 'white',
        paddingBottom: 20,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(21, 94, 117, 0.3)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(21, 94, 117, 0.3)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  // Garante que chartData seja atualizado antes de retornar o gráfico
  return(
    chartData.labels.length > 0 ?
      <Line className='bg-cyan-600 bg-opacity-40 shadow-md rounded-sm py-3 md:px-3 md:max-h-56 mt-5' options={options} data={chartData} />
    :
      null
  );
}
