# Supabase Setup Guide

This guide will help you set up Supabase for the BEVA Clinic application.

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com) and sign up/login
2. Click "New Project"
3. Enter your project details:
   - Name: `beva-clinic`
   - Database Password: (generate a strong one)
   - Region: Choose the closest to your users (e.g., `Southeast Asia (Singapore)`)
4. Wait for the project to be created

## 2. Get Your API Keys

1. In your Supabase project, go to **Project Settings** → **API**
2. Copy the following values:
   - `URL` → Set as `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → Set as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → Set as `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important**: Never expose the `service_role` key in client-side code!

## 3. Run the Database Migrations

### Option A: Using Supabase SQL Editor (Recommended for quick start)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run**
5. Repeat for `supabase/migrations/002_seed_admin.sql`

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase login
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## 4. Update Environment Variables

Update your `.env` file with the values from step 2:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Generate a random secret for NextAuth
AUTH_SECRET=your-random-secret-key-min-32-characters-long
AUTH_URL=http://localhost:3000
```

To generate a secure `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

## 5. Test the Setup

1. Start your Next.js app:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/login`

3. Try logging in with the demo accounts:
   - **Admin**: `admin@beva.com` / `Admin123!`
   - **User**: `user@example.com` / `User123!`

## 6. Production Checklist

Before deploying to production:

- [ ] Change the demo passwords in `src/auth.ts`
- [ ] Enable Row Level Security (RLS) policies
- [ ] Set up proper password hashing with bcrypt
- [ ] Configure proper CORS in Supabase
- [ ] Update `AUTH_URL` to your production domain
- [ ] Enable email verification (optional)
- [ ] Set up Supabase connection pooling for serverless

## Database Schema

### Tables Created

| Table | Purpose |
|-------|---------|
| `users` | Stores user accounts with roles (user/admin) |
| `accounts` | OAuth account linking (future-proof) |
| `sessions` | Active sessions when using database strategy |
| `verification_tokens` | Email verification tokens |

### Row Level Security (RLS)

The schema includes basic RLS policies:
- Users can only view their own data
- Admins can view all users
- Only authenticated users can modify their own records

## Troubleshooting

### "Invalid email or password" error
- Check that the users exist in the Supabase table
- Verify the demo passwords match in `src/auth.ts`

### "Failed to fetch" error
- Check your Supabase URL and keys in `.env`
- Ensure your Supabase project is active

### Session not persisting
- Check that `AUTH_SECRET` is set correctly
- Verify cookies are being set in browser dev tools

## Next Steps

1. Implement proper password hashing with bcrypt
2. Add email verification flow
3. Set up password reset functionality
4. Add user registration page
5. Implement booking system with proper database schema
