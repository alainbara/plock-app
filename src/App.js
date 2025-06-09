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
    console.log("1 : window.sqlite", window.sqlite)
    console.log("2 : window.sqlite.userDB", window.sqlite?.userDB)
    console.log("3 : window.sqlite.userDB.readAllPerson", window.sqlite?.userDB?.readAllPerson)


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
      const token = await window.sqlite.login.userConnection(name, password)
      console.log(`Token: ${token}`)
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
				<div className='App'>
          <LoginScreen userConnection={userConnection} />
				</div>
			</div>
		</>
  );
}

export default App;

/*
          <InputPerson fetchData={fetchData} insertData={insertData} />
					<Display data={data} />
*/