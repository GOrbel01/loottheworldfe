import { withParamsAndNavigate } from "../getParamsAndNavigate";
import '../../styles/general/home.css'

function HomePage() {
        return (
            <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 align-items-center my-5">
                <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0" src="https://imageio.forbes.com/specials-images/imageserve/60493a7f97a127a53bea4890/Old-wooden-treasure-chest-box-with--glow-from-inside/0x0.jpg?format=jpg&crop=1152,648,x0,y63,safe&width=960" alt="..." /></div>
                <div className="col-lg-5">
                    <h1 className="font-weight-light">LootTheWorld</h1>
                    <h2 style={{marginBottom:20+"%"}}>Why? Because we all love loot!</h2>
                    <h3 style={{marginTop:20+"%"}}>Currently in Development</h3>
                    <p></p>
                </div>
            </div>
            <div className="card text-white bg-secondary my-5 py-4 text-center">
                <div className="card-body"><p className="text-white m-0">Create items, add them into your own game. Play your game and win the loot!</p></div>
            </div>
            <div className="row gx-4 gx-lg-5">
                <div className="col-md-4 mb-5">
                <div className="card h-90">
                        <div className="card-body text-center">
                            <h2 className="card-title">Create</h2>
                            <img className="card-img-bottom img-thumbnail home-grid-img"  src="https://cdn-icons-png.flaticon.com/512/61/61431.png"></img>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                <div className="card h-90 text-center">
                        <div className="card-body">
                            <h2 className="card-title">Customize</h2>
                            <img className="card-img-bottom img-thumbnail home-grid-img" src="https://toppng.com/uploads/preview/junior-icon-editor-free-download-for-windows-edit-icon-blue-1156302584549wxzpwmhr.png"></img>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                <div className="card h-90 text-center">
                        <div className="card-body">
                            <h2 className="card-title">Fight</h2>
                            <img className="card-img-bottom img-thumbnail home-grid-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCsRUUsvhAwAZP1CdkaJecjQg2twkwN3aGpQ&usqp=CAU"></img>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                <div className="card h-90 text-center">
                        <div className="card-body">
                            <h2 className="card-text">Loot</h2>
                            <img className="card-img-bottom img-thumbnail home-grid-img" src="https://thegamescabin.com/wp-content/uploads/2021/09/compostt2.png"></img>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="card h-90 text-center">
                        <div className="card-body">
                            <h2 className="card-text">Loot Some More</h2>
                            <img className="card-img-bottom img-thumbnail home-grid-img" src="https://cdn.mos.cms.futurecdn.net/DgKq5SyxQ36EH89A3VDTAF-1200-80.jpg"></img>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="card h-90 text-center">
                        <div className="card-body">
                            <h2 className="card-text">Win</h2>
                            <img className="card-img-bottom img-thumbnail home-grid-img" src="https://cdnb.artstation.com/p/assets/images/images/025/668/731/large/elena-kaeva-564656.jpg?1586541184"></img>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="font-weight-light" style={{"textAlign": 'center', padding: 10+"px"}}>What are you Waiting for? Get started!</h1>
        </div>
        )
}

export default withParamsAndNavigate(HomePage)