export const userReducer = (state = null, action) => {
  
    switch (action.type) {
      case "LOGED_IN_USER":
        return {
          name: action.payload.name||null,
          email: action.payload.email,
          token: action.payload.token,
          role: action.payload.role,
          img: action.payload.picture || null, // Default value for img
        };
      case "LOGE_OUT":
        return action.payload;
      case "UPDATEDUSER":
        return action.payload;
      default:
        return state;
    }
  };
  