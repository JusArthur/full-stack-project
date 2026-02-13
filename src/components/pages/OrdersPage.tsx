import { useMemo, useState } from "react";
import type { OrderItem } from "../orders/types/order";
import { OrderItemRow } from "../orders/OrderItemRow";
import { useMenuItems } from "../../hooks/useMenuItems";

type PresetItem = {
  id: string;
  name: string;
  price: number;
};

const presetItems: PresetItem[] = [
  { id: "coffee", name: "Cawfee", price: 2.49 },
  { id: "donut", name: "Team Bits", price: 1.79 },
  { id: "sandwich", name: "Breakfast Sandwitch", price: 4.99 },
];

export function OrdersPage() {
  // Sprint 3: hook -> repository (menu items)
  const { filteredItems, isLoading, error } = useMenuItems();

  // I.2 Form state
  const [customerName, setCustomerName] = useState<string>("");
  const [pickupNotes, setPickupNotes] = useState<string>("");

  // I.3 List state
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const nameError =
    customerName.trim().length > 0 && customerName.trim().length < 3
      ? "Name must be at least 3 characters."
      : "";

  const total = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.price, 0);
  }, [orderItems]);

  const handleAddPreset = (preset: PresetItem) => {
    setOrderItems((oldItems) => {
      const newItem: OrderItem = {
        id: `${preset.id}-${crypto.randomUUID()}`,
        name: preset.name,
        price: preset.price,
      };
      return [...oldItems, newItem];
    });
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((oldItems) => oldItems.filter((item) => item.id !== id));
  };

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-2xl font-extrabold">Orders</h1>
      <p className="mt-2 text-black/70">What would you like today?</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* I.2 Form Component */}
        <section className="rounded bg-white p-5 shadow">
          <h2 className="text-lg font-bold">Customer Info</h2>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold">Customer Name</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 w-full rounded border border-black/20 p-2"
                placeholder="At least 3 characters"
              />
              {nameError ? (
                <p className="mt-1 text-sm font-semibold text-red-700">
                  {nameError}
                </p>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-semibold">Pickup Notes</span>
              <textarea
                value={pickupNotes}
                onChange={(e) => setPickupNotes(e.target.value)}
                className="mt-1 w-full rounded border border-black/20 p-2"
                rows={3}
                placeholder="e.g., No sugar, extra napkins..."
              />
            </label>
          </div>

          {/* Live Preview (real-time update) */}
          <div className="mt-6 rounded border border-black/10 bg-[#F7F3E9] p-4">
            <h3 className="font-bold">Live Summary</h3>
            <p className="mt-2">
              <span className="font-semibold">Name:</span>{" "}
              {customerName.trim() ? customerName : "—"}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Notes:</span>{" "}
              {pickupNotes.trim() ? pickupNotes : "—"}
            </p>
            <p className="mt-3 font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </section>

        {/* I.3 Element Addition/Removal */}
        <section className="rounded bg-white p-5 shadow">
          <h2 className="text-lg font-bold">Order Items</h2>

          {/* Sprint 3: Add from Menu (hook -> repository) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {isLoading ? (
              <p className="text-sm text-black/60">Loading menu items...</p>
            ) : error ? (
              <p className="text-sm font-semibold text-red-700">{error}</p>
            ) : (
              filteredItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAddPreset({
                      id: String(item.id),
                      name: item.name,
                      price: item.price,
                    })
                  }
                  className="rounded bg-[#3B2316] px-3 py-2 text-sm font-semibold text-white hover:bg-[#2a190f]"
                >
                  Add {item.name}
                </button>
              ))
            )}
          </div>

          {/* Existing preset buttons (kept for safety) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {presetItems.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleAddPreset(preset)}
                className="rounded bg-[#C8102E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#a50d25]"
              >
                Add {preset.name}
              </button>
            ))}
          </div>

          <ul className="mt-5 space-y-3">
            {orderItems.map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))}
          </ul>

          {orderItems.length === 0 ? (
            <p className="mt-4 text-sm text-black/60">
              No items yet. Add something above.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
