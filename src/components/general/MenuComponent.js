import React, { Component } from 'react'
import '../../styles/general/menu.css'
import { withParamsAndNavigate } from "../getParamsAndNavigate";


class MenuComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>            
                 <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className='container-fluid'>
                            <a className="navbar-brand ltw-menu" href="#">LTW Item Editor</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item ltw-menu-item active">
                                        <a className="nav-link" href="/home">Home <span className="sr-only"></span></a>
                                    </li>
                                    <li className="nav-item  ltw-menu-item">
                                        <a className="nav-link" href="/items">Items</a>
                                    </li>
                                    <li className="nav-item  ltw-menu-item">
                                        <a className="nav-link" href="/stats">Stats</a>
                                    </li>
                                    <li className="nav-item dropdown ltw-menu-item">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                        More Options
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="/rarities">Loot Rarities</a>
                                        {/* <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>  */}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </nav>
                </header> 

            </div>
        )
    }
}

export default withParamsAndNavigate(MenuComponent)