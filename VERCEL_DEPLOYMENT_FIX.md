# Vercel Deployment Fix Guide

## Problem
You're getting a 404 NOT_FOUND error because Vercel doesn't know your app is in the `client` subdirectory.

## Solution: Configure Root Directory in Vercel Dashboard

### Step 1: Go to Vercel Project Settings
1. Open your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **codesprint** project
3. Go to **Settings** tab
4. Navigate to **General** section

### Step 2: Set Root Directory
1. Look for "Root Directory" setting
2. Click **Edit**
3. Enter: `client`
4. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **three dots** (···) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional)
5. Click **Redeploy**

---

## Why This Happened

### Root Cause:
Your repository structure is:
```
codesprint/
├── client/          ← Your Vite app is here
│   ├── package.json
│   ├── index.html
│   └── src/
├── server/
└── package.json     ← Root package.json
```

Vercel by default looks at the **repository root** for the app, but your app is in the **`client` subdirectory**.

### What Went Wrong:
1. **Build succeeded** - Vercel built the app in `client/dist/`
2. **Files not found** - Vercel looked for files at the root, but they're in `client/dist/`
3. **Result** - 404 NOT_FOUND error

### The Concepts:

#### 1. **Root Directory Setting**
This tells Vercel: "My app starts from this subdirectory, not the repo root."
- Vercel changes its working directory to `client/`
- All paths become relative to `client/`
- `vercel.json` paths now work correctly

#### 2. **Output Directory**
- Vite builds to `dist/` by default
- With root set to `client/`, Vercel looks in `client/dist/`
- Perfect match! ✅

#### 3. **SPA Rewrites**
Single Page Apps (React Router) need all routes to serve `index.html`:
- User visits `/dashboard` → Vercel serves `index.html`
- React Router takes over → Shows dashboard component
- Without rewrites → 404 on refresh

---

## Warning Signs for Future

### 🚨 Look out for:
1. **Monorepo structures** - Multiple apps in subdirectories
2. **Build succeeds but deployment 404s** - Path configuration issue
3. **Works locally but not on Vercel** - Environment/path difference

### ✅ Best Practices:
1. **Monorepos**: Always set Root Directory in Vercel settings
2. **Test builds locally**: Run `npm run build && npm run preview`
3. **Check build output**: Verify files exist in expected directory
4. **Review Vercel logs**: Build logs show where files are placed

---

## Alternative Approaches

### Option 1: Root Directory Setting (RECOMMENDED) ⭐
**Pros:**
- Clean configuration
- Easy to understand
- Scales well for monorepos

**Cons:**
- Requires dashboard configuration

### Option 2: Build at Repository Root
Move everything from `client/` to root:
**Pros:**
- No special configuration needed

**Cons:**
- Mixes frontend and backend
- Not suitable for monorepos
- Harder to maintain

### Option 3: Complex Build Scripts
Use scripts to copy files around:
**Pros:**
- Can work around limitations

**Cons:**
- Fragile and hard to debug
- Adds unnecessary complexity
- Maintenance nightmare

---

## Quick Reference

| Setting | Value |
|---------|-------|
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Framework** | Vite |

---

## Verification Steps

After redeploying, your site should work! Verify by:

1. ✅ Main page loads (home route)
2. ✅ Navigation works (click links)
3. ✅ Direct URL access works (refresh on any route)
4. ✅ Assets load (images, CSS, JS)

If any of these fail, check the deployment logs in Vercel dashboard.

---

## Need More Help?

If you're still seeing 404s after setting the Root Directory:
1. Check deployment logs for build errors
2. Verify `client/dist/` contains `index.html` after build
3. Test locally: `cd client && npm run build && npm run preview`
4. Share the deployment URL and logs for further debugging
