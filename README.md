# TechBucket Pvt Ltd - Modern IT Solutions Website

A modern, scalable, and SEO-friendly website for TechBucket Pvt Ltd built with React, Express, tRPC, and MySQL/Supabase. Features a comprehensive admin dashboard for managing products, services, and customer inquiries.

## 🚀 Features

### Public Website
- **Modern 2026 Design**: Responsive, mobile-first design with contemporary aesthetics
- **Product Catalog**: Browse IT hardware and solutions with detailed specifications
- **Services Page**: Comprehensive service offerings with descriptions
- **Quote System**: Get quote requests for products and services
- **Contact Forms**: Multiple contact channels (general contact, support, inquiries)
- **Email Notifications**: Automatic notifications to admin for all submissions
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Dashboard
- **Secure Authentication**: Username/password login with session management
- **Product Management**: Full CRUD operations for products with categories and brands
- **Service Management**: Manage services with descriptions and features
- **Quote Request Management**: View, respond to, and track quote requests
- **Contact Management**: Manage contact form submissions
- **Support Ticket System**: Handle support inquiries with priority levels
- **Status Tracking**: Track submission status (pending, reviewed, responded, archived)
- **Email Notifications**: Receive instant notifications for new submissions

### Technical Features
- **Type-Safe**: Full TypeScript support across frontend and backend
- **tRPC**: End-to-end type safety for API calls
- **Database**: MySQL/Supabase with Drizzle ORM
- **Email**: Zoho Mail SMTP integration
- **Security**: Password hashing, CSRF protection, input validation
- **Scalable**: Clean architecture ready for growth

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Git
- MySQL database or Supabase account

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/techbucket-website.git
cd techbucket-website
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env.local` and fill in your configuration:

```bash
cp .env.example .env.local
```

Required variables:
```
DATABASE_URL=your-database-url
EMAIL_USER=ashim@techbucket.com.np
EMAIL_PASSWORD=Uzumaki@123
ADMIN_EMAIL=sales@techbucket.com.np
JWT_SECRET=your-secret-key
```

### 4. Setup Database

```bash
# Push database migrations
pnpm db:push
```

### 5. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage

### Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Default credentials:
   - Username: `admin`
   - Password: `admin`
3. Change password immediately after first login

### Managing Products

1. Go to Admin Dashboard → Products
2. Click "Add New Product"
3. Fill in product details (name, category, brand, price, description)
4. Click "Create Product"
5. Products appear on the public website

### Managing Services

1. Go to Admin Dashboard → Services
2. Click "Add New Service"
3. Fill in service details
4. Click "Create Service"

### Viewing Submissions

- **Quote Requests**: Admin Dashboard → Quote Requests
- **Contacts**: Admin Dashboard → Contacts
- **Support**: Admin Dashboard → Support

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Create Render account and connect GitHub
3. Configure environment variables in Render
4. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Deploy to Supabase

1. Create Supabase project
2. Get connection string
3. Set DATABASE_URL environment variable
4. Run `pnpm db:push`

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📚 Documentation

- **[ADMIN_MANUAL.md](./ADMIN_MANUAL.md)** - Complete admin panel user guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions for GitHub, Render, Supabase, and Cloudflare

## 🏗️ Project Structure

```
techbucket-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
│   └── public/            # Static assets
├── server/                 # Backend Express application
│   ├── db.ts              # Database queries
│   ├── routers.ts         # tRPC procedures
│   ├── email.ts           # Email notifications
│   └── emailConfig.ts     # Email configuration
├── drizzle/               # Database schema and migrations
├── shared/                # Shared types and constants
├── ADMIN_MANUAL.md        # Admin documentation
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
└── package.json           # Dependencies
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm check

# Run tests
pnpm test

# Format code
pnpm format

# Push database migrations
pnpm db:push
```

### Database Migrations

```bash
# Generate and push migrations
pnpm db:push

# View database schema
# Check drizzle/schema.ts
```

## 🔐 Security

- Passwords are hashed using bcryptjs
- CSRF protection implemented
- Input validation on all forms
- SQL injection prevention via Drizzle ORM
- HTTPS enforced in production
- Environment variables for sensitive data

## 📧 Email Configuration

The website uses Zoho Mail for sending notifications:

- **Sender Email**: ashim@techbucket.com.np
- **Admin Email**: sales@techbucket.com.np
- **SMTP Server**: smtp.zoho.com:465

Emails are sent for:
- Quote requests
- Contact form submissions
- Support inquiries

## 🎨 Customization

### Branding

Edit `client/src/lib/seo.ts` to update site metadata:
```typescript
export const siteMetadata = {
  siteName: "TechBucket Pvt Ltd",
  siteDescription: "Your description here",
  // ... more config
};
```

### Colors and Styling

Edit `client/src/index.css` to customize colors and theme.

### Content

Update products, services, and other content via the admin panel.

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Verify DATABASE_URL is correct
# Check database is running
# Test connection: pnpm db:push
```

### Email Not Sending

1. Verify EMAIL_USER and EMAIL_PASSWORD are correct
2. Check ADMIN_EMAIL is set
3. Verify Zoho Mail SMTP settings
4. Check spam folder

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Type check
pnpm check

# Try building again
pnpm build
```

## 📞 Support

For issues and support:

1. Check [ADMIN_MANUAL.md](./ADMIN_MANUAL.md) for admin panel help
2. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment issues
3. Review application logs
4. Contact your system administrator

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 🎯 Roadmap

- [ ] Image upload functionality
- [ ] Product reviews and ratings
- [ ] Blog section
- [ ] Multi-language support
- [ ] Customer portal
- [ ] SMS notifications
- [ ] Analytics dashboard
- [ ] Advanced search filters

## 📊 Tech Stack

- **Frontend**: React 19, Tailwind CSS, TypeScript
- **Backend**: Express, tRPC, Node.js
- **Database**: MySQL/Supabase, Drizzle ORM
- **Email**: Nodemailer, Zoho Mail
- **Deployment**: Render, Supabase, Cloudflare
- **Version Control**: Git, GitHub

## 🙏 Acknowledgments

Built with modern web technologies and best practices for scalability, maintainability, and performance.

---

**Last Updated**: January 2026
**Version**: 1.0
**Maintained By**: TechBucket Development Team

For more information, visit [techbucket.com.np](https://techbucket.com.np)
