
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import User from './components/User';

import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    
  return (
    <div className="App">
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div class="container px-4">
            </div>
           <div>
                    <a href='User' className='btn btn-outline-success btn-lg me-4'>User</a>
            </div>
        </nav>
    
               <BrowserRouter>
               <Routes>
                    <Route path='User' element= {<User />}></Route>
                    
               </Routes>
                    
               </BrowserRouter>

    </div>
  );
}

export default App;
