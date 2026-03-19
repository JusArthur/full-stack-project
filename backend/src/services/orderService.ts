import { prisma } from "../prisma.js";

type SaveCurrentOrderInput = {
  customerName: string;
  pickupNotes: string;
  items: Array<{
    menuItemId: number;
    name: string;
    price: number;
  }>;
};

export const orderService = {
  async getCurrentOrder() {
    const existingOrder = await prisma.order.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        items: true,
      },
    });

    return existingOrder;
  },

  async saveCurrentOrder(data: SaveCurrentOrderInput) {
    const existingOrder = await prisma.order.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        items: true,
      },
    });

    if (!existingOrder) {
      const createdOrder = await prisma.order.create({
        data: {
          customerName: data.customerName,
          pickupNotes: data.pickupNotes,
          items: {
            create: data.items.map((item) => ({
              menuItemId: item.menuItemId,
              name: item.name,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return createdOrder;
    }

    await prisma.orderItem.deleteMany({
      where: {
        orderId: existingOrder.id,
      },
    });

    const updatedOrder = await prisma.order.update({
      where: {
        id: existingOrder.id,
      },
      data: {
        customerName: data.customerName,
        pickupNotes: data.pickupNotes,
        items: {
          create: data.items.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return updatedOrder;
  },
};