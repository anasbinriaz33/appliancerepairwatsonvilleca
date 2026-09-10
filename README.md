# Appliance Repair Watsonville CA

A Next.js 14 (React + Node.js) website for a local appliance repair business,
built for local SEO in Watsonville, CA.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Node.js API route for the booking form
- Per-service SEO pages, sitemap.xml, robots.txt, JSON-LD LocalBusiness schema

## 1. Before you do anything: edit `lib/site.ts`

This is the single file with your business's real contact info. Every line
marked `PLACEHOLDER` needs a real value before launch:

- Phone number (display + `tel:` link format)
- Email address
- Real domain name
- Exact service area / ZIP codes
- Social profile links (optional)

Keeping this in one file means your phone number and address are
consistent everywhere (footer, contact page, JSON-LD schema) — consistent
NAP (Name/Address/Phone) info across the web is one of the biggest local
SEO ranking factors, so don't skip this step.

Service copy (the text on each `/services/[slug]` page) lives in
`lib/services.ts` if you want to edit or add appliances.

## 2. Run it locally

You'll need [Node.js 18+](https://nodejs.org) installed.

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 3. Build for production

```bash
npm run build
npm run start
```

## 4. Deploying to Hostinger

Hostinger supports Node.js apps on Business/Cloud hosting plans and VPS
plans, through **hPanel → Advanced → Node.js**. Steps:

1. **Zip and upload** this whole project folder (or connect a Git repo if
   your plan supports Git deployment) into your Hostinger account.
2. In hPanel, go to **Node.js** and click **Create Application**.
3. Set:
   - **Node.js version:** 18 or newer
   - **Application root:** the folder you uploaded
   - **Application startup file:** leave as default, or point it at a
     small `server.js` if hPanel requires one (Next.js apps normally run
     via `npm run start`, which hPanel's Node.js manager can call directly
     — check the "Startup command" field for this).
   - **Application URL:** your domain (e.g. appliancerepairwatsonvilleca.com)
4. Open the app's **NPM install** button in hPanel (or SSH in and run
   `npm install`), then run `npm run build`.
5. Start the app. Hostinger will keep it running and can auto-restart it.
6. Point your domain's DNS (if not already on Hostinger) to your hosting,
   and enable SSL (Hostinger gives free SSL via hPanel → SSL).

If your Hostinger plan is shared hosting **without** Node.js support,
you have two options: upgrade to a plan with Node.js/VPS support (Next.js
needs a Node server to run, since it does server-side rendering), or
export a fully static version with `next export`-style static generation
— ask your developer if you want this route, since it will need small
code changes (the booking form's API route can't run on pure static
hosting; it would need to point at an external form service instead).

## 5. Wiring up the booking form for real

Right now, `/app/api/booking/route.ts` saves each submission to
`data/bookings.log` on the server so nothing is lost. For a production
site, you'll want submissions to actually notify you — the cleanest
options are:

- **Email:** use [Resend](https://resend.com) or Nodemailer with your
  SMTP details (Hostinger email accounts have SMTP credentials in hPanel
  under Emails → Connect Apps & Devices).
- **SMS:** Twilio, if you want a text the moment a booking comes in.

The form's shape and validation are already in place — this is a small
addition inside `app/api/booking/route.ts`.

## 6. Local SEO checklist after launch

- Create/claim your **Google Business Profile** with the exact same name,
  address, and phone number as `lib/site.ts`.
- Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
- Get listed on Yelp, Angi, and Nextdoor with matching NAP info.
- Ask happy customers for Google reviews — review count/recency is a
  strong local ranking signal for service businesses.

## Project structure

```
app/                  Pages (App Router)
  services/[slug]/    Individual service pages (SEO landing pages)
  api/booking/        Booking form submission handler
components/           Reusable UI components
lib/site.ts           Business info — EDIT THIS FIRST
lib/services.ts        Service content/data
```


## Editing service content

Each service now has its own content file under `content/services/`. For example, edit `content/services/coffee-machines-repair.ts` to change the Coffee Machine Repair page without touching the other services. Each file contains the service copy, image path, common issues, brands, and SEO title/description. The shared `lib/services.ts` file only assembles the service list and should normally not need editing when updating copy.
