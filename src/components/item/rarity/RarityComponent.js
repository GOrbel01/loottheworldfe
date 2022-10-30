import { useState, useEffect } from "react";
import RarityService from '../../../services/item/rarity/RarityService';
import { useNavigate} from 'react-router-dom';
import { updateMultiItemSingleField } from '../../../functions/global/Utils'
import Select from 'react-select';

function RarityComponent() {
    const [rarities, setRarities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        RarityService.getRarities().then((res) => {
            setRarities(res.data);
        });
    },[]);

    function addLootRarity(){
        navigate('/add-loot-rarity/_add');
    }

    function editLootRarity(id){
        navigate(`/add-loot-rarity/${id}`);
    }

    function moveDown(index) {
        if ((index + 1) < rarities.length) {
            let temp = rarities;
            let store = temp[index+1];
            temp[index+1] = temp[index];
            temp[index] = store;
            setRarities([...temp]);
            updateOrders();
        }
    }

    function buildOptions() {

        let result = getFieldValuesFromArray(rarities,'tier');

        let results = [];
        for (let i = 0; i < rarities.length; i++) {
            if (!contains(result,i+1)) {
                results[i] = {}
                results[i]['value'] = i+1;
                results[i]['label'] = i+1;
            }
        }

        results[rarities.length] = {};
        results[rarities.length].value = 0;
        results[rarities.length].label = 'None';

        return results;
    }

    function getFieldValuesFromArray(collection, field) {
        let results = [];
        for (let i = 0; i < collection.length; i++) {
            results[i] = collection[i][field];
        }
        return results;
    }

    function contains(collection, value) {
        for (let i = 0; i < collection.length; i++) {
            if (collection[i] === 'undefined' || collection[i] == null) {
                return false;
            }
            if (collection[i] === value || collection[i].value == value) {
                return true;
            }
        }
    }

    function moveUp(index) {
        if ((index-1) >= 0) {
            let temp = rarities;
            let store = temp[index-1];
            temp[index-1] = temp[index];
            temp[index] = store;
            setRarities([...temp]);
            updateOrders();
        }
    }

    function updateOrders() {

        let diffs = updateMultiItemSingleField(rarities,'order');
        RarityService.updateOrder(diffs).then( res => {
            
        });
    }

    function handleSelect (selectedOption,index) {
        let temp = rarities;
        temp[index].tier = selectedOption;
        setRarities([...temp]);

    }

    return (
        <div className='mainParent'>
            <h2 className="text-center">Loot Rarities List</h2>
            <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary" onClick={addLootRarity}>Add Loot Rarity</button>
            </div>
            <div className = "row">
                <table className = "table-responsive-lg table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Color </th>
                            <th> Tier </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rarities.map(
                                (rarity,index) => 
                                <tr key = {rarity.id}>
                                        <td> { rarity.name} </td>       
                                    
                                        <td>
                                            <div style={{margin: "auto", width:90+"%",height:30+"px", backgroundColor: rarity.color}}></div>
                                        </td>
                                        <td>
                                            <div className="form-group">
                                                <Select 
                                                        defaultValue={rarity.tier}
                                                        value={rarity.tier}
                                                        onChange={event => handleSelect(event,index)} 
                                                        options={buildOptions()}
                                                        className="basic-single"                                                   
                                                        classNamePrefix="select"
                                                    />
                                            </div>    
                                        </td>   
                                        {/* <td> { weapon.id}</td> */}
                                        {/*<td> {}</td> */}
                                        <td>
                                            <button onClick={() => editLootRarity(rarity.id)} className="btn btn-info">Update </button>
                                            <button onClick={() => moveUp(index)} className="btn btn-info">Move Up </button>
                                            <button onClick={() => moveDown(index)} className="btn btn-info">Move Down </button>
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
export default RarityComponent