import { ActionLink } from "@/components/primitives/ActionLink";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { BrandMark } from "./BrandMark";
import group from "@/data/group.json";
import companies from "@/data/companies.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="shell grid gap-12 py-section lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <BrandMark />
          <p className="max-w-xs text-sm text-muted-foreground">{group.description}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-5">
          <EyebrowLabel>Navigate</EyebrowLabel>
          <ul className="flex flex-col gap-3 text-sm">
            {group.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors duration-300 hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5">
          <EyebrowLabel>Our Companies</EyebrowLabel>
          <ul className="flex flex-col gap-8">
            {companies.map((company) => (
              <li key={company.id} className="flex flex-col gap-3">
                <p className="font-display text-lg text-foreground">{company.name}</p>
                <p className="text-sm text-muted-foreground">{company.footerLine}</p>
                <ActionLink
                  href={company.url}
                  variant="gold"
                  external
                  className="self-start"
                >
                  Visit site
                </ActionLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <EyebrowLabel>Contact</EyebrowLabel>
          <address className="flex flex-col gap-3 text-sm not-italic text-muted-foreground">
            <span>
              {group.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <a href={`tel:${group.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold">
              {group.contact.phone}
            </a>
            <a href={`mailto:${group.contact.email}`} className="hover:text-gold">
              {group.contact.email}
            </a>
            <span>{group.contact.hours}</span>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fabluxe Group. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="/privacy" className="hover:text-gold">
              Privacy
            </a>
            <a href="/terms" className="hover:text-gold">
              Terms
            </a>
            {group.social.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-gold">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}