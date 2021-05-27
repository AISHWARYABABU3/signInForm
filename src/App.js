import React from "react";
import SignInForm from './components/signInForm';
import { ToastContainer } from "react-toastify";
import './App.css';

const App = () => {
  return ( 
    <React.Fragment>
      <ToastContainer />
      <div className="container">
        <SignInForm/>
      </div>
    </React.Fragment>
   );
}
 
export default App;
