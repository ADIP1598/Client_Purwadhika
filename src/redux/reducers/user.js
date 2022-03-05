const init_state = {
    idusers: 0,
    username: "",
    email: "",
    role: "",
    status: "",
}

const reducer = (state = init_state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, ...action.payload, storageIsChecked: true };
        default:
            return state;
    }
}

export default reducer;