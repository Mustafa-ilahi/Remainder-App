function storeData(email,name) {
  return {
    type: 'ADD_DATA',
    name: name,
    email: email,
  };
}

function removeData() {
  return {
    type: 'REMOVE_DATA',
  };
}

export {storeData, removeData};
