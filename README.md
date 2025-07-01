# Senior Software Engineer Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS. Showcases professional experience, technical skills, featured projects, and contact information.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Smooth Navigation**: Seamless scrolling between sections
- **Interactive UI**: Hover effects, animations, and transitions
- **Contact Form**: Functional contact form with validation
- **Skills Showcase**: Visual representation of technical proficiency
- **Project Portfolio**: Detailed project cards with live demos and source links
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS transitions and transforms

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio_v2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Customization

### Personal Information
Update the following files with your personal information:

- `src/components/Hero.tsx` - Name, title, description
- `src/components/About.tsx` - Professional background and achievements  
- `src/components/Skills.tsx` - Technical skills and proficiency levels
- `src/components/Projects.tsx` - Featured projects and demos
- `src/components/Contact.tsx` - Contact information and social links
- `src/components/Footer.tsx` - Footer contact details

### Styling
- Colors, fonts, and spacing can be customized in `tailwind.config.js`
- Additional CSS classes are defined in `src/index.css`

## 🌐 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project**
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new one
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Set up automatic builds with GitHub: Optional

4. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Alternative Deployment Options
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder or connect Git
- **GitHub Pages**: Use `gh-pages` package for deployment

## 📂 Project Structure

```
portfolio_v2.0/
├── src/
│   ├── components/
│   │   ├── Header.tsx      # Navigation and dark mode toggle
│   │   ├── Hero.tsx        # Landing section with CTA
│   │   ├── About.tsx       # Professional background
│   │   ├── Skills.tsx      # Technical skills showcase
│   │   ├── Projects.tsx    # Featured projects portfolio
│   │   ├── Contact.tsx     # Contact form and information
│   │   └── Footer.tsx      # Footer with links
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles and Tailwind
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with consistent spacing
- **Smooth Animations**: Subtle hover effects and transitions
- **Typography**: Carefully chosen font hierarchy and sizing  
- **Color Scheme**: Professional blue/purple gradient accents
- **Accessibility**: Semantic HTML and keyboard navigation support

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you have suggestions for improvements, please open an issue or submit a pull request.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
