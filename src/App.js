import { useEffect, useState } from "react"
import './App.css';
import { Display } from "./Components/Display"
import { InputPerson } from "./Components/InputPerson"
import { LoginScreen } from "./Components/LoginScreen"
import { useCallback } from 'react';
import './my-bulma-project.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
				<div className='App'>
          <LoginScreen/>
				</div>
			</div>
		</>
  );
}

export default App;
