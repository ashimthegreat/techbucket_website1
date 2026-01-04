# GitHub Setup Guide

Complete guide to setting up and managing your TechBucket website repository on GitHub.

## Prerequisites

- GitHub account (https://github.com)
- Git installed on your computer
- TechBucket website code ready to push

## Step 1: Create GitHub Repository

### 1.1 Create New Repository

1. Go to https://github.com/new
2. Fill in repository details:
   - **Repository name**: `techbucket-website`
   - **Description**: "TechBucket Pvt Ltd - Modern IT Solutions Website"
   - **Visibility**: Choose Public or Private (Private recommended)
   - **Initialize repository**: Leave unchecked (we'll push existing code)
3. Click **"Create repository"**

### 1.2 Copy Repository URL

After creation, you'll see the repository URL:
- HTTPS: `https://github.com/YOUR_USERNAME/techbucket-website.git`
- SSH: `git@github.com:YOUR_USERNAME/techbucket-website.git`

Save this URL for the next step.

## Step 2: Configure Git Locally

### 2.1 Set Git Configuration

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

### 2.2 Generate SSH Key (Optional but Recommended)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Press Enter to accept default location
# Enter passphrase (optional)

# Copy SSH key
cat ~/.ssh/id_ed25519.pub
```

Add SSH key to GitHub:
1. Go to GitHub Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your SSH key
4. Click "Add SSH key"

## Step 3: Push Code to GitHub

### 3.1 Initialize Repository

```bash
# Navigate to project directory
cd /home/ubuntu/techbucket-website

# Initialize git (if not already done)
git init

# Check git status
git status
```

### 3.2 Create .gitignore

```bash
# Create .gitignore file
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
pnpm-lock.yaml
yarn.lock
package-lock.json

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.next/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Database
*.db
*.sqlite
*.sqlite3

# Temporary files
tmp/
temp/
EOF
```

### 3.3 Add Files and Create Initial Commit

```bash
# Add all files
git add .

# Check what will be committed
git status

# Create initial commit
git commit -m "Initial commit: TechBucket website with admin panel, products, services, and contact forms"
```

### 3.4 Add Remote Repository

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/techbucket-website.git

# Verify remote
git remote -v
```

### 3.5 Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main

# Verify push
git log --oneline
```

## Step 4: Branch Management

### 4.1 Create Development Branch

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop branch
git push -u origin develop
```

### 4.2 Create Feature Branches

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Add new feature: description"

# Push feature branch
git push -u origin feature/new-feature

# Create Pull Request on GitHub
```

### 4.3 Common Branch Operations

```bash
# List all branches
git branch -a

# Switch to branch
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Rename branch
git branch -m old-name new-name
```

## Step 5: Collaborative Workflow

### 5.1 Pull Latest Changes

```bash
# Fetch latest changes
git fetch origin

# Pull latest changes
git pull origin main
```

### 5.2 Merge Changes

```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/new-feature

# Push merged changes
git push origin main
```

### 5.3 Resolve Merge Conflicts

```bash
# If conflicts occur, edit conflicted files
# Look for markers like:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> branch-name

# After resolving, stage and commit
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

## Step 6: GitHub Settings

### 6.1 Branch Protection

1. Go to repository Settings
2. Click "Branches"
3. Click "Add rule"
4. Set branch name pattern to `main`
5. Enable:
   - "Require pull request reviews before merging"
   - "Require status checks to pass before merging"
   - "Require branches to be up to date before merging"
6. Click "Create"

### 6.2 Collaborators

1. Go to Settings → Collaborators
2. Click "Add people"
3. Enter GitHub username
4. Select permission level
5. Click "Add"

### 6.3 Secrets (for CI/CD)

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add secrets needed for deployment:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `EMAIL_PASSWORD`
   - etc.

## Step 7: Continuous Integration (Optional)

### 7.1 Create GitHub Actions Workflow

```bash
# Create workflow directory
mkdir -p .github/workflows

# Create workflow file
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 10
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Type check
      run: pnpm check
    
    - name: Build
      run: pnpm build
    
    - name: Run tests
      run: pnpm test
EOF
```

### 7.2 Commit Workflow

```bash
git add .github/workflows/ci.yml
git commit -m "Add GitHub Actions CI workflow"
git push origin main
```

## Step 8: Release Management

### 8.1 Create Release Tags

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin --tags

# View tags
git tag -l
```

### 8.2 Create Release on GitHub

1. Go to repository
2. Click "Releases"
3. Click "Create a new release"
4. Select tag: `v1.0.0`
5. Add release notes
6. Click "Publish release"

## Step 9: Common Git Commands

### Committing Changes

```bash
# Check status
git status

# Add specific file
git add filename

# Add all changes
git add .

# Commit with message
git commit -m "Descriptive commit message"

# Amend last commit
git commit --amend
```

### Viewing History

```bash
# View commit log
git log

# View log with graph
git log --oneline --graph --all

# View changes in commit
git show commit-hash

# View diff
git diff

# View diff for staged changes
git diff --staged
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- filename

# Unstage file
git reset filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (create new commit)
git revert commit-hash
```

### Stashing

```bash
# Stash changes
git stash

# List stashes
git stash list

# Apply stash
git stash apply

# Apply and remove stash
git stash pop

# Delete stash
git stash drop
```

## Step 10: Deployment Integration

### 10.1 Connect to Render

1. Go to Render dashboard
2. Click "New +"
3. Select "Web Service"
4. Click "Connect a repository"
5. Authorize Render
6. Select `techbucket-website`
7. Configure and deploy

### 10.2 Auto-Deploy on Push

1. In Render service settings
2. Go to "Deploys"
3. Enable "Auto-deploy"
4. Select branch (usually `main`)
5. Save

Now every push to `main` will trigger a deployment!

## Troubleshooting

### Authentication Issues

```bash
# Test SSH connection
ssh -T git@github.com

# If using HTTPS, update credentials
git credential-osxkeychain erase
host=github.com
```

### Push Rejected

```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts if any
# Then push again
git push origin main
```

### Accidentally Committed Sensitive Data

```bash
# Remove file from history
git filter-branch --tree-filter 'rm -f .env' HEAD

# Force push (use with caution!)
git push origin main --force

# Rotate all secrets immediately!
```

### Large Files

```bash
# Check file size
ls -lh filename

# Use Git LFS for large files
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

## Best Practices

### Commit Messages

```
# Good commit message format
[type]: [description]

Types: feat, fix, docs, style, refactor, test, chore

Examples:
feat: Add product filtering functionality
fix: Resolve email notification bug
docs: Update deployment guide
refactor: Improve database query performance
```

### Branching Strategy

```
main          - Production-ready code
develop       - Development branch
feature/*     - Feature branches
bugfix/*      - Bug fix branches
hotfix/*      - Urgent production fixes
```

### Code Review

1. Create feature branch
2. Make changes and commit
3. Push to GitHub
4. Create Pull Request
5. Request review
6. Address feedback
7. Merge when approved

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Help](https://help.github.com)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Last Updated**: January 2026
**Version**: 1.0
