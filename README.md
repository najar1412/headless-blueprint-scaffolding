# Faust Scaffold

### Development

#### wp-engine

1. changes to content/schema should be dont in the staging environment on wp-engine, these will be access in the development site as long as .env.local is correct.

#### faustjs

1. cp .env.local.sample to .env.local and fill out details (get from wp-engine, wp-admin of staging).
2. making scheme changes in WP requires `npm run generate` this rebuilds possible types for apollo.