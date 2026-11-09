---
title: Review
description: Look at each image next to the product photo, approve or reject it, mark spots to change and compare versions.
---

# Review

Nothing leaves Reica until someone approves it. Review is where you look at each image next to the product photo and decide.

## Where to open it

Review is a step of the work, not a page of the menu. It opens from:

- **Home**, where the images waiting for review are counted;
- a **product page** or a **batch page**, with **Review N**;
- the **Quality check** panel at the end of a batch;
- a shot's menu, with **Open in Review**.

<kbd>Esc</kbd> takes you back to where you came from.

## The three panes

![Review: the queue on the left, the photo and the image side by side, the quality check and the decision on the right](/img/catalog/review.jpg)

- **Queue**, on the left: the images by product, or **Lowest score first**. Show only those **To review**, or all.
- **Stage**, in the middle: the image as large as the screen allows, side by side with the photo, with a slider, on its own, or the photo alone. Zoom in to check prints and seams.
- **Details and decision**, on the right: Approve and Reject, the quality check, Request changes and More.

On a tablet the queue becomes a drawer and the decision sits in a bar at the bottom. On a phone the images are shown one at a time.

## Decide

- **Approve** (<kbd>A</kbd>): the image is ready to export.
- **Reject** (<kbd>R</kbd>): the image will not be used. You can make it again.
- **Undo** (<kbd>U</kbd>): takes the decision back.

Once you have decided, the two buttons give way to the state of the image, for example **Approved** (or **V2 approved** when you decided on an earlier version), with **Undo** next to it. Undo takes the image back to waiting for review.

In a batch, **Approve all remaining** approves everything else in one go, except images under 85 in the quality check and outfits that need a look: those are left for you.

## Ask for a change

When an image is close but not right, change it instead of starting again.

1. **Mark a spot** (<kbd>M</kbd>) and click where something needs fixing. Write what is wrong there, for example "the strap is broken". Up to 3 spots.
2. Add a general note, or use a quick one: Too dark, Too bright, Wrong colour, Keep the print sharp, Straighten the garment, Smooth the wrinkles. Tick **Remove the drop shadow** if needed.
3. Choose **Regenerate**. The new version edits the current image with your notes and comes back to review.

![Request changes in Review: quick notes, your own note, Remove the drop shadow and Regenerate](/img/catalog/request-changes.jpg)

**Fix the detected defects** (<kbd>F</kbd>) fills in the request with what the quality check found.

To change light, colour or crop by hand, **Open in editor** (<kbd>E</kbd>). What you save there is a new version to review.

**What an edit costs.** A change made by editing the image is an *edit*: Regenerate with your notes or marked spots, Fix with AI and the quick fixes in the editor, the Length and fit panel, replacing a garment, and Fix N shots at the end of a batch. Your plan includes a number of edits each calendar month. While one is left the button says "Included, 7 of 10 left this month"; after that an edit costs the Edit price, shown on the button. Trying again on a shot that failed, and the automatic fix, are not edits. See [Pricing](/pricing#edits).

## Place the label

When a product has a [label photo](/catalog/add-products#the-label-photo), its front still life is made without the label, and you say where it goes. In the side panel, under High resolution, the **Label** section offers **Place the label** (**Move the label** once placed). It is free, and it is offered on the front still life only.

1. Choose **Place the label**. Reica shows the neck, enlarged, with a dashed zone.
2. Drag the box to where the label sits, inside the neck. Drag its corner to resize it. The box cannot leave the zone.
3. Or pick a size: **Small**, **Medium** or **Large**, which are 4%, 7% and 10% of the garment's width. Resizing the box by hand makes it your own size.
4. Choose **Save**.

Reica lays the label you chose, [your photo or the cleaned one](/catalog/add-products#the-label-photo), flat on the image, with the fabric's light and the collar's shadow. This image gets it at once. Saving makes a **new version** that waits for your review. The text on a label is only readable when the label is big enough: under a certain width the dialog says "At this size its text cannot be read, even in 2K."

**On the 2K version.** The 2K is made without the label, and Reica lays it on after the checks, in the same box. In the High resolution section, **Add the label to the 2K** goes further: the label is sewn into the neck, so it follows the fabric. That is an edit, so it uses one of your included edits or costs the Edit price at 2K (see [Pricing](/pricing#edits)). If the sewn label comes out at a different size, Reica keeps the flat label instead and gives the edit back. The 4K is made from the 2K and keeps what it has.

**Changing the image afterwards.** Fix with AI, a note or a quick fix on an image that has the label works on the image without it; when the change is done, Reica puts the label back in the same box, free, as a further version.

## Colour difference (ΔE)

In the editor, an on-model photo shows **Garment colour** with a number that starts with ΔE. It tells you how far the garment's colour in this photo is from the product's colour.

**What it measures.** Reica takes the average colour of the garment's fabric in the photo and compares it with the same garment in the product's approved front still life. The distance is calculated in CIELAB, a colour space built around how the eye sees differences, so the number follows what a person notices, not raw pixel values.

**How to read it.**

| ΔE | What it means |
| --- | --- |
| Under 2.3 | No visible difference |
| 2.3 to under 5 | A close look shows it |
| 5 or more | A shopper would notice |

The colour comparison needs an approved front still life. Without one the editor shows "Not measured".

**Match the product colour** shifts the garment's colour towards the still life's, on the garment only. The model, her skin, the other clothes and the backdrop stay as they are. Use the **Strength** slider to match partly, or **Undo the match** to go back. For a print or a pattern the average colour is only a guide, so check the details by eye.

## Versions

Every attempt is kept. The **Versions** strip under the image shows V1, V2 and so on, with their time and score. Click a version to compare it with the current one, or the photo to compare with the original.

A new version can come out worse. You can approve an earlier version (it becomes the shot's image), or make it current without approving it.

## Starting point of a three-quarter view

A three-quarter view can start from the product photos or from the approved front still life. Switch it in **More**, under Starting point.

## Shortcuts

| Key | Action |
| --- | --- |
| <kbd>A</kbd> | Approve |
| <kbd>R</kbd> | Reject |
| <kbd>U</kbd> | Undo |
| <kbd>M</kbd> | Mark a spot |
| <kbd>F</kbd> | Fill Request changes with the detected defects |
| <kbd>E</kbd> | Open in editor |
| <kbd>↓</kbd> <kbd>→</kbd> | Next image |
| <kbd>↑</kbd> <kbd>←</kbd> | Previous image |
| <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd> | Zoom in, zoom out, fit |
| <kbd>Esc</kbd> | Back to where Review was opened |
| <kbd>?</kbd> | All shortcuts, anywhere in Reica |

On a wide screen, **Shortcuts** is also a link at the foot of the side panel, out of the way of the decision.
