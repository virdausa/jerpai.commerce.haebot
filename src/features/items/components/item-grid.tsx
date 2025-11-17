import { Item } from "@/features/items/types/item";
import { ItemCard } from "./item-card";

interface ItemGridProps {
  items: Item[];
}

function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-2 md:gap-x-3 md:gap-y-3 lg:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export { ItemGrid };
