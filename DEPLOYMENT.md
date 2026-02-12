# EventSense Deployment Guide

This guide will walk you through deploying the EventSense application with the backend on Render and the frontend on Vercel.

## Prerequisites

- GitHub account with the EventSense repository
- Render account (free tier available at [render.com](https://render.com))
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- MongoDB Atlas database (already configured)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Your Repository
Ensure all changes are pushed to GitHub:
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up or log in with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create New Web Service
1. Click **"New +"** button in the dashboard
2. Select **"Web Service"**
3. Connect your **EventSense** repository
4. Configure the service:
   - **Name**: `eventsense-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 4: Add Environment Variables
In the Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `eventsense_super_secret_jwt_key_2026_production_ready` |
| `EMAIL_USER` | `eventsense734@gmail.com` |
| `EMAIL_PASS` | Your email app password |
| `PORT` | `5000` |

> [!IMPORTANT]
> Copy your MongoDB URI from the `.env` file in the backend directory.

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will automatically build and deploy your backend
3. Wait for the deployment to complete (usually 2-5 minutes)
4. Copy your backend URL (e.g., `https://eventsense-backend.onrender.com`)

> [!NOTE]
> Free tier services on Render may spin down after inactivity. The first request after inactivity may take 30-60 seconds.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your **EventSense** repository
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Step 3: Add Environment Variables
Before deploying, add this environment variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render backend URL (from Part 1, Step 5) |

**Example**: `https://eventsense-backend.onrender.com`

> [!WARNING]
> Make sure to use your actual Render backend URL, not the example above.

### Step 4: Deploy
1. Click **"Deploy"**
2. Vercel will build and deploy your frontend
3. Wait for deployment to complete (usually 1-2 minutes)
4. Your app will be live at a URL like `https://eventsense.vercel.app`

### Step 5: Configure Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to **"Domains"**
3. Add your custom domain and follow DNS configuration instructions

---

## Part 3: Update Backend CORS Settings

After deploying the frontend, you need to update the backend to allow requests from your Vercel domain.

### Update CORS Configuration
1. Go to your Render dashboard
2. Open your backend service
3. Add a new environment variable:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | Your Vercel frontend URL |

4. Update `backend/server.js` CORS configuration (if needed):
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
```

5. Redeploy the backend service

---

## Part 4: Verification

### Test Your Deployment

1. **Backend Health Check**
   - Visit your Render backend URL
   - You should see: `{"message": "EventSense API is running! 🎉"}`

2. **Frontend Access**
   - Visit your Vercel frontend URL
   - The application should load properly

3. **Full Integration Test**
   - Register a new user
   - Log in
   - Browse events
   - Create a booking
   - Verify email notifications work

---

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs for errors
- Verify all environment variables are set correctly
- Ensure MongoDB URI is correct and database is accessible

**Problem**: Database connection failed
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB URI format and credentials

### Frontend Issues

**Problem**: API requests failing
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend URL is accessible

**Problem**: Routes not working (404 errors)
- Verify `vercel.json` is present in the frontend directory
- Check Vercel build logs

### Email Issues

**Problem**: Booking confirmation emails not sending
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct
- Ensure you're using an App Password for Gmail (not your regular password)
- Check Render logs for email-related errors

---

## Monitoring and Maintenance

### Render Dashboard
- Monitor backend logs and metrics
- Check for errors and performance issues
- Free tier has limited hours per month

### Vercel Dashboard
- Monitor deployment status
- View analytics and performance metrics
- Check build logs for errors

---

## Updating Your Deployment

### For Code Changes

1. Push changes to GitHub:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

2. **Render**: Automatically redeploys on push (if auto-deploy is enabled)
3. **Vercel**: Automatically redeploys on push

### For Environment Variable Changes

1. Update variables in Render/Vercel dashboard
2. Manually trigger a redeploy if needed

---

## Cost Considerations

### Free Tier Limits

**Render Free Tier**:
- 750 hours/month
- Service spins down after 15 minutes of inactivity
- Limited to 512 MB RAM

**Vercel Free Tier**:
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function execution limits

> [!TIP]
> For production use with high traffic, consider upgrading to paid tiers for better performance and reliability.

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render/Vercel documentation
3. Check application logs in respective dashboards
4. Verify all environment variables are correctly set

---

## Summary

✅ Backend deployed on Render  
✅ Frontend deployed on Vercel  
✅ Environment variables configured  
✅ CORS settings updated  
✅ Application tested and verified  

Your EventSense application is now live and accessible to users worldwide! 🎉
