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

    if (window.sqlite && window.sqlite.userDB && window.sqlite.userDB.readAllPerson) {
      const data = await window.sqlite.userDB.readAllPerson()
      setData(data)
    } else {
      console.error("window.sqlite.userDB.readAllPerson is not available")
    }
  }, [])

  const insertData = useCallback(async (name, password) => {
    await window.sqlite.userDB.insertPerson(name, password)
    fetchData()
  }, [fetchData])

  const userConnection = useCallback(async (name, password) => {
    try {
      return await window.sqlite.login.userConnection(name, password)
    } catch (error) {
      console.error("Connection failed:", error)
    }
  }, [])

  useEffect(() => {
		fetchData()
	}, [fetchData])

  return (
    <>
			<div className='background'>
        <HashRouter>
          <Routes>
            <Route path='/' element={<LoginScreen userConnection={userConnection} />} />
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

/*
          <InputPerson fetchData={fetchData} insertData={insertData} />
					<Display data={data} />
*/