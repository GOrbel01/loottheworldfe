import { GOOGLE_AUTH_URL } from '../../index'
import googleLogo from '../../img/icons/google-logo.png'

function UnAuthMenuComponent() {
    return (
        <div>            
            <header>
               <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
               <div className='container-fluid'>
               <a className="navbar-brand ltw-menu" href="#">LTW Item Editor</a>
               <div id="buttonDiv"></div>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
               </button>
                   <div className="collapse navbar-collapse" id="navbarNavDropdown">
                       <ul className="navbar-nav">
                           <li className="nav-item ltw-menu-item">
                                   <a className="nav-link" href={GOOGLE_AUTH_URL}>
                                   <img style={{width: 30+'px', height: 30+'px'}} src={googleLogo} alt="Google" />Log in with Google</a>
                           </li>
                       </ul>
                   </div>
               </div> 
               </nav>
           </header> 
       </div>
    )
}

export default UnAuthMenuComponent