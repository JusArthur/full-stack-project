import { useEffect, useMemo, useRef, useState } from "react";
import type { CurrentOrder, OrderItem } from "../orders/types/order";
import { OrderItemRow } from "../orders/OrderItemRow";
import { useMenuItems } from "../../hooks/useMenuItems";
import { orderRepository } from "../../repositories/orderRepository";

export function OrdersPage() {
  const { filteredItems, isLoading, error } = useMenuItems();

  const [customerName, setCustomerName] = useState<string>("");
  const [pickupNotes, setPickupNotes] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(true);
  const [orderError, setOrderError] = useState<string | null>(null);

  const hasLoadedOrder = useRef(false);

  const nameError =
    customerName.trim().length > 0 && customerName.trim().length < 3
      ? "Name must be at least 3 characters."
      : "";

  const total = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.price, 0);
  }, [orderItems]);

  useEffect(() => {
    async function loadCurrentOrder() {
      try {
        setIsOrderLoading(true);
        setOrderError(null);

        const currentOrder = await orderRepository.getCurrent();

        setCustomerName(currentOrder.customerName);
        setPickupNotes(currentOrder.pickupNotes);
        setOrderItems(currentOrder.items);
      } catch {
        setOrderError("Failed to load current order.");
      } finally {
        setIsOrderLoading(false);
        hasLoadedOrder.current = true;
      }
    }

    void loadCurrentOrder();
  }, []);

  useEffect(() => {
    if (!hasLoadedOrder.current) {
      return;
    }

    async function saveCurrentOrder() {
      const currentOrder: CurrentOrder = {
        customerName,
        pickupNotes,
        items: orderItems,
      };

      try {
        await orderRepository.saveCurrent(currentOrder);
        setOrderError(null);
      } catch {
        setOrderError("Failed to save current order.");
      }
    }

    void saveCurrentOrder();
  }, [customerName, pickupNotes, orderItems]);

  const handleAddMenuItem = (item: { id: number; name: string; price: number }) => {
    setOrderItems((oldItems) => {
      const newItem: OrderItem = {
        id: crypto.randomUUID(),
        menuItemId: item.id,
        name: item.name,
        price: item.price,
      };

      return [...oldItems, newItem];
    });
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((oldItems) => oldItems.filter((item) => item.id !== id));
  };

  // NEW: Function to clear all items
  const handleRemoveAllItems = () => {
    setOrderItems([]);
  };

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) {
      alert("Please add at least one item to your order.");
      return;
    }
    if (customerName.trim().length < 3) {
      alert("Please provide a valid customer name.");
      return;
    }

    try {
      await orderRepository.submitOrder({
        customerName,
        pickupNotes,
        items: orderItems,
      });
      
      // Clear the form and draft after successful submission
      setCustomerName("");
      setPickupNotes("");
      setOrderItems([]);
      alert("Order submitted successfully!");
    } catch (error) {
      setOrderError("Failed to submit the final order.");
    }
  };
  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-2xl font-extrabold">Orders</h1>
      <p className="mt-2 text-black/70">What would you like today?</p>

      {isOrderLoading ? (
        <p className="mt-6 text-sm text-black/60">Loading current order...</p>
      ) : null}

      {orderError ? (
        <p className="mt-4 text-sm font-semibold text-red-700">{orderError}</p>
      ) : null}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="rounded bg-white p-5 shadow">
          {/* ... Customer Info section remains exactly the same ... */}
          <h2 className="text-lg font-bold">Customer Info</h2>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold">Customer Name</span>
              <input
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
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
                onChange={(event) => setPickupNotes(event.target.value)}
                className="mt-1 w-full rounded border border-black/20 p-2"
                rows={3}
                placeholder="e.g., No sugar, extra napkins..."
              />
            </label>
          </div>

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
            
            {/* NEW SUBMIT BUTTON HERE */}
            <button
              onClick={handleSubmitOrder}
              disabled={orderItems.length === 0 || customerName.trim().length < 3}
              className="mt-4 w-full rounded bg-[#C8102E] py-2 font-bold text-white disabled:opacity-50 hover:bg-[#a50d25]"
            >
              Submit Order
            </button>
          </div>
        </section>

        <section className="rounded bg-white p-5 shadow">
          {/* UPDATED: Order Items Header with Delete All Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Order Items</h2>
            {orderItems.length > 0 && (
              <button
                type="button"
                onClick={handleRemoveAllItems}
                className="text-sm font-semibold text-[#C8102E] hover:underline"
              >
                Delete All
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {isLoading ? (
              <p className="text-sm text-black/60">Loading menu items...</p>
            ) : error ? (
              <p className="text-sm font-semibold text-red-700">{error}</p>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAddMenuItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    })
                  }
                  className="rounded bg-[#C8102E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#a50d25]"
                >
                  Add {item.name}
                </button>
              ))
            )}
          </div>

          <ul className="mt-5 space-y-3">
            {/* UPDATED: Slice array to only render the first 5 items */}
            {orderItems.slice(0, 5).map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))}
          </ul>

          {/* NEW: Display message if there are more than 5 items */}
          {orderItems.length > 5 && (
            <p className="mt-3 text-sm font-medium italic text-black/60">
              ...and {orderItems.length - 5} more item{orderItems.length - 5 !== 1 ? 's' : ''} in your order.
            </p>
          )}

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