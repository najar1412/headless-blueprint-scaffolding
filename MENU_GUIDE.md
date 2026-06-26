# WordPress Menu Configuration Guide

The menu system is now fully dynamic and can be managed entirely from the WordPress admin panel without developer intervention.

## How It Works

The menu automatically detects the type of link based on how you add it in WordPress:

### Menu Item Types

1. **Internal Pages** (Page/Post)
   - Add a Page or Post from the WordPress menu builder
   - Behavior: Next.js navigation to that page
   - Example: About Us, Services, Blog Posts

2. **External Links** (Custom Link with http/https)
   - Add a Custom Link with a full URL (http:// or https://)
   - Behavior: Opens link (respects target setting)
   - Example: https://linkedin.com, https://wordpress-site.com/blog

3. **Scroll Anchors** (Custom Link with # or /)
   - Add a Custom Link with `#section-name` or just `/`
   - Behavior: Smooth scrolls to section on homepage
   - Example: #contact, #services, #about

## WordPress Admin Setup

### Step 1: Navigate to Menus
Go to **Appearance → Menus** in WordPress admin

### Step 2: Add Menu Items

#### For Internal Pages:
1. Find the page/post in the left sidebar
2. Check the box next to it
3. Click "Add to Menu"

#### For External Links:
1. Open "Custom Links" section
2. Enter the full URL (e.g., `https://example.com`)
3. Enter the link text
4. Click "Add to Menu"

#### For Scroll Anchors:
1. Open "Custom Links" section
2. Enter `#section-name` (e.g., `#contact`, `#services`)
3. Enter the link text
4. Click "Add to Menu"

### Step 3: Special Styling (Optional)

To add the special badge styling (like the Contact button):

1. Click **Screen Options** (top right)
2. Enable **CSS Classes** checkbox
3. Expand the menu item you want to style
4. In the "CSS Classes" field, add: `badge-style`
5. Click "Save Menu"

## Examples

### Current Menu Setup Equivalent:

| Menu Item | WordPress Type | URL/Path | CSS Classes | Behavior |
|-----------|---------------|----------|-------------|----------|
| About | Custom Link | `#about` | - | Scroll to #about |
| Services | Custom Link | `#services` | - | Scroll to #services |
| Thought Leadership | Page | (auto) | - | Navigate to page |
| Contact | Custom Link | `#contact` | `badge-style` | Scroll to #contact with badge style |

### Adding New Items:

**Add a Blog (internal page):**
- Type: Page
- Select "Blog" from Pages
- Result: Navigates to `/blog`

**Add LinkedIn (external link):**
- Type: Custom Link
- URL: `https://www.linkedin.com/company/your-company`
- Link Text: "LinkedIn"
- Result: Opens LinkedIn in new tab

**Add Team Section (scroll anchor):**
- Type: Custom Link
- URL: `#team`
- Link Text: "Team"
- Result: Scrolls to #team section

## Target Settings

For external links, you can control how they open:

1. Expand the menu item
2. Click "Screen Options" → Enable "Link Target"
3. Check "Open link in a new tab" for external links

## Notes

- Menu items are cached in Next.js - you may need to rebuild/redeploy after menu changes
- Section IDs for scroll anchors must exist on the page (e.g., `<section id="contact">`)
- The order of menu items in WordPress determines the order in the navigation
- All menu changes are made in WordPress admin - no code changes needed
