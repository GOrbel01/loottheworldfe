import React, { Component } from 'react'
import ItemService from '../../../services/item/ItemService';
import { withParamsAndNavigate } from "../../getParamsAndNavigate";
import {capitalizeFirst} from '../../../functions/global/Utils'

class WeaponComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                items: [],
        }
        this.addStat = this.addStat.bind(this);
        this.addWeapon = this.addWeapon.bind(this);
        this.addArmor = this.addArmor.bind(this);
    }

    componentDidMount(){
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }

    addWeapon() {
        this.props.navigate('/add-weapon/_add');
    }



    addStat(){
        this.props.navigate('/add-stat/_add');
    }

    addArmor() {
        console.log(this.props);
        this.props.navigate('/add-armor/_add');
    }

    editArmor(id){
        this.props.navigate(`/add-armor/${id}`);
    }

    render() {
        

        return (
            <div>
                 <h2 className="text-center">Item List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addWeapon}>Add Weapon</button>
                    <button className="btn btn-primary" onClick={this.addArmor}>Add Armor</button>
                    <button className="btn btn-primary" onClick={this.addStat}>Add Stat</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Type</th>
                                    <th> Stats</th>
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
                                                {/*{weapon.stats.map(
                                                    stat => 
                                                   
                                                  <li class="list-inline" key={stat.type.id}>+{stat.value} {stat.type.value}</li>  
                                                )} */}
                                                
                                             
                                             </td>   
                                             <td></td>   
                                             {/* <td> { weapon.id}</td> */}
                                             {/*<td> {employee.emailId}</td> */}
                                             <td>
                                                 <button onClick={ () => this.editArmor(item.id)} className="btn btn-info">Update </button>
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

export default withParamsAndNavigate(WeaponComponent)