import React from 'react'
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';

const MySkill = () => {

 
  const {data,isLoading} = useLoadUserQuery();
  const mySkill = data?.user.enrolledCourses || [];
  return (
    <div className='max-w-4xl mx-auto my-10 px-4 md:px-0'>
      <h1 className='font-bold text-2xl'>MY Skill</h1>
      <div className='my-5'>
        {
          isLoading ? (
            <MySkillSkeleton />
          ) : mySkill.length === 0 ? (<p>
            You are not enrolled in any course
          </p>) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {mySkill.map((course, index) => <Course key={index} course={course}/>)
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MySkill

const MySkillSkeleton = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4'>
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className='bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-infinite-pulse'
      ></div>
    ))}
  </div>
);
