import React, { Component } from 'react'
import StatService from '../../services/stat/StatService';
import { withParamsAndNavigate } from "../getParamsAndNavigate";

class CreateStatComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            userid: '',
            statname: ''
        }
        this.changeStatNameHandler = this.changeStatNameHandler.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            StatService.getStatById(this.state.id).then( (res) =>{
                let stat = res.data;
                this.setState({
                    statId: res.data.id,
                    statname: stat.statName,
                });
            });
        }        
    }

    saveOrUpdateStat = (e) => {
        e.preventDefault();
        let stat = {statname: this.state.statname, userid: this.props.authData.user.id};
        if(this.state.id === '_add'){
            StatService.createStat(stat).then(res =>{
                this.props.navigate('/stats');
            });
        }else{
            StatService.updateStat(stat, this.state.id).then( res => {
                this.props.navigate('/stats');
            });
        }
    }
    
    changeStatNameHandler= (event) => {
        this.setState({statname: event.target.value});
    }


    cancel(){
        this.props.navigate('/stats');
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
                            <div className = "card col-md-6 offset-md-3 offset-md-3 item-form-container">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group item-form">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="statname" className="form-control" 
                                                value={this.state.statname} onChange={this.changeStatNameHandler}/>
                                        </div>
                                        <div className="item-form-submit">
                                            <button className="btn btn-success" onClick={this.saveOrUpdateStat}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </div>
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