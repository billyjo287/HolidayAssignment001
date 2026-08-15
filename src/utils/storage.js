const KEYS = {
  books: 'stackline:books',
  members: 'stackline:members',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable
  }
}

export function loadBooks(fallback) {
  return read(KEYS.books, fallback)
}

export function saveBooks(books) {
  write(KEYS.books, books)
}

export function loadMembers(fallback) {
  return read(KEYS.members, fallback)
}

export function saveMembers(members) {
  write(KEYS.members, members)
}

export function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}