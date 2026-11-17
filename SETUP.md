# Al-Israa Law Center Setup Guide

## 1. Create the repository
Use the repository created for this project and clone it locally:

```bash
git clone https://github.com/Rajehss-cloud/elsraa-law-course.git
cd elsraa-law-course
```

## 2. Add your real logo
Place your actual logo file at:

```text
assets/logo.png
```

If you don't have a PNG file yet, keep the placeholder `assets/logo.svg` and replace it later.

## 3. Run locally
Open the project in a browser by launching a local static server:

```bash
python3 -m http.server 8000
```
Then open:

```text
http://localhost:8000
```

## 4. Supabase setup
1. Create a new project in Supabase.
2. Go to Project Settings > API.
3. Copy your Project URL and Anon Key.
4. Update `js/config.js`:

```js
export const supabaseConfig = {
  url: 'https://YOUR-PROJECT-ID.supabase.co',
  anonKey: 'YOUR-ANON-KEY',
};
```

## 5. Database setup
Run the SQL in `supabase-schema.sql` in the Supabase SQL editor.

## 6. Default Admin Credentials
Use the following demo admin login for local testing:

```text
Email: admin@elsraa.com
Password: admin123
```

## 7. PWA
For mobile installation, ensure the site is served over HTTPS or localhost, then use the browser install option.

## 8. Deployment suggestions
- GitHub Pages for static demo
- Vercel or Netlify for front-end hosting
- Supabase for database and auth backend

## 9. Notes
This project is intentionally built as a modern front-end prototype with mock authentication and dashboard logic. For production, connect it to Supabase Auth + Postgres + real-time chat and video services.
