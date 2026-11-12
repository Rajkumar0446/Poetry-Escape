import { useEffect, useState } from "react"; 
import "./App.css"; 
const images = [ 
"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2200&q=85", 
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85", 
  
"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85", 
  
"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=85", 
  
"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=85", 
]; 
 
function randomItem(list) { 
  return list[Math.floor(Math.random() * list.length)]; 
} 
 
export default function App() { 
  const [background, setBackground] = useState( 
    () => randomItem(images) 
  ); 
 
  const [quote, setQuote] = useState({ 
    text: "Somewhere, something incredible is waiting to be known.", 
    author: "Carl Sagan", 
  }); 
 
  const [loading, setLoading] = useState(false); 
 
  async function loadQuote() { 
    setLoading(true); 
 
    try { 
      const response = await fetch( 
        "https://dummyjson.com/quotes/random" 
      ); 
 
      if (!response.ok) { 
        throw new Error("Could not load quote"); 
      } 
 
      const data = await response.json(); 
 
      setQuote({ 
        text: data.quote, 
        author: data.author, 
      }); 
    } catch { 
      setQuote({ 
        text: "The quietest moments often carry the loudest meaning.", 
        author: "A little reminder", 
      }); 
    } finally { 
      setLoading(false); 
    } 
  } 
 
  function changeScene() { 
    setBackground((current) => { 
      const choices = images.filter( 
        (image) => image !== current 
      ); 
 
      return randomItem(choices); 
    }); 
 
    loadQuote(); 
  } 
 
  useEffect(() => { 
    loadQuote(); 
 
    const timer = setInterval(loadQuote, 12000); 
 
    return () => clearInterval(timer); 
  }, []); 
 
  return ( 
    <main 
      className="experience" 
      style={{ 
        backgroundImage: `url("${background}")`, 
      }} 
    > 
      <div className="shade"></div> 
 
      <nav className="topbar"> 
        <a className="brand" href="#"> 
          <span className="brand-mark">✦</span> 
          STILL / HERE 
        </a> 
 
        <span className="top-note"> 
          A MOMENT FOR YOURSELF 
        </span> 
      </nav> 
 
      <section className="content"> 
        <p className="eyebrow"> 
          <span></span> 
          A SMALL PAUSE IN A LOUD WORLD 
        </p> 
 
        <p className="chapter">FIELD NOTES — 001</p> 
 
        <blockquote key={quote.text} className="quote"> 
          “{quote.text}” 
        </blockquote> 
 
        <p className="author">— {quote.author}</p> 
 
        <div className="rule"></div> 
 
        <p className="description"> 
          Breathe in the view. Let the words find you. 
          You don’t have to be anywhere else right now. 
        </p> 
 
        <button 
          className="discover" 
          onClick={changeScene} 
          disabled={loading} 
        > 
          {loading 
            ? "Finding a thought..." 
            : "Find a new moment"} 
 
          <span aria-hidden="true"> ↗</span> 
        </button> 
      </section> 
 
      <footer className="footer"> 
        <span>COLLECT MOMENTS, NOT THINGS.</span> 
 
        <span className="live"> 
          <i></i> 
          WORDS FOR THE WAY 
        </span> 
      </footer> 
    </main> 
  ); 
} 