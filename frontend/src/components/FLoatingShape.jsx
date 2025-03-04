import React from 'react'
import {motion} from 'framer-motion'

const FLoatingShape = ({color,size,top,left,delay}) => {
  return (
    <motion.d className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl `}
    style={{top , left}}
    animate={{
        y:["0%","100%","0%"],
        x:["0%","100%","0%"],
        rotate:[0,360]
    }} area-hidden='true'
     transition={{
        duration:20,ease:'linear',repeat:Infinity,delay}}/>
  )
}

export default FLoatingShape