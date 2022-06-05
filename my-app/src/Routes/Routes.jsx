import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CompanyReviews } from '../Components/Pages/CompanyReviews';
import AppliedJobs from '../Components/Pages/AppliedJobs';
import DisplayJobs from '../Components/Pages/DisplayJobs';
import Home from '../Components/Pages/Home';
import { Login } from '../Components/Pages/Login';
import PostJob from '../Components/Pages/PostJob';
import { Register } from '../Components/Pages/Register';
import { Review } from '../Components/Pages/Review';
import SavedJobs from '../Components/Pages/SavedJobs';
import PrivateRoute from './PrivateRoute';

function Routes(props) {
    return (
        <div>
            <Switch>
                
                <PrivateRoute exact path="/" Component={Home} />
                <PrivateRoute exact  path="/postJob" Component={PostJob}/>
                <PrivateRoute exact  path="/savedJobs" Component={SavedJobs}/>
                <PrivateRoute exact  path="/appliedJobs" Component={AppliedJobs}/>
                <PrivateRoute  path="/jobs" Component={DisplayJobs}/>
                
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/Register' exact>
                    <Register />
                </Route>
                <PrivateRoute exact path="/" Component={Home} />
                <PrivateRoute   path="/jobs" Component={DisplayJobs}/>
                <PrivateRoute  path="/companies" Component={CompanyReviews}/>
                <PrivateRoute path = "/reviews" exact Component = { Review } />
            </Switch>
        </div>
        
    );
}

export default Routes;