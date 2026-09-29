# Independent mobile design preview

Working branch: `desert-formal-mobile`.
Desktop design branch: `desert-formal-skeleton`.
Starting desktop revision: `34ede37e055596dc5bb1f3d66ebcd2d5ec27e948`.

This branch is a separately editable copy of the accepted desktop revision, using its responsive layouts as the mobile starting point. On phones it opens normally. On screens wider than 760px it displays the same site inside a 390px-wide frame. The frame is preview-only and never activates on a locked production build.

Mobile-specific styling lives in `app/styles/mobile.css`. Shared-looking source files here are independent branch copies; editing them on this branch does not change desktop. Add mobile revisions here and push only this branch. Do not merge it into main or the desktop branch without a request.

The GitHub workflow deploys a separate immutable Oxygen preview for each push. A Shopify sign-in may be needed until a shareable preview link is configured. This branch does not publish the mobile design to desertformal.com.

The working copy is in the separate `desert-formal-mobile` workspace folder. Dependencies are shared locally to avoid a second installation; credentials, local Shopify configuration and build outputs are not shared.
