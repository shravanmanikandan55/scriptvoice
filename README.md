# 🎭 ScriptVoice

**AI-Powered Script-to-Speech Tool for Storytellers**

Transform your scripts into voiced audio with emotion-driven text-to-speech powered by ElevenLabs AI. Perfect for content creators, game developers, and storytellers.

## ✨ Features

- 📝 **Smart Script Parsing** - Parse scripts with `Character(emotion): dialogue` format
- 🎙️ **1000+ AI Voices** - Access ElevenLabs' premium voice library
- 😊 **Emotion Control** - 8 emotion presets (shy, happy, angry, sad, excited, neutral, scared, calm)
- 🎬 **Live Preview** - Play line-by-line with visual feedback
- 📥 **Full Audio Export** - Generate complete MP3 files
- 📱 **Responsive Design** - Works on mobile and desktop
- 🌙 **Dark Theme** - Anime-inspired gradient UI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- ElevenLabs API Key (Free tier: 10,000 characters/month)

### Installation

```bash
# Clone repository
git clone https://github.com/shravanmanikandan55/scriptvoice.git
cd scriptvoice

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Configuration

1. Create `backend/.env` file:
```env
ELEVENLABS_API_KEY=your_api_key_here
PORT=5000
```

2. Get your ElevenLabs API key:
   - Sign up at [elevenlabs.io](https://elevenlabs.io)
   - Navigate to Profile → API Keys
   - Copy your API key

### Running the App

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📖 Usage

### 1. Write Your Script

Format:
```
Character(emotion): dialogue
```

Example:
```
Aadhidev(shy): I love you
Abhilesh(happy): I love you too
Villain(angry): This isn't over!
Hero(excited): We won!
```

### 2. Assign Voices

- Select AI voices for each character
- Filter by gender (male/female/other)
- Preview accents and voice styles

### 3. Generate Audio

- Play line-by-line with controls
- See real-time waveforms
- Download complete MP3 file

## 🎨 Supported Emotions

| Emotion | Speed | Stability | Use Case |
|---------|-------|-----------|----------|
| shy | 0.8x | 0.3 | Timid, hesitant dialogue |
| happy | 1.1x | 0.7 | Cheerful, upbeat lines |
| angry | 1.3x | 0.2 | Aggressive, intense speech |
| sad | 0.7x | 0.5 | Melancholic, somber tone |
| excited | 1.2x | 0.6 | Energetic, enthusiastic |
| neutral | 1.0x | 0.5 | Standard delivery |
| scared | 1.1x | 0.3 | Fearful, anxious |
| calm | 0.9x | 0.8 | Peaceful, relaxed |

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- WaveSurfer.js (audio visualization)
- Lucide React (icons)

**Backend:**
- Node.js + Express
- ElevenLabs API
- FFmpeg (audio processing)
- Axios

## 📂 Project Structure

```
scriptvoice/
├── src/
│   ├── components/
│   │   ├── ScriptInput.tsx      # Script parsing UI
│   │   ├── VoiceSelector.tsx    # Voice assignment
│   │   ├── PlayerControls.tsx   # Playback interface
│   │   └── LinePreview.tsx      # Line status table
│   ├── store/
│   │   └── scriptStore.ts       # Zustand state
│   ├── App.tsx                  # Router config
│   └── main.tsx                 # Entry point
├── backend/
│   ├── server.js                # Express API
│   └── .env                     # API keys
└── package.json
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Frontend
vercel --prod

# Backend (serverless)
cd backend
vercel --prod
```

### Environment Variables

Set in Vercel dashboard:
- `ELEVENLABS_API_KEY`

## 🔧 API Endpoints

### POST `/api/voices`
Fetch available ElevenLabs voices

**Response:**
```json
[
  {
    "voice_id": "21m00Tcm4TlvDq8ikWAM",
    "name": "Rachel",
    "labels": {
      "gender": "female",
      "accent": "american"
    }
  }
]
```

### POST `/api/tts`
Generate single line audio

**Request:**
```json
{
  "dialogue": "Hello world",
  "voice_id": "21m00Tcm4TlvDq8ikWAM",
  "emotion": "happy"
}
```

**Response:** Audio file (audio/mpeg)

### POST `/api/generate`
Generate full concatenated audio

**Request:**
```json
{
  "lines": [
    {
      "dialogue": "Line 1",
      "voice_id": "voice_id_1",
      "emotion": "happy",
      "index": 0
    }
  ]
}
```

**Response:** MP3 file

## 🎯 Roadmap

- [ ] Custom emotion presets
- [ ] Voice cloning support
- [ ] Multi-language support
- [ ] Sound effects integration
- [ ] Background music mixing
- [ ] Export to video formats
- [ ] Collaborative script editing

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please open an issue first.

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/shravanmanikandan55/scriptvoice/issues)
- **ElevenLabs Docs:** [docs.elevenlabs.io](https://docs.elevenlabs.io)

---

**Built with ❤️ for storytellers worldwide**
