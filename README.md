# Business Calculator Hub

A fast, clean, mobile-first static website featuring a collection of high-intent business calculators. Built with HTML, CSS, and Vanilla JavaScript.

## 🚀 How to Deploy to GitHub Pages

1.  Initialize a Git repository in this folder:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link your local repo to GitHub:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```
4.  Go to your repository settings on GitHub -> **Pages**.
5.  Under **Source**, select `main` branch and `/ (root)` folder.
6.  Click **Save**. Your site will be live shortly!

## 💰 Where to Paste AdSense Code

To monetize the site, you need to add your Google AdSense code snippets.

1.  **Global Header Code**: Open `index.html` and all `*-calculator.html` files. Paste your auto-ad script inside the `<head>` tag.
2.  **Ad Units**: Look for comments like `<!-- ADSENSE PLACEHOLDER: TOP BANNER -->` or containers with class `ad-placeholder` in the HTML files. Replace the placeholder content with your specific ad unit code.

## ✏️ How to Edit Calculator Defaults and Text

-   **Formulas & Logic**: Check `assets/calc-*.js` files for specific calculator logic (e.g., `assets/calc-profit.js`).
-   **Text Content**: Edit the HTML files directly (`profit-margin-calculator.html`, etc.) to change descriptions, FAQs, or labels.
-   **Styles**: All styling is centrally managed in `assets/styles.css`. Change the `--primary-color` variable to update the brand color site-wide.
