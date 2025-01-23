import axios from 'axios'
export const CRUDUSER = async (authtoken,values) => {
    return await axios.post(`${process.env.REACT_APP_API}create-user`, values, {
        headers: {
            authtoken,  
        }
    })
}



export const LOGIN = async (authtoken,recaptchaToken) => {
    return await axios.post(`${process.env.REACT_APP_API}login`,{authtoken,recaptchaToken} ,{
        headers: {
            authtoken,  
        }
    })
}


export const CURRENTADMIN = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API_CURRENTADMIN, {}, {
        headers: {
            authtoken,
        }
    })
}
export const LOGUSERACTIVITY = async (authtoken, activity) => {
    return await axios.post(`${process.env.REACT_APP_API}useractivity`, activity, {
      headers: {
        authtoken,
      },
    });
  };

  export const GETALLACTIVITY = async (authtoken) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}allactivities`, {
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error; 
    }
  };
  