"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Receipt } from "lucide-react";
import commonLang from "@/lang/id/common.lang";

import ordersLang from "@/lang/id/orders/orders.lang";
import { formatIDR } from "@/lib/utils";

type LocalOrderEntry = {
  id: number;
  createdAt: string;
  total: number;
  items: {
    item: { id: number; name: string; price: string };
    quantity: number;
  }[];
};

function OrdersHistory() {
  const orders: LocalOrderEntry[] = (() => {
    try {
      const raw = localStorage.getItem("orders_history");
      const parsed = raw ? (JSON.parse(raw) as LocalOrderEntry[]) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  })();

  const handleClear = () => {
    try {
      localStorage.removeItem("orders_history");
      toast.message(ordersLang.cleared);
      window.location.reload();
    } catch {}
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{ordersLang.title}</h1>
        <Button variant="outline" onClick={handleClear}>
          {ordersLang.clearAll}
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon" aria-hidden="true">
                  <Receipt className="size-6" aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>{ordersLang.empty}</EmptyTitle>
                <EmptyDescription>
                  {ordersLang.emptyDescription}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  asChild
                  variant="outline-primary"
                  aria-label={commonLang.startShopping}
                  size="lg"
                  className="h-12 md:h-9"
                >
                  <Link href="/products">{commonLang.startShopping}</Link>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={`ord-${order.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {ordersLang.orderId(order.id)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {ordersLang.date}:{" "}
                      {new Date(order.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="text-lg font-extrabold tabular-nums">
                    {formatIDR(String(Math.round(order.total)))}
                  </div>
                </div>
                <Separator className="my-3" />
                <ul className="space-y-1" aria-label="Rincian Pesanan">
                  {order.items.map((it) => (
                    <li
                      key={`it-${order.id}-${it.item.id}`}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {it.item.name} × {it.quantity}
                      </span>
                      <span className="tabular-nums">
                        {formatIDR(
                          String(
                            Math.round(Number(it.item.price) * it.quantity)
                          )
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button asChild size="sm" variant="outline-primary">
                    <Link href={`/checkout/${order.id}`}>
                      {ordersLang.viewDetails}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export { OrdersHistory };
