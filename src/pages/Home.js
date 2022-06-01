import React,{useState} from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

function Home (){
    const [input,setInput]=useState('');
    const [results,setResults]= useState(null);
    const [searchOption,setsearchOption]=useState('shows');

    const isShowSearch= searchOption==='shows';
    const onInputChange=(ev)=>{
        setInput(ev.target.value);
    }


    const onSearch=()=>{
        apiGet(`/search/${searchOption}?q=${input}`).then(result=>setResults(result));
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
        <input type="text" onChange={onInputChange} onKeyDown={onkeydown}  
        placeholder="search for something"
        value={input} />
        <div>
            <label htmlFor='shows-search'>
                Shows
                <input 
                id='shows-search' 
                type="radio" 
                checked={isShowSearch}
                value="shows" 
                onChange={onRadioChange}/>
            </label>
            <label  htmlFor='actors-search'>
                Actors
                <input id='actors-search' type="radio" 
                checked={!isShowSearch}
                value="people" 
                onChange={onRadioChange}/>
            </label>
        </div>
        <button type="button" onClick={onSearch}>Search</button>
        {renderResults()}
    </MainPageLayout>
  )
}

export default Home