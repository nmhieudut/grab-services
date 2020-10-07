import React from 'react';
import CartDetail from '../../../modules/carts/components/CartDetail';
export default function CartDetailScreen({route}) {
  return (
    <>
      <CartDetail total={route.params.total} />
    </>
  );
}
