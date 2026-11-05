---
title: Validation
description: The checks every image passes between your photo and your shop - photo checks, measured garments, the quality check, automatic fixes and human approval.
---

# Validation

An image model can change a product without saying so: a print redrawn, a hem a little longer, a pocket that was not there. For a catalog that is not a detail, it is a return. Reica puts a validation layer around every image, so that what reaches your shop matches what you sell and was approved by a person.

The checks run at five moments.

| When | What Reica checks | What you see |
| --- | --- | --- |
| [1. Before generating](#1-before-generating) | The photo, the sides it shows, the category | Photo check, Coverage, a warning before you pay |
| [2. While generating](#2-while-generating) | The garment's measured shape and length | Nothing to do: it is built in |
| [3. After generating](#3-after-generating) | The image against your photo, and its own defects | Quality check score and defects |
| [4. Automatic fix](#4-automatic-fix) | One correction when the score is under your threshold | "auto-fixed" next to the score |
| [5. Your approval](#5-your-approval) | A person decides; nothing unapproved leaves | Review, approval-only export |

## 1. Before generating

**Photo check.** When you add photos, each one is checked against the seven [photo guidelines](/catalog/add-products#before-you-take-the-photos): one product, the whole garment in the frame, a front view, a plain background, at least 2000 px, sharp and evenly lit, nothing pinned. The check advises and never blocks you.

**Front photo verdict.** On the product page the front photo is marked as good, could be better, or worth retaking, with the reason: blurry, cropped, partly hidden, glare, low detail.

**Coverage.** Reica knows which sides your photos show. When you ask for a view no photo shows, such as the back without a back photo, it says so before you generate: "No photo of the back: it will be imagined." You decide whether to add the photo first.

**Category.** The category is detected from the photo, with how sure Reica is. Below a safe level it is only suggested, and you confirm it. The category decides how the garment is isolated and measured, so it is never guessed silently.

## 2. While generating

**The garment is measured.** Before the image is made, Reica measures the garment in your photo, separate from the hanger, the wall and the pins, and gives the image model the garment alone. This keeps the model from copying the hanger or misreading the length.

**Proportions are held to the photo.** A still life that comes out longer or shorter than in your photo is corrected: up to a quarter longer, it is brought back to the photo's proportions; beyond that, or shorter, it is made again.

**Length on the body.** For dresses you choose where the hem falls on the model (mid-thigh, knee, mid-calf, ankle) or keep it as in the photo. Without a choice, Reica works the length out from your photo.

**On-model starts from an approved product.** An on-model photo is made from the approved front still life, the clean garment, and the other views your photos show. Reica tells the model never to add what no view shows.

## 3. After generating

Every catalog image is compared with your product photo and gets a score out of 100.

![The quality check in Review: the score, its level and the defect found, with Fix the detected defects](/img/catalog/quality-check.jpg)

| Score | Means |
| --- | --- |
| 85 and over | <span className="state state--approved">Matches the photo</span> |
| 60 to 84 | <span className="state state--review">Check the details</span> |
| Under 60 | <span className="state state--rejected">Does not match the photo</span> |

**What is checked**

- **Fidelity**: print, logo and text, colour, shape, missing or added parts, or a different product altogether.
- **The image itself**: edges, a leftover hanger, tag or background, stains, warped areas, a floating shadow.
- **Measured, not guessed**: a product cut off by the frame and proportions that differ from the photo are measured on the pixels, because a visual judgement misses them.
- **Hem position**: for dresses, where the hem falls on the model compared with the length you chose.
- **Outfit**: on an on-model photo, each garment you chose for the outfit is checked one by one: worn as chosen, missing, different, outside the frame, or could not be confirmed.

**Each defect** comes with where it is, what is wrong, how to fix it, and how serious it is:

- **Not publishable** caps the score under 60;
- **A shopper would notice** caps it under 85;
- **Minor** caps it under 95.

So a faithful product in a flawed image is flagged too, and a high score always means no serious defect was found.

The outfit check is kept apart from the score: a perfect product with the wrong trousers still scores high, and is still flagged.

## 4. Automatic fix

When an image scores under the threshold of its [brand profile](/catalog/brand-profiles#quality-check), Reica makes one attempt to fix what it found, at no extra cost:

- the defects are fixed as an edit of the image, with the product photo as the reference;
- wrong proportions are made again rather than edited;
- the new image is checked again, and kept only if it scores higher and loses no garment of the outfit. Otherwise the first one stays.

A fixed image says **auto-fixed** next to its score, and Review shows what was fixed.

At the end of a batch, the images still under the threshold are listed with their defects. You choose which to fix, see the cost, and confirm. Nothing is fixed and charged without your confirmation.

![The Quality check panel at the end of a batch: two shots under 85 with their defects, Review them and Fix 2 shots](/img/catalog/batch-quality-check.jpg)

## 5. Your approval

The checks narrow down where to look. The decision stays with a person.

- **Every image waits for review.** It is approved, rejected or changed in [Review](/catalog/review), next to your photo, at full size.
- **Bulk approval keeps the risky ones back.** Approve all remaining leaves out every image under 85 and every outfit that needs a look.
- **Every version is kept.** A correction never replaces an image silently: the earlier versions stay, with their scores, and you can go back to one.
- **Only approved images leave Reica.** Downloads, exports and Google Drive transfers refuse an image waiting for review or rejected. This is enforced on Reica's servers, not only hidden in the interface.
- **Every image is declared.** Exported images carry a mark in their file data saying they were generated with AI, and the export manifest lists each file with its score and the disclosure, as the EU AI Act asks.

## What validation does not promise

The checks are measured on real catalog images and catch what matters most, but they are not a guarantee: a small change can pass. Look at each image before you approve it. Validation tells you where to look first.
