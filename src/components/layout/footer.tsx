"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import footerLang from "@/lang/id/layout/footer.lang";
import { NewsletterForm } from "@/features/newsletter/components/newsletter-form";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">{footerLang.companyName}</h3>
            <p className="text-muted-foreground text-sm">
              {footerLang.companyTagline}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-semibold">{footerLang.followUs}</h4>
            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com"
                aria-label={footerLang.socialFacebookAria}
                className="hover:text-primary transition-colors"
              >
                <Facebook className="size-5" />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label={footerLang.socialTwitterAria}
                className="hover:text-primary transition-colors"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label={footerLang.socialInstagramAria}
                className="hover:text-primary transition-colors"
              >
                <Instagram className="size-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label={footerLang.socialLinkedInAria}
                className="hover:text-primary transition-colors"
              >
                <Linkedin className="size-5" />
              </Link>
            </div>
          </div>

          <nav
            aria-label={footerLang.footerNavigationAriaLabel}
            className="space-y-3"
          >
            <h4 className="text-base font-semibold">
              {footerLang.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {footerLang.linkHome}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  {footerLang.linkContact}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-3">
            <h4 className="text-base font-semibold">
              {footerLang.contactTitle}
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground mr-2">
                  {footerLang.contactEmailLabel}:
                </span>
                <a
                  href={`mailto:${footerLang.contactEmailValue}`}
                  className="hover:text-primary underline underline-offset-4 transition-colors"
                >
                  {footerLang.contactEmailValue}
                </a>
              </p>
              <p>
                <span className="text-muted-foreground mr-2">
                  {footerLang.contactPhoneLabel}:
                </span>
                <a
                  href={`tel:${footerLang.contactPhoneValue.replace(/\s/g, "")}`}
                  className="hover:text-primary underline underline-offset-4 transition-colors"
                >
                  {footerLang.contactPhoneValue}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <NewsletterForm />
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-muted-foreground text-xs">
            {footerLang.copyright(year, footerLang.companyName)}
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
