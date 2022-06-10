/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/function-component-definition */
import React, { useCallback } from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../image/not-found.png'
import { FlexGrid } from '../styled';
import {useShows} from '../../misc/custom-hooks';


const ShowGrid = ({data}) => {
  const [starredShows,dispatchStarred] = useShows();

  
  const onStarClick=useCallback((ShowId,isStarred)=>{
  if(isStarred){
    dispatchStarred({type:"REMOVE",showId:ShowId})
  }else{
    dispatchStarred({type:'ADD',showId:ShowId})
  }


},[dispatchStarred]);
  return (
    <FlexGrid>
        {
        data.map(({show})=>{
          
        return (<ShowCard key={show.id} id={show.id}
        name={show.name} image={show.image ? show.image.medium : IMAGE_NOT_FOUND }
        summary={show.summary}
        onStarClick={onStarClick}
        isStarred={starredShows.includes(show.id)}
        /> 
        );
      })
      };
        
    </FlexGrid>
  )
}

export default ShowGrid