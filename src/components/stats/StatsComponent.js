import React, { Component } from 'react'
import StatService from '../../services/stat/StatService';
import { withParamsAndNavigate } from "../getParamsAndNavigate";

class StatsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stats: []
        }
        this.addStat = this.addStat.bind(this);
    }

    componentDidMount(){
        StatService.getStats().then((res) => {
            this.setState({ stats: res.data});
        });

    }

    addStat(){
        this.props.navigate('/add-stat/_add');
    }

    editStat(id){
        this.props.navigate(`/add-stat/${id}`);
    }

    render() {
        return (
            <div className='mainParent'>
                 <h2 className="text-center">Stat List</h2>
                 <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary" onClick={this.addStat}>Add Stat</button>
                </div>
                 <div className = "row">
                        <table className = "table-responsive-lg table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stats.map(
                                        stat => 
                                        <tr key = {stat.statId}>
                                             <td> { stat.statName} </td>       
                                            
                                             <td>
                                                {/* {capitalizeFirst(item.itemType)} */}
                                             </td>
                                             <td>                                      
                                             </td>   
                                             <td></td>   
                                             {/* <td> { weapon.id}</td> */}
                                             {/*<td> {}</td> */}
                                             <td>
                                                 <button onClick={ () => this.editStat(stat.statId)} className="btn btn-info">Update </button>
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

export default withParamsAndNavigate(StatsComponent)