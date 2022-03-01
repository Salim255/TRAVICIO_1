import React from 'react'

const List = () => {
  return (
    <div >
       {[...Array(9)].map((el, index) => {
           return(<div className='list__cato' key={index}>

           </div>)
       })}
    </div>
  )
}

export default List