import { formatCurrency } from '../../utils/helper';

export default function OrderItem({ item}) {
  const { productName, quantity, unitPrice } = item;

  return (
    <li className='space-y-1 py-3'>
      <div className='flex items-center justify-between gap-4 text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {productName}
        </p>
        <p className='font-bold'>{formatCurrency(unitPrice * quantity)}</p>
      </div>
    </li>
  );
}
