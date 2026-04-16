import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import AuthPage from './pages/AuthPage'
import ObsidianEditorial from './pages/ObsidianEditorial'
import { getAllEntries, createEntry, updateEntry, deleteEntry } from './api/journal'

const BLANK_ENTRY = { id: null, title: '', content: '', date: null }

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem('mnemos_user') || null)
  const [showLanding, setShowLanding] = useState(true)
  const [entries, setEntries] = useState([])
  const [activeEntry, setActiveEntry] = useState(BLANK_ENTRY)
  const [loadingEntries, setLoadingEntries] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    fetchEntries()
  }, [user])

  const fetchEntries = async () => {
    setLoadingEntries(true)
    try {
      const res = await getAllEntries()
      const sorted = res.data
        .map(e => ({ ...e, id: e._id }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      setEntries(sorted)
      if (sorted.length > 0) setActiveEntry(sorted[0])
    } catch (err) {
      if (err.response?.status === 404) {
        setEntries([])
      } else {
        setError('Could not load entries. Is Spring Boot running?')
      }
    } finally {
      setLoadingEntries(false)
    }
  }

  const handleNewEntry = () => {
    setActiveEntry({ ...BLANK_ENTRY })
  }

  const handleSelectEntry = (entry) => {
    setActiveEntry(entry)
  }

  const handleSave = async ({ title, content }) => {
    setSaving(true)
    setError('')
    try {
      if (activeEntry.id) {
        const res = await updateEntry(activeEntry.id, { title, content })
        const updated = { ...res.data, id: res.data._id }
        setEntries(prev => prev.map(e => e.id === updated.id ? updated : e))
        setActiveEntry(updated)
      } else {
        const res = await createEntry({ title, content })
        const created = { ...res.data, id: res.data._id }
        setEntries(prev => [created, ...prev])
        setActiveEntry(created)
      }
    } catch (err) {
      setError('Failed to save. Check your connection.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!activeEntry.id) return
    if (!window.confirm('Delete this entry? This cannot be undone.')) return
    try {
      await deleteEntry(activeEntry.id)
      setEntries(prev => prev.filter(e => e.id !== activeEntry.id))
      setActiveEntry(BLANK_ENTRY)
    } catch {
      setError('Failed to delete entry.')
    }
  }

  const handleLogin = (userName) => {
    localStorage.setItem('mnemos_user', userName)
    setUser(userName)
    setShowLanding(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('mnemos_user')
    localStorage.removeItem('mnemos_auth_user')
    localStorage.removeItem('mnemos_auth_password')
    setUser(null)
    setEntries([])
    setActiveEntry(BLANK_ENTRY)
    setShowLanding(true)
  }

  // ── Routing ──────────────────────────────────────────────────────
  if (user) {
    return (
      <div className="flex h-screen overflow-hidden bg-background text-on-surface font-body">
        {error && (
          <div className="fixed top-4 right-4 z-50 bg-error-container text-on-error-container font-label text-xs px-4 py-3 tracking-wide">
            {error}
            <button onClick={() => setError('')} className="ml-4 hover:opacity-70">✕</button>
          </div>
        )}
        <Sidebar
          entries={entries}
          activeId={activeEntry?.id}
          onSelect={handleSelectEntry}
          onNewEntry={handleNewEntry}
          loading={loadingEntries}
          currentUser={user}
          onLogout={handleLogout}
        />
        <Editor
          entry={activeEntry}
          onSave={handleSave}
          onDelete={handleDelete}
          saving={saving}
        />
      </div>
    )
  }

  if (showLanding) {
    return <ObsidianEditorial onBeginWriting={() => setShowLanding(false)} />
  }

  return <AuthPage onLogin={handleLogin} />
}