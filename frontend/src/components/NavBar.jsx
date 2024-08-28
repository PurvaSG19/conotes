import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../screens/Button'

const NavBar = () =>
{
    return (
        <div>
            <div className='flex justify-between items-center mb-2 '>
                <div>
                    <h1 className='font-semibold sm:text-2xl md:text-3xl lg:text-4xl'>Co<span className='text-lime-600'>Notes</span></h1>
                </div>

                <div className='flex gap-4 items-center'>
                    <Link to='/'><h4 className='text-black duration-200 hover:text-lime-200'>Home</h4></Link>
                    <Link to='/add'><h4 className='text-black duration-200 hover:text-lime-200'>Add Note</h4></Link>
                </div>

                
            </div>

            <div> 
                    <div className='bg-gray-400 h-0.5 rounded-md font-extralight w-full mx-auto mb-2'></div>
            </div>
    </div>
    )
}

export default NavBar