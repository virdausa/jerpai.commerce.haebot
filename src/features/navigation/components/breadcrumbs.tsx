"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import breadcrumbsLang from "@/lang/id/layout/breadcrumbs.lang";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = {
  label: string;
  href?: string;
};

function getLabelForSegment(prev: string | null, seg: string): string {
  const s = decodeURIComponent(seg);
  const baseMap: Record<string, string> = {
    products: breadcrumbsLang.products,
    wishlist: breadcrumbsLang.wishlist,
    cart: breadcrumbsLang.cart,
    orders: breadcrumbsLang.orders,
    checkout: breadcrumbsLang.checkout,
    categories: breadcrumbsLang.categories,
    account: breadcrumbsLang.account,
  };

  if (prev === "checkout") {
    return breadcrumbsLang.orderIdLabel(s);
  }

  return baseMap[s] ?? breadcrumbsLang.segmentTitle(s);
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = (pathname || "/").split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const crumbs: Crumb[] = [{ label: breadcrumbsLang.home, href: "/" }];

  segments.forEach((seg, idx) => {
    const href = `/${segments.slice(0, idx + 1).join("/")}`;
    const prev = idx > 0 ? segments[idx - 1] : null;
    const label = getLabelForSegment(prev, seg);
    const isLast = idx === segments.length - 1;
    crumbs.push({ label, href: isLast ? undefined : href });
  });

  const q = searchParams.get("q");
  if (q && segments.includes("products")) {
    crumbs.push({ label: breadcrumbsLang.searchLabel(q) });
  }

  return (
    <nav className="mx-auto max-w-7xl py-2 md:py-4">
      <Breadcrumb
        aria-label={breadcrumbsLang.ariaLabel}
        className="flex justify-start"
      >
        <BreadcrumbList className="justify-start">
          {crumbs.length === 1 ? (
            <BreadcrumbItem>
              <BreadcrumbPage>{crumbs[0].label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <Fragment key={`crumb-${i}`}>
                  <BreadcrumbItem>
                    {c.href && !isLast ? (
                      <BreadcrumbLink asChild>
                        <Link href={c.href}>{c.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {i < crumbs.length - 1 ? <BreadcrumbSeparator /> : null}
                </Fragment>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}

export type { Crumb };
