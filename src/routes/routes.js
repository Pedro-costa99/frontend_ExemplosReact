import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn } from '../pages/SignIn'
import Profile from '../pages/Profile'
import Costumers from '../pages/Costumers'
import {Dashboard} from '../pages/Dashboard'
import New from '../pages/New';
import { PrivateRoutes } from ".";

export const AppRoutes = () => {
   return (
     <BrowserRouter>
       <Fragment>
         <Routes>
           <Route path="/" element={<SignIn />} />
           <Route path="/dashboard" element={<PrivateRoutes />}>
             <Route path="/dashboard" element={<Dashboard />} />
           </Route>
           <Route path="/profile" element={<PrivateRoutes />}>
             <Route path="/profile" element={<Profile />} />
           </Route>
           <Route path="/costumers" element={<PrivateRoutes />}>
             <Route path="/costumers" element={<Costumers />} />
           </Route>
           <Route path="/new" element={<PrivateRoutes />}>
             <Route path="/new" element={<New />} />
           </Route>
         </Routes>
       </Fragment>
     </BrowserRouter>
   );
 };





