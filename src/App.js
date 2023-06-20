import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Home } from './components/Home';

import Studentlist from './components/Studentlist';
import OfferState from './context/offers/OfferState';
import StudentOfferState from './context/studentoffers/StudentOfferState';
import UserState from './context/user/UserState';

import Signup from './components/signup/Signup';
import Login from './components/login/Login';

import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
    <UserState>
      <StudentOfferState>
        <OfferState>
          <Router>
            <div className='my-0'>
              <Routes>
                <Route exact path="/" element={<Home  />} />
                <Route exact path="/login" element={<Login  />} />
                <Route exact path="/signup" element={<Signup  />} />
                <Route exact path="/studentlist/:id" element={<Studentlist />} />
                <Route exact path="/dashboard" element={<Dashboard  />} />

              </Routes>
            </div>
            {/* <div>
            <Routes>
            </Routes>
          </div> */}

          </Router>
        </OfferState>
      </StudentOfferState>
      </UserState>

    </>
  );
}

export default App;
