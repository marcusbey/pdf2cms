# PDF to CMS

An AI-powered CMS that converts PDFs into structured content with editing, export, and sharing capabilities.

## Features

- 🤖 AI-powered PDF content extraction
- 📄 Transform PDFs into editable CMS content
- ✏️ Clean interface for content management
- 🔐 Magic link authentication
- 📤 Export to PDF or CSV
- 🔗 Generate shareable view-only links
- ✨ Beautiful animations with Framer Motion

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma + PostgreSQL
- NextAuth.js (Magic Links)
- Tailwind CSS
- Framer Motion
- Radix UI

## Setup Instructions

1. **Clone the repository**
   ```bash
   cd pdftocms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in `.env.local`

4. **Configure environment variables**
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/pdftocms"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-secure-secret"
   EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
   EMAIL_FROM="noreply@yourdomain.com"
   OPENAI_API_KEY="your-openai-api-key"
   ```

5. **Set up the database**
   ```bash
   npm run prisma:db:push
   npm run prisma:generate
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Email Configuration

For magic link authentication, you need to configure an SMTP server. You can use services like:
- SendGrid
- Mailgun
- AWS SES
- Or any SMTP provider

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Integration

To enhance PDF processing with OpenAI:
1. Install the OpenAI SDK
2. Update the `pdf-processor.ts` file to use the OpenAI API
3. Add your OpenAI API key to the environment variables