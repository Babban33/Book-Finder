import './loader.css';
function Loader(){
  return(
    <div className="preloader">
    <div className="dots-container">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="preloader-text">
      Loading...
    </div>
  </div>
  )
}

export default Loader;