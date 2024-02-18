import AddAvailableDate from './components/Addavailaibledates'
import Showavailibility from './components/Showavailibility';
import {Routes,Route} from 'react-router-dom'
import Register from './components/Register';
import Otp from './components/Otp';
import Login from './components/Login';
import Error from './components/Error';
function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/otp' element={<Otp />} />
        <Route path='/Adddates' element={<AddAvailableDate/>}/>
        <Route path='/Showdates' element={<Showavailibility/>}/>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
