"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Modal } from "@/components/common/Modal";
import { createDemoRequest } from "@/lib/api";
import { siteConfig } from "@/config/site";

interface DemoRequestTriggerProps {
  label?: string;
  fullWidth?: boolean;
  className?: string;
}

const inputClassName =
  "mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-white outline-none transition-colors placeholder:text-text-muted focus:border-brand";

export function DemoRequestTrigger({
  label = "Book a free demo",
  fullWidth = false,
  className,
}: DemoRequestTriggerProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const close = () => {
    setOpen(false);
    setSubmitted(false);
    setError("");
    setPhoneError("");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") ?? "").trim();

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Enter a valid 10-digit phone number.");
      return;
    }

    setPhoneError("");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);

    try {
      await createDemoRequest({
        name: String(formData.get("name") ?? ""),
        phone,
        email: String(formData.get("email") ?? ""),
        city: String(formData.get("city") ?? ""),
        gymName: String(formData.get("gymName") ?? ""),
      });
      setSubmitted(true);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "";
      setError(
        message === "Validation failed"
          ? "Please check your details. The phone number must contain 10 digits."
          : message || "Unable to send your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        size="lg"
        fullWidth={fullWidth}
        className={className}
        onClick={() => setOpen(true)}
      >
        {label}
        <Icon name="arrow" className="size-4" />
      </Button>
      <Modal
        open={open}
        onClose={close}
        title="Book a free demo"
        className="max-h-[calc(100dvh-1.5rem)] max-w-xl min-w-0 overflow-x-hidden overflow-y-auto p-4 sm:max-h-[calc(100dvh-3rem)] sm:p-6"
      >
        {submitted ? (
          <div className="py-1">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
                <Icon name="check" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold text-white">Your demo request is in</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  Thanks for reaching out. Our team will contact you shortly to arrange your demo.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-lg border border-success/25 bg-success/[0.06] p-3.5">
                <p className="text-sm font-semibold text-white">14 days free</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">Explore the full FITZENIX experience.</p>
              </div>
              <div className="rounded-lg border border-brand/25 bg-brand/[0.06] p-3.5">
                <p className="text-sm font-semibold text-white">Instant access</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">Get started in about a minute.</p>
              </div>
              <div className="rounded-lg border border-border bg-background/70 p-3.5">
                <p className="text-sm font-semibold text-white">No credit card</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">Start your trial without payment details.</p>
              </div>
              <div className="rounded-lg border border-border bg-background/70 p-3.5">
                <p className="text-sm font-semibold text-white">Made for your whole gym</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">Tools for owners, trainers, and members.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={siteConfig.loginUrl} className="flex-1">
                <Button fullWidth>Start a free trial now</Button>
              </Link>
              <Button variant="outline" onClick={close} className="sm:min-w-28">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="-mt-1 mb-5 text-sm leading-relaxed text-text-secondary">
              See how FITZENIX can simplify your gym. Leave your details and we’ll be in touch.
            </p>
            <form noValidate onSubmit={handleSubmit} className="grid min-w-0 gap-x-4 gap-y-4 sm:grid-cols-2">
              <label className="min-w-0 text-sm font-medium text-text-secondary">
                Your name
                <input className={inputClassName} name="name" autoComplete="name" required minLength={2} maxLength={120} />
              </label>
              <label className="min-w-0 text-sm font-medium text-text-secondary">
                Phone number
                <input
                  className={inputClassName}
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  required
                  maxLength={10}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "demo-phone-error" : undefined}
                  onChange={() => setPhoneError("")}
                />
                {phoneError ? (
                  <span id="demo-phone-error" className="mt-1 block text-xs text-danger">
                    {phoneError}
                  </span>
                ) : null}
              </label>
              <label className="min-w-0 text-sm font-medium text-text-secondary sm:col-span-2">
                Email address
                <input className={inputClassName} name="email" type="email" autoComplete="email" required maxLength={254} />
              </label>
              <label className="min-w-0 text-sm font-medium text-text-secondary">
                City
                <input className={inputClassName} name="city" autoComplete="address-level2" required minLength={2} maxLength={100} />
              </label>
              <label className="min-w-0 text-sm font-medium text-text-secondary">
                Gym name
                <input className={inputClassName} name="gymName" autoComplete="organization" required minLength={2} maxLength={160} />
              </label>
              {error ? (
                <p role="alert" className="text-sm text-danger sm:col-span-2">
                  {error}
                </p>
              ) : null}
              <div className="sm:col-span-2">
                <Button type="submit" fullWidth loading={loading}>
                  {loading ? "Sending request..." : "Request my free demo"}
                </Button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}