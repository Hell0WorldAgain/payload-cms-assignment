# Payload CMS Backend

Headless CMS backend for managing content with support for modular blocks and multi-language.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (For this application)

### Installation

```bash
# Install dependencies
npm install

# Create .env file
mkdir .env

# Start development server
npm run dev
```

Access admin panel at: `http://localhost:3001/admin`

### Environment Setup

Create `.env` file in root:

```env
DATABASE_URI=mongodb://localhost:27017/payload-cms
PAYLOAD_SECRET=your-secret-key-minimum-32-characters-long
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
PORT=3001
PAYLOAD_PUBLIC_CORS_ORIGINS=http://localhost:3000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/payload-cms
```

### First Run

1. Start server: `npm run dev`
2. Visit `http://localhost:3001/admin`
3. Create your first admin user
4. Start creating content!

## CMS Collections

### Pages Collection
**Purpose:** Store all website pages with dynamic content blocks

**Fields:**
- `title` - Page title (localized)
- `slug` - URL identifier (e.g., "home", "contact")
- `locale` - Language (en/es)
- `seo` - Meta title, description, image
- `contentBlocks` - Array of modular blocks

**Why this structure?**
- **Flexible**: Add/remove/reorder blocks without code changes
- **Reusable**: Same blocks work across multiple pages
- **Localized**: Each language version is separate for better control

### Media Collection
**Purpose:** Manage images and files

**Features:**
- Auto-generates thumbnails (400x300)
- Auto-generates card size (768x1024)
- Auto-generates tablet size (1024px wide)
- Alt text required for accessibility

**Why separate media?**
- Centralized asset management
- Automatic image optimization
- Reusable across pages

### Contact Submissions Collection
**Purpose:** Store contact form submissions

**Access:**
- Public can create (form submissions)
- Only admins can read (privacy)

**Why this approach?**
- GDPR-friendly
- Easy to export/manage leads
- No external form service needed

## Content Blocks Explained

### Hero Block
**Use:** Top section of pages, landing page headers
- Heading (required)
- Subheading (optional)
- CTA button with link
- Background image

### Features Block
**Use:** Showcase product/service features
- Section title
- List of features with:
  - Icon name (Lucide icons)
  - Title
  - Description

**Available Icons:** Zap, Shield, Smartphone, Globe, Heart, Star, Rocket, Code, Users, Layout, Check
[Full list](https://lucide.dev)

### Testimonials Block
**Use:** Customer reviews, social proof
- Section title
- List of testimonials with:
  - Quote
  - Author name
  - Position/title
  - Avatar image

### CTA Block
**Use:** Call-to-action sections, conversion points
- Heading
- Description
- Button text and link

## How to Create Content

### Creating a Homepage (English)

1. **Go to Collections → Pages → Create New**

2. **Fill Basic Info:**
   ```
   Title: Home
   Slug: home
   Locale: en
   ```

3. **Add SEO:**
   ```
   Meta Title: Welcome to YourBrand
   Meta Description: Building amazing experiences with modern technology
   ```

4. **Add Content Blocks** (click "Add Hero"):
   ```
   Heading: Build Amazing Experiences
   Subheading: Modern web solutions powered by cutting-edge technology
   CTA Text: Get Started
   CTA Link: /contact
   Background Image: [Upload image]
   ```

5. **Add Features Block:**
   ```
   Title: Why Choose Us
   
   Feature 1:
     Icon: Zap
     Title: Lightning Fast
     Description: Optimized performance for the best user experience
   
   Feature 2:
     Icon: Shield
     Title: Secure & Reliable
     Description: Built with security best practices
   ```

6. **Save** → Content appears on frontend!

### Creating Spanish Version

1. **Create New Page** with same slug but different locale:
   ```
   Title: Inicio
   Slug: home
   Locale: es
   ```

2. **Translate all content** while keeping same structure

3. Frontend automatically serves correct language based on URL (`/` or `/es`)

## CMS Design Decisions

### Why Content Blocks?
**Traditional:** Fixed page templates → Hard to customize  
**Blocks:** LEGO-like → Mix and match freely

**Benefits:**
- Content editors control layout
- No developer needed for page changes
- A/B testing friendly
- Future-proof (add new blocks easily)

### Why Separate Locales?
Instead of storing translations in same document:
- **Better performance** (fetch only needed language)
- **Simpler queries** (no nested locale logic)
- **Easier management** (separate pages in admin)
- **Flexible** (languages can have different content)

### Why Public Read Access?
Pages and Media have `read: () => true` because:
- Frontend needs public access via API
- Users don't need login to view website
- Admin features still protected by authentication

## Available Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run serve            # Serve production build
npm run generate:types   # Generate TypeScript types
```

## Project Structure

```
payload-backend/
├── src/
│   ├── collections/
│   │   ├── Pages.ts              # Main content pages
│   │   ├── Media.ts              # Image/file uploads
│   │   ├── ContactSubmissions.ts # Form data
│   │   └── Users.ts              # Admin users
│   ├── payload.config.ts         # Main configuration
│   └── server.ts                 # Express server
├── media/                        # Uploaded files
└── .env                          # Environment variables
```

## Security Notes

- **Never commit `.env`** - Contains secrets
- **Change PAYLOAD_SECRET** - Must be 32+ characters
- **Use MongoDB Atlas** for production
- **Enable IP whitelist** on MongoDB Atlas

## Deployment

### Payload Cloud (Recommended)
1. Push to GitHub
2. Connect at [payloadcms.com](https://payloadcms.com)
3. Set environment variables
4. Deploy automatically

### Alternative: Railway/Render
1. Create new service
2. Connect GitHub repo
3. Add MongoDB addon
4. Set environment variables
5. Deploy

## Troubleshooting

**Can't connect to MongoDB:**
- Check Password string and the URL in ` .env `
- Connect to MongoDB Cluster properly
- Check IP whitelist, if using other browser's initlialised Database

**Admin panel won't load:**
- Verify port 3001 is free
- Check PAYLOAD_PUBLIC_SERVER_URL
- Clear browser cache

**CORS errors:**
- Add frontend URL to PAYLOAD_PUBLIC_CORS_ORIGINS
- Restart server after `.env` changes

---

**Built with [Payload CMS](https://payloadcms.com)** | **Docs:** [payloadcms.com/docs](https://payloadcms.com/docs)