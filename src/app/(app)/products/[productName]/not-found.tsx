import Link from "next/link";
import { Button } from "@/components/ui/button";
import lang from "@/lang/id/items/item.lang";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">{lang.noProductsFound}</h2>
      <p className="text-muted-foreground">
        The product you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/products">{lang.backToProducts}</Link>
      </Button>
    </div>
  );
}
