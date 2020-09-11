import React from 'react'

export default function Title({title}) {
    return (
        < h1 style={{fontSize:'30px', fontWeight:900, color:'#343A40', display:'block', margin:'10px auto'}}> 
            {title}
        </h1>
    )
}
