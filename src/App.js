import logo from './logo.svg';
import './App.css';
import data from "./data.json";
import Header from './Header';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, collection, query, orderBy, onSnapshot, serverTimestamp, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

function App() {
  const [toDoList, setToDoList] = useState([])

  const q = query(collection(db,'todo'), orderBy('timestamp','desc'));

  useEffect(() => {
    onSnapshot(q, (snapshot)=>{
      setToDoList(snapshot.docs.map(doc => doc.data()))
    })
  }, []);

  const handleToggle = async (id) => {
    console.log("id", id)
    let mapped = toDoList.map(task => {
      return task.id == id ? { ...task, complete: !task.complete} :  { ...task }
    })
    setToDoList(mapped)

    const updateRef = doc(db, "todo", id);
    const docSnap = await getDoc(updateRef);
    console.log("docsnap data", docSnap.data());
    //console.log("vals", getDoc(updateRef).data())
    updateDoc(updateRef, {
      "complete": !docSnap.data().complete
    });
  }

  const handleFilter = () => {
    // let filtered = toDoList.filter(task => {
    //   return !task.complete;
    // })

    let filteredArray = [];
    for(let task of toDoList) {
      if(!task.complete) {
        filteredArray.push(task)
      } else {
        const deleteRef = doc(db, "todo", task.id);
        deleteDoc(deleteRef);
      }
    }

    setToDoList(filteredArray)
  }

  const addTask = (userInput ) => {
    addDoc(collection(db,'todo'), {
      task: userInput,
      complete: false,
      timestamp: serverTimestamp()
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      const updateRef = doc(db, "todo", docRef.id);

      updateDoc(updateRef, {
        "id": docRef.id,
        "key": docRef.id
      });

      //updating local state
      let copy = [...toDoList];
      copy.push({id: docRef.id, key: docRef.id, task: userInput, complete: false });
      setToDoList(copy);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    
  }

  return (
    <div className="App">
      <Header />
      <ToDoList 
        toDoList={toDoList}
        handleToggle={handleToggle}
        handleFilter={handleFilter}  
      />

      <ToDoForm addTask={addTask} />
    </div>
  );
}

export default App;
