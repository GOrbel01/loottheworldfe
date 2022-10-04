import React, { Component } from 'react'
import '../../../styles/general/itemedit.css'
import { withParamsAndNavigate } from "../../getParamsAndNavigate";

class CreateWeaponComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemtype: 'weapon',
        };


    }

    render() {
        if (this.props.itemtype === 'weapon') {
            return (          
                <fieldset>
                <div className = "form-group item-form">
                    <label htmlFor="minDmg" className='item-label'> Minimum Damage: </label>
                    <input type="number" placeholder="" name="weapondmgmin" className="form-control" 
                         onChange={this.props.minDmgHandler}/>   
                </div>
                <div className = "form-group item-form">
                    <label htmlFor="maxDmg" className='item-label'> Maximum Damage: </label>
                    <input type="number" placeholder="" name="weapondmgmax" className="form-control" 
                        onChange={this.props.maxDmgHandler} onSubmit={this.props.weaponSubmitHandler}/>                                 
                </div>
            </fieldset>
            )
        }
    }
}

export default withParamsAndNavigate(CreateWeaponComponent)