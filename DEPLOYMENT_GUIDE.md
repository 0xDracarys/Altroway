# 🚀 Altroway Deployment Guide

## Prerequisites
- Netlify account
- Supabase project set up
- Environment variables configured

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Configuration
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database Configuration
DATABASE_URL=your_database_connection_string
```

## Deployment Steps

### 1. Build and Test Locally
```bash
npm run build
npm start
```

### 2. Deploy to Netlify

#### Option A: Git-based Deployment (Recommended)
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard

#### Option B: Manual Deployment
1. Run `npm run build`
2. Upload the `.next` folder to Netlify
3. Configure redirects in `netlify.toml`

### 3. Environment Variables in Netlify
Add all environment variables from `.env.local` to your Netlify dashboard:
- Go to Site Settings > Environment Variables
- Add each variable with the same name and value

### 4. Domain Configuration
- Set your custom domain in Netlify
- Update `NEXTAUTH_URL` to match your domain
- Update Supabase redirect URLs

## Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Verify API routes work
- [ ] Check database connections
- [ ] Test form submissions
- [ ] Verify file uploads (if any)
- [ ] Test responsive design
- [ ] Check console for errors

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check environment variables
2. **Authentication Errors**: Verify Supabase configuration
3. **API Route Issues**: Check Netlify function configuration
4. **Styling Issues**: Verify Tailwind CSS build

### Support:
- Check Netlify build logs
- Verify environment variables
- Test locally with `npm run build`

## Performance Optimization

- Enable Netlify's edge caching
- Use Next.js image optimization
- Implement proper caching headers
- Monitor Core Web Vitals

## Security Notes

- Never commit `.env.local` to git
- Use environment variables for sensitive data
- Enable HTTPS in Netlify
- Regular security updates
