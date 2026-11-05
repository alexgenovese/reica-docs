---
title: Export
description: Download approved images as a ZIP with a manifest, one file per size, or send them to a Google Drive folder.
---

# Export

Only approved images leave Reica. An image waiting for review or rejected cannot be downloaded.

## Download the approved images

Choose **Export approved** in Review or on the batch page.

- One approved image downloads as a PNG.
- Two or more download as `reica-approved-shots.zip`.

Files are named `{SKU}_{shot}.png`, for example `JKT-001_front.png` and `JKT-001_on-model-back.png`, so they sort by product.

The ZIP holds a `manifest.csv` with one row per file:

| Column | Holds |
| --- | --- |
| `sku` | The product's SKU |
| `shot` | The shot, such as `front` |
| `filename` | The file in the ZIP |
| `match_score` | The quality check score |
| `generation_id` | Reica's id of the image |
| `ai_generated_disclosure` | "Generated with AI (EU AI Act Art. 50)" |

## One file per size

Some shops load images per variant. Under **More ways to export the approved shots**, choose **Export, one file per size**: each image is copied for every size SKU from your feed, named `{size SKU}_{shot}.png`.

## Send to Google Drive

- From a **batch** or **Review**, **Send to Google Drive** sends the approved images.
- From a **product page**, you choose the images: the approved ones are selected, and you can include those still to review.

Pick a Drive folder. Reica puts the files in a subfolder named after the batch, or today's date, named `{SKU}_{shot}.png`. Sending the same image again updates its file. Up to 500 images per send; follow the progress in the sidebar.

### A transfer for many products

To send the images of many products at once, go to **Batches**, **New batch**, then **Transfer**. Choose the products, the shots (by state, kind and angle; rejected images are never sent), then the destination:

- a Drive folder, or a new one;
- **One folder per SKU** or **All in one folder**;
- file names built from SKU, product name, shot, kind, number, date, season, collection, colour and category.

A `manifest.csv` beside the files lists every file and its folder. A transfer is free, up to 200 products and 500 images.

## A single image

On a product page, an approved shot's menu has **Download PNG**. High-resolution versions download from the same menu once made.

Every image downloaded or sent from Reica carries a mark in its file data saying it was generated with AI. It is not visible in the picture.

During the free trial, downloads carry a light diagonal "Reica trial" mark. The images in Reica stay clean: once your plan is paid, downloads have no mark.
