# PortChecker 🔌

> A modern, cross-platform port management and monitoring tool for developers

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- 🔍 **Real-time Port Monitoring** - Track active ports with auto-refresh every 3 seconds
- 💀 **Process Management** - Kill processes using ports with a single click
- 📊 **Port Scanner** - Scan port ranges or common ports
- 📚 **Port Reference** - Built-in reference for common ports
- 🔄 **Auto-Refresh** - Toggle automatic port monitoring
- 🖥️ **Cross-Platform** - Works on macOS, Linux, and Windows
- 🎨 **Modern UI** - Beautiful interface built with shadcn/ui

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Query
- **Icons:** lucide-react
- **Notifications:** sonner

### Backend/System
- **Runtime:** Node.js
- **Port Checking:** node:net, lsof (Mac/Linux), netstat (Windows)
- **Process Management:** node:child_process

## 📁 Project Structure

```
portchecker/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── ports/         # GET all ports, scan ports
│   │   │   └── port/[port]/   # Port-specific operations
│   │   ├── page.tsx           # Main page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Layout components
│   │   ├── port/              # Port-related components
│   │   ├── process/           # Process management components
│   │   ├── dashboard/         # Dashboard widgets
│   │   └── shared/            # Shared components
│   │
│   └── lib/
│       ├── types/             # TypeScript type definitions
│       ├── port/              # Port scanning & management logic
│       └── data/              # Common ports data
│
├── public/                     # Static assets
└── package.json
```

## 🎯 Usage

### Active Ports Tab
- View all currently listening ports
- See process information (PID, name)
- Kill processes directly from the UI
- Auto-refresh port status

### Port Scanner Tab
- **Common Ports:** Scan frequently used ports (HTTP, HTTPS, databases, etc.)
- **Port Range:** Scan a custom range of ports (e.g., 1000-2000)

### Port Reference Tab
- Browse common ports by category
- Search ports by name, service, or number
- Quick reference for web, database, development, and email ports

## 🔒 Permissions

### macOS/Linux
Some ports may require elevated permissions:
```bash
sudo npm run dev
```

### Windows
Run PowerShell or Command Prompt as Administrator.

## ⚠️ Security Notes

1. **Process Kill:** Be careful when killing processes - always confirm the PID
2. **System Ports:** Ports 1-1024 are typically reserved for system services
3. **Confirmation Dialogs:** All destructive actions require confirmation

## 📊 Common Ports Reference

The app includes built-in information for commonly used ports:

- **Web:** 80 (HTTP), 443 (HTTPS), 8080, 8443
- **Development:** 3000 (React/Next.js), 5173 (Vite), 8000 (Python)
- **Databases:** 3306 (MySQL), 5432 (PostgreSQL), 27017 (MongoDB), 6379 (Redis)
- **Email:** 25 (SMTP), 110 (POP3), 143 (IMAP), 587 (SMTP Submission)

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚧 Future Features

- [ ] Port usage history and analytics
- [ ] Export data to CSV/JSON
- [ ] Process CPU/Memory usage display
- [ ] Desktop notifications for port changes
- [ ] Dark/Light theme toggle
- [ ] Electron app version
- [ ] WebSocket for real-time updates
- [ ] Multi-machine monitoring

## 🐛 Troubleshooting

### "Permission Denied" Error
**Solution:** Run the application with sudo/administrator privileges

### Windows: Process Name Not Showing
**Solution:** The app uses `tasklist` to fetch process names on Windows

### Port Scan Is Slow
**Solution:** Scanning large port ranges takes time. Use "Common Ports" scan for faster results.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ by developers, for developers**
