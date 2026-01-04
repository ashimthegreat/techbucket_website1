# TechBucket Website - Quick Start Guide

Get up and running with TechBucket website in 5 minutes!

## 🚀 Quick Start (Development)

### 1. Install Dependencies

```bash
cd techbucket-website
pnpm install
```

### 2. Configure Environment

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your settings:
# - DATABASE_URL (MySQL connection string)
# - EMAIL_USER and EMAIL_PASSWORD (Zoho Mail)
# - ADMIN_EMAIL (where to send notifications)
```

### 3. Setup Database

```bash
pnpm db:push
```

### 4. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

## 🔐 Admin Panel Access

- **URL**: http://localhost:3000/admin/login
- **Default Username**: `admin`
- **Default Password**: `admin`

⚠️ Change password immediately after first login!

## 📝 First Steps

### 1. Add a Product

1. Log in to admin panel
2. Click "Products" in sidebar
3. Click "Add New Product"
4. Fill in details:
   - Name: "Cisco Switch"
   - Category: Select or create
   - Brand: Select or create
   - Price: "5000"
   - Description: Add description
5. Click "Create Product"

### 2. Add a Service

1. Click "Services" in sidebar
2. Click "Add New Service"
3. Fill in details
4. Click "Create Service"

### 3. Test Quote Form

1. Visit homepage: http://localhost:3000
2. Go to Products page
3. Click "Get Quote" on any product
4. Fill and submit form
5. Check admin panel for new quote request
6. Check email for notification

## 🛠️ Common Tasks

### Change Admin Password

```bash
# In admin panel:
# 1. Click Settings
# 2. Click "Change Password"
# 3. Enter current and new password
# 4. Click "Update"
```

### Reset Database

```bash
# WARNING: This deletes all data!
# Drop and recreate tables
pnpm db:push
```

### View Database

```bash
# If using Supabase:
# 1. Go to Supabase dashboard
# 2. Click "SQL Editor"
# 3. Run queries

# If using local MySQL:
# mysql -u root -p techbucket
# SHOW TABLES;
# SELECT * FROM products;
```

### Check Email Configuration

```bash
# Test email sending
# 1. Submit a form from website
# 2. Check admin email inbox
# 3. Look for notification email
```

## 📱 Testing on Mobile

### Using localhost

```bash
# Get your local IP
# On Mac/Linux:
ifconfig | grep "inet "

# On Windows:
ipconfig

# Visit from mobile:
# http://YOUR_IP:3000
```

### Using ngrok (for remote testing)

```bash
# Install ngrok
# https://ngrok.com

# Start tunnel
ngrok http 3000

# Share the URL with others
```

## 🔍 Debugging

### Check Console Errors

```bash
# Open browser DevTools (F12)
# Check Console tab for errors
# Check Network tab for API calls
```

### View Server Logs

```bash
# Terminal running pnpm dev shows:
# - API calls
# - Database queries
# - Email sending
# - Errors
```

### Database Debugging

```bash
# Check what's in database
# Use Supabase dashboard or MySQL client
# SELECT * FROM products;
# SELECT * FROM quote_requests;
```

## 📦 Build for Production

```bash
# Build
pnpm build

# Start production server
pnpm start

# Visit http://localhost:3000
```

## 🚀 Deploy to Render

1. Push code to GitHub
2. Go to render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps.

## 📚 Full Documentation

- **[README.md](./README.md)** - Project overview
- **[ADMIN_MANUAL.md](./ADMIN_MANUAL.md)** - Admin panel guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deployment instructions

## ❓ Troubleshooting

### "Cannot find module" error

```bash
# Reinstall dependencies
pnpm install

# Clear cache
pnpm store prune
```

### Port 3000 already in use

```bash
# Use different port
PORT=3001 pnpm dev

# Or kill process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database connection error

```bash
# Check DATABASE_URL in .env.local
# Verify database is running
# Test connection manually
```

### Email not sending

```bash
# Check EMAIL_USER and EMAIL_PASSWORD
# Verify ADMIN_EMAIL is set
# Check Zoho Mail SMTP settings
# Look for errors in server logs
```

## 💡 Tips

- Use `pnpm check` to find TypeScript errors
- Use `pnpm format` to format code
- Use `pnpm test` to run tests
- Check `.env.example` for all available variables
- Read comments in code for explanations

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [tRPC Documentation](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)

## 🆘 Need Help?

1. Check error messages carefully
2. Search error message online
3. Check documentation files
4. Review code comments
5. Check browser console (F12)
6. Check server logs (terminal)

---

**Happy coding! 🚀**

For detailed information, see the full documentation files.
