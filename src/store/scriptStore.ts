import { create } from 'zustand'
import axios from 'axios'

export interface ScriptLine {
  character: string
  emotion: string
  dialogue: string
  index: number
  audioUrl?: string
}

export interface Voice {
  voice_id: string
  name: string
  labels?: {
    gender?: string
    accent?: string
    age?: string
  }
}

interface ScriptState {
  lines: ScriptLine[]
  voices: Record<string, Voice>
  availableVoices: Voice[]
  currentIndex: number
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  parseScript: (text: string) => void
  fetchVoices: () => Promise<void>
  setVoice: (character: string, voice: Voice) => void
  playLine: (index: number) => Promise<void>
  nextLine: () => void
  prevLine: () => void
  restart: () => void
  togglePlay: () => void
  generateFullAudio: () => Promise<void>
}

export const useScriptStore = create<ScriptState>((set, get) => ({
  lines: [],
  voices: {},
  availableVoices: [],
  currentIndex: 0,
  isPlaying: false,
  isLoading: false,
  error: null,

  parseScript: (text: string) => {
    const regex = /^([A-Za-z]+)\(([^)]+)\):(.*)$/gm
    const lines: ScriptLine[] = []
    let match
    let index = 0

    while ((match = regex.exec(text)) !== null) {
      lines.push({
        character: match[1].trim(),
        emotion: match[2].trim().toLowerCase(),
        dialogue: match[3].trim(),
        index: index++
      })
    }

    if (lines.length === 0) {
      set({ error: 'No valid script lines found. Format: Character(emotion): dialogue' })
    } else {
      set({ lines, error: null, currentIndex: 0 })
    }
  },

  fetchVoices: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await axios.post('/api/voices')
      set({ availableVoices: response.data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch voices', isLoading: false })
    }
  },

  setVoice: (character: string, voice: Voice) => {
    set((state) => ({
      voices: { ...state.voices, [character]: voice }
    }))
  },

  playLine: async (index: number) => {
    const { lines, voices } = get()
    const line = lines[index]
    
    if (!line || !voices[line.character]) return

    try {
      set({ isLoading: true, currentIndex: index, error: null })
      
      if (!line.audioUrl) {
        const response = await axios.post('/api/tts', {
          character: line.character,
          emotion: line.emotion,
          dialogue: line.dialogue,
          voice_id: voices[line.character].voice_id
        }, { responseType: 'blob' })
        
        const audioUrl = URL.createObjectURL(response.data)
        
        set((state) => ({
          lines: state.lines.map((l) => 
            l.index === index ? { ...l, audioUrl } : l
          )
        }))
        
        const audio = new Audio(audioUrl)
        await audio.play()
        
        audio.onended = () => {
          get().nextLine()
        }
      } else {
        const audio = new Audio(line.audioUrl)
        await audio.play()
        
        audio.onended = () => {
          get().nextLine()
        }
      }
      
      set({ isPlaying: true, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to generate audio', isLoading: false, isPlaying: false })
    }
  },

  nextLine: () => {
    const { currentIndex, lines } = get()
    if (currentIndex < lines.length - 1) {
      get().playLine(currentIndex + 1)
    } else {
      set({ isPlaying: false, currentIndex: lines.length - 1 })
    }
  },

  prevLine: () => {
    const { currentIndex } = get()
    if (currentIndex > 0) {
      get().playLine(currentIndex - 1)
    }
  },

  restart: () => {
    set({ currentIndex: 0, isPlaying: false })
  },

  togglePlay: () => {
    const { isPlaying, currentIndex } = get()
    if (isPlaying) {
      set({ isPlaying: false })
    } else {
      get().playLine(currentIndex)
    }
  },

  generateFullAudio: async () => {
    try {
      set({ isLoading: true, error: null })
      const { lines, voices } = get()
      
      const response = await axios.post('/api/generate', {
        lines: lines.map(line => ({
          ...line,
          voice_id: voices[line.character]?.voice_id
        }))
      }, { responseType: 'blob' })
      
      const url = window.URL.createObjectURL(response.data)
      const a = document.createElement('a')
      a.href = url
      a.download = 'scriptvoice-output.mp3'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      set({ isLoading: false })
    } catch (error) {
      set({ error: 'Failed to generate full audio', isLoading: false })
    }
  }
}))
