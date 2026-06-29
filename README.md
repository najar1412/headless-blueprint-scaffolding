# Faust Scaffold

### Pre Reqs

1. backend host - currently using wp-engine headless wordpress
2. frontend host - currently use netlify

### Development

#### faustjs

1. set up pre reqs
2. cp .env.local.sample to .env.local and fill out
3. making scheme changes in WP requires `npm run generate` this rebuilds possible types for apollo.
4. after changes to the database, `npm run generate` should be run to re-built types