import React, { Component } from 'react'
import StatService from '../../services/stat/StatService';
import { withParamsAndNavigate } from "../getParamsAndNavigate";

class CreateStatComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id: props.params.id,
            statName: ''
        }
        this.changeStatNameHandler = this.changeStatNameHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            StatService.getStatById(this.state.id).then( (res) =>{
                let stat = res.data;
                this.setState({
                    statName: stat.statName,
                });
            });
        }        
    }

    saveOrUpdateStat = (e) => {
        e.preventDefault();
        let stat = {statName: this.state.statName};

        if(this.state.id === '_add'){
            StatService.createStat(stat).then(res =>{
                this.props.navigate('/items');
            });
        }else{
            StatService.updateStat(stat, this.state.id).then( res => {
                this.props.navigate('/items');
            });
        }
    }
    
    changeStatNameHandler= (event) => {
        this.setState({statName: event.target.value});
    }


    cancel(){
        this.props.navigate('/items');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Stat</h3>
        }else{
            return <h3 className="text-center">Update Stat</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group weapon-form-item">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="statName" className="form-control" 
                                                value={this.state.statName} onChange={this.changeStatNameHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateStat}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default withParamsAndNavigate(CreateStatComponent)