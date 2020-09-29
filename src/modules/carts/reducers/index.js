import * as ActionTypes from '../actions/types';

const initialState = {
  addedItems: [],
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      var found = [...state.addedItems].find(
        (item) => item.id === action.id,
      );
      if (found) {
        found.quantity++;
        return {
          ...state,
          addedItems: [...state.addedItems],
        };
      }
      var addedItems = [
        ...state.addedItems,
        {item: action.item, quantity: action.quantity},
      ];

      return {
        ...state,
        addedItems: addedItems,
      };
    case ActionTypes.REMOVE_ITEM:
      var addedItems = [...state.addedItems].filter(
        (e) => e.item.id !== action.id,
      );

      return {
        ...state,
        addedItems: addedItems,
      };
    default:
      return {
        ...state,
      };
  }
}
