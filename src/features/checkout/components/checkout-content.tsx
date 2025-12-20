"use client";

import checkoutLang from "@/lang/id/checkout/checkout.lang";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { formatIDR, getEffectivePrice } from "@/lib/utils";
import { OrderData } from "@/features/orders/services/update-order";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import {
  MapPinIcon,
  // Loader2Icon,
  // PrinterIcon,
  // TruckIcon,
  // PackageCheckIcon,
  // XIcon,
  ClockIcon,
} from "lucide-react";
import {
  useMemo,
  // useState
} from "react";
// import { toast } from "sonner";
// import ky from "ky";

function CheckoutContent({ order }: { order: OrderData }) {
  const items = order.details;
  const total = order.total;
  // const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const receiver = useMemo(() => {
    const notes = String(order.receiver_notes ?? "");
    const lines = notes.split("\n").map((l) => l.trim());
    const findValue = (label: string) => {
      const line = lines.find((l) =>
        l.toLowerCase().startsWith(label.toLowerCase())
      );
      if (!line) return "";
      const parts = line.split(":");
      return parts.slice(1).join(":").trim();
    };
    return {
      name: findValue("Nama"),
      email: findValue("Email"),
      phone: findValue("Nomor Telepon"),
      note: findValue("Catatan"),
    };
  }, [order.receiver_notes]);

  const statusLabel = (() => {
    switch (order.status) {
      case "TX_DRAFT":
      case "TX_READY":
        return checkoutLang.statusCompactLabels.processing;
      case "TX_SENT":
        return checkoutLang.statusCompactLabels.sent;
      case "TX_RECEIVED":
        return checkoutLang.statusCompactLabels.received;
      case "TX_COMPLETED":
        return checkoutLang.statusCompactLabels.completed;
      default:
        return checkoutLang.statusUnknown;
    }
  })();
  const statusClass = useMemo(() => {
    const map: Record<string, string> = {
      TX_DRAFT: "bg-muted text-foreground",
      TX_READY: "bg-yellow-500 text-white",
      TX_SENT: "bg-blue-500 text-white",
      TX_RECEIVED: "bg-green-600 text-white",
      TX_COMPLETED: "bg-primary text-primary-foreground",
      TX_CANCELED: "bg-destructive text-white",
      TX_RETURN: "bg-pink-600 text-white",
      TX_CLOSED: "bg-gray-500 text-white",
    };
    return map[order.status] || "bg-muted text-foreground";
  }, [order.status]);

  const formatTs = (ts?: string | null) => {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleString("id-ID");
    } catch {
      return String(ts);
    }
  };

  const steps = useMemo(() => {
    const compact = [
      { code: "processing", at: order.created_at },
      { code: "sent", at: order.sent_time },
      { code: "received", at: order.received_time },
      { code: "completed", at: order.received_time },
    ];
    return compact;
  }, [order.created_at, order.sent_time, order.received_time]);

  const nextStatus = useMemo(() => {
    const sequence = [
      checkoutLang.statusCompactLabels.processing,
      checkoutLang.statusCompactLabels.sent,
      checkoutLang.statusCompactLabels.received,
      checkoutLang.statusCompactLabels.completed,
    ];
    const idx = sequence.indexOf(statusLabel);
    if (idx < 0 || idx >= sequence.length - 1) return null;
    return sequence[idx + 1];
  }, [statusLabel]);

  // const updateStatus = async (newStatus: string) => {
  //   try {
  //     setLoadingAction(newStatus);
  //     const res = await ky
  //       .put(`/api/orders/${order.id}/status`, {
  //         json: { status: newStatus },
  //       })
  //       .json<{ success: boolean }>();
  //     if (!res.success) throw new Error("failed");
  //     toast.success(checkoutLang.transactionStatusLabel);
  //   } catch {
  //     toast.error(checkoutLang.failedToLoadOrder);
  //   } finally {
  //     setLoadingAction(null);
  //   }
  // };

  // const printInvoice = () => {
  //   try {
  //     window.print();
  //   } catch {
  //     toast.error(checkoutLang.failedToLoadOrder);
  //   }
  // };

  // const trackShipment = () => {
  //   try {
  //     const lines = [
  //       checkoutLang.whatsappMessage.greeting(order.id),
  //       checkoutLang.whatsappMessage.detailsHeader,
  //       ...items.map(
  //         (it) =>
  //           `- ${it.detail?.name || it.notes || checkoutLang.unknownItem} x${it.quantity} @ ${formatIDR(String(Math.round(Number(it.price))))}`
  //       ),
  //       checkoutLang.whatsappMessage.total(
  //         formatIDR(String(Math.round(total)))
  //       ),
  //     ];
  //     const message = encodeURIComponent(lines.join("\n"));
  //     window.open(`https://wa.me/6285246428746?text=${message}`, "_blank");
  //   } catch {
  //     toast.error(checkoutLang.failedToLoadOrder);
  //   }
  // };

  return (
    <CardContent className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <div className="text-muted-foreground text-sm">
            {checkoutLang.orderNumber}
          </div>
          <div className="font-medium tabular-nums">{order.id}</div>
        </div>
        <div className="flex flex-col sm:items-end">
          <div className="text-muted-foreground text-sm">
            {checkoutLang.createdAt}
          </div>
          <div className="font-medium">
            {formatTs(order.created_at) || checkoutLang.notAvailable}
          </div>
        </div>
      </div>

      <Separator className="my-1" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-semibold">
            {checkoutLang.customerDetailsTitle}
          </div>
          <Item variant="outline" className="flex-col items-start">
            <ItemHeader>
              <ItemTitle>{checkoutLang.contactInformationTitle}</ItemTitle>
              <Badge
                className={statusClass}
                aria-label={checkoutLang.statusBadgeAria(statusLabel)}
              >
                {statusLabel}
              </Badge>
            </ItemHeader>
            <ItemContent>
              <ItemDescription>
                {checkoutLang.customerNameLabel}:{" "}
                {receiver.name || checkoutLang.notAvailable}
              </ItemDescription>
              <ItemDescription>
                {checkoutLang.customerEmailLabel}:{" "}
                {receiver.email || checkoutLang.notAvailable}
              </ItemDescription>
              <ItemDescription>
                {checkoutLang.customerPhoneLabel}:{" "}
                {receiver.phone || checkoutLang.notAvailable}
              </ItemDescription>
              <ItemDescription>
                {checkoutLang.customerNoteLabel}:{" "}
                {receiver.note || checkoutLang.notAvailable}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">
            {checkoutLang.shippingTitle}
          </div>
          <Item variant="outline" className="flex-col items-start">
            <ItemContent>
              <ItemDescription>
                <MapPinIcon className="mr-2 inline size-4" />
                {checkoutLang.shippingAddressLabel}:{" "}
                {order.output_address || checkoutLang.notAvailable}
              </ItemDescription>
              <ItemDescription>
                <ClockIcon className="mr-2 inline size-4" />
                {checkoutLang.preferredDeliveryLabel}:{" "}
                {formatTs(order.request_time) || checkoutLang.notAvailable}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-semibold">
            {checkoutLang.itemDetails}
          </div>
          <ul className="space-y-2">
            {items.length === 0 ? (
              <li className="text-muted-foreground">
                {checkoutLang.emptyCart}
              </li>
            ) : (
              items.map((item) => {
                const name =
                  item.detail?.name || item.notes || checkoutLang.unknownItem;
                const originalPrice = Math.round(Number(item.price));
                const effectivePrice = Math.round(
                  Number(
                    getEffectivePrice(
                      item.price,
                      item.detail?.price_discount ?? null
                    )
                  )
                );
                const hasDiscount = effectivePrice < originalPrice;
                const qty = Number(item.quantity);
                const lineTotal = Math.round(effectivePrice * qty);
                return (
                  <li
                    key={`summary-${item.id}`}
                    className="flex items-start justify-between gap-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{name}</span>
                      <span className="text-muted-foreground text-sm">
                        {qty} × {formatIDR(String(effectivePrice))}
                        {hasDiscount && (
                          <span className="ml-1 text-xs line-through">
                            {formatIDR(String(originalPrice))}
                          </span>
                        )}
                      </span>
                    </div>
                    <span className="font-semibold tabular-nums">
                      {formatIDR(String(lineTotal))}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
          <Separator />
          <div className="flex items-center justify-between py-1">
            <div className="text-base font-semibold">{checkoutLang.total}</div>
            <div className="text-lg font-extrabold tabular-nums">
              {formatIDR(String(Math.round(total)))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">
            {checkoutLang.paymentTitle}
          </div>
          <Item variant="outline" className="flex-col items-start">
            <ItemContent>
              <ItemDescription>
                {checkoutLang.paymentMethodLabel}: {checkoutLang.notAvailable}
              </ItemDescription>
              <ItemDescription>
                {checkoutLang.transactionStatusLabel}: {statusLabel}
              </ItemDescription>
            </ItemContent>
          </Item>

          <div className="text-sm font-semibold">
            {checkoutLang.statusTimelineTitle}
          </div>
          <div className="space-y-2">
            {steps.map((s, idx) => {
              const label =
                checkoutLang.statusCompactLabels[
                  s.code as keyof typeof checkoutLang.statusCompactLabels
                ] ?? checkoutLang.statusUnknown;
              const isActive = label === statusLabel;
              return (
                <Item
                  key={`st-${s.code}-${idx}`}
                  variant={isActive ? "muted" : "outline"}
                  className="items-center justify-between"
                >
                  <ItemTitle>{label}</ItemTitle>
                  <ItemDescription>
                    {formatTs(s.at) || checkoutLang.notAvailable}
                  </ItemDescription>
                </Item>
              );
            })}
          </div>
          {nextStatus && (
            <Item variant="outline" className="items-center justify-between">
              <ItemTitle>{checkoutLang.estimatedNext(nextStatus)}</ItemTitle>
              <ItemDescription>
                {formatTs(order.request_time) || checkoutLang.notAvailable}
              </ItemDescription>
            </Item>
          )}
        </div>
      </div>

      <Separator />

      {/* <div className="space-y-2">
        <div className="text-sm font-semibold">{checkoutLang.actionsTitle}</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Button
            onClick={printInvoice}
            size="lg"
            aria-label={checkoutLang.printInvoice}
          >
            <PrinterIcon className="mr-2 size-4" /> {checkoutLang.printInvoice}
          </Button>
          <Button
            onClick={() => updateStatus("TX_CANCELED")}
            size="lg"
            variant="destructive"
            aria-label={checkoutLang.cancelOrder}
            disabled={
              loadingAction !== null ||
              ["TX_COMPLETED", "TX_CANCELED", "TX_CLOSED"].includes(
                order.status
              )
            }
          >
            {loadingAction === "TX_CANCELED" ? (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            ) : (
              <XIcon className="mr-2 size-4" />
            )}
            {checkoutLang.cancelOrder}
          </Button>
          <Button
            onClick={trackShipment}
            size="lg"
            variant="outline"
            aria-label={checkoutLang.trackShipment}
            disabled={loadingAction !== null || !order.sent_time}
          >
            <TruckIcon className="mr-2 size-4" /> {checkoutLang.trackShipment}
          </Button>
          <Button
            onClick={() => updateStatus("TX_RECEIVED")}
            size="lg"
            aria-label={checkoutLang.markAsReceived}
            disabled={loadingAction !== null || order.status !== "TX_SENT"}
          >
            {loadingAction === "TX_RECEIVED" ? (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            ) : (
              <PackageCheckIcon className="mr-2 size-4" />
            )}
            {checkoutLang.markAsReceived}
          </Button>
        </div>
      </div> */}
    </CardContent>
  );
}

export { CheckoutContent };
