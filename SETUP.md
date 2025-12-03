# Quick Setup Guide for Users

## What You Need

1. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
   - Windows: Docker Desktop for Windows
   - Mac: Docker Desktop for Mac
   - Linux: Docker Engine + Docker Compose

2. **Google Gemini API Key** - Free tier available!

## Installation Steps

### Step 1: Install Docker Desktop

1. Download Docker Desktop from the link above
2. Install and start Docker Desktop
3. Wait until Docker is running (you'll see a green icon)

### Step 2: Get a Free Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (you'll need it in Step 4)

**Note:** Gemini offers a generous free tier - perfect for personal use!

### Step 3: Get the Application

Download or clone this repository to your computer.

### Step 4: Configure Environment Variables

1. In the project folder, create a file named `.env` (in the root directory)
2. Copy the contents from `.env.example` into your `.env` file
3. Replace `your_gemini_api_key_here` with your actual API key
4. Replace `your_super_secret_random_string_here` with any random string (e.g., `mySecretKey123!`)

Your `.env` file should look like:
```env
GEMINI_API_KEY=AIzaSyC...your-actual-key
SECRET_JWT_KEY=some-random-string-you-choose
```

### Step 5: Run the Application

Open a terminal/command prompt in the project folder and run:

```bash
docker-compose up --build
```

**First time?** This will take 5-10 minutes to download and build everything. Subsequent runs will be much faster.

### Step 6: Use the Application

Once you see "Server running on port 5000" in the logs:

1. Open your web browser
2. Go to: **http://localhost:5173**
3. Start summarizing YouTube videos!

## Stopping the Application

Press `Ctrl+C` in the terminal, or run:

```bash
docker-compose down
```

## Your Data

- **Database**: MongoDB runs locally in Docker - all your summaries are stored on your computer
- **Privacy**: Your API key and data stay on your machine
- **Costs**: Gemini free tier covers typical personal use

## Common Issues

### "Port already in use"
Another application is using ports 5000, 5173, or 27017. Close that application or change the ports in `docker-compose.yml`.

### "Cannot connect to Docker daemon"
Docker Desktop is not running. Start Docker Desktop and wait for it to fully start.

### "GEMINI_API_KEY is required"
You forgot to create the `.env` file or didn't add your API key. Go back to Step 4.

### Backend shows connection errors
1. Make sure all three containers are running: `docker-compose ps`
2. Wait a few seconds for MongoDB to fully start
3. Try restarting: `docker-compose restart backend`

## That's It!

You don't need to install Node.js, npm, MongoDB, or any other dependencies. Docker handles everything for you.

## Need Help?

- Check Docker Desktop is running
- Make sure ports 5173 and 5000 are available
- Try restarting Docker Desktop
- Run `docker-compose logs` to see detailed error messages