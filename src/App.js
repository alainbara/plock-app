import { useEffect, useState } from "react"
import './App.css';
import { Display } from "./Components/Display"
import { InputPerson } from "./Components/InputPerson"
import { LoginScreen } from "./Components/LoginScreen"
import { useCallback } from 'react';
import './my-bulma-project.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { InscriptionScreen } from "./Components/InscriptionScreen";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {

  //function test à enlever plus tard
  const [data, setData] = useState([])


  const fetchData = useCallback(async () => {
    const data = await window.sqlite.userDB.readAllPerson()
    setData(data)
  }, [])

  useEffect(() => {
		fetchData()
	}, [fetchData])

  return (
    <>
			<div className='background'>
        <HashRouter>
          <Routes>
            <Route path='/' element={<LoginScreen />} />
            <Route path='/inscription' element={<InscriptionScreen />} />
            <Route path='/display' element={<Display data={data} />} />
            <Route path='/input' element={<InputPerson fetchData={fetchData} />} />
          </Routes>
        </HashRouter>
			</div>
		</>
  );
}
 
export default App;
