import React from 'react'
import { useSelector } from 'react-redux'

export function SearchResult() {
    const searched  = useSelector(state=>state.search.searched)
    console.log(searched)
    return (
        <div>
            {
                searched.length === 0 ?<div>No Result Found</div> :(
                    searched.map(item=>(
                        <div key={item.jobkey}>
                            <br/>
                            <div>Title : {item.jobtitle}</div>
                            <div>Comapny : {item.company}</div>
                            
                        </div>
                    ))
                )
            }
        </div>
    )
}
