## Static Site Generator with Gulp + Nunjucks
With Nunjucks you can break HTML code into smaller components which you can reuse across multiple HTML files. It also lets you work with `.json` files in order to feed data into your HTML.

The `templates` folder is used for storing all Nunjucks partials and other Nunjucks files that will be added to files in the pages folder.

The `layout` file in the `templates` folder contains boilerplate code like `<html>`, `<head>` and `<body>` tags. It also contains things that are similar across all pages, like links to CSS and JavaScript files.

The `pages` folder is used for creating pages that will be compiled into HTML. Once they are compiled, they will be placed in the `dist` folder.


### Usage
- `$ npm install`
- `$ gulp`

