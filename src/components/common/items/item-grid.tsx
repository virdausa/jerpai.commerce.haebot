import { Item } from "@/modules/items/items.interface";
import { ItemCard } from "./item-card";

interface ItemGridProps {
  items: Item[];
}

function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-2 md:gap-x-6 md:gap-y-6 lg:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export { ItemGrid };
