import React from 'react'

const List = () => {
  return (
       <>
          {[...Array(9)].map((el, index) => {
           return(<div className='card' key={index}>
                    <h1 className='card__heading'>
                      <span className='card__heading-span '>
                          {(() => {
                              switch(index){
                                  case 0:
                                      return "Jardineria/Piscinas";
                                  case 1:
                                        return "Trabajos Generals";
                                  case 2:
                                     return "Servicio de Limpieza";
                                  case 3:
                                        return "Electronica/Informatica";
                                  case 4:
                                        return "Cosmetica/Estética";
                                  case 5:
                                        return "Construccion/Carpinteria";
                                  case 6:
                                        return "Tutores/Cursos";
                                  case 7:
                                        return "Transportes/Correo";
                                  case 8:
                                        return "Artistico/Creativo";
                                  case 9:
                                            return "Artistico/Creativo";
                                  default:
                                    return ""
                              }

                          })()}
                                    
                       </span>
                    </h1>
                    <div className={`card__cato-${index}`}>
                       
                    </div>
           </div>)
       })}
       </>
     
 
  )
}

export default List