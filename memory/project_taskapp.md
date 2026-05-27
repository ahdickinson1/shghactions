---
name: project-taskapp
description: Shared to-do app between Anna (user) and Rachel (principal). Built as a Claude artifact using window.storage API.
metadata:
  type: project
---

Shared task management app for Anna Dickinson and her principal Rachel.

**Why:** To enable both to assign actions to each other, set deadlines, prioritise using a priority matrix (High/Medium/Low), attach documents, and send notifications/reminders.

**Stack:** Single React component (TaskApp.jsx), runs as a Claude artifact. Uses `window.storage` API (artifact-native shared storage) — not a standalone web app. No backend.

**How to apply:** When suggesting features or fixes, keep within the Claude artifact model (window.storage, no external APIs, no auth). File stored at TaskApp.jsx in the repo root.

**Current features (v1):**
- Identity gate: Anna or Rachel selects who they are (stored in window.storage)
- Add tasks with title, description, assignee, priority (H/M/L), due date
- Status cycling: todo → in_progress → done via dot click
- Edit tasks inline
- Post updates (latest update surfaced on card)
- File attachments (base64, 3MB limit) and link attachments
- Browser notifications: new tasks, updates, attachments, deadlines
- "What's new" banner on login showing activity since last visit
- "Attention" banner for overdue/due-today tasks assigned to you
- 30s polling for sync between users
- Filter: All / Mine / Theirs
- Sort: due date → priority → created date

**Known limitations / improvement areas:**
- Only stores the *latest* update per task — no update history
- No audit trail / activity log
- Identity is honour-system (no real auth)
- 3MB file limit (base64 adds ~33% overhead)
- `knownTaskIdsRef` initialised as null, requiring null-checks
- `attentionDismissed` resets on page load (not persisted)
- `whatsNewDismissed` resets on page load (not persisted)
- No save-error surfaced to user (only console.error)
- All errors in pollOnce swallowed silently
