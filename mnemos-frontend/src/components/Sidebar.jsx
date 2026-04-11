import { useState } from 'react'

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Sidebar({ entries, activeId, onSelect, onNewEntry, loading, currentUser }) {
  const [activeNav, setActiveNav] = useState('journal')

  const navItems = [
    { key: 'journal', icon: 'edit_note', label: 'Journal' },
    { key: 'archive', icon: 'inventory_2', label: 'Archive' },
    { key: 'search', icon: 'search', label: 'Search' },
    { key: 'settings', icon: 'settings', label: 'Settings' },
  ]

  return (
    <aside className="bg-surface-container-low h-screen w-64 flex flex-col py-8 px-4 flex-shrink-0 z-20">
      {/* Logo */}
      <div className="mb-12 px-2">
        <h1 className="text-xl font-headline text-primary tracking-tight leading-none mb-1">
          Mnemos
        </h1>
        <p className="font-label text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
          Private Sanctuary
        </p>
      </div>

      {/* New Entry */}
      <div className="mb-10 px-2">
        <button
          onClick={onNewEntry}
          className="text-primary font-body text-sm flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span>
          New Entry
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-grow overflow-y-auto custom-scrollbar space-y-1">
        {navItems.map(({ key, icon, label }) => (
          <div
            key={key}
            onClick={() => setActiveNav(key)}
            className={`px-2 py-3 flex items-center gap-3 cursor-pointer transition-none
              ${activeNav === key
                ? 'text-primary font-headline'
                : 'text-zinc-500 hover:bg-surface-bright'
              }`}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-label text-sm">{label}</span>
          </div>
        ))}

        {/* Recent Entries */}
        <div className="mt-12 pt-8 border-t border-outline-variant/10">
          <p className="px-2 font-label text-[10px] text-zinc-600 tracking-widest uppercase mb-4">
            Recent Entries
          </p>

          {loading && (
            <p className="px-2 text-xs text-zinc-600 font-label">Loading...</p>
          )}

          {!loading && entries.length === 0 && (
            <p className="px-2 text-xs text-zinc-600 font-label">No entries yet.</p>
          )}

          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onSelect(entry)}
              className={`px-2 py-3 cursor-pointer transition-none group
                ${activeId === entry.id
                  ? 'bg-surface-bright'
                  : 'hover:bg-surface-bright'
                }`}
            >
              <p className="text-[10px] text-on-tertiary-fixed mb-1 font-label">
                {formatDate(entry.date)}
              </p>
              <p className={`text-sm font-label leading-tight
                ${activeId === entry.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {entry.title || 'Untitled'}
              </p>
            </div>
          ))}
        </div>
      </nav>

      {/* User Footer */}
      <div className="mt-auto px-2 pt-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center">
          <span className="material-symbols-outlined text-primary filled">person</span>
        </div>
        <div>
          <p className="font-label text-xs text-on-surface">
            {currentUser || 'Editor-in-Chief'}
          </p>
          <p className="font-label text-[10px] text-zinc-500">Private Archival Mode</p>
        </div>
      </div>
    </aside>
  )
}
