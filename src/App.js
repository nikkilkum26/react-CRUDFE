import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [Name, setName] = useState('');
  const [Age, setAge] = useState(0);
  const [studList, setStudList] = useState([])

  useEffect(() => {
    axios.get("https://crud-studlist.herokuapp.com/read").then((response) => {
      console.log(response)
      setStudList(response.data);
    })
  }, [])

  const addToList = () => {

    axios({
      method: 'post',
      url: "https://crud-studlist.herokuapp.com/insert",
      data: {
        Name: Name,
      Age: Age
      }
    }).then((response)=>{

      window.location.reload();
      console.log(response.data)
    })
    
    // console.log(Name + Age);
    // axios.post("https://crud-studlist.herokuapp.com/insert", {
    //   Name: Name,
    //   Age: Age
    // }).then((response)=>{

    //   // window.location.reload();
    //   console.log(response.data)
    // })
    
  }

  return (
    <div className="App">
      <div class="container">
    <h1>Crud</h1>
    <form class="my-4 form-inline">
      <label class="sr-only">Name:</label>
      <input type="text" class="form-control col mr-2"  required placeholder="Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label class="sr-only">age</label>
      <input type="number" class="form-control col mr-2" required placeholder="Age"
        onChange={(event) => {
          setAge(event.target.value);
        }}
      /></form>
      <button class="btn btn-success" onClick={addToList}>Add to list</button>
      <h1> Students List</h1>
      <table class="table table-striped table-responsive center">
      <thead>
        <tr>
        <th >Name</th>
        <th>Age</th>
        </tr>
      </thead>
      {studList.map((val, key) => {
          return (

            
              <tbody key={key}>
                <tr class="col-md-4">
                  <td>{val.Name}</td>
                   <td>{val.Age}</td>
                </tr>
              
            </tbody>

          )
        })
      }
      </table>
    </div>
    </div>
  );
}

export default App;
