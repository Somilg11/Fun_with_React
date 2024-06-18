import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(),todo, isCompleted: false}])
    setTodo("")
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container bg-yellow-600 p-5 md:mx-auto my-5 rounded-md min-h-[80vh] md:w-4/5">
        <div className="addTodo">
          <h1 className='text-lg font-bold text-white'>Add a Todo</h1>
          <input onChange={handleChange} value={todo}className='bg-zinc-800 text-white rounded-md p-2 my-3 outline-none w-2/3' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-zinc-800 hover:bg-zinc-900 disabled:bg-yellow-700 text-white font-bold px-3 py-2 rounded-md mx-6'>Add</button>
        </div>
        <input onClick={toggleFinished} type="checkbox" defaultChecked={showFinished}/><span className='font-bold px-2 text-yellow-800'> Show Finished</span>
          <h1 className='text-2xl font-bold'>Your DOdoss</h1>
          <div className="todos">
            {todos.length === 0 && <div className='text-3xl my-5 font-bold text-yellow-700'>No DOdoss to Display . . .</div>}
            {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-4/5 justify-between text bg-zinc-800 text-white rounded-md px-2 py-1 my-1 outline-none align-middle">
              <div className='flex gap-5'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through font-semibold py-2":"font-semibold py-2"}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-zinc-800 hover:bg-zinc-900 text-yellow-600 font-bold px-2 py-1 rounded-md mx-1 my-1'>Edit</button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-zinc-800 hover:bg-zinc-900 text-red-600 font-bold px-2 py-1 rounded-md mx-1 my-1'>Delete</button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
