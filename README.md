# BharartCurePlus - Comprehensive Healthcare Platform

## 👥 Team Information
- **Team Name**: BharartCure+ Development Team
- **Team ID**: HC-2025-001
- **Project Repository**: https://github.com/Bhupinder-git/BharartCurePlus
- **Live Demo**: https://bhupinder-git.github.io/BharartCurePlus/

## 👨‍💻 Team Members & Roles
- **Bhupinder Singh** - Full Stack Developer & Project Lead
  - Frontend Development (React, UI/UX)
  - Backend Integration & API Management
  - Deployment & DevOps
  - Project Architecture & Planning

## 🎯 Problem Statement
**Healthcare Accessibility & Wellness Management Platform**

Our platform addresses multiple critical healthcare challenges:
1. **Limited Healthcare Access** - Difficulty in finding and comparing healthcare facilities
2. **Emergency Resource Shortage** - Lack of real-time information about hospital bed availability and medical resources
3. **Blood Donation Crisis** - Inefficient blood donation and request systems
4. **Mental Health Awareness** - Limited access to mental wellness resources and guidance
5. **Healthcare Shopping** - Fragmented marketplace for medical equipment and medicines
6. **Wellness Management** - Lack of integrated platforms for physical and mental wellness tracking

**Solution**: A comprehensive digital healthcare ecosystem that combines hospital services, wellness management, emergency resource tracking, and healthcare commerce in one unified platform.

A comprehensive healthcare and wellness platform built with React, featuring physical exercises, mental health practices, hospital tracking, blood donation system, skincare planning, and healthcare store.

## 🌟 Features

### 🏥 Healthcare Services

- **Hospital Comparison** - Compare hospitals and services
- **Live Resource Tracker** - Real-time bed and ventilator tracking
- **blood Urgent Alerts** - Blood donation and request system
- **AI Chatbot Assistant** - 24/7 AI-powered medical guidance

### 💪 Wellness Hub

- **Physical Exercises** - 6 different workout routines with built-in timers
- **Mental Health Hacks** - 6 wellness practices for mental wellbeing
- **Progress Tracking** - Complete with statistics and completion rates
- **Interactive Timers** - Start, pause, reset functionality

### 🛒 Healthcare Store

- **Medical Equipment** - Blood pressure monitors, thermometers, pulse oximeters
- **Medicines & Supplements** - Vitamins, fish oil, multivitamins
- **Shopping Cart** - Full e-commerce functionality
- **Authentic Products** - FDA approved, genuine products only

## �️ Tech Stack Used

### **Frontend Technologies**
- **React 19** - Latest React version with modern features and hooks
- **React Router DOM v7** - Client-side routing and navigation
- **Tailwind CSS v4** - Utility-first CSS framework for responsive design
- **Lucide React** - Beautiful, customizable SVG icons
- **React Hot Toast** - Elegant toast notifications
- **React Icons** - Popular icon library integration

### **Build Tools & Development Environment**
- **Vite v7** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

### **UI/UX & Animations**
- **Lenis** - Smooth scrolling library for enhanced user experience
- **Custom CSS Animations** - Typewriter effects, running borders, transitions
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints

### **State Management & Context**
- **React Context API** - Global state management for authentication
- **Local Storage** - Persistent user session management
- **Custom Hooks** - Reusable logic for authentication and data handling

### **Deployment & DevOps**
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub Pages** - Static site hosting and deployment
- **Git** - Version control and collaborative development

## � How to Run the Project

### **Prerequisites**
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** for version control

### **Setup Instructions**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhupinder-git/BharartCurePlus.git
   cd BharartCurePlus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### **Development Commands**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality check

### **Project Structure**
```
BharartCurePlus/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components for routing
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── assets/            # Static assets (images, icons)
│   └── App.jsx            # Main application component
├── public/                # Public static files
├── dist/                  # Production build output
└── package.json           # Project dependencies and scripts
```

## 📱 Pages & Routes

- `/` - Home page with hero section and features
- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - User dashboard (protected route)
- `/wellness-hub` - Physical exercises and mental health practices
- `/store` - Healthcare e-commerce store
- `/hospital-comparison` - Hospital comparison tool
- `/live-resource-tracker` - Real-time medical resource tracking
- `/blood-urgent-alerts` - Blood donation system
- `/skincare-routine-planner` - Skincare planning tool

## 🎨 Design & Theme

- **Consistent Orange/Red/Yellow Theme** throughout the application
- **Responsive Design** - Works on all device sizes
- **Smooth Animations** - Lenis smooth scrolling and custom animations
- **Modern UI** - Clean, professional healthcare interface

## ⚠️ Special Notes & Limitations

### **External APIs & Integrations**
- **Backend API**: Connected to Vercel-hosted backend for authentication
  - Base URL: `https://backend-bharat-cure-plus-ceph0ijnr-f60751720-9569s-projects.vercel.app`
  - Used for user registration, login, and profile management
- **Image Assets**: All images are locally stored and optimized during build process
- **No External API Keys Required**: Application works without additional API keys

### **Authentication System**
- **Demo Credentials**: For testing purposes, the application supports both patient and doctor registration
- **Local Storage**: User sessions are managed client-side using localStorage
- **Protected Routes**: Dashboard and certain features require authentication

### **Known Limitations**
1. **Offline Functionality**: Application requires internet connection for full functionality
2. **Browser Compatibility**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
3. **Mobile Responsiveness**: Fully responsive but some complex features work best on desktop
4. **API Dependencies**: Some features depend on backend API availability

### **Performance Considerations**
- **Image Optimization**: All images are optimized and lazy-loaded
- **Code Splitting**: Components are efficiently bundled for optimal loading
- **Smooth Scrolling**: Lenis library provides enhanced scrolling experience
- **Build Size**: Production bundle is optimized and compressed

### **Deployment Configuration**
- **GitHub Pages**: Configured with custom base path `/BharartCurePlus/`
- **GitHub Actions**: Automated deployment on every push to main branch
- **Asset Handling**: All static assets are properly referenced for production

### **Testing & Quality Assurance**
- **ESLint**: Configured for code quality and consistency
- **Responsive Testing**: Tested across multiple device sizes
- **Cross-browser Testing**: Verified on major browsers
- **Performance Testing**: Optimized for Core Web Vitals

## 🔧 Troubleshooting

### **Common Issues**
1. **Images not loading**: Ensure all image imports use proper relative paths
2. **Build failures**: Check Node.js version (requires v18+)
3. **Routing issues**: Clear browser cache and localStorage
4. **Styling problems**: Ensure Tailwind CSS is properly configured

### **Development Tips**
- Use `npm run build` to test production build locally
- Check browser console for any JavaScript errors
- Ensure all dependencies are properly installed with `npm install`

## 🌐 Live Deployment

**Production URL**: https://bhupinder-git.github.io/BharartCurePlus/

## 📞 Contact & Support

For any questions or issues, please contact:
- **GitHub Issues**: https://github.com/Bhupinder-git/BharartCurePlus/issues
- **Repository**: https://github.com/Bhupinder-git/BharartCurePlus

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for better healthcare accessibility and wellness management**
