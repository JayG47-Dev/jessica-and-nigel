# Jessica &amp; Nigel — Wedding Website

A static wedding website for Jessica &amp; Nigel's destination wedding in Naxxar, Malta on **13th May 2027**. Built with plain HTML, CSS and JavaScript — no build step, ready to deploy straight to Netlify.

## Pages

- `index.html` — Home: hero, at-a-glance, day timeline, RSVP call-to-action
- `rsvp.html` — RSVP form (submits via Netlify Forms)
- `accommodation.html` — Where to stay
- `dress-code.html` — What to wear
- `travel.html` — Getting to Malta
- `faq.html` — Frequently asked questions
- `thank-you.html` — RSVP confirmation / no-JS fallback

## Deploying to Netlify

1. Push this repo to GitHub (or your git provider of choice).
2. In Netlify: **Add new site → Import an existing project**, and connect this repo.
3. Build settings: leave the **build command blank** and set the **publish directory** to `.` (the repo root) — there's no build step, it's already static.
4. Deploy. That's it.

You can also just drag-and-drop the whole project folder onto [app.netlify.com/drop](https://app.netlify.com/drop) for a quick one-off deploy without connecting git.

### RSVP form (Netlify Forms)

The RSVP form on `rsvp.html` uses [Netlify Forms](https://docs.netlify.com/forms/setup/) — no backend or extra service needed. Once deployed:

1. Go to your site in the Netlify dashboard → **Forms**. A form named `rsvp` should appear automatically after your first deploy (Netlify scans the HTML for `data-netlify="true"` forms at deploy time).
2. Go to **Forms → Settings and usage → Form notifications** and add an email notification so you get an email every time someone RSVPs.
3. Submissions (and a CSV export) are viewable any time under **Forms → rsvp**.
4. The form also has honeypot spam protection built in (`netlify-honeypot="bot-field"`).

## Content still to fill in

A few spots are marked with a dashed placeholder note directly on the page — search the HTML for `placeholder-note` to find them all. Currently that's:

- **Accommodation** — recommended hotel(s)/booking link or group rate, and a note on any group transport/shuttle
- **Dress code** — confirm the exact dress code wording/colour palette if you want one
- **Travel** — optional flight/airline suggestions
- **FAQ** — children policy, gift registry details, and a contact email/phone number
- A contact/couple email address to use across the site

## Local preview

No build tools required — just open `index.html` in a browser, or serve the folder locally, e.g.:

```
npx serve .
```

Note: the RSVP form's AJAX submission only works once deployed on Netlify (or via `netlify dev`), since it relies on Netlify's form-handling backend.
