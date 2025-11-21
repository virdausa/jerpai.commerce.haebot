import Link from "next/link";
import { Button } from "@/components/ui/button";
import lang from "@/lang/id/items/item.lang";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-4 px-1 py-3 text-center md:px-6 md:py-10">
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
