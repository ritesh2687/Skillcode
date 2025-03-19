import { useState } from 'react';

import './App.css'
import { Button } from "./components/ui/Button";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import HeroSection from './pages/student/HeroSection';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { RouterProvider } from 'react-router-dom';
import Courses from './pages/student/Courses';
import MySkill from './pages/student/MySkill';
import Profile from './pages/student/Profile';
import Sidebar from './pages/admin/Sidebar';
import CourseTable from './pages/admin/course/CourseTable';
import Dashboard from './pages/admin/Dashboard';
import AddCourse from './pages/admin/course/AddCourse';
import EditCourse from './pages/admin/course/EditCourse';
import CreateLecture from './pages/admin/lecture/CreateLecture';
// import Course from './pages/student/Course';

const appRouter= createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<>
        <HeroSection />
        {/* course */}
        <Courses/>
        </>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"my-skill",
        element:<MySkill/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      //admin routs start from here
      {
        path:"admin",
        element:<Sidebar/>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          }
        ]
      },

    ],
    
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <RouterProvider router={appRouter}/>
    </main>
      
      
    </>
  )
}

export default App
