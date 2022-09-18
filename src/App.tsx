import React from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [post, setPost] = React.useState(null)

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/').then((response) => {
      setPost(response.data)
    })
  }, [])
  console.log(post)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>{post}foakfo</p> */}
      </header>
    </div>
  )
}

export default App
