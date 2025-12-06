import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ScriptInput from './components/ScriptInput'
import VoiceSelector from './components/VoiceSelector'
import PlayerControls from './components/PlayerControls'
import { useScriptStore } from './store/scriptStore'

function App() {
  const lines = useScriptStore((state) => state.lines)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20 py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎭 ScriptVoice
            </h1>
            <p className="text-slate-400 text-sm mt-1">AI-Powered Script-to-Speech for Storytellers</p>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ScriptInput />} />
            <Route 
              path="/voices" 
              element={lines.length > 0 ? <VoiceSelector /> : <Navigate to="/" />} 
            />
            <Route 
              path="/player" 
              element={lines.length > 0 ? <PlayerControls /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
