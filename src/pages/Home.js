import React,{useState} from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

function Home (){
    const [input,setInput]=useLastQuery();
    const [results,setResults]= useState(null);
    const [searchOption,setsearchOption]=useState('shows');

    const isShowSearch= searchOption==='shows';
    const onInputChange=(ev)=>{
        setInput(ev.target.value);
    }


    const onSearch=()=>{
        apiGet(`/search/${searchOption}?q=${input}`).then(result=>{setResults(result)});
    }


    const onkeydown=(ev)=>{
        if (ev.keyCode === 13){
            onSearch();
        }
    }

    // eslint-disable-next-line consistent-return
    const renderResults=()=>{
        if(results && results.length===0){
           return <div>No results</div> 
        }
        if(results && results.length>0){
            return results[0].show ? <ShowGrid data={results}/>: <ActorGrid data={results}/>
        } 
         
        return null;
    }

    const onRadioChange=(ev)=>{
        setsearchOption(ev.target.value);
    }

  return (
    <MainPageLayout>
        <SearchInput type="text" onChange={onInputChange} onKeyDown={onkeydown}  
        placeholder="search for something"
        value={input} />
        <RadioInputsWrapper>
            <div>
            
            <CustomRadio
            lable="Shows"
            id='shows-search' 
            checked={isShowSearch}
            value="shows" 
            onChange={onRadioChange}
            />
                </div>
            <div>   

            <CustomRadio
            lable="Actors"
            id='actors-search'  
            checked={!isShowSearch}
            value="people" 
            onChange={onRadioChange}
            />     
                </div>
        </RadioInputsWrapper>
        <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>Search</button>
        </SearchButtonWrapper>
        {renderResults()}
            
    </MainPageLayout>
  )
}

export default Home