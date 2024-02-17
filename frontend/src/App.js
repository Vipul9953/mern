import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const createUser = async (name, age) => {
    let Subject = ['Enter a Subject']
    try {
      await axios.post(`http://localhost:4000/new/user`, { name, age, Subject })
      setName("");
      setAge("");
      getAlluser();
    } catch (error) {
      alert(error);
    }
  }

  const getAlluser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/get/all/user`, { name: name, age: age })
      setUser(response.data.user);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAlluser();
  }, [])


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/user/${id}`)
      getAlluser();
    } catch (error) {
      console.log(error);
    }
  }

  const addSub = async (id) => {
    let sub = prompt("Enter a Subject");
    if (sub === null) {
      return;
    }

    if (sub === '') {
      sub = 'Enter a Subject'
    }

    try {
      await axios.put(`http://localhost:4000/add/subject/${id}`, { sub })
      getAlluser();
    } catch (error) {
      console.log(error);
    }
  }


  const deletesubject = async (id, key) => {
    try {
      await axios.put(`http://localhost:4000/delete/subject/${id}`, { key })
      getAlluser();
    } catch (error) {
      console.log(error);
    }
  }


  const updateSubject = async (id, key, argSubject) => {
    let sub = prompt("Enter Subject", argSubject);
    if (sub === null || sub === '') {
      sub = 'enter subject'
    }

    try {
      await axios.put(`http://localhost:4000/update/subject/${id}`, { sub, key })
      getAlluser();
    } catch (error) {
      console.log(error);
    }
  }
  const [flag, setFlag] = useState(false);
  const [nameageid, setNameAgeid] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  const UpdateUser = async (argsid, argsname, argsage) => {
    setFlag(true);
    setNameAgeid(argsid);
    setEditName(argsname);
    setEditAge(argsage);
  }

  const updateNameAge = async (id) => {
    try {
      await axios.put(`http://localhost:4000/user/${id}`, { name: editName, age: editAge })
      getAlluser();
      setFlag(false);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>

      <input type="text" required placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" required placeholder='age' value={age} onChange={(e) => setAge(e.target.value)} />
      <button onClick={() => createUser(name, age)}>Add</button>


      <table className="table table-bordered">
        <thead>
          <tr className='table-success'>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Subject</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>

          {
            user.map((item) => {
              return (
                <tr key={item._id}>
                  {
                    flag === true && nameageid === item._id ? <>   <th scope="row">
                      <input type="text" value={editName} style={{ maxWidth: "9.2rem" }} onChange={(e) => setEditName(e.target.value)} /></th>
                      <td><input type="text" value={editAge} style={{ maxWidth: "4rem" }} onChange={(e) => setEditAge(e.target.value)} />
                        <button onClick={() => updateNameAge(item._id)}>save</button>
                        <button onClick={() => setFlag(false)}>cancel</button>

                      </td>            </> : <><th scope="row"> {item.name}</th>
                      <td>{item.age}</td>  </>
                  }
                  {
                    item.Subject.map((subjects, index) =>

                      <td key={index} style={{ display: "flex", justifyContent: "space-between" }}>{subjects}
                        <button onClick={() => updateSubject(item._id, index, subjects)} className="btn btn-success">Edit Subject</button>
                        <button onClick={() => deletesubject(item._id, index)} className="btn btn-danger">-</button>
                      </td>
                    )
                  }

                  <button style={{ border: "none" }} onClick={() => addSub(item._id)}>Add</button>

                  <td><button onClick={() => UpdateUser(item._id, item.name, item.age)} className="btn btn-warning" >Edit</button>
                    <button onClick={() => deleteUser(item._id)} style={{ marginLeft: "1rem" }} className="btn btn-danger">delete</button></td>
                </tr>

              )
            }
            )}

        </tbody>
      </table>

    </>
  )
}

export default App