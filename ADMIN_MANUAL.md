# TechBucket Admin Panel - User Manual

## Table of Contents

1. [Getting Started](#getting-started)
2. [Admin Login](#admin-login)
3. [Dashboard Overview](#dashboard-overview)
4. [Managing Products](#managing-products)
5. [Managing Services](#managing-services)
6. [Managing Quote Requests](#managing-quote-requests)
7. [Managing Contacts](#managing-contacts)
8. [Managing Support Requests](#managing-support-requests)
9. [Account Settings](#account-settings)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection
- JavaScript enabled

### Accessing the Admin Panel

1. Navigate to your website URL followed by `/admin/login`
   - Example: `https://yourdomain.com/admin/login`

2. You will see the admin login page with two fields:
   - **Username**: Enter your admin username
   - **Password**: Enter your admin password

3. Click the **"Login"** button

### Default Credentials

- **Username**: `admin`
- **Password**: `admin`

**⚠️ IMPORTANT**: Change your password immediately after first login for security purposes.

---

## Admin Login

### Logging In

1. Go to the admin login page
2. Enter your username and password
3. Click **"Login"**
4. You will be redirected to the admin dashboard

### Logging Out

1. Click on your profile icon or username in the top-right corner
2. Select **"Logout"** from the dropdown menu
3. You will be redirected to the login page

### Changing Your Password

1. After logging in, go to **Settings** (usually in the top-right menu)
2. Select **"Change Password"**
3. Enter your current password
4. Enter your new password (minimum 6 characters)
5. Confirm your new password
6. Click **"Update Password"**

---

## Dashboard Overview

### Main Dashboard Layout

The admin dashboard consists of several key sections:

#### Left Sidebar Navigation

The sidebar contains the following menu items:

- **Dashboard**: Main overview page
- **Products**: Manage all products
- **Services**: Manage all services
- **Quote Requests**: View and manage customer quote requests
- **Contacts**: View and manage contact form submissions
- **Support**: View and manage support inquiries
- **Settings**: Configure admin settings

#### Top Navigation Bar

- **Admin Logo/Name**: Click to go to main dashboard
- **Notifications**: View recent submissions (if available)
- **Profile Menu**: Access account settings and logout

#### Main Content Area

The main area displays the selected section with relevant data, forms, and actions.

---

## Managing Products

### Viewing Products

1. Click **"Products"** in the left sidebar
2. You will see a list of all products with the following information:
   - Product name
   - Category
   - Brand
   - Price
   - Featured status
   - Actions (Edit, Delete)

### Creating a New Product

1. Click **"Products"** in the sidebar
2. Click the **"Add New Product"** or **"Create Product"** button
3. Fill in the product form:
   - **Product Name**: Enter the product name (required)
   - **Slug**: Auto-generated URL-friendly name (can be edited)
   - **Category**: Select from dropdown (required)
   - **Brand**: Select from dropdown (required)
   - **Description**: Enter detailed product description
   - **Specifications**: Enter technical specifications
   - **Price**: Enter product price
   - **Image URL**: Enter image URL or upload image
   - **Featured**: Check to feature this product on homepage
4. Click **"Create Product"** or **"Save"**
5. You will see a success message

### Editing a Product

1. Go to **Products** section
2. Find the product you want to edit
3. Click the **"Edit"** button next to the product
4. Modify the product details as needed
5. Click **"Update Product"** or **"Save"**
6. You will see a success message

### Deleting a Product

1. Go to **Products** section
2. Find the product you want to delete
3. Click the **"Delete"** button next to the product
4. Confirm the deletion when prompted
5. The product will be removed from the system

### Managing Categories

1. Go to **Products** section
2. Look for **"Categories"** tab or link
3. To add a category:
   - Click **"Add Category"**
   - Enter category name and slug
   - Click **"Create"**
4. To edit a category:
   - Click **"Edit"** next to the category
   - Modify the details
   - Click **"Update"**
5. To delete a category:
   - Click **"Delete"** next to the category
   - Confirm deletion

### Managing Brands

1. Go to **Products** section
2. Look for **"Brands"** tab or link
3. To add a brand:
   - Click **"Add Brand"**
   - Enter brand name, slug, and logo URL
   - Click **"Create"**
4. To edit a brand:
   - Click **"Edit"** next to the brand
   - Modify the details
   - Click **"Update"**
5. To delete a brand:
   - Click **"Delete"** next to the brand
   - Confirm deletion

---

## Managing Services

### Viewing Services

1. Click **"Services"** in the left sidebar
2. You will see a list of all services with:
   - Service name
   - Description preview
   - Featured status
   - Actions (Edit, Delete)

### Creating a New Service

1. Click **"Services"** in the sidebar
2. Click **"Add New Service"** or **"Create Service"** button
3. Fill in the service form:
   - **Service Name**: Enter the service name (required)
   - **Slug**: Auto-generated URL-friendly name
   - **Description**: Enter detailed service description
   - **Icon**: Enter icon URL or select from library
   - **Image**: Enter image URL or upload image
   - **Features**: List key features (one per line or comma-separated)
   - **Featured**: Check to feature on homepage
4. Click **"Create Service"** or **"Save"**

### Editing a Service

1. Go to **Services** section
2. Click **"Edit"** next to the service
3. Modify the service details
4. Click **"Update Service"** or **"Save"**

### Deleting a Service

1. Go to **Services** section
2. Click **"Delete"** next to the service
3. Confirm the deletion

---

## Managing Quote Requests

### Viewing Quote Requests

1. Click **"Quote Requests"** in the sidebar
2. You will see a list of all quote requests with:
   - Customer name
   - Customer email
   - Product name (if applicable)
   - Submission date
   - Status (Pending, Reviewed, Responded, Archived)
   - Actions

### Quote Request Details

1. Click on a quote request to view full details:
   - Customer information (name, email, phone, company)
   - Product details (if applicable)
   - Quantity requested
   - Customer message
   - Submission date and time

### Responding to Quote Requests

1. Open the quote request
2. Note the customer's email address
3. Send a response email directly to the customer at their provided email
4. After responding, update the status (see below)

### Updating Quote Request Status

1. Open the quote request
2. Click on the status dropdown
3. Select the appropriate status:
   - **Pending**: New request, not yet reviewed
   - **Reviewed**: You have reviewed the request
   - **Responded**: You have sent a response to the customer
   - **Archived**: Request is complete or no longer relevant
4. Click **"Update"** or **"Save"**

### Marking as Read/Unread

1. Open the quote request
2. Click the **"Mark as Read"** or **"Mark as Unread"** button
3. The status will update

### Filtering Quote Requests

- Use status filters to view requests by status
- Use date filters to view requests from specific time periods
- Use search to find requests by customer name or email

---

## Managing Contacts

### Viewing Contact Submissions

1. Click **"Contacts"** in the sidebar
2. You will see a list of all contact form submissions with:
   - Sender name
   - Sender email
   - Subject
   - Submission date
   - Status
   - Actions

### Contact Details

1. Click on a contact submission to view:
   - Full contact information (name, email, phone)
   - Subject line
   - Complete message
   - Submission date and time

### Responding to Contacts

1. Open the contact submission
2. Note the customer's email address
3. Send a response email to the provided email address
4. Update the status to "Responded"

### Updating Contact Status

1. Open the contact submission
2. Click the status dropdown
3. Select the appropriate status:
   - **Pending**: New submission
   - **Reviewed**: You have reviewed it
   - **Responded**: You have responded
   - **Archived**: Complete or resolved
4. Click **"Update"**

---

## Managing Support Requests

### Viewing Support Requests

1. Click **"Support"** in the sidebar
2. You will see a list of support inquiries with:
   - Customer name
   - Subject
   - Priority level (Low, Medium, High)
   - Submission date
   - Status
   - Actions

### Support Request Details

1. Click on a support request to view:
   - Full customer information
   - Subject and description
   - Priority level
   - Submission date
   - Current status

### Priority Levels

- **High**: Urgent issues requiring immediate attention
- **Medium**: Standard issues to be addressed soon
- **Low**: General inquiries or non-urgent issues

### Responding to Support Requests

1. Open the support request
2. Note the customer's email and phone (if provided)
3. Contact the customer using the provided contact information
4. Provide technical support or assistance
5. Update the status when resolved

### Updating Support Status

1. Open the support request
2. Click the status dropdown
3. Select the appropriate status:
   - **Pending**: New request
   - **In Progress**: Currently being handled
   - **Resolved**: Issue has been resolved
   - **Closed**: Request is closed
4. Click **"Update"**

### Filtering Support Requests

- Filter by priority level (High, Medium, Low)
- Filter by status
- Filter by date range
- Search by customer name or subject

---

## Account Settings

### Accessing Settings

1. Click on your profile icon or name in the top-right corner
2. Select **"Settings"** from the dropdown menu

### Available Settings

#### Profile Information

- View your username
- View your email address
- View account creation date

#### Change Password

1. Click **"Change Password"**
2. Enter your current password
3. Enter your new password (minimum 6 characters)
4. Confirm your new password
5. Click **"Update Password"**

#### Email Notifications

- Configure which notifications you receive
- Set notification preferences

---

## Troubleshooting

### Common Issues

#### Cannot Log In

**Problem**: "Invalid credentials" error

**Solution**:
1. Verify you are using the correct username and password
2. Check if Caps Lock is on
3. Reset your password if you've forgotten it
4. Contact your system administrator if the issue persists

#### Page Not Loading

**Problem**: Admin pages are not loading or showing errors

**Solution**:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Clear your browser cache
3. Try using a different browser
4. Check your internet connection
5. Contact your system administrator

#### Cannot Save Changes

**Problem**: "Error saving" or form not submitting

**Solution**:
1. Check that all required fields are filled
2. Verify the data format is correct
3. Try refreshing the page and trying again
4. Check your internet connection
5. Contact your system administrator

#### Email Notifications Not Received

**Problem**: Quote requests, contacts, or support submissions not triggering emails

**Solution**:
1. Check that email configuration is correct
2. Verify the admin email address is set correctly
3. Check your email spam/junk folder
4. Contact your system administrator to verify email settings

#### Slow Performance

**Problem**: Admin panel is slow or laggy

**Solution**:
1. Check your internet connection speed
2. Close unnecessary browser tabs
3. Clear browser cache
4. Try using a different browser
5. Contact your system administrator

### Getting Help

If you encounter issues not covered in this manual:

1. **Contact Your System Administrator**: Provide details about the issue
2. **Check Email Logs**: Review email configuration and logs
3. **Browser Console**: Open developer tools (F12) to check for error messages
4. **Provide Screenshots**: Take screenshots of errors for reference

---

## Best Practices

### Security

- Change your default password immediately
- Never share your login credentials
- Log out when finished, especially on shared computers
- Use a strong password (mix of letters, numbers, symbols)

### Data Management

- Regularly review and archive old requests
- Keep product information up to date
- Maintain accurate service descriptions
- Respond to customer inquiries promptly

### Email Communication

- Always respond professionally to customer inquiries
- Include relevant product/service information in responses
- Follow up on unresolved issues
- Keep records of all communications

---

## Additional Resources

- **Website**: Visit your public website to see how products and services appear
- **Contact Support**: Reach out to your technical support team for assistance
- **Documentation**: Refer to the deployment guide for technical details

---

**Last Updated**: January 2026
**Version**: 1.0
