---
title: Add products
description: Upload product photos, import a Google Shopping feed, a Shopify store, an XML or CSV feed, or pick photos from Google Drive.
---

# Add products

There are three ways to bring products into Reica: upload photos, import a feed, or pick photos from Google Drive. Adding products is free: Reica makes thumbnails and detects the category, but nothing is generated until you start it.

## Before you take the photos

The image Reica makes is only as faithful as the photo it starts from. Reica shows these seven guidelines next to the drop area, and checks each photo against them.

1. **One product per photo.** A set sold together, such as a bikini, goes in one photo.
2. **The whole garment in the frame.** A garment cut by the edge cannot be measured.
3. **Straight front view.** For back shots, add the back as a second photo.
4. **Plain, even background.** On a hanger, flat on a table or on a mannequin. No people.
5. **At least 2000 px on the long side.** Thin straps, ties and laces need the detail.
6. **Sharp, evenly lit, true colours.** No strong shadows, glare or colour casts.
7. **Straps untangled, nothing pinned.** No pins or clips on the garment.

Reica removes everything that is not the product: the hanger, the table, the wall.

## Upload photos

In **Products**, choose **Add products**. The sheet has three steps.

![The Add products sheet with the drop area and the photo guidelines](/img/catalog/add-products.jpg)

### 1. Photos

Drop photos, choose them, take one with your phone camera, or paste the address of an image or a product page. Up to 200 photos at a time, in JPG, PNG or WebP, up to 15 MB each.

A **Photo check** table lists each photo with a column per guideline: met, not met with the reason, or not checked. It only advises: you can add every photo either way.

Then choose how photos become products:

- **Group by file name**: photos with the same name before `_front`, `_back` or `-2` become one product.
- **One product per photo**: best for a quick batch of front photos.

:::tip Name your files and Reica groups them for you
`JKT-001_front.jpg`, `JKT-001_back.jpg` and `JKT-001_detail.jpg` become one product, SKU `JKT-001`, with the right photo in each slot. Reica reads `front`, `back`, `side` and `detail` (also `f`, `b`, `s`, `d`, and the Italian `fronte`, `retro`, `lato`, `dettaglio`). A close-up of the label is read from `label`, `labels` or `etichetta` (`JKT-001_label.jpg`), or from two words such as `neck-label` or `neck-tag`; `tag` alone is not a label, because it is usually the hanging tag. Photos without a word take front, back, side and detail in order, and never become a label photo. Camera names like `IMG_1234` stay separate products.
:::

### 2. Group

Check each product: its SKU or name, its category (or **Detect category**), and the role of each photo. You can merge two products or make a photo its own product. Each product needs a front photo and a SKU, and two products in one upload cannot share a SKU.

### 3. Confirm

Choose what the products are for:

- **Products I sell** join your catalog: still lifes, on-model shots, batches and exports.
- **Styling items, not for sale** go to the Styling items folder. Models can wear them in on-model shots, but they never go into batches or exports.

Pick a season and a collection if you use them, then **Add products**. When they are created you can go straight to **Generate still lifes**.

## Import a feed

In **Products**, choose **Import feed** and paste the address of your feed or your store. Reica recognises the format:

![The Import products dialog](/img/catalog/import-feed.jpg)

| Format | Notes |
| --- | --- |
| Google Shopping | The feed you already send to Google Merchant Center |
| Shopify | The store address. Many stores block direct reading: Reica then asks for the address of the feed made by your feed app |
| XML feed | Any product XML |
| CSV | Comma, semicolon or tab separated, with an id or SKU, a title and an image link |

Up to 10,000 products per import. Before you start, Reica shows how many products it will create, for example "34 products from 158 rows (sizes grouped)".

**Sizes become variants.** Rows that share an `item_group_id` (or a parent column in a CSV) become one product, with each size and colour kept as a variant: size, colour, SKU, price and stock. A colour with its own photos is its own product.

**Extra photos named by their file.** An additional photo link whose file name says `back`, `side` or `detail` (or `rear`, `lato`, `dettaglio`) fills that slot. A file name with `label`, `labels`, `etichetta`, `neck-label` or `neck-tag` becomes the product's [label photo](#the-label-photo). Other additional photos are kept as extras.

**Importing again** updates sizes, prices and stock. Names and details are updated only if you tick **Update names and details of products already imported**. Photos, shots and reviews are never touched.

To try Reica without your own feed, choose **Use sample feed**.

## Pick photos from Google Drive

In **Add products**, choose **Import from Google Drive** and pick up to 200 photos. Reica can group them by file name, make one product per Drive folder, or one product per photo. It copies each photo and checks it like an upload. A photo already imported is not imported again, and you can close the window while the import goes on.

Google Drive is connected once in **Settings**, under Integrations, and is included in the Growth and Pro plans.

## Your rights to the photos

Every photo you bring in must be yours to use. When photos arrive without you picking each file, Reica asks you to confirm it with a box that links to the Terms: *"I have the rights to the photos … and the consent of the people in them, and I accept the Terms, including the indemnification."*

- **Google Drive**: once, before the first import, in Settings under Integrations or beside **Import from Google Drive**. The import button stays disabled until the box is ticked.
- **A feed or a store**: at every import.
- **A pasted address**: at every use.
- **Photos you upload by hand**: covered by the Terms you accepted at sign-up.

With it you indemnify Reica against claims about the photos. An import without the confirmation does not start. See [Trust and compliance](/compliance#your-rights-to-the-photos).

## After adding: the product page

![Products in a grid: each card with its name, category, SKU and status](/img/catalog/products.jpg)

Each product has its page with:

- **Photos**: Front (required, every image starts from it), Back, Side, Detail and Label. Drop a photo on a slot, drag to swap. Reica tells you whether the front photo looks good, could be better, or should be retaken. It never blocks you.
- **Coverage**: how much of the product your photos show. A side no photo shows will be imagined, and Reica says so before you generate.
- **SKU details**: name, SKU, category and **Cut for** (Women, Men, Unisex). The category is detected for you; you can change it.
- **Brand profile**: the profile this product follows.
- **Variants**: the sizes from your feed.

### The label photo

Image models tend to rewrite the small words on a garment: a brand name in the neck, a printed word. The **Label** slot is for a close-up of just the label, so that its text comes out right. Add one when the garment has readable text on its label.

- **Why.** When the photos show text on a label and there is no label photo, the product page says so: "This product has text on its label. Generated images may not reproduce it exactly. Add a close-up photo of the label to help." The same advice appears in Review when a check finds the text changed.
- **What Reica does with it.** The label is used on the **front still life** and its 2K and 4K versions. It is never used as a view of the garment's shape.
- **The cleaned label.** When you add a photo, Reica cuts the label out of its background and, a moment later, draws it again clean and straight, without the cord, the threads or the fabric around it. The slot says "Reica is cleaning the label at high resolution…" while it works. It costs you nothing.
- **Your choice.** When it is ready the slot shows two cards, **Your photo** and **Cleaned by Reica**. Pick the one Reica lays inside the neck of your still lifes; the enlarge button compares the two side by side. Until you pick, Reica uses the cleaned label. If it could not clean the label, your photo is used as it is.
- **A text notice.** Reica reads the words on both. If they differ, a notice says by how many characters, for example when the cord hid a word and the clean version completed it. Keep the cleaned label only if it matches the real one.

Where the label goes on the still life is up to you: see [Place the label](/catalog/review#place-the-label).
