export const filterState = state => ({
  ...state,
  modularui: Object.keys(state.modularui).reduce((obj, key) => {
    obj[key] = {
      status: state.modularui[key].status,
      model: state.modularui[key].model.dehydrate()
    };

    return obj;
  }, {})
});
