import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Link to={"/login/staff"}>Staff Login</Link>
      </div>
      <div>
        <Link to={"/login/student"}>Student Login</Link>
      </div>
    </div>
  );
}

export default App;
