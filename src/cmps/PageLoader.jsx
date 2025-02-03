import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LOADING_DONE, LOADING_START } from '../store/reducers/system.reducer'
import { InstagramLoader } from "./elements/InstagramLoader ";

export function PageLoader() {
    const location = useLocation()
    const dispatch = useDispatch()
    const loading = useSelector(storeState => storeState.systemModule.isLoading)

    useEffect(() => {
        dispatch({type: LOADING_START})
        console.log('location change:', location);
        
    }, [location])
    

     if (loading) {console.log('loading');
     
        return <InstagramLoader  />
     }
     return null
}