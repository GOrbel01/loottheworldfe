import React, { Component } from 'react'
import '../../../styles/general/itemedit.css'
import { withParamsAndNavigate } from "../../getParamsAndNavigate";

class CreateWeaponComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id: this.props.params.id,
            name: '',
            itemtype: 'weapon',
            errors: {},
        };


    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
        this.props.updateChild(event.target.value);
    }

    validateItems() {
        let name = this.state.name;

        let errors = {};
        let hasErrors = false;
        let re = new RegExp(".*[a-zA-Z].*");
        if (name.length <= 0) {
            errors['name'] = "Item name cannot be empty."
            hasErrors = true;
        }
        if (name.length > 0 && !re.test(name)) {
            errors['name'] = "Weapon name must contain atleast one letter."
            hasErrors = true;
        }

        this.setState({errors: errors});
        return hasErrors;
    }

    render() {
        if (this.props.itemtype === 'weapon') {
            return (          
                <fieldset>
                <div className = "form-group weapon-form-item">
                    <label className='item-label'> Minimum Damage: </label>
                    <input type="number" placeholder="" name="weapondmgmin" className="form-control" 
                        value={this.state.weapondmgmin} onChange={this.props.minDmgHandler}/>
                        <span className='error' style={{ color: "red" }}>{this.state.errors['minDmgErrors']}</span>          
                </div>
                <div className = "form-group weapon-form-item">
                    <label className='item-label'> Maximum Damage: </label>
                    <input type="number" placeholder="" name="weapondmgmax" className="form-control" 
                        value={this.state.weapondmgmax} onChange={this.props.maxDmgHandler}/>      
                    <span className='error' style={{ color: "red" }}>{this.state.errors['maxDmgErrors']}</span>                                  
                </div>
            </fieldset>
            )
        }
    }
}

export default withParamsAndNavigate(CreateWeaponComponent)