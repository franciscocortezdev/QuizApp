import { getAllCountrys } from '../../API/getAllCountrys'
import {useState, useEffect, useRef} from 'react';
import {Options} from '../Options/Options'
import './CountryGame.css'



export function CountryGame(){
  const [rand, setRand] = useState(Math.floor(Math.random()*110));
  const [countrys, setCountrys] = useState([]);
  const [load, setLoad] = useState(true);
  const [numQuestion, setnumQuestion] = useState(1)
  const numCorrect = useRef(0)

  useEffect(()=>{
    setLoad(true)
    
    getAllCountrys().then(data =>{
      const result = data.filter(country => country.hasOwnProperty('borders') && country.borders.length >= 2);
      setCountrys(result[rand]);
      setLoad(false)
      
    } );
  },[rand]);


  if(load){
    return (
      <div className='containerHead'>
        <h1 className='gameTitle'>What country is?</h1>
        <p className='Loading'>Cargando Picture....</p>
      </div>
    )
  }

  const codes = countrys.borders.slice(0,2);
  codes.push(countrys.cca3)
  const OPcodes = codes.sort();

  const handleBtnNext = () =>{
    setRand(Math.floor(Math.random()*110))
    setnumQuestion(prev => prev + 1)
    
  }
  const handleClick = (resc,e) => {
    let selected = e.target
    let correct = document.getElementById(resc)
   
    if(selected.innerText === resc){
      selected.classList.add('correct')
      numCorrect.current += 1
      return
    }
  
    selected.classList.add('incorrect')
    correct.classList.add('correct')
  }
  console.log(numCorrect)
  return(
    <>
    <div className='containerHead'>
    <h1 className='gameTitle'>What country is?</h1>

    
      
     <img className='countryImg' src={countrys.flags.png} alt={countrys.name.official} />
     </div>
    <div className='containerOptions'>

     {OPcodes.map(op =>( 
       <Options 
     key={op}
     code={op} 
     resC={countrys.name.official}
     clickOptions={handleClick}
     />

     ))}


    </div>
    <div className='containerBtn'>
    <p>Question: {numQuestion}/10</p>
    {numQuestion === 10 ? <a href='/gameEnd' >Resultado</a> : <button className='btnNext' onClick={handleBtnNext} >Next Country</button>}
    

    </div>

    </>
    
  )

}




















