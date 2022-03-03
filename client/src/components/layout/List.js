import React from 'react'

const List = () => {
  return (
       <>
          {[...Array(9)].map((el, index) => {
           return(<div className='card' key={index}>
                    <div className='card__cato'>

                    </div>
           </div>)
       })}
       </>
     
 
  )
}

export default List