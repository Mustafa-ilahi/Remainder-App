const initialState = {
  email: '',
  name: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA': {
      return {...state, name: action.name, email: action.email};
    }
    case 'REMOVE_DATA': {
      return {...state, name: action.name, email: null};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
