# 🛡️(PROTOTYPE) ThreatSwipe

A fun and interactive cybersecurity learning tool that helps you memorize essential security concepts through true/false flashcards.

## 📖 About

ThreatSwipe is designed to make cybersecurity education engaging and accessible. Using a swipe-based card interface, users can quickly learn and reinforce their knowledge of fundamental cybersecurity principles, best practices, and common threats.

### ✨ Key Features

- **Interactive Learning**: Swipe through true/false statements about cybersecurity
- **Immediate Feedback**: Get instant explanations for each answer
- **Progress Tracking**: Monitor your learning progress across different security domains
- **Categorized Content**: Learn by specific cybersecurity topics and domains
- **Mobile-Friendly**: Responsive design works great on all devices

## 🎯 Learning Objectives

This app helps users master:
- Basic cybersecurity terminology and concepts
- Security best practices
- Common threats and vulnerabilities
- Risk assessment principles
- Incident response fundamentals
- And much more!

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.2 with React 19
- **Language**: TypeScript
- **Database**: Supabase
- **Styling**: Tailwind CSS (via globals.css)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jellybeansontoasties/ThreatSwipe.git
cd ThreatSwipe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
```bash
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 📱 How to Use

1. **Select a Domain**: Choose from various cybersecurity domains on the home page
2. **Pick a Topic**: Select a specific topic within your chosen domain
3. **Start Learning**: Read each statement and decide if it's true or false
4. **Get Feedback**: View explanations and learn from both correct and incorrect answers
5. **Track Progress**: Watch your completion progress as you master each topic

## 🗂️ Project Structure

```
threatswipe/
├── app/
│   ├── api/              # API routes
│   ├── category/[id]/     # Category pages
│   ├── practice/[topicId]/ # Practice session pages
│   └── page.tsx           # Home page
├── components/
│   ├── CategoryCard.tsx   # Domain/category cards
│   └── SwipeCard.tsx      # Interactive flashcards
├── lib/
│   └── supabase.ts        # Supabase client configuration
├── scripts/
│   └── seed.ts            # Database seeding script
└── public/                # Static assets
```

## 🎓 Educational Value

ThreatSwipe serves as an excellent supplement to traditional cybersecurity education by:
- Reinforcing key concepts through repetition
- Providing bite-sized learning sessions
- Offering immediate feedback and explanations
- Tracking learning progress over time
- Making cybersecurity education more engaging and accessible

## 🚀 Deployment

The app is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically with each push to main

Alternatively, you can deploy to any platform that supports Next.js applications.

## 🤝 Contributing

Contributions are welcome! Whether it's adding new cybersecurity statements, improving the UI, or enhancing functionality, feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- User authentication and personalized progress
- Multiplayer challenges
- Achievement system
- More advanced cybersecurity topics
- Mobile app version
- Integration with certification study guides

---

**Start swiping and secure your cybersecurity knowledge today!** 🛡️✨
