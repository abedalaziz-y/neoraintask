export const registerReducer = (state = { email: "" }, action) => {
    switch (action.type) {
        case "REGISTERATION":
            console.log("Action payload:", action.payload); 
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
