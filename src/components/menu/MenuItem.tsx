import React from "react";
import type { MenuItem as MenuItemType } from "./menu";

interface Props {
    item: MenuItemType;
}

const MenuItem: React.FC<Props> = ({ item }: Props) => {
    return (
        <div className="shadow-lg p-4 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
        </div>
    );
};

export default MenuItem;
