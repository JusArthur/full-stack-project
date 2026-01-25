import type { OrderItem } from "./types/order";

type OrderItemRowProps = {
  item: OrderItem;
  onRemove: (id: string) => void;
};

export function OrderItemRow({ item, onRemove }: OrderItemRowProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded border border-black/10 bg-white p-3">
      <div>
        <p className="m-0 font-semibold">{item.name}</p>
        <p className="m-0 text-sm text-black/60">${item.price.toFixed(2)}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="rounded bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
      >
        Remove
      </button>
    </li>
  );
}
