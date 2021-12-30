function storeData(email) {
  return {
    type: 'ADD_DATA',

    email: email,
  };
}

function removeData() {
  return {
    type: 'REMOVE_DATA',
  };
}

export {storeData, removeData};
