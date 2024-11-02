import { useRef, useState } from 'react';
import './App.css';
import Logo from './components/Logo'
import songs from './components/songs/songs';
import Card from './components/card';

songs.sort((a, b) => {
  if (a.title < b.title) return -1; 
  if (a.title > b.title) return 1;  
  return 0;                        
});
let temp=0;
songs.forEach(element => {
  element.index=temp;
  temp+=1;
});

function App() {
  const [i,seti]=useState(-1);
  const [search,setSearch]=useState("");
  const audio=useRef(null);
  const range=useRef(0);
  const [isplaying,setispalying]=useState(false);
  function next(){
    if(i+1>=songs.length){
      seti(0);
      return;
    }
    if(isplaying===false) setispalying(!isplaying);
    seti(i+1);
  }
  function prev(){
    if(i-1<0){
      return;
    }
    setispalying(!isplaying);
    seti(i-1);
  }
  function play(){
    isplaying?audio.current.pause():audio.current.play();
    setispalying(!isplaying);
  }
  const handleTimeUpdate = () => {
    if (audio.current) {
      const currentTime = audio.current.currentTime;
      const duration = audio.current.duration || 0;
      const percentage = (currentTime / duration) * 100;
      if (range.current) {
        range.current.value = percentage;
      }
    }
  };

  const changeRange = (e) => {
    // audio.current.pause();
    const newTime = (e.target.value / 100) * audio.current.duration;
    audio.current.currentTime = newTime;
    if(!isplaying){
      audio.current.pause();
    }
    // audio.current.play();
  };
  const selectSong = (index) => {
    if(i===index){
      if(isplaying){
        setispalying(false);
        audio.current.pause();
        return;
      }
      setispalying(true);
      audio.current.play();
      return;
    }
    seti(index);
    setispalying(true); 
    // audio.current.play();
  };

  const filtered=songs.filter(song => song.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="App">
      <div className='menu'>
        <div className='menuBox'>
          <input type='text' onChange={(e)=>setSearch(e.target.value)} placeholder='Search Songs'></input>
            {
              filtered.length>0?(
                filtered.map((song,index)=>(
                  <div className={`li ${song.index===i?'active':''}`} onClick={()=>selectSong(song.index)} key={index}>
                    <img id='liimg1' alt='.' src={song.imgsrc}/>
                    <span>{song.title}</span>
                    <img
                      id='gif'
                      src={require('./components/giffinal.webp')} 
                      alt="Hutter Consult Huco Sticker"/>
                  </div>
                ))
              ):
              (
                <p>no songs found</p>
              )
            }
        </div>
      </div>
      <Card>

        {
          i===-1?(
            <div style={{color:'white'}}>SELECT SONG</div>
          ):
          (
          <>
            <div className='logo'>
              <Logo imgsrc={songs[i].imgsrc} name={songs[i].title} artist={songs[i].artist}/>
            </div> 
            <div className='line'>
              <input type="range" ref={range} min="0" max="100" step="1" value={0} onChange={changeRange}/>
            </div>
            <div className='control'>
              <audio src={songs[i].audsrc} ref={audio} autoPlay onEnded={next} onTimeUpdate={handleTimeUpdate}></audio>
              <div className='buttons'>  
                <button onClick={prev}>◀◀</button>
                <button onClick={play}>{isplaying?'❚❚':'▶'}</button>
                <button onClick={next}>▶▶</button>
              </div>
            </div>
            </>
          )
        }
        
      </Card>
      <div className='extra'></div>
  
    </div>
  );
}

export default App;
