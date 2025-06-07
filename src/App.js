import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import Map from "./components/Map/Map";
import Charts from "./components/Charts/Charts";

const App = () => {
  console.log("App reached");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/map" component={Map} />
          <PrivateRoute exact path="/charts" component={Charts} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          {/* Optional: Add a fallback route for 404 */}
          <Route path="*">
            <h1>404 - Not Found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
