# Faust Scaffold

### Pre Reqs

1. backend host - currently using wp-engine headless wordpress
2. frontend host - currently use netlify

### Dev

#### wordpress

initial plugins

Faust.js
WPGraphQL
WPGraphQL for ACF
ACF
Custom Post TypeUi
Clear Cache For Me

#### faustjs

1. set up pre reqs
2. cp .env.local.sample to .env.local and fill out
3. making scheme changes in WP requires `npm run generate` this rebuilds possible types for apollo.

### TODO

1. No local wp environment set up
2. look into WP Engine Smart Search

### Current limiations

1. No live link between headless wordpress and faust prod site? After make edits to headless wp, the frontend needs to be rebuild as its a static site.
