const initialState = {
  email: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA': {
      return {...state, email: action.email};
    }
    case 'REMOVE_DATA': {
      return {...state, email: null};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
