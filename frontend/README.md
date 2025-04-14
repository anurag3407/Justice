# JusticeTrack Frontend

This is the frontend application for JusticeTrack - a platform simplifying legal case tracking and management.

## Local Development

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/anurag3407/Justice.git
cd Justice/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Deploying to Vercel

### Option 1: Automatic Deployment via GitHub

1. Push your code to GitHub if you haven't already:
```bash
git add .
git commit -m "Preparing for Vercel deployment"
git push
```

2. Login to [Vercel](https://vercel.com) and create a new project.

3. Import your repository from GitHub.

4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build` (this should be auto-detected)
   - Output Directory: `dist` (this should be auto-detected)

5. Set the environment variables:
   - Add `VITE_API_URL` with the value of your backend API (e.g., `https://justice-backend.vercel.app`)

6. Deploy the project.

### Option 2: Manual Deployment with Vercel CLI

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Navigate to the frontend directory:
```bash
cd frontend
```

4. Deploy to Vercel:
```bash
vercel
```

5. Follow the CLI prompts to complete deployment.

## Project Structure

- `src/components`: React components
- `src/pages`: Page components
- `src/api`: API service functions
- `src/assets`: Static assets like images
- `public`: Public static files

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build production-ready app
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Environment Variables

- `VITE_API_URL`: Backend API URL

## 🌟 Features

- **Case Tracking**: Monitor the status and history of legal cases
- **AI-Powered Case Summarizer**: Get simplified summaries of complex legal documents
- **Legal Advocate Directory**: Find qualified legal representatives based on location and expertise
- **Legal Glossary**: Access a comprehensive dictionary of legal terms with simple explanations
- **User Accounts**: Manage your profile and track your case history

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/justice-track-project.git
   cd justice-track-project
   ```

2. Navigate to the frontend directory
   ```
   cd frontend
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

> **Note for Windows PowerShell Users**: If you encounter issues with the `&&` operator, run commands separately:
> ```
> cd frontend
> npm run dev
> ```

## 🔑 Demo Credentials

For testing purposes, you can use the following credentials:

- **Email**: jamie.smith@example.com
- **Password**: password123

## 📋 Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── api/             # API service functions
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # Business logic
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 💻 Technology Stack

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **Mockup Data**: Used for demonstration purposes

## 📱 Responsive Design

JusticeTrack is designed to work seamlessly across devices:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 📝 Notes

This application is a prototype created for hackathon purposes and uses mock data for demonstration. In a production environment, it would connect to backend services for authentication and data persistence.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed for the Justice Technology Hackathon 2025.
