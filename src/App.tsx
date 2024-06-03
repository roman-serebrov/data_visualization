import SVGPlaces from "./components/svgPlaces";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import {getData} from "./api";
import { setChart } from "./api/chart";

import {COLUMN__SPACING, COLUMN__WIDTH, COLUMNS, HEIGHT__SVG, WIDTH__SVG} from "./util.ts";


function App() {
  
  const
      [data, setData]           = useState(null),
      [loading, setLoading] = useState(true),
      [error, setError]         = useState(null),
      [numberChart, setNumberChart] = useState(1);
  
  useEffect( () => {
     getData(`https://rcslabs.ru/ttrp${numberChart}.json`)
      .then(serverData => {
        setData(serverData)
        setLoading(false);
    })
      .catch(error => {
        setError(error)
    })
     
     if(error) {
       throw new Error(error);
     }
     
     if(data) {
       setChart(
        WIDTH__SVG,
        HEIGHT__SVG,
        COLUMN__WIDTH,
        COLUMN__SPACING,
        COLUMNS,
        'chart',
        data)
     }

  }, [loading, numberChart])


    return (
    <>
      <Header
        handlerChart={setNumberChart}
        handlerLoading={setLoading}
      />
      <div className={'content'}>
        <SVGPlaces
          loading={loading}
        // @ts-ignore
          title={data?.title}
        />
      </div>
    </>
  )
}

export default App
