import { useEffect, useRef, useState } from 'react'

const formatFullDate = (dateStr) => {
  if (!dateStr) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
}

const countWords = (text) => {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).length
}

export default function Editor({ entry, onSave, onDelete, saving }) {
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const [wordCount, setWordCount] = useState(0)
  const [isDirty, setIsDirty] = useState(false)

  // Sync editor content when entry changes
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerText = entry?.title || ''
    }
    if (contentRef.current) {
      contentRef.current.innerText = entry?.content || ''
    }
    setWordCount(countWords(entry?.content || ''))
    setIsDirty(false)
  }, [entry?.id])

  const handleContentInput = () => {
    const text = contentRef.current?.innerText || ''
    setWordCount(countWords(text))
    setIsDirty(true)
  }

  const handleTitleInput = () => {
    setIsDirty(true)
  }

  const handleSave = () => {
    const title = titleRef.current?.innerText?.trim() || 'Untitled'
    const content = contentRef.current?.innerText?.trim() || ''
    onSave({ title, content })
    setIsDirty(false)
  }

  const handleFormat = (cmd) => {
    document.execCommand(cmd, false, null)
    contentRef.current?.focus()
  }

  const isNew = !entry?.id

  return (
    <main className="flex-grow bg-surface relative flex flex-col items-center overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <header className="w-full px-12 py-6 flex justify-between items-center sticky top-0 bg-surface/80 backdrop-blur-md z-10">
        <h2 className="text-lg font-headline text-primary">Mnemos</h2>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-label text-on-surface-variant/60 tracking-widest uppercase">
            Words: {wordCount.toLocaleString()}
          </span>
          {entry?.id && (
            <button
              onClick={onDelete}
              className="text-[10px] font-label text-zinc-600 hover:text-error tracking-widest uppercase transition-colors"
            >
              Delete
            </button>
          )}
          {isDirty && (
            <span className="text-[10px] font-label text-zinc-600 tracking-widest uppercase">
              Unsaved
            </span>
          )}
        </div>
      </header>

      {/* Editor Canvas */}
      <article className="w-full max-w-3xl px-8 pt-20 pb-40 flex flex-col gap-12">
        <div className="space-y-4">
          <p className="font-label text-xs text-on-tertiary-fixed tracking-[0.3em] uppercase">
            {formatFullDate(entry?.date)}
          </p>
          <h1
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleTitleInput}
            data-placeholder="Untitled"
            className="text-6xl font-headline text-on-surface leading-tight tracking-tight focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-on-surface-variant/30"
          />
        </div>

        <section
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentInput}
          data-placeholder="Begin writing..."
          className="font-body text-lg text-on-surface-variant/90 leading-relaxed space-y-8 focus:outline-none min-h-[40vh] whitespace-pre-wrap"
        />
      </article>

      {/* Floating Toolbar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 md:ml-32">
        <div className="bg-surface-container-high/80 backdrop-blur-xl px-6 py-3 flex items-center gap-8 border border-outline-variant/10">
          <button
            onClick={() => handleFormat('bold')}
            className="text-on-surface-variant hover:text-primary transition-colors"
            title="Bold"
          >
            <span className="material-symbols-outlined">format_bold</span>
          </button>
          <button
            onClick={() => handleFormat('italic')}
            className="text-on-surface-variant hover:text-primary transition-colors"
            title="Italic"
          >
            <span className="material-symbols-outlined">format_italic</span>
          </button>
          <button
            onClick={() => handleFormat('insertUnorderedList')}
            className="text-on-surface-variant hover:text-primary transition-colors"
            title="List"
          >
            <span className="material-symbols-outlined">format_list_bulleted</span>
          </button>

          <div className="h-4 w-[1px] bg-outline-variant/30" />

          <button
            onClick={handleSave}
            disabled={saving}
            className="text-primary font-label text-xs uppercase tracking-widest hover:opacity-70 transition-opacity disabled:opacity-40"
          >
            {saving ? 'Saving...' : isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>
    </main>
  )
}
