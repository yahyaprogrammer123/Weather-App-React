import { useEffect, useState } from "react";

import "./App.css";
import Temprature from "./components/Temprature";
import Highlights from "./components/Highlights";

function App() {
  // const apiURL="https://api.weatherapi.com/v1/current.json?key=023301049bce4a35b5f181736250103&q=Yemen&aqi=no"
  const [city, setCity] = useState("Sanaa");
  const [weatherData, setWeatherData] = useState(null);
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=023301049bce4a35b5f181736250103&q=${city}&aqi=no`;
  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">yyyyy</h1> */}
      <div className="bg-[#1F213A] h-screen flex justify-center align-top">
        <div className="mt-40 w-1/5 h-1/3">
          {weatherData && (
            <Temprature
              setCity={setCity}
              stats={{
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                isDay: weatherData.current.is_day,
                location: weatherData.location.name,
                time: weatherData.location.localtime,
              }}
            />
          )}
        </div>
        <div className=" mt-40 w-1/3  h-1/3 p-10 grid grid-cols-2 gap-6">
          <h2 className="text-slate-200 text-2xl col-span-2">
            Today Highlights
          </h2>
          {weatherData && (
            <>
              <Highlights
                stats={{
                  title: "wind Status",
                  value: weatherData.current.wind_mph, //سرعة رياح
                  unit: "mph",
                  direction: weatherData.current.wind_dir,
                }}
              />
              <Highlights
                stats={{
                  title: "Humidity", //الرطوبة
                  value: weatherData.current.humidity,
                  unit: "%",
                }}
              />
              <Highlights
                stats={{
                  title: "visibility", // الرؤيةلبعد اميال
                  value: weatherData.current.vis_miles,
                  unit: "miles",
                }}
              />
              <Highlights
                stats={{
                  title: "Air Pressure", //ضغط الهواء
                  value: weatherData.current.pressure_mb,
                  unit: "mb",
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
