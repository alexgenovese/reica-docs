---
title: Developer API
description: Make catalog images from your own systems with the Reica API - keys, the flow, credits, limits, idempotency keys and signed webhooks.
---

# Developer API

The Reica API lets your own systems do what you do in the app: send products, make their catalog images with a brand profile, review them and download the approved ones. It is included in the Pro plan.

The full reference, with every field and an example, is the API reference in the app, at `app.getreica.com/developer/docs`. This page is the short version.

## What it does

- **Generations and batches.** A generation makes the shots of one product, a batch those of many, always with one of your brand profiles. The look, the model and the outfit are the ones you set in the app. The prices, the Standard discount and the refunds are the app's.
- **Products and feeds.** Upload photos with signed addresses, or import a feed or a store.
- **Review and download.** Approve or reject shots, then download the approved images. Nothing unapproved can be downloaded, as in the app.

The API does not edit images, does not change brand profiles and does not make ZIP exports.

## Get started

1. In Reica, open **Settings** and **Developer**, and make an API key. It looks like `reica_live_...` and is shown once: keep it safe.
2. Send it with every request: `Authorization: Bearer <your key>`. The address is `https://app.getreica.com/api/v1`.
3. Follow the flow:
   1. Upload the photos of your products, or start a feed import.
   2. Read your brand profiles and ask for an **estimate**: it is free and shows the price and the products that would be skipped.
   3. Start a generation or a batch.
   4. Read it until it is completed, or wait for the webhook.
   5. Approve the shots and download them.

## Credits

Amounts are credits with one decimal: your balance, the estimate and the credits of a run, such as 12.5. A run holds its whole price when it starts (`held`), pays each shot from it and gives back what it did not use when it ends. If your balance is short, the start is refused with `402 INSUFFICIENT_CREDITS` and nothing runs.

## Limits

Each key may make a number of requests a minute, set by your plan. Every answer carries `X-RateLimit-Limit` and `X-RateLimit-Remaining`. Over the limit the answer is `429` with `Retry-After`, the seconds to wait.

## Idempotency keys

Every request that creates something or spends credits needs an `Idempotency-Key` header: a value of yours, unique per request, such as an order number. If a request times out, send it again with the same value: it runs once, and you get the same answer back, for 24 hours. The same value with a different request is refused with `409`. After you fix the cause of an error, such as topping up credits, send a new value.

## Webhooks

Instead of asking again and again, let Reica call you. In **Settings** and **Developer**, add an address that starts with `https://` and choose the events. You can have up to 5 endpoints.

| Event | When |
| --- | --- |
| `shot.completed` | a shot is made |
| `shot.failed` | a shot failed |
| `run.completed` | a generation or batch has ended |
| `import.completed` | a feed import has ended |

Reica sends a `POST` with `{ id, type, createdAt, data }`. `data` holds ids and a status; ask the API for the details. When your server does not answer with a 2xx code within 10 seconds, Reica tries again, up to eight times over about two days. Use `id` to ignore a repeat. The order of events is not guaranteed.

**Check the signature.** Each delivery has the header `Reica-Signature: t=<time>,v1=<signature>`. Make the HMAC-SHA256 of `<time>.<the raw body>` with your endpoint's secret (`whsec_...`, shown once when you make the endpoint), compare it with `v1`, and refuse a time older than five minutes. Compute it on the raw body, before your framework parses it.

Choose **Send test** on an endpoint to receive a signed test event.
