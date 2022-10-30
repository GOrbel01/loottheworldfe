import React, { Component } from 'react'
import ItemService from '../../services/item/ItemService';
import StatService from '../../services/stat/StatService';
import { withParamsAndNavigate } from "../getParamsAndNavigate";
import {capitalizeFirst} from '../../functions/global/Utils'

class ItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                items: [],
                statTypes: []
        }
        this.addWeapon = this.addWeapon.bind(this);
        this.addArmor = this.addArmor.bind(this);
        this.getStatName = this.getStatName.bind(this);
    }

    componentDidMount(){
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
        StatService.getStatsLookup().then((res) => {
            this.setState({
                statTypes: res.data
            });
        });
    }

    addWeapon() {
        this.props.navigate('/add-weapon/_add');
    }

    addArmor() {
        this.props.navigate('/add-armor/_add');
    }

    editItem(id, itemType){
        if (itemType === 'weapon') {
            this.props.navigate(`/add-weapon/${id}`);
        } else if (itemType === 'armor') {
            this.props.navigate(`/add-armor/${id}`);
        }
    }

    getStatName(statId) {
        let statTypes = this.state.statTypes
        for (let i = 0; i < statTypes.length; i++) {
            if (statTypes[i].value === statId) {
                let result = statTypes[i].label;
                return result;
            }
        } 
    }

    render() {
        return (
            <div className='mainParent'>
                 <h2 className="text-center">Item List</h2>
                 <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary" onClick={this.addWeapon}>Add Weapon</button>
                    <button className="btn btn-primary" onClick={this.addArmor}>Add Armor</button>
                </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table-responsive-lg table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Type</th>
                                    <th> Stats</th>
                                    <th></th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.items.map(
                                        item => 
                                        <tr key = {item.id}>
                                             <td> { item.name} </td>       
                                            
                                             <td>
                                                {capitalizeFirst(item.itemType)}
                                             </td>
                                             <td>
                                             {item.itemType === 'weapon' &&
                                                 <p>Avg Damage: {item.weaponDamageAvg}</p>
                                             }
                                            {item.armor !== 0 && 
                                                <p>Armor: {item.armor}</p>
                                            }
                                            {item.itemstats && item.itemstats.map((stat) => {
                                                
                                                return (
                                                    <div key={stat.statIndex}>
                                                        {stat && stat.statValue &&
                                                        <li className="list-inline" key={stat.statId}>+{stat.statValue} {this.getStatName(stat.statId)}</li>}
                                                    </div>                                                   
                                                )
                                            })}

                                             
                                             </td>   
                                             <td></td>   
                                             {/* <td> { weapon.id}</td> */}
                                             {/*<td> {}</td> */}
                                             <td>
                                                 <button onClick={ () => this.editItem(item.id, item.itemType)} className="btn btn-info">Update </button>
                                             </td>
                                        </tr>
                                        
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

        </div>
        )
    }
}

export default withParamsAndNavigate(ItemComponent)