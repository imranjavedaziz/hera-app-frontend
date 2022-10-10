import { Routes } from "../constants/Constants"

const getRoute = (token,role_id,step)=>{
    if(token){
        if(step===1){
            return Routes.SmBasicDetails;
        }
        else if(role_id==='2'){
            if(step===2){
                return Routes.SetPreference;
            }
            return Routes.PtbDashboard;
        }
        else{
            if(step===2){
                return Routes.SetAttributes;
            }
            else if(step===3){
                return Routes.SmDashboard;
            }
            return Routes.CreateGallery;
        }
    }
    return Routes.Landing;
}
export default getRoute;
