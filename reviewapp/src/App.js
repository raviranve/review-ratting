import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Signup} from './Reviewrating/components/auth/Signup'
import {Page404} from './Reviewrating/components/Page404'
import {Login} from './Reviewrating/components/auth/Login'
import { ResetPassword } from './Reviewrating/components/auth/ResetPassword';
import { Company_list } from './Reviewrating/components/company/Company_list';
import { CreateCompany } from './Reviewrating/components/company/CreateCompany';
import { CompanyDetails } from './Reviewrating/components/company/CompanyDetails';
import { AddNewReview } from './Reviewrating/components/company/AddNewReview';
import { Protected_route } from './Reviewrating/components/protected/Protected_route';
import { Navbar_new } from './Reviewrating/navbar/Navbar_new';
import { ForgetPassword } from './Reviewrating/components/auth/ForgetPassword';

function App() {
  return (
    <>
    {/* <ResetPassword/> */}
      <BrowserRouter>
        <Routes>
        <Route path='/' element = {<Login/>}></Route>
        <Route path='/signup' element = {<Signup/>}></Route>
        <Route path='/Navbar/' element={<Protected_route Component={Navbar_new}/>}></Route>
        <Route path='/createCompany/' element={<Protected_route Component={CreateCompany}/>}></Route>
        <Route path='/company_list/' element={<Protected_route Component={Company_list}/>}></Route>
        <Route path='/companydetail/:id' element={<CompanyDetails/>}></Route>
        <Route path='/addcompanyreview/:id' element={<AddNewReview/>}></Route>
        <Route path='/forgetpassword/' element = {<ForgetPassword/>}></Route>
        <Route path='/user/reset-password/:id/:token' element={<ResetPassword/>}></Route>
        <Route path='/*' element = {<Page404/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
