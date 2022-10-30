import { useState, useEffect  } from "react";
import RarityService from '../../../services/item/rarity/RarityService'
import { useNavigate, useParams } from 'react-router-dom';
import { useMenuLoginHook } from '../../../components/login/LoginProvider';
import { processDiffs } from '../../../functions/global/Utils'

function CreateRarityComponent(props) {
    const [id,setId] = useState(useParams().id);
    const [userid, setUserId] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const navigate = useNavigate();

    const { user } = useMenuLoginHook();

    const [ initState, setInitState ] = useState({});

    function saveOrUpdateRarity(event) {
        event.preventDefault();
        let rarity = {name: name, color: color, userid: userid};
        if(id === '_add'){
            RarityService.createRarity(rarity).then(res =>{
                navigate('/loot-rarities');
            });
        }else{
            let diffs = processDiffs(initState, rarity);
            RarityService.updateRarity(id, diffs).then( res => {
                navigate('/loot-rarities');
            });
        }
    }

    useEffect(() => {
        if(id === '_add'){
            console.log(user);
            setUserId(user.id);
            return
        }else{
            RarityService.getRarityById(id).then( (res) =>{
                let rarity = res.data;
                setName(rarity.name);
                setColor(rarity.color);
                setId(rarity.id);
                setUserId(rarity.id);
                setInitState(rarity);
            });
        }
    },[]);

    function changeColorHandler(event) {
        event.preventDefault();
        setColor(event.target.value);
    }

    function changeNameHandler(event) {
        setName(event.target.value);
    }

    function getTitle(){
        if(id === '_add'){
            return <h3 className="text-center">Add Loot Rarity</h3>
        }else{
            return <h3 className="text-center">Update Loot Rarity</h3>
        }
    }

    function cancel() {
        navigate('/loot-rarities');
    }

    return (
    <div>
        <br></br>
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3 item-form-container">
                        {
                            getTitle()
                        }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group item-form">
                                    <label> Name: </label>
                                    <input placeholder="Name" name="rarityName" className="form-control" 
                                        value={name} onChange={changeNameHandler}/>
                                </div>
                                <div className = "form-group item-form">
                                    <label className='item-label'> Rarity Color: </label>
                                    <input type={"color"} placeholder="color" name="color" className="form-control" 
                                        value={color} onChange={changeColorHandler}/>   
                                </div>
                                <div className="item-form-submit">
                                    <button className="btn btn-success" onClick={saveOrUpdateRarity.bind(this)}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

           </div>
    </div>
    )
}

export default CreateRarityComponent