---
title: Quality check
description: How Reica scores every image against the product photo, lists its defects and fixes the ones under your threshold.
---

# Quality check

Every catalog image is checked automatically after it is made. Reica compares it with the product photo and gives it a score out of 100, shown as **Quality check 92/100** under the image.

| Score | Means |
| --- | --- |
| 85 and over | <span className="state state--approved">Matches the photo</span> |
| 60 to 84 | <span className="state state--review">Check the details</span> |
| Under 60 | <span className="state state--rejected">Does not match the photo</span> |

## What it looks at

- **Fidelity to the product**: a print or logo missing or redrawn, a different colour, a different shape, missing or added parts, or a different product altogether.
- **The image itself**: edges, a leftover hanger, tag or background, stains, warped areas, a product cut off by the frame, a floating shadow.
- **On-model outfits**: whether each garment of the outfit is worn as chosen.

Each problem found is listed in Review with where it is and how serious it is:

- **Not publishable**
- **A shopper would notice**
- **Minor**

A problem lowers the score, so a faithful product in a flawed image is flagged too.

## Automatic fix

When an image scores under the threshold of its brand profile, Reica makes one attempt to fix what it found, at no extra cost, and keeps the better of the two. A fixed image says **auto-fixed** next to its score, and Review shows what was fixed.

## You decide

The check helps you look where it matters; it does not replace your eyes. It can miss small changes, so look before you approve.

- In Review, sort by **Lowest score first** to see the likely problems first.
- **Approve all remaining** in a batch leaves out every image under 85, and every outfit that needs a look, so you check those yourself.
- **Fix the detected defects** (<kbd>F</kbd>) fills in the change request with what the check found, ready to edit.

The threshold is set in each [brand profile](/catalog/brand-profiles#quality-check).
