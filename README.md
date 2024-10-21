# Faust Scaffold

### Pre Reqs

1. backend host - currently using wp-engine headless wordpress
2. frontend host - currently use netlify

### Dev

#### wordpress

initial plugins

Faust.js
WPGraphQL
Custom Post TypeUi
Clear Cache For Me
Atlas Content Modeler

#### faustjs

1. set up pre reqs
2. cp .env.local.sample to .env.local and fill out

### TODO

1. No local wp environment set up
2. grok graphQL for db queries
3. remapping images from frontend to wp domain, or vise versa?

### Current limiations

1. No live link between headless wordpress and faust prod site? After make edits to headless wp, the frontend needs to be rebuild as its a static site.
2. Doc recommend using Atlas Content Modeler, but support is getting dropped end of 2024, look into SCF (secure custom fields), ACF (advanced custom fields)
