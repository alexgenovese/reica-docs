---
title: Trust and compliance
description: Rights to your photos and the indemnification you accept, AI Act transparency marking on every image, content safety, and how Reica handles personal data under the GDPR.
---

# Trust and compliance

Catalog images go in front of shoppers, marketplaces and regulators. This page explains what Reica does so that the images you publish are lawful and traceable, and what Reica asks of you in return.

## Your rights to the photos

The photos you bring into Reica are **Inputs** under the [Terms](https://www.getreica.com/terms). They include the photos you upload by hand, and also the photos that arrive without a gesture for each one: from a feed, from a connected Google Drive, or from an address you paste.

By using them you confirm that you hold the rights to them and the consent of any people they show, and you **indemnify Reica** against claims about them (Terms, sections 05 and 09). Because imported photos arrive in bulk, Reica asks for this confirmation explicitly at the moment they come in:

| How photos arrive | When you confirm | Where |
| --- | --- | --- |
| Uploaded by hand | Once, when you accept the Terms at sign-up | Sign-up |
| Google Drive | Once, before the first import | Settings, under Integrations, before **Connect**, or beside **Import from Google Drive** |
| A feed or a Shopify store | At every import | The Import products dialog |
| A pasted image or page address | At every use | Add products, under the paste field |

The box is always empty at the start, links to the Terms, and reads: *"I have the rights to the photos … and the consent of the people in them, and I accept the Terms, including the indemnification."*

The check is enforced on Reica's servers, not only in the interface: an import from Google Drive, a feed or an address does not start without a recorded confirmation. Sending your approved images to Google Drive does not ask again: they are already yours.

## AI Act: every image is marked

The EU AI Act (Regulation 2024/1689, article 50) asks that images made by generative AI be marked in a machine-readable way. Reica marks every image it generates, when it is stored:

- **IPTC and XMP metadata** with the digital source type: `trainedAlgorithmicMedia` for an image made by the model, such as an on-model photo; `compositeWithTrainedAlgorithmicMedia` for a still life made from your real product photo, and for hand edits.
- **The system used**: `AISystemUsed = Reica`, with a disclosure line and the image's id, so any image can be traced back to its generation.
- **The model's own marking stays**: the image model's metadata is kept, and its invisible watermark lives in the pixels and survives re-encoding.
- **No rights claimed that nobody granted**: Reica writes no author or copyright field into your images.

An image cannot be stored without its marking: if marking fails, the image is not saved. Images made before the marking existed are marked on the way out, in every download, ZIP export and Google Drive transfer.

The export `manifest.csv` repeats the disclosure for each file: "Generated with AI (EU AI Act Art. 50)". See [Export](/catalog/export).

**A visible label** is not required on every AI image: the Act asks for visible disclosure on content that could pass as real. In Social, a visible "Made with AI" label is available on each image, with your own wording, and is off by default. Whether and where to show a visible notice on your shop stays your decision as publisher.

## Verify an image

Anyone with a Reica account can check whether an image was made with Reica: open **Verify image** in the menu, drop the image (JPEG, PNG or WebP, up to 4 MB) or choose it. It is free, with or without a plan, and the image is not stored.

If Reica finds its marking, the result says **Made with Reica** and shows:

- what was found: Content Credentials, the invisible watermark, or both. The watermark stays in the pixels even when the file's data has been removed;
- whether the image is AI-generated;
- the date it was created;
- the signature: "Signed by Reica, intact", or "Signed by Reica, but the image changed after signing";
- how it was made, in plain steps.

Otherwise it says **No Reica marking found**: the image may not come from Reica, or its markings were removed. Screenshots, crops and some apps that re-save images can remove them. The result never shows who made the image or which product it shows. Each account can check up to 3 images a minute, 20 an hour and 40 a day.

## Content safety

The instructions Reica writes for catalog work are fixed and reviewed. When a request carries text written by a person, such as your notes, a change request or an outfit note, it passes through the image model's safety filters. A blocked request is stopped, never retried on another model, and its credits are returned.

## Privacy and the GDPR

**Where your data is stored.** In Europe: your photos and images in the Netherlands, the database in Switzerland (covered by an EU adequacy decision), the app in Frankfurt and the background jobs in Milan. Some AI processing may run outside these regions when a European endpoint is busy; ask us for the list of processors.

**No tracking in the app.** Reica's app runs no advertising pixels, no session recording and no third-party analytics.

**Your images stay yours.** Your photos and images are stored in your account's own space. Downloads and exports check that the image belongs to you, and refuse anything not approved.

**Only what is needed.** The photo you use to match a look in a brand profile is read and not kept.

**Deleting.** Generated images go to the Trash and are deleted after 30 days; uploaded files are deleted at once. When you ask to close your account, Reica:

1. blocks access to the account;
2. cancels the subscription;
3. deletes every file of the account;
4. deletes the account and all its data.

Invoices are kept as the law requires. Usage and credit records are kept without any link to you, for accounting.

**Questions** about data, the Terms or a deletion request: contact us from [getreica.com](https://getreica.com).
