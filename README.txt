SNK PORTFOLIO UPDATE - README
================================

This zip has 4 things:

1) admin/index.html
   -> Upload this directly to your GitHub repo at path: admin/index.html
   -> This REPLACES your old admin page entirely (ready to use as-is).
   -> Now edits: Hero, About, Skills, Brands, Contact Links - all save
      to Firebase.

2) hero-snippet-TO-PASTE-INTO-HOMEPAGE.html
   -> NOT a full page. Paste this in place of your homepage's old
      <section class="hero">...</section>.

3) about-skills-snippet-TO-PASTE-INTO-ABOUT-AND-EXPERTISE-PAGES.html
   -> Has an About section (paste into about/index.html) and a
      Skills/Expertise section (paste wherever that lives).

4) brands-contact-snippet-TO-PASTE-INTO-HOMEPAGE.html
   -> Has a Brands section and a Contact section - paste each in
      place of the existing ones on your homepage (or wherever they
      live).

IMPORTANT - Firebase script tags:
   Every snippet includes the same Firebase <script src=...> loader
   tags. If a page already has Firebase loaded from a previous
   snippet you pasted in, DO NOT paste those <script src=...> lines
   again on that same page - just add the <script> JS block under it.
   Duplicate SDK tags on the same page can cause errors.

After all pieces are in place:
- Go to /admin/ on your live site, log in with your Firebase
  email/password, edit each section, and click Save on each panel.
- Refresh the relevant page - the new content should appear.

BRANDS FORMAT (in the admin Brands box), one per line:
  Name | Description | Link | soon
  - Leave "soon" off if the brand is live and clickable.
  - Leave Link empty if it's Coming Soon.

Example:
  WebsitesDeal | Premium website templates marketplace | https://shahneilkhan.github.io/demosite |
  UI/UX Design & Strategy | Product design and research services | | soon
