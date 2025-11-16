import type { Item } from "@/modules/items/items.interface";

import Image from "next/image";

import placeholder from "@/assets/images/placeholder.jpg";
import lang from "@/lang/id/home/lang";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Card
      key={item.id}
      className="group gap-0 overflow-hidden p-0 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Skeleton className="absolute inset-0 size-full" />
        <Image
          src={placeholder}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-400 group-hover:scale-110"
          height={100}
          width={100}
        />
        <Badge className="absolute top-3 left-3 z-1">{lang.badgeLatest}</Badge>
      </div>

      <CardContent className="space-y-1 p-2 md:p-3">
        <div className="text-sm font-semibold md:text-base">{item.name}</div>
        <div className="text-base font-bold md:text-lg">
          {formatIDR(item.price)}
        </div>
        <Button className="mt-2 w-full" size="lg" variant="outline">
          {lang.buttonAddToCart}
        </Button>
      </CardContent>
    </Card>
  );
}

export { ItemCard };
