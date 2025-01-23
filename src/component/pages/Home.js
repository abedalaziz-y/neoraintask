import React, { useEffect, useState } from 'react';
import './Home.css'

import { useDispatch, useSelector } from 'react-redux';
  

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <div className='Home'>
          {JSON.stringify(user)}
        </div>

        )



}
export default Home