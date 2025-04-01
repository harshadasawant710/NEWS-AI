import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router-dom';
import LogIn from '../src/Pages/LogIn';
import Register from './Pages/Register';
import Preferences from './Pages/Preferences';
import { Toaster, toast } from 'sonner'
//import Home from './Pages/Home';
import ProtectedRoutes from './components/ProtectedRoutes';
import LoadingSpinner from './components/LoadingSpinner';
import PreferenceProtectRoutes from './components/PreferenceProtectRoutes';
import Footer from './components/Footer';

const Home = lazy(() => import('./Pages/Home'));
const Profile = lazy(() => import('./Pages/Profile'))
const Catagory = lazy(()=> import ('./components/Catagory'))
const About = lazy(()=> import ('./Pages/About'))
const News = lazy(()=> import ('./Pages/News'))
const AdminDashboard = lazy(()=> import ('./components/AdminDashboard'))
const World = lazy(()=> import('./Pages/World'))


const App = () => {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/catagory' element={<Catagory />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/news' element={<News/>}></Route>
            <Route path='/adminDashboard' element={<AdminDashboard/>}></Route>
            <Route path='/world' element={<World/>}></Route>
            <Route element={<PreferenceProtectRoutes />}></Route>
            <Route path='/preferences' element={<Preferences />}></Route>
          </Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default App
