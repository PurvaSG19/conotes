import React from 'react'

export default function Button(props) {
    const { text,func } = props
  return (
    <div>
      <button onClick = {func} className='bg-lime-600 text-white p-2 rounded-md duration-200 hover:bg-lime-500'>{text}</button>
    </div>
  )
}
