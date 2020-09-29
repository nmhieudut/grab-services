import * as ActionTypes from './types';

export const addItemAction = (item, quantity) => ({
  type: ActionTypes.ADD_ITEM,
  item: item,
  quantity:quantity
});
export const removeItemAction = (id) => ({
  type: ActionTypes.REMOVE_ITEM,
  id: id,
});
