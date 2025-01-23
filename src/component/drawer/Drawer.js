import React from 'react';
import { Drawer,Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import logo from '../../images/nlogo.png'
const SideDrawer=()=>{
    const dispatch=useDispatch()
    const {drawer}=useSelector((state)=>({...state}))
    const imgStyle={
        width:'100%',
        height: '200px',
        objectFit:'contain'
    }
    return(
    <Drawer 
    placement='right'
    className='text-center' 
    title={` Data analytics `} 
    onClose={()=>{
            /// close sideDrawe
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            });     
    }} visible={drawer}>
        
            <Link to='/' >
                <button onClick={()=>
                    dispatch({
                        type:"SET_VISIBLE",
                        payload:false
                    })
                } className='text-center btn btn-primary btn-raised btn-block'>
                    Go To Home
            </button>
            </Link>
    </Drawer>
   )
}
export default SideDrawer