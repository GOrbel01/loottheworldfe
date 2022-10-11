import React, { Component } from 'react'
import '../../styles/general/itemedit.css'

import { withParamsAndNavigate } from "../getParamsAndNavigate";
import CreateWeaponComponent from './weapon/CreateWeaponComponent';
import StatService from '../../services/stat/StatService';
import Select from 'react-select';

class CreateItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            armor: 0,
            id: this.props.params.id,
            itemtype: this.props.itemtype,
            weapondmgmin: 0,
            weapondmgmax: 0,
            service: this.props.service,
            errors: {},
            itemstats: [],
            statFields: [],
            statOptions: [],           
        };

        let initialState = [];

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeMinDamageHandler = this.changeMinDamageHandler.bind(this);
        this.changeMaxDamageHandler = this.changeMaxDamageHandler.bind(this);
        this.addStatHandler = this.addStatHandler.bind(this);
        this.handleStatChange = this.handleStatChange.bind(this);
        this.handleDeleteStat = this.handleDeleteStat.bind(this);
        this.changeArmorHandler = this.changeArmorHandler.bind(this);
    }

    componentDidMount(){
        StatService.getStatsLookup().then((res) => {
            this.setState({
                statOptions: res.data
            });
        });

        if(this.state.id === '_add'){
            return
        }else{
            this.state.service.getItemById(this.state.id).then( (res) =>{
                let item = res.data;
                this.initialState = res.data;
                this.setState({
                    id: res.data.id,
                    name: item.name,
                    itemType: item.itemType,
                    armor: item.armor,
                    weapondmgmin: item.weapondmgmin,
                    weapondmgmax : item.weapondmgmax,
                    statFields: item.itemstats
                });
            });
        }        
    }

    saveOrUpdateItem = (e) => {
        e.preventDefault();
        let hasError = this.validateItem();
        if (hasError) {
            alert("Form has Errors.");
            return;
        }

        let iStats = [];
        if (this.state.statFields) {
            iStats = [...this.state.statFields];
        }

        let item = {id: this.state.id, name: this.state.name, armor: this.state.armor, weapondmgmin: this.state.weapondmgmin, weapondmgmax: this.state.weapondmgmax, itemType: this.state.itemtype,
            itemstats: iStats
        
        };

        if(this.state.id === '_add'){
            this.state.service.createItem(item).then(res =>{
                this.props.navigate('/items');
            });
        }else{       
            let diffs = this.processDiffs();
            this.state.service.updateItem(this.state.id, diffs).then( res => {
                this.props.navigate('/items');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeMinDamageHandler = (event) => {
        this.setState({weapondmgmin: event.target.value});
    }

    changeMaxDamageHandler= (event) => {
        this.setState({weapondmgmax: event.target.value});
    }

    changeArmorHandler = (event) => {
        this.setState({armor: parseInt(event.target.value)});
    }

    addStatHandler = () => {   
        if (this.state.statOptions.length > 0) {
            let curIndex = 0;
            if (this.state.statFields != null) {
                curIndex = this.state.statFields.length;
            } else {
                if (this.state.statFields == null) {
                    this.setState({statFields: []});
                }
            }

            let newField = {statId : 0, statValue: '', statIndex: curIndex};
            this.setState(prevState => ({
                statFields: [...prevState.statFields, newField]
              }))
        } else {
            alert("Cannot add Stats as no stat types have been defined.")
        }
    }

    handleStatChange = (index, event) => {
        let data = [...this.state.statFields];
        data[index].statId = event.value;
        this.setState({statFields: [...data]});
    }

    handleStatValueChange = (index, event) => {
        let data = [...this.state.statFields];
        data[index].statValue = event.target.value;
        this.setState({statFields: [...data]});
    }

    handleDeleteStat = (index, event) => {
        this.setState(prevState => ({statFields: prevState.statFields.filter((__, i) => i !== index)     }));
    }

    cancel(){
        this.props.navigate('/items');
    }

    validateItem() {
        let weaponDmgMin = this.state.weapondmgmin;
        let weaponDmgMax = this.state.weapondmgmax;
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
        if (weaponDmgMin > 20000) {
            errors['weaponDmgErrors'] = "Min Weapon Damage Cannot Exceed the 20000 Limit."
            hasErrors = true;
        }
        if (weaponDmgMax > 20000) {
            errors['weaponDmgErrors'] = "Max Weapon Damage Cannot Exceed the 20000 Limit."
            hasErrors = true;
        }
        if (weaponDmgMin < 0) {
            errors['weaponDmgErrors'] = 'Min Damage Cannot be Less than zero.';
            hasErrors = true;
        }
        if (weaponDmgMax < 0) {
            errors['weaponDmgErrors'] = 'Max Damage Cannot be less than zero.'
        }
        this.setState({errors: errors});
        return hasErrors;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getTitle(){
        let capitalizedItemType = this.capitalizeFirst(this.state.itemtype);
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add {capitalizedItemType}</h3>
        }else{
            return <h3 className="text-center">Update {capitalizedItemType}</h3>
        }
    }

    getSelectedOption(stat) {
        let options = this.state.statOptions;
        if (stat != null) {
            for (let i = 0; i < options.length; i++) {
                if (stat.statId == options[i].value) {
                    return options[i];
                }
            } 
        }
    }

    processDiffs() {
        let results = {};
        let state = this.state;
        let keys = Object.keys(this.initialState);
        keys.map((key) => {
            let keyAlt = key;
            if (key === 'itemstats') {
                keyAlt = 'statFields';
            }
            if (this.hasDiff(this.initialState[key], state[keyAlt])) {
                results[key] = this.buildDiff(this.initialState[key], state[keyAlt]);
            }
        });
        return results;
    }

    hasDiff(initialValue, newValue) {
        if (initialValue && newValue) {
            let result =  initialValue !== newValue;
            return result;
        }
        if (initialValue && !newValue) {
            return false;
        }
        if (!initialValue && newValue) {
            return true;
        }
    }

    buildDiff(before, after) {
        return {
            "before": before,
            "after":after
         }
    }

    render() {
        const { statOptions } = this.state;
        return (
            <div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"/>    
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 item-form-container">
                                {
                                    <label className='item-label'>{this.getTitle()}</label>
                                }
                                <div className = "card-body">
                                    <form>
                                        <fieldset>
                                            <div className = "form-group item-form">
                                                <label className='item-label'> Name: </label>
                                                <input placeholder="Name" name="name" className="form-control" 
                                                    value={this.state.name} onChange={this.changeNameHandler}/>
                                                    <span className='error' style={{ color: "red" }}>{this.state.errors['name']}</span>      
                                            </div>
                                            <div className = "form-group item-form">
                                                <label className='item-label'> Armor: </label>
                                                <input type="number" placeholder="armor" name="armor" className="form-control" 
                                                    value={this.state.armor} onChange={this.changeArmorHandler}/>
                                                    <span className='error' style={{ color: "red" }}>{this.state.errors['armor']}</span>      
                                            </div>
                                        </fieldset>                                   
                                        <CreateWeaponComponent weapondmgmin={this.state.weapondmgmin} weapondmgmax={this.state.weapondmgmax} itemtype={this.props.itemtype} minDmgHandler={this.changeMinDamageHandler.bind(this)} maxDmgHandler={this.changeMaxDamageHandler.bind(this)}></CreateWeaponComponent>
                                        <span className='error' style={{ color: "red" }}>{this.state.errors['weaponDmgErrors']}</span>       
                                        <fieldset>
                                            <div className = "form-group item-form">
                                                {this.state.statFields && this.state.statFields.map((stat, index) => {                                       
                                                    return (
                                                    <div key={index}>
                                                        <div className="form-group">
                                                            <label htmlFor="statType">Stat Type</label>
                                                            <Select 
                                                                    defaultValue={this.getSelectedOption(stat)}
                                                                    onChange={event => this.handleStatChange(index, event)} 
                                                                    options={statOptions}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor="statValue">Value</label>
                                                            <input
                                                                name='statValue'
                                                                placeholder='Value'
                                                                type="number"
                                                                value={stat.statValue}
                                                                className="form-control"
                                                                onChange={event => this.handleStatValueChange(index, event)}
                                                            />                                                  
                                                        </div>
                                                        <div className='form-group del-btn-container'>
                                                            <button  type="button" name="deleteStatBtn" id="deleteStatBtn" onClick={event => this.handleDeleteStat(index, event)} className='btn btn-primary'><span className='bi bi-trash'></span></button>
                                                        </div>
                                                    
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        </fieldset>

                                        <div className = "form-group item-form">
                                            <button type="button" onClick={this.addStatHandler.bind(this)} className="btn btn-primary">Add {this.capitalizeFirst(this.props.itemtype)} Stat</button>
                                        </div>
                                        <fieldset>
                                            <div className="form-group item-form-submit">
                                                <button className="btn btn-success item-submit-button" onClick={this.saveOrUpdateItem.bind(this)}>Save</button>
                                                <button className="btn btn-danger item-submit-button" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }
}

export default withParamsAndNavigate(CreateItemComponent)