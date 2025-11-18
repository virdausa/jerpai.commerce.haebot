import type { CartItem as CartItemType } from "../types/cart-item";

import Image from "next/image";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import { cn, formatIDR } from "@/lib/utils";

import placeholder from "@/assets/images/placeholder.jpg";

interface CartItemProps {
  cartItem: CartItemType;
  showControls?: boolean;
  className?: string;
}

function CartItem({ cartItem, showControls = true, className }: CartItemProps) {
  const { addItem, updateItemQuantity, removeItem } = useCartStore((s) => s);
  const item = cartItem.item;
  const price = formatIDR(item.price);

  // TODO: Fix max qty
  // const maxQty =
  //   item.inventories?.reduce((acc, inv) => acc + inv.quantity, 0) ?? 99;

  const maxQty = 99;
  const canDecrease = cartItem.quantity > 1;
  const canIncrease = cartItem.quantity < maxQty;

  function handleDecrease() {
    if (!canDecrease) return;
    updateItemQuantity(item.id, cartItem.quantity - 1);
  }

  function handleIncrease() {
    if (!canIncrease) return;
    updateItemQuantity(item.id, cartItem.quantity + 1);
  }

  function handleDelete() {
    const snapshot = { ...cartItem };
    removeItem(item.id);
    toast.info(`${item.name} dihapus dari keranjang`, {
      action: {
        label: "Urungkan",
        onClick: () => {
          addItem(snapshot);
        },
      },
    });
  }

  return (
    <Item
      variant="outline"
      role="listitem"
      tabIndex={0}
      aria-label={`Produk ${item.name}`}
      className={cn(
        "group shadow-xs transition-shadow hover:shadow-sm",
        className
      )}
    >
      <ItemMedia>
        <Image
          src={placeholder}
          alt={item.name}
          className="h-12 w-12 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{item.name}</ItemTitle>
        <ItemDescription>{price}</ItemDescription>
      </ItemContent>
      {showControls && (
        <ItemActions>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Kurangi jumlah"
            disabled={!canDecrease}
            onClick={handleDecrease}
          >
            <MinusIcon />
          </Button>
          <div
            className="min-w-9 text-center text-sm tabular-nums"
            aria-live="polite"
          >
            {cartItem.quantity}
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Tambah jumlah"
            disabled={!canIncrease}
            onClick={handleIncrease}
          >
            <PlusIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Hapus item"
            onClick={handleDelete}
          >
            <Trash2Icon />
          </Button>
        </ItemActions>
      )}
    </Item>
  );
}

export { CartItem };
