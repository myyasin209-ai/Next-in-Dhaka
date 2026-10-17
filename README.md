# Next in Dhaka (prototype)
A simple website made with HTML, CSS and JavaScript. No backend. **All events and stories are fictional samples.**

## What each file does
- `index.html` - homepage (featured, upcoming + search/filter, stories, categories, newsletter)
- `event.html` / `article.html` - one template each; the page shows whichever event/story is chosen from the link
- `about.html`, `contact.html`, `advertise.html` - the other pages
- `css/styles.css` - colours, fonts, spacing (colours are the first lines)
- `js/data.js` - ALL events, stories, categories and your contact email. **The file you will edit most.**
- `js/main.js` - makes the pages work. You can leave this alone.
- `images/` - put your own photos here

## Publish with GitHub Pages
Repository -> Settings -> Pages -> "Deploy from a branch" -> Branch `main`, folder `/ (root)` -> Save. Wait 1-2 minutes. Your address: `https://YOUR-USERNAME.github.io/next-in-dhaka/`

## Edit without coding
Open a file on GitHub, click the pencil icon, change text, click "Commit changes". The site updates in 1-2 minutes.
- Words on a page: edit the matching `.html` file (text between `>` and `<`).
- Events and stories: edit `js/data.js`. Copy one `{ ... }` block, add a comma, paste, change the words. Keep the quotes and commas.
- Colours: edit the `--ink`, `--sun`, `--pink`, `--teal` lines at the top of `css/styles.css`.
- Photos: upload to `images/`, then set `image:'images/your-photo.jpg'` on the event. Only use photos you own or have permission to use.
- Email: change `contactEmail` at the top of `js/data.js`.

## Notes
The newsletter box and contact form do not store anything. Contact opens the visitor's email app. Never put passwords or API keys in these files; the repository is public.
