"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import footerLang from "@/lang/id/layout/footer.lang";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(footerLang.newsletterInvalidEmail),
});

function NewsletterForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  function onSubmit() {
    try {
      toast.success(footerLang.newsletterSuccess);
      form.reset();
    } catch {
      toast.error(footerLang.newsletterError);
    }
  }

  return (
    <div className="space-y-3">
      <h4 className="text-base font-semibold">{footerLang.newsletterTitle}</h4>
      <p className="text-muted-foreground text-sm">
        {footerLang.newsletterDescription}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto] md:items-end"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{footerLang.contactEmailLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={footerLang.newsletterEmailPlaceholder}
                    aria-label={footerLang.newsletterEmailPlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="default" className="h-12 md:h-9">
            {footerLang.newsletterSubmitLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { NewsletterForm };
