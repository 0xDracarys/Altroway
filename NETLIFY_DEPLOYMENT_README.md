# 🚀 Altroway - Netlify Deployment Guide

## Quick Start

This branch is **ready for Netlify deployment**! Follow these simple steps:

### 1. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"New site from Git"**
3. Choose **"GitHub"** as your Git provider
4. Select your **Altroway repository**
5. Choose the **`netlify-deployment`** branch
6. Use these build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

### 2. Set Environment Variables
In Netlify dashboard, go to **Site Settings > Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your_nextauth_secret
```

### 3. Deploy!
Click **"Deploy site"** and wait 2-5 minutes for your site to go live!

---

## 🔧 What's Included in This Branch

### ✅ Optimized Netlify Configuration
- **`netlify.toml`**: Optimized for Next.js with proper redirects and security headers
- **Next.js Plugin**: Official `@netlify/plugin-nextjs` for seamless deployment
- **Security Headers**: XSS protection, content type options, and more
- **Caching**: Optimized static asset caching

### ✅ Build Configuration
- **Node.js 18**: Latest LTS version for optimal performance
- **Build Scripts**: Properly configured for production builds
- **Static Export**: Optimized for Netlify's static hosting

### ✅ Environment Variables
- **Complete `.env.example`**: All required variables documented
- **Netlify-specific**: URLs and configurations for Netlify deployment

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:

- [ ] **Supabase Project**: Created and configured
- [ ] **Environment Variables**: All required keys from Supabase
- [ ] **GitHub Repository**: Code pushed to GitHub
- [ ] **Netlify Account**: Ready to connect

---

## 🔑 Getting Supabase Keys

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings > API**
4. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚨 Important Notes

- **Never commit `.env.local`** to git
- **Keep service role key secret**
- **Use HTTPS URLs** for production
- **Test locally** before deploying

---

## 🆘 Troubleshooting

### Build Failures
- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Ensure Node.js version is 18

### Authentication Issues
- Verify Supabase redirect URLs
- Check `NEXTAUTH_URL` environment variable
- Ensure callback routes are configured

### API Routes Not Working
- Verify Supabase credentials
- Check CORS settings in Supabase
- Ensure environment variables are correct

---

## 🎯 Post-Deployment

After successful deployment:

1. **Update Supabase Settings**:
   - Add your Netlify domain to Site URL
   - Add redirect URL: `https://yourdomain.com/auth/callback`

2. **Test All Features**:
   - User registration and login
   - Job posting and applications
   - Messaging system
   - Profile management
   - Admin functions

3. **Set Custom Domain** (optional):
   - Go to Domain settings in Netlify
   - Add your custom domain
   - Update environment variables

---

## 📞 Support

If you need help:
- Check Netlify build logs
- Verify environment variables
- Test locally with `npm run build`
- Check Supabase dashboard

---

**🎉 Your Altroway job platform is ready to go live!**
