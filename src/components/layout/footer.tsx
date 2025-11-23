"use client";

import Link from "next/link";

import footerLang from "@/lang/id/layout/footer.lang";
import { NewsletterForm } from "@/features/newsletter/components/newsletter-form";
import { navigationData } from "@/data/navigation.data";
import { socialData } from "@/data/social.data";
import { contactData } from "@/data/contact.data";

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
              {socialData.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  aria-label={footerLang.socialAria(item.name)}
                  className="hover:text-primary transition-colors"
                >
                  <item.icon className="size-5" />
                </Link>
              ))}
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
              {navigationData.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h4 className="text-base font-semibold">
              {footerLang.contactTitle}
            </h4>
            <div className="space-y-1 text-sm">
              {contactData.map((item) => (
                <p key={item.name}>
                  <span className="text-muted-foreground mr-2">
                    {item.name}:
                  </span>
                  <a
                    href={item.href}
                    className="hover:text-primary underline underline-offset-4 transition-colors"
                  >
                    {item.value}
                  </a>
                </p>
              ))}
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
