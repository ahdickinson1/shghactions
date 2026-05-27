import { useState, useEffect, useRef } from 'react';



const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #F4EFE6;
    --surface: #FBF7EE;
    --surface-2: #EFE8D8;
    --ink: #1F1A12;
    --ink-soft: #3A332A;
    --muted: #8A7F6F;
    --subtle: #D8CFB8;
    --line: #C9BFA5;
    --line-soft: #E2D9C2;
    --accent: #8C3D1E;
    --accent-soft: #C26A45;
    --accent-tint: #F0E0D2;
    --sage: #5C7548;
    --warn: #B85C1E;
    --warn-tint: #F5E2CC;
  }

  .ta-root {
    font-family: 'Bricolage Grotesque', system-ui, sans-serif;
    background: var(--bg);
    color: var(--ink);
    min-height: 100vh;
    padding: 2.5rem 1.25rem 5rem;
    font-feature-settings: "ss01", "ss02";
    line-height: 1.5;
  }
  .ta-root * { box-sizing: border-box; }
  .ta-wrap { max-width: 760px; margin: 0 auto; }

  /* Header */
  .ta-head {
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 1rem; padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--line); margin-bottom: 1.5rem;
  }
  .ta-brand {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 3rem; line-height: 0.9; letter-spacing: -0.02em;
    color: var(--ink); font-weight: 400;
  }
  .ta-brand em { font-style: italic; color: var(--accent); }
  .ta-sub {
    font-size: 0.78rem; color: var(--muted); margin-top: 0.5rem;
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase; letter-spacing: 0.08em;
  }
  .ta-id { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; }
  .ta-id-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--muted);
  }
  .ta-id-toggle {
    display: inline-flex; background: var(--surface-2);
    border: 1px solid var(--line); border-radius: 999px; padding: 2px;
  }
  .ta-id-toggle button {
    border: none; background: transparent; font-family: inherit;
    font-size: 0.82rem; padding: 0.3rem 0.95rem; border-radius: 999px;
    cursor: pointer; color: var(--ink-soft); transition: all 0.18s ease;
  }
  .ta-id-toggle button.active { background: var(--ink); color: var(--bg); }

  /* Banners */
  .ta-banner {
    border-radius: 6px; padding: 0.85rem 1.1rem; margin-bottom: 0.8rem;
    display: flex; align-items: flex-start; gap: 0.8rem;
    border: 1px solid transparent;
  }
  .ta-banner.attention { background: var(--warn-tint); border-color: var(--warn); color: var(--ink); }
  .ta-banner.whatsnew { background: var(--accent-tint); border-color: var(--accent-soft); color: var(--ink); }
  .ta-banner-icon {
    flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Instrument Serif', serif; font-style: italic; font-size: 1rem;
    margin-top: 0.05rem;
  }
  .ta-banner.attention .ta-banner-icon { background: var(--warn); color: var(--bg); }
  .ta-banner.whatsnew .ta-banner-icon { background: var(--accent); color: var(--bg); }
  .ta-banner-body { flex: 1; min-width: 0; }
  .ta-banner-headline {
    font-family: 'Instrument Serif', serif; font-size: 1.15rem;
    line-height: 1.2; color: var(--ink);
  }
  .ta-banner-meta {
    margin-top: 0.2rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--ink-soft);
  }
  .ta-banner-dismiss {
    background: none; border: none; cursor: pointer; color: var(--ink-soft);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
    padding: 0.2rem 0.5rem; border-radius: 4px; flex-shrink: 0;
  }
  .ta-banner-dismiss:hover { background: rgba(0,0,0,0.05); color: var(--ink); }
  .ta-banners-wrap { margin-bottom: 1.5rem; }

  /* Add form */
  .ta-add {
    background: var(--surface); border: 1px solid var(--line-soft);
    border-radius: 6px; padding: 1.1rem 1.2rem; margin-bottom: 2rem;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02);
  }
  .ta-add-title {
    font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: 1.1rem; color: var(--muted); margin-bottom: 0.6rem;
  }
  .ta-input, .ta-textarea {
    width: 100%; background: transparent; border: none;
    border-bottom: 1px solid var(--line-soft);
    font-family: inherit; font-size: 1rem; color: var(--ink);
    padding: 0.5rem 0; outline: none; transition: border-color 0.2s ease;
  }
  .ta-input:focus, .ta-textarea:focus { border-bottom-color: var(--ink); }
  .ta-input::placeholder, .ta-textarea::placeholder { color: var(--muted); font-style: italic; }
  .ta-textarea { resize: none; min-height: 2.2rem; margin-top: 0.5rem; }

  .ta-add-meta {
    display: flex; align-items: center; gap: 1.4rem;
    margin-top: 0.9rem; flex-wrap: wrap;
  }
  .ta-meta-group { display: flex; align-items: center; gap: 0.55rem; font-size: 0.78rem; color: var(--muted); }
  .ta-meta-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.1em;
  }
  .ta-pill-group { display: inline-flex; background: var(--surface-2); border-radius: 999px; padding: 2px; }
  .ta-pill {
    border: none; background: transparent; font-family: inherit;
    font-size: 0.76rem; padding: 0.25rem 0.7rem; border-radius: 999px;
    cursor: pointer; color: var(--ink-soft); transition: all 0.15s ease;
  }
  .ta-pill.active { background: var(--ink); color: var(--bg); }
  .ta-pill.priority-high.active { background: var(--accent); }
  .ta-pill.priority-medium.active { background: var(--ink); }
  .ta-pill.priority-low.active { background: var(--muted); }

  .ta-date-input {
    background: var(--surface-2); border: 1px solid var(--line);
    border-radius: 999px; padding: 0.28rem 0.7rem; font-family: inherit;
    font-size: 0.78rem; color: var(--ink-soft); outline: none;
    transition: border-color 0.2s ease;
  }
  .ta-date-input:focus { border-color: var(--ink); }

  .ta-add-actions { display: flex; justify-content: flex-end; margin-top: 1rem; }
  .ta-add-btn {
    border: 1px solid var(--ink); background: var(--ink); color: var(--bg);
    font-family: inherit; font-size: 0.85rem; padding: 0.5rem 1.4rem;
    border-radius: 999px; cursor: pointer; transition: all 0.18s ease;
  }
  .ta-add-btn:hover { background: var(--accent); border-color: var(--accent); }
  .ta-add-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .ta-add-btn:disabled:hover { background: var(--ink); border-color: var(--ink); }

  /* Filter bar */
  .ta-filter {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;
  }
  .ta-filter-group {
    display: flex; gap: 1.2rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;
  }
  .ta-filter-btn {
    border: none; background: none; color: var(--muted); cursor: pointer;
    padding: 0 0 2px; font: inherit;
    text-transform: inherit; letter-spacing: inherit;
    border-bottom: 1px solid transparent; transition: all 0.2s ease;
  }
  .ta-filter-btn.active { color: var(--ink); border-bottom-color: var(--accent); }
  .ta-tools { display: flex; gap: 0.5rem; align-items: center; }
  .ta-tool-btn {
    background: none; border: 1px solid var(--line); border-radius: 999px;
    padding: 0.3rem 0.8rem; font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--muted); cursor: pointer; transition: all 0.18s ease;
  }
  .ta-tool-btn:hover { color: var(--ink); border-color: var(--ink); }
  .ta-tool-btn.active { color: var(--ink); border-color: var(--ink); background: var(--surface-2); }
  .ta-tool-btn.spinning { opacity: 0.4; }

  /* Settings panel */
  .ta-settings {
    background: var(--surface); border: 1px solid var(--line-soft);
    border-radius: 6px; padding: 1rem 1.2rem; margin-bottom: 1.5rem;
  }
  .ta-settings-title {
    font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: 1.1rem; color: var(--muted); margin-bottom: 0.7rem;
  }
  .ta-settings-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.5rem 0; gap: 1rem;
    border-bottom: 1px dashed var(--line-soft);
  }
  .ta-settings-row:last-child { border-bottom: none; }
  .ta-settings-info { flex: 1; min-width: 0; }
  .ta-settings-name { color: var(--ink); font-size: 0.95rem; }
  .ta-settings-desc { color: var(--muted); font-size: 0.78rem; margin-top: 0.15rem; }
  .ta-settings-status {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.1em;
    margin-top: 0.3rem;
  }
  .ta-status-on { color: var(--sage); }
  .ta-status-off { color: var(--muted); }
  .ta-status-denied { color: var(--accent); }
  .ta-settings-btn {
    background: var(--ink); color: var(--bg); border: none;
    padding: 0.45rem 1rem; border-radius: 999px;
    font-family: inherit; font-size: 0.8rem; cursor: pointer; flex-shrink: 0;
  }
  .ta-settings-btn:hover { background: var(--accent); }
  .ta-settings-btn.muted { background: transparent; color: var(--ink-soft); border: 1px solid var(--line); }
  .ta-settings-btn.muted:hover { border-color: var(--ink); color: var(--ink); background: transparent; }

  /* Task groups */
  .ta-group { margin-bottom: 2.5rem; }
  .ta-group-head { display: flex; align-items: baseline; gap: 0.7rem; margin-bottom: 0.9rem; }
  .ta-group-title {
    font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: 1.4rem; color: var(--ink); margin: 0;
  }
  .ta-group-count {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem; color: var(--muted); letter-spacing: 0.08em;
  }
  .ta-group-line { flex: 1; height: 1px; background: var(--line-soft); }

  /* Task card */
  .ta-card {
    background: var(--surface); border: 1px solid var(--line-soft);
    border-radius: 6px; padding: 1rem 1.15rem; margin-bottom: 0.7rem;
    transition: all 0.2s ease; position: relative;
  }
  .ta-card:hover { border-color: var(--line); }
  .ta-card.done { background: transparent; opacity: 0.6; }
  .ta-card.done .ta-card-title {
    text-decoration: line-through; text-decoration-thickness: 1px; color: var(--muted);
  }
  .ta-card.overdue { border-left: 3px solid var(--accent); padding-left: calc(1.15rem - 2px); }
  .ta-card.is-new { box-shadow: 0 0 0 2px var(--accent-tint); }

  .ta-card-top { display: flex; align-items: flex-start; gap: 0.75rem; }

  .ta-status-dot {
    flex-shrink: 0; width: 15px; height: 15px; border-radius: 50%;
    border: 1.5px solid var(--ink); background: var(--bg);
    margin-top: 0.4rem; cursor: pointer; transition: all 0.2s ease;
  }
  .ta-status-dot.in_progress { background: linear-gradient(90deg, var(--ink) 50%, transparent 50%); }
  .ta-status-dot.done { background: var(--ink); }
  .ta-status-dot:hover { transform: scale(1.15); }

  .ta-card-body { flex: 1; min-width: 0; }
  .ta-card-headline { display: flex; align-items: baseline; gap: 0.75rem; flex-wrap: wrap; }
  .ta-card-title {
    font-size: 1.05rem; color: var(--ink); font-weight: 500;
    line-height: 1.35; word-break: break-word; flex: 1; min-width: 0;
  }
  .ta-card-badges {
    display: inline-flex; gap: 0.5rem; align-items: center; flex-shrink: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.1em;
  }
  .ta-new-badge {
    background: var(--accent); color: var(--bg);
    padding: 0.15rem 0.5rem; border-radius: 999px;
    animation: pulseNew 2s ease-in-out infinite;
  }
  @keyframes pulseNew { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  .ta-prio { padding: 0.15rem 0.5rem; border-radius: 999px; }
  .ta-prio.high { background: var(--accent); color: var(--bg); }
  .ta-prio.medium { background: var(--surface-2); color: var(--ink-soft); border: 1px solid var(--line); }
  .ta-prio.low { color: var(--muted); }
  .ta-due { color: var(--muted); }
  .ta-due.soon { color: var(--warn); }
  .ta-due.overdue { color: var(--accent); font-weight: 500; }

  .ta-update {
    margin-top: 0.6rem; padding: 0.55rem 0.8rem;
    background: var(--bg); border-left: 2px solid var(--accent);
    border-radius: 0 4px 4px 0;
  }
  .ta-update-text {
    font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: 1.02rem; color: var(--ink); line-height: 1.35;
  }
  .ta-update-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--muted); margin-top: 0.3rem;
  }
  .ta-updates { display: flex; flex-direction: column; }
  .ta-update + .ta-update { margin-top: 0.3rem; }
  .ta-update.older { border-left-color: var(--line); background: transparent; }
  .ta-update.older .ta-update-text { color: var(--ink-soft); }
  .ta-updates-toggle {
    background: none; border: none; cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--accent); padding: 0.3rem 0; margin-top: 0.2rem;
    text-align: left; transition: color 0.15s ease;
  }
  .ta-updates-toggle:hover { color: var(--ink); }

  .ta-card-desc {
    margin-top: 0.55rem; color: var(--ink-soft);
    font-size: 0.92rem; line-height: 1.5;
    white-space: pre-wrap; word-break: break-word;
  }

  /* === Attachments === */
  .ta-attachments {
    margin-top: 0.7rem;
    display: flex; flex-direction: column; gap: 0.4rem;
  }
  .ta-attachment {
    display: flex; align-items: center; gap: 0.6rem;
    background: var(--bg);
    border: 1px solid var(--line-soft);
    border-radius: 6px;
    padding: 0.5rem 0.7rem;
    font-size: 0.85rem;
    transition: border-color 0.15s ease;
  }
  .ta-attachment:hover { border-color: var(--line); }
  .ta-attachment-icon {
    flex-shrink: 0;
    width: 28px; height: 28px;
    border-radius: 4px;
    background: var(--surface-2);
    display: flex; align-items: center; justify-content: center;
    color: var(--ink-soft);
  }
  .ta-attachment-icon svg { width: 14px; height: 14px; }
  .ta-attachment-info { flex: 1; min-width: 0; }
  .ta-attachment-name {
    color: var(--ink);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    font-weight: 500;
  }
  .ta-attachment-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted); margin-top: 0.15rem;
  }
  .ta-attachment-actions { display: flex; gap: 0.4rem; flex-shrink: 0; }
  .ta-attachment-btn {
    background: none; border: 1px solid var(--line); border-radius: 4px;
    padding: 0.25rem 0.55rem; font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--ink-soft); cursor: pointer; transition: all 0.15s ease;
    text-decoration: none;
    display: inline-flex; align-items: center;
  }
  .ta-attachment-btn:hover { background: var(--ink); color: var(--bg); border-color: var(--ink); }
  .ta-attachment-btn.danger:hover { background: var(--accent); border-color: var(--accent); }
  .ta-attachment-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Attach picker (inline) */
  .ta-attach-picker {
    margin-top: 0.7rem;
    padding: 0.8rem;
    background: var(--surface-2);
    border: 1px dashed var(--line);
    border-radius: 6px;
  }
  .ta-attach-tabs {
    display: flex; gap: 0; margin-bottom: 0.7rem;
    border-bottom: 1px solid var(--line-soft);
  }
  .ta-attach-tab {
    background: none; border: none;
    padding: 0.4rem 0.9rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted); cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .ta-attach-tab.active { color: var(--ink); border-bottom-color: var(--accent); }
  .ta-attach-row { display: flex; gap: 0.5rem; align-items: stretch; }
  .ta-attach-input {
    flex: 1; background: var(--bg);
    border: 1px solid var(--line); border-radius: 4px;
    padding: 0.45rem 0.7rem; font-family: inherit;
    font-size: 0.9rem; color: var(--ink); outline: none;
  }
  .ta-attach-input:focus { border-color: var(--ink); }
  .ta-file-label {
    flex: 1; background: var(--bg);
    border: 1px solid var(--line); border-radius: 4px;
    padding: 0.45rem 0.7rem; font-family: inherit;
    font-size: 0.9rem; color: var(--muted); cursor: pointer;
    display: flex; align-items: center; gap: 0.5rem;
    transition: border-color 0.15s ease;
  }
  .ta-file-label:hover { border-color: var(--ink); color: var(--ink); }
  .ta-file-label input { display: none; }
  .ta-attach-submit {
    background: var(--ink); color: var(--bg); border: none;
    padding: 0 1rem; border-radius: 4px; font-family: inherit;
    font-size: 0.78rem; cursor: pointer;
  }
  .ta-attach-submit:hover { background: var(--accent); }
  .ta-attach-submit:disabled { opacity: 0.4; cursor: not-allowed; }
  .ta-attach-hint {
    margin-top: 0.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted);
  }
  .ta-attach-error {
    margin-top: 0.5rem; color: var(--accent); font-size: 0.8rem;
  }

  .ta-card-meta {
    margin-top: 0.75rem;
    display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted);
  }
  .ta-card-meta .who { color: var(--ink-soft); }
  .ta-card-meta .who.other { color: var(--accent); }
  .ta-card-actions { display: flex; gap: 0.6rem; margin-left: auto; flex-wrap: wrap; }
  .ta-icon-btn {
    background: none; border: none; cursor: pointer; padding: 0.2rem;
    color: var(--muted); font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
    transition: color 0.15s ease;
  }
  .ta-icon-btn:hover { color: var(--ink); }
  .ta-icon-btn.danger:hover { color: var(--accent); }
  .ta-icon-btn.primary { color: var(--accent); }
  .ta-icon-btn.primary:hover { color: var(--ink); }

  .ta-update-entry {
    margin-top: 0.7rem; padding-top: 0.7rem; border-top: 1px dashed var(--line-soft);
    display: flex; gap: 0.5rem; align-items: stretch;
  }
  .ta-update-input {
    flex: 1; background: var(--surface-2);
    border: 1px solid var(--line); border-radius: 4px;
    padding: 0.45rem 0.7rem; font-family: 'Instrument Serif', serif;
    font-style: italic; font-size: 0.98rem; color: var(--ink); outline: none;
  }
  .ta-update-input:focus { border-color: var(--ink); }
  .ta-update-submit {
    background: var(--ink); color: var(--bg); border: none;
    padding: 0 1rem; border-radius: 4px; font-family: inherit;
    font-size: 0.78rem; cursor: pointer;
  }
  .ta-update-submit:hover { background: var(--accent); }

  /* Edit mode */
  .ta-edit-row { display: flex; flex-direction: column; gap: 0.55rem; margin-top: 0.3rem; }
  .ta-edit-input {
    width: 100%; background: var(--surface-2); border: 1px solid var(--line);
    border-radius: 4px; padding: 0.5rem 0.7rem; font-family: inherit;
    font-size: 0.92rem; color: var(--ink); outline: none;
  }
  .ta-edit-input:focus { border-color: var(--ink); }
  .ta-edit-meta { display: flex; gap: 1.2rem; flex-wrap: wrap; align-items: center; }
  .ta-edit-actions { display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; margin-top: 0.3rem; }

  /* Empty / loading */
  .ta-empty {
    text-align: center; padding: 3rem 1rem; color: var(--muted);
    font-family: 'Instrument Serif', serif; font-style: italic; font-size: 1.2rem;
  }
  .ta-loading {
    padding: 4rem 1rem; text-align: center; color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  }

  /* Identity gate */
  .ta-gate { max-width: 460px; margin: 6rem auto 0; text-align: center; padding: 0 1rem; }
  .ta-gate h1 {
    font-family: 'Instrument Serif', serif; font-size: 2.6rem; font-weight: 400;
    line-height: 1; margin: 0 0 0.6rem;
  }
  .ta-gate h1 em { font-style: italic; color: var(--accent); }
  .ta-gate p { color: var(--muted); margin: 0 0 2rem; font-size: 0.95rem; }
  .ta-gate-choices { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; }
  .ta-gate-btn {
    background: var(--surface); border: 1px solid var(--line);
    border-radius: 999px; padding: 0.8rem 1.8rem;
    font-family: inherit; font-size: 1rem; color: var(--ink); cursor: pointer;
    transition: all 0.2s ease;
  }
  .ta-gate-btn:hover { background: var(--ink); color: var(--bg); border-color: var(--ink); }

  /* Priority matrix */
  .ta-matrix {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1rem; margin-bottom: 2rem;
  }
  .ta-quadrant {
    background: var(--surface); border: 1px solid var(--line-soft);
    border-radius: 6px; padding: 0.9rem 1rem; min-height: 160px;
  }
  .ta-quadrant-do { border-top: 3px solid var(--accent); }
  .ta-quadrant-schedule { border-top: 3px solid var(--sage); }
  .ta-quadrant-delegate { border-top: 3px solid var(--warn); }
  .ta-quadrant-eliminate { border-top: 3px solid var(--line); }
  .ta-quadrant-head {
    display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.15rem;
  }
  .ta-quadrant-title {
    font-family: 'Instrument Serif', serif; font-style: italic;
    font-size: 1.1rem; color: var(--ink);
  }
  .ta-quadrant-count {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; color: var(--muted);
  }
  .ta-quadrant-desc {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--muted); margin-bottom: 0.75rem;
  }
  .ta-quadrant-empty {
    color: var(--muted); font-style: italic; font-size: 0.88rem; padding: 0.4rem 0;
  }
  .ta-matrix-item {
    display: flex; align-items: center; gap: 0.55rem;
    padding: 0.45rem 0; border-bottom: 1px solid var(--line-soft);
  }
  .ta-matrix-item:last-child { border-bottom: none; }
  .ta-matrix-title {
    flex: 1; min-width: 0; font-size: 0.9rem; color: var(--ink);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .ta-matrix-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; flex-shrink: 0; color: var(--muted);
    display: flex; gap: 0.4rem; align-items: center;
  }

  .ta-footnote {
    margin-top: 3rem; padding-top: 1.25rem;
    border-top: 1px dashed var(--line-soft);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--muted); text-align: center;
  }

  @media (max-width: 540px) {
    .ta-brand { font-size: 2.2rem; }
    .ta-head { flex-direction: column; align-items: flex-start; }
    .ta-id { align-items: flex-start; }
    .ta-card-headline { flex-direction: column; align-items: flex-start; }
    .ta-card-badges { margin-top: 0.2rem; }
    .ta-matrix { grid-template-columns: 1fr; }
  }
`;



const PEOPLE = ['Anna', 'Rachel'];
const STATUSES = [
  { id: 'todo', label: 'To do' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
];
const PRIORITIES = [
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
];
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };
const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3 MB pre-encode

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const sameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: sameYear ? undefined : 'numeric' });
}

function fmtDue(dateStr) {
  if (!dateStr) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(dateStr + 'T00:00:00');
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));
  let label, status = 'normal';
  if (diffDays < 0) { label = `Overdue · ${due.toLocaleDateString([], { month: 'short', day: 'numeric' })}`; status = 'overdue'; }
  else if (diffDays === 0) { label = 'Due today'; status = 'soon'; }
  else if (diffDays === 1) { label = 'Due tomorrow'; status = 'soon'; }
  else if (diffDays <= 7) { label = `Due ${due.toLocaleDateString([], { weekday: 'short' })}`; status = 'soon'; }
  else label = `Due ${due.toLocaleDateString([], { month: 'short', day: 'numeric' })}`;
  return { label, status, diffDays };
}

function timeAgo(iso) {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.round(hrs / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function formatBytes(n) {
  if (!n && n !== 0) return '';
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / (1024 * 1024)).toFixed(1) + ' MB';
}

function getHost(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch (e) { return url; }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function triggerDownload(name, mimeType, base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: mimeType || 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Inline icons
const FileIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 1.5h5.5L13 5v9.5H4z" />
    <path d="M9.5 1.5V5H13" />
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 4.5l3-3M12 1.5h-3M12 1.5v3" />
    <path d="M7 2.5H4.5A1.5 1.5 0 0 0 3 4v7.5A1.5 1.5 0 0 0 4.5 13H12a1.5 1.5 0 0 0 1.5-1.5V9" />
  </svg>
);

export default function TaskApp() {
  const [identity, setIdentity] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAssignee, setNewAssignee] = useState('Anna');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');

  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'matrix'
  const [hideCompleted, setHideCompleted] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAssignee, setEditAssignee] = useState('Anna');
  const [editPriority, setEditPriority] = useState('medium');
  const [editDueDate, setEditDueDate] = useState('');

  const [updateForId, setUpdateForId] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [expandedUpdates, setExpandedUpdates] = useState(new Set());

  // Attachment picker state (per-task)
  const [attachForId, setAttachForId] = useState(null);
  const [attachTab, setAttachTab] = useState('file'); // 'file' | 'link'
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [attachError, setAttachError] = useState('');
  const [attachUploading, setAttachUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  // Notifications
  const [lastSeen, setLastSeen] = useState(null);
  const [notifPrefs, setNotifPrefs] = useState({ browser: false });
  const [browserPerm, setBrowserPerm] = useState('default');
  const [showSettings, setShowSettings] = useState(false);
  const [attentionDismissed, setAttentionDismissed] = useState(false);

  const knownTaskIdsRef = useRef(null);
  const knownUpdatesRef = useRef(new Map());
  const knownAttachmentsRef = useRef(new Map()); // id -> attachment count
  const notifiedDeadlinesRef = useRef(new Set());
  const pollRef = useRef(null);
  const notifPrefsRef = useRef({ browser: false });
  const browserPermRef = useRef('default');
  const identityRef = useRef(null);

  useEffect(() => { notifPrefsRef.current = notifPrefs; }, [notifPrefs]);
  useEffect(() => { browserPermRef.current = browserPerm; }, [browserPerm]);
  useEffect(() => { identityRef.current = identity; }, [identity]);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get('identity');
        if (r?.value && PEOPLE.includes(r.value)) setIdentity(r.value);
      } catch (e) {}

      try {
        const r = await window.storage.get('lastSeen_v1');
        if (r?.value) setLastSeen(r.value);
      } catch (e) {}
      try { await window.storage.set('lastSeen_v1', new Date().toISOString()); } catch (e) {}

      try {
        const r = await window.storage.get('notifPrefs_v1');
        if (r?.value) setNotifPrefs(JSON.parse(r.value));
      } catch (e) {}

      try {
        const r = await window.storage.get('attentionDismissedDate');
        if (r?.value === new Date().toISOString().slice(0, 10)) setAttentionDismissed(true);
      } catch (e) {}

      try {
        const r = await window.storage.get('hideCompleted_v1');
        if (r?.value === '1') setHideCompleted(true);
      } catch (e) {}

      if (typeof Notification !== 'undefined') setBrowserPerm(Notification.permission);
      else setBrowserPerm('unsupported');

      try {
        const r = await window.storage.get('tasks_v1', true);
        if (r?.value) {
          const parsed = JSON.parse(r.value);
          if (Array.isArray(parsed)) {
            // Migrate latestUpdate → updates array for any old-format tasks
            let didMigrate = false;
            const loaded = parsed.map(t => {
              if (t.updates) return t;
              didMigrate = true;
              const { latestUpdate, ...rest } = t;
              return { ...rest, updates: latestUpdate ? [latestUpdate] : [] };
            });
            if (didMigrate) {
              try { await window.storage.set('tasks_v1', JSON.stringify(loaded), true); } catch (e) {}
            }
            setTasks(loaded);
            knownTaskIdsRef.current = new Set(loaded.map(t => t.id));
            knownUpdatesRef.current = new Map(loaded.map(t => [t.id, (t.updates || [])[0]?.at]));
            knownAttachmentsRef.current = new Map(loaded.map(t => [t.id, (t.attachments || []).length]));
            const today = new Date(); today.setHours(0,0,0,0);
            loaded.forEach(t => {
              if (!t.dueDate || t.status === 'done') return;
              const due = new Date(t.dueDate + 'T00:00:00');
              if (due <= today) notifiedDeadlinesRef.current.add(t.id);
            });
          }
        } else {
          knownTaskIdsRef.current = new Set();
        }
      } catch (e) {
        knownTaskIdsRef.current = new Set();
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => { if (identity) setNewAssignee(identity); }, [identity]);

  useEffect(() => {
    if (!identity) return;
    pollRef.current = setInterval(() => { pollOnce(); }, 30000);
    return () => clearInterval(pollRef.current);
  }, [identity]);

  useEffect(() => {
    if (!identity || loading) return;
    checkDeadlines(tasks);
    const id = setInterval(() => checkDeadlines(tasks), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [identity, loading, tasks]);

  async function pollOnce() {
    try {
      const r = await window.storage.get('tasks_v1', true);
      if (!r?.value) return;
      const parsed = JSON.parse(r.value);
      if (!Array.isArray(parsed)) return;

      const me = identityRef.current;
      const allowNotif = notifPrefsRef.current.browser && browserPermRef.current === 'granted';

      const known = knownTaskIdsRef.current || new Set();
      const newOnes = parsed.filter(t => !known.has(t.id) && t.createdBy !== me);
      if (newOnes.length > 0 && allowNotif) {
        newOnes.forEach(t => fireNotification(`New task from ${t.createdBy}`, {
          body: `${t.title}${t.assignee === me ? ' · assigned to you' : ''}`,
          tag: 'task-' + t.id,
        }));
      }

      const oldUpdates = knownUpdatesRef.current || new Map();
      const newUpdated = parsed.filter(t => {
        const latest = (t.updates || [])[0];
        if (!latest) return false;
        if (latest.by === me) return false;
        return oldUpdates.get(t.id) !== latest.at;
      });
      if (newUpdated.length > 0 && allowNotif) {
        newUpdated.forEach(t => {
          const latest = (t.updates || [])[0];
          fireNotification(`${latest.by} posted an update`, {
            body: `${t.title} — "${latest.text}"`,
            tag: 'update-' + t.id + '-' + latest.at,
          });
        });
      }

      // Attachment additions
      const oldAtt = knownAttachmentsRef.current || new Map();
      const newlyAttached = parsed.filter(t => {
        const oldCount = oldAtt.get(t.id) || 0;
        const newCount = (t.attachments || []).length;
        if (newCount <= oldCount) return false;
        // find the most recent attachment not by me
        const latest = (t.attachments || []).slice().sort((a,b) => new Date(b.addedAt) - new Date(a.addedAt))[0];
        return latest && latest.addedBy !== me;
      });
      if (newlyAttached.length > 0 && allowNotif) {
        newlyAttached.forEach(t => {
          const latest = (t.attachments || []).slice().sort((a,b) => new Date(b.addedAt) - new Date(a.addedAt))[0];
          fireNotification(`${latest.addedBy} attached ${latest.kind === 'file' ? 'a file' : 'a link'}`, {
            body: `${t.title} — ${latest.name}`,
            tag: 'att-' + latest.id,
          });
        });
      }

      setTasks(parsed);
      knownTaskIdsRef.current = new Set(parsed.map(t => t.id));
      knownUpdatesRef.current = new Map(parsed.map(t => [t.id, (t.updates || [])[0]?.at]));
      knownAttachmentsRef.current = new Map(parsed.map(t => [t.id, (t.attachments || []).length]));
    } catch (e) {}
  }

  function checkDeadlines(taskList) {
    const me = identityRef.current;
    const allowNotif = notifPrefsRef.current.browser && browserPermRef.current === 'granted';
    if (!allowNotif || !me) return;

    const today = new Date(); today.setHours(0,0,0,0);
    taskList.forEach(t => {
      if (!t.dueDate || t.status === 'done') return;
      if (t.assignee !== me) return;
      if (notifiedDeadlinesRef.current.has(t.id)) return;

      const due = new Date(t.dueDate + 'T00:00:00');
      const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));

      if (diff < 0) {
        fireNotification('Task is overdue', { body: t.title, tag: 'deadline-' + t.id });
        notifiedDeadlinesRef.current.add(t.id);
      } else if (diff === 0) {
        fireNotification('Task due today', { body: t.title, tag: 'deadline-' + t.id });
        notifiedDeadlinesRef.current.add(t.id);
      } else if (diff === 1) {
        fireNotification('Task due tomorrow', { body: t.title, tag: 'deadline-' + t.id });
        notifiedDeadlinesRef.current.add(t.id);
      }
    });
  }

  function fireNotification(title, opts) {
    try {
      if (typeof Notification === 'undefined') return;
      new Notification(title, opts);
    } catch (e) {}
  }

  async function manualRefresh() {
    setRefreshing(true);
    await pollOnce();
    setTimeout(() => setRefreshing(false), 400);
  }

  async function saveTasks(next) {
    setTasks(next);
    knownTaskIdsRef.current = new Set(next.map(t => t.id));
    knownUpdatesRef.current = new Map(next.map(t => [t.id, (t.updates || [])[0]?.at]));
    knownAttachmentsRef.current = new Map(next.map(t => [t.id, (t.attachments || []).length]));
    try {
      await window.storage.set('tasks_v1', JSON.stringify(next), true);
    } catch (e) { console.error('Failed to save tasks', e); }
  }

  async function pickIdentity(who) {
    try { await window.storage.set('identity', who); } catch (e) {}
    setIdentity(who);
  }

  async function addTask(e) {
    if (e) e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    const task = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      title,
      description: newDescription.trim(),
      assignee: newAssignee,
      status: 'todo',
      priority: newPriority,
      dueDate: newDueDate || null,
      updates: [],
      attachments: [],
      createdBy: identity,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveTasks([task, ...tasks]);
    setNewTitle(''); setNewDescription(''); setNewDueDate(''); setNewPriority('medium');
  }

  async function cycleStatus(id) {
    const order = ['todo', 'in_progress', 'done'];
    const next = tasks.map(t => {
      if (t.id !== id) return t;
      return { ...t, status: order[(order.indexOf(t.status) + 1) % order.length], updatedAt: new Date().toISOString() };
    });
    await saveTasks(next);
  }

  async function removeTask(id) {
    if (!window.confirm('Delete this task and all its attachments?')) return;
    // Clean up attachment data keys
    const task = tasks.find(t => t.id === id);
    if (task && task.attachments) {
      for (const att of task.attachments) {
        if (att.kind === 'file' && att.dataKey) {
          try { await window.storage.delete(att.dataKey, true); } catch (e) {}
        }
      }
    }
    await saveTasks(tasks.filter(t => t.id !== id));
  }

  function startEdit(t) {
    setEditingId(t.id);
    setEditTitle(t.title);
    setEditDescription(t.description || '');
    setEditAssignee(t.assignee);
    setEditPriority(t.priority || 'medium');
    setEditDueDate(t.dueDate || '');
  }

  async function saveEdit() {
    const next = tasks.map(t => t.id === editingId ? {
      ...t,
      title: editTitle.trim() || t.title,
      description: editDescription.trim(),
      assignee: editAssignee,
      priority: editPriority,
      dueDate: editDueDate || null,
      updatedAt: new Date().toISOString(),
    } : t);
    await saveTasks(next);
    setEditingId(null);
  }

  function startUpdate(id) { setUpdateForId(id); setUpdateText(''); }

  async function postUpdate(id) {
    const text = updateText.trim();
    if (!text) { setUpdateForId(null); return; }
    const update = { text, by: identity, at: new Date().toISOString() };
    const next = tasks.map(t => t.id === id ? {
      ...t,
      updates: [update, ...(t.updates || [])],
      updatedAt: new Date().toISOString(),
    } : t);
    await saveTasks(next);
    setUpdateForId(null); setUpdateText('');
  }

  // === Attachments ===

  function startAttach(taskId) {
    setAttachForId(taskId);
    setAttachTab('file');
    setLinkUrl(''); setLinkLabel(''); setAttachError('');
  }

  function cancelAttach() {
    setAttachForId(null);
    setLinkUrl(''); setLinkLabel(''); setAttachError('');
  }

  async function attachFile(taskId, file) {
    setAttachError('');
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setAttachError(`File is ${formatBytes(file.size)} — limit is ${formatBytes(MAX_FILE_BYTES)}. Try a link instead.`);
      return;
    }
    setAttachUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const attId = 'att_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      const dataKey = 'att_data:' + attId;
      // Store file data in its own shared key
      await window.storage.set(dataKey, base64, true);
      const att = {
        id: attId,
        kind: 'file',
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        dataKey,
        addedBy: identity,
        addedAt: new Date().toISOString(),
      };
      const next = tasks.map(t => t.id === taskId ? {
        ...t,
        attachments: [...(t.attachments || []), att],
        updatedAt: new Date().toISOString(),
      } : t);
      await saveTasks(next);
      cancelAttach();
    } catch (e) {
      console.error(e);
      setAttachError('Could not save the file. It may be too large or storage may be full.');
    } finally {
      setAttachUploading(false);
    }
  }

  async function attachLink(taskId) {
    setAttachError('');
    let url = linkUrl.trim();
    if (!url) { setAttachError('Paste a URL first.'); return; }
    // Friendly prepend
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { new URL(url); } catch (e) { setAttachError('That doesn\'t look like a valid URL.'); return; }

    const att = {
      id: 'att_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      kind: 'link',
      name: linkLabel.trim() || getHost(url),
      url,
      addedBy: identity,
      addedAt: new Date().toISOString(),
    };
    const next = tasks.map(t => t.id === taskId ? {
      ...t,
      attachments: [...(t.attachments || []), att],
      updatedAt: new Date().toISOString(),
    } : t);
    await saveTasks(next);
    cancelAttach();
  }

  async function downloadAttachment(att) {
    if (att.kind === 'link') {
      window.open(att.url, '_blank', 'noopener,noreferrer');
      return;
    }
    setDownloadingId(att.id);
    try {
      const r = await window.storage.get(att.dataKey, true);
      if (r?.value) {
        triggerDownload(att.name, att.mimeType, r.value);
      } else {
        alert('Could not load this file. It may have been removed.');
      }
    } catch (e) {
      alert('Could not load this file. It may have been removed.');
    } finally {
      setDownloadingId(null);
    }
  }

  async function removeAttachment(taskId, attId) {
    if (!window.confirm('Remove this attachment?')) return;
    const task = tasks.find(t => t.id === taskId);
    const att = task?.attachments?.find(a => a.id === attId);
    if (att?.kind === 'file' && att.dataKey) {
      try { await window.storage.delete(att.dataKey, true); } catch (e) {}
    }
    const next = tasks.map(t => t.id === taskId ? {
      ...t,
      attachments: (t.attachments || []).filter(a => a.id !== attId),
      updatedAt: new Date().toISOString(),
    } : t);
    await saveTasks(next);
  }

  async function enableBrowserNotifs() {
    if (typeof Notification === 'undefined') {
      alert('Browser notifications are not supported in this environment.');
      return;
    }
    let perm = Notification.permission;
    if (perm === 'default') {
      try { perm = await Notification.requestPermission(); }
      catch (e) { perm = Notification.permission; }
    }
    setBrowserPerm(perm);
    if (perm === 'granted') {
      const next = { ...notifPrefs, browser: true };
      setNotifPrefs(next);
      try { await window.storage.set('notifPrefs_v1', JSON.stringify(next)); } catch (e) {}
      fireNotification('Notifications enabled', {
        body: 'You\'ll be notified about new tasks, updates, attachments, and approaching deadlines.',
      });
    }
  }

  async function disableBrowserNotifs() {
    const next = { ...notifPrefs, browser: false };
    setNotifPrefs(next);
    try { await window.storage.set('notifPrefs_v1', JSON.stringify(next)); } catch (e) {}
  }

  async function dismissWhatsNew() {
    const now = new Date().toISOString();
    setLastSeen(now);
    try { await window.storage.set('lastSeen_v1', now); } catch (e) {}
  }

  async function dismissAttention() {
    setAttentionDismissed(true);
    try { await window.storage.set('attentionDismissedDate', new Date().toISOString().slice(0, 10)); } catch (e) {}
  }

  async function toggleHideCompleted() {
    const next = !hideCompleted;
    setHideCompleted(next);
    try { await window.storage.set('hideCompleted_v1', next ? '1' : '0'); } catch (e) {}
  }

  if (!loading && !identity) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="ta-root">
          <div className="ta-gate">
            <h1>Welcome to <em>Tasks</em></h1>
            <p>A shared list between Anna and Rachel. Which one are you?</p>
            <div className="ta-gate-choices">
              {PEOPLE.map(p => (
                <button key={p} className="ta-gate-btn" onClick={() => pickIdentity(p)}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="ta-root"><div className="ta-loading">Loading…</div></div>
      </>
    );
  }

  const otherPerson = identity === 'Anna' ? 'Rachel' : 'Anna';

  const whatsNew = (() => {
    if (!lastSeen) return null;
    const sinceTime = new Date(lastSeen).getTime();
    const newTasksFromOther = tasks.filter(t => t.createdBy !== identity && new Date(t.createdAt).getTime() > sinceTime);
    const newUpdatesFromOther = tasks.filter(t =>
      (t.updates || []).some(u => u.by !== identity && new Date(u.at).getTime() > sinceTime)
    );
    const newAttachmentsFromOther = tasks.flatMap(t => (t.attachments || []).filter(a => a.addedBy !== identity && new Date(a.addedAt).getTime() > sinceTime));
    if (newTasksFromOther.length === 0 && newUpdatesFromOther.length === 0 && newAttachmentsFromOther.length === 0) return null;
    return { newTasks: newTasksFromOther, newUpdates: newUpdatesFromOther, newAttachments: newAttachmentsFromOther };
  })();

  const today = new Date(); today.setHours(0,0,0,0);
  const myActive = tasks.filter(t => t.assignee === identity && t.status !== 'done' && t.dueDate);
  const overdueList = myActive.filter(t => new Date(t.dueDate + 'T00:00:00') < today);
  const dueTodayList = myActive.filter(t => new Date(t.dueDate + 'T00:00:00').getTime() === today.getTime());
  const showAttention = !attentionDismissed && (overdueList.length > 0 || dueTodayList.length > 0);

  const filtered = tasks.filter(t => {
    if (hideCompleted && t.status === 'done') return false;
    if (filter === 'all') return true;
    if (filter === 'mine') return t.assignee === identity;
    if (filter === 'theirs') return t.assignee !== identity;
    return true;
  });

  const hiddenDoneCount = hideCompleted ? tasks.filter(t => {
    if (t.status !== 'done') return false;
    if (filter === 'mine') return t.assignee === identity;
    if (filter === 'theirs') return t.assignee !== identity;
    return true;
  }).length : 0;

  function sortKey(t) {
    const due = t.dueDate ? new Date(t.dueDate + 'T00:00:00').getTime() : Infinity;
    return [due, PRIORITY_RANK[t.priority || 'medium'], -new Date(t.createdAt).getTime()];
  }
  function cmp(a, b) {
    const ka = sortKey(a), kb = sortKey(b);
    for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) return ka[i] - kb[i];
    return 0;
  }

  const grouped = STATUSES.map(s => ({
    ...s,
    items: filtered.filter(t => t.status === s.id).sort(cmp),
  }));

  function isNewSinceLastVisit(task) {
    if (!lastSeen) return false;
    const since = new Date(lastSeen).getTime();
    if (task.createdBy !== identity && new Date(task.createdAt).getTime() > since) return true;
    if ((task.updates || []).some(u => u.by !== identity && new Date(u.at).getTime() > since)) return true;
    if ((task.attachments || []).some(a => a.addedBy !== identity && new Date(a.addedAt).getTime() > since)) return true;
    return false;
  }

  function whatsNewHeadline() {
    const parts = [];
    if (whatsNew.newTasks.length > 0) parts.push(`${whatsNew.newTasks.length} new task${whatsNew.newTasks.length > 1 ? 's' : ''}`);
    if (whatsNew.newUpdates.length > 0) parts.push(`${whatsNew.newUpdates.length} update${whatsNew.newUpdates.length > 1 ? 's' : ''}`);
    if (whatsNew.newAttachments.length > 0) parts.push(`${whatsNew.newAttachments.length} attachment${whatsNew.newAttachments.length > 1 ? 's' : ''}`);
    return `${otherPerson}: ${parts.join(' · ')}`;
  }

  function attentionHeadline() {
    const parts = [];
    if (overdueList.length > 0) parts.push(`${overdueList.length} overdue`);
    if (dueTodayList.length > 0) parts.push(`${dueTodayList.length} due today`);
    return parts.join(' · ');
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="ta-root">
        <div className="ta-wrap">

          <header className="ta-head">
            <div>
              <div className="ta-brand">Tasks<em>.</em></div>
              <div className="ta-sub">Anna · Rachel · shared list</div>
            </div>
            <div className="ta-id">
              <span className="ta-id-label">You are</span>
              <div className="ta-id-toggle">
                {PEOPLE.map(p => (
                  <button key={p} className={identity === p ? 'active' : ''} onClick={() => pickIdentity(p)}>{p}</button>
                ))}
              </div>
            </div>
          </header>

          {(showAttention || whatsNew) && (
            <div className="ta-banners-wrap">
              {showAttention && (
                <div className="ta-banner attention">
                  <div className="ta-banner-icon">!</div>
                  <div className="ta-banner-body">
                    <div className="ta-banner-headline">{attentionHeadline()} on your list</div>
                    <div className="ta-banner-meta">Needs attention</div>
                  </div>
                  <button className="ta-banner-dismiss" onClick={dismissAttention}>Dismiss</button>
                </div>
              )}
              {whatsNew && (
                <div className="ta-banner whatsnew">
                  <div className="ta-banner-icon">i</div>
                  <div className="ta-banner-body">
                    <div className="ta-banner-headline">{whatsNewHeadline()}</div>
                    <div className="ta-banner-meta">Since your last visit · {timeAgo(lastSeen)}</div>
                  </div>
                  <button className="ta-banner-dismiss" onClick={dismissWhatsNew}>Mark seen</button>
                </div>
              )}
            </div>
          )}

          {showSettings && (
            <div className="ta-settings">
              <div className="ta-settings-title">Notifications</div>
              <div className="ta-settings-row">
                <div className="ta-settings-info">
                  <div className="ta-settings-name">Browser notifications</div>
                  <div className="ta-settings-desc">
                    Pop-up alerts when {otherPerson} adds a task, posts an update, attaches a file, or when a deadline of yours is approaching.
                  </div>
                  <div className={`ta-settings-status ${
                    browserPerm === 'granted' && notifPrefs.browser ? 'ta-status-on'
                    : browserPerm === 'denied' ? 'ta-status-denied'
                    : 'ta-status-off'
                  }`}>
                    {browserPerm === 'unsupported' ? 'Not supported in this browser'
                      : browserPerm === 'denied' ? 'Blocked — enable in browser site settings'
                      : browserPerm === 'granted' && notifPrefs.browser ? 'On — tab must be open'
                      : 'Off'}
                  </div>
                </div>
                {browserPerm === 'granted' && notifPrefs.browser ? (
                  <button className="ta-settings-btn muted" onClick={disableBrowserNotifs}>Turn off</button>
                ) : (
                  <button
                    className="ta-settings-btn"
                    onClick={enableBrowserNotifs}
                    disabled={browserPerm === 'denied' || browserPerm === 'unsupported'}
                    style={browserPerm === 'denied' || browserPerm === 'unsupported' ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                  >Turn on</button>
                )}
              </div>
              <div className="ta-settings-row">
                <div className="ta-settings-info">
                  <div className="ta-settings-name">In-app banners</div>
                  <div className="ta-settings-desc">
                    The "what's new" and "needs attention" banners at the top of the list are always on — they're what you see when you reopen the app.
                  </div>
                </div>
                <div className="ta-settings-status ta-status-on">Always on</div>
              </div>
            </div>
          )}

          <form className="ta-add" onSubmit={addTask}>
            <div className="ta-add-title">Add a task</div>
            <input
              className="ta-input"
              placeholder="What needs doing?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
            <textarea
              className="ta-textarea"
              placeholder="Short description (optional)…"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              rows={1}
              onInput={e => { e.target.style.height='auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
            />
            <div className="ta-add-meta">
              <div className="ta-meta-group">
                <span className="ta-meta-label">Assign</span>
                <div className="ta-pill-group">
                  {PEOPLE.map(p => (
                    <button type="button" key={p}
                      className={'ta-pill ' + (newAssignee === p ? 'active' : '')}
                      onClick={() => setNewAssignee(p)}
                    >{p}</button>
                  ))}
                </div>
              </div>
              <div className="ta-meta-group">
                <span className="ta-meta-label">Priority</span>
                <div className="ta-pill-group">
                  {PRIORITIES.map(p => (
                    <button type="button" key={p.id}
                      className={`ta-pill priority-${p.id} ${newPriority === p.id ? 'active' : ''}`}
                      onClick={() => setNewPriority(p.id)}
                    >{p.label}</button>
                  ))}
                </div>
              </div>
              <div className="ta-meta-group">
                <span className="ta-meta-label">Due</span>
                <input type="date" className="ta-date-input"
                  value={newDueDate}
                  onChange={e => setNewDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="ta-add-actions">
              <button type="submit" className="ta-add-btn" disabled={!newTitle.trim()}>Add task</button>
            </div>
          </form>

          <div className="ta-filter">
            <div className="ta-filter-group">
              {[
                { id: 'all',    label: `All (${tasks.filter(t => !hideCompleted || t.status !== 'done').length})` },
                { id: 'mine',   label: `Mine (${tasks.filter(t => t.assignee === identity && (!hideCompleted || t.status !== 'done')).length})` },
                { id: 'theirs', label: `${otherPerson}'s (${tasks.filter(t => t.assignee === otherPerson && (!hideCompleted || t.status !== 'done')).length})` },
              ].map(f => (
                <button key={f.id}
                  className={'ta-filter-btn ' + (filter === f.id ? 'active' : '')}
                  onClick={() => setFilter(f.id)}
                >{f.label}</button>
              ))}
            </div>
            <div className="ta-tools">
              <button
                className={'ta-tool-btn ' + (hideCompleted ? 'active' : '')}
                onClick={toggleHideCompleted}
              >{hideCompleted && hiddenDoneCount > 0 ? `${hiddenDoneCount} done · hidden` : 'Hide done'}</button>
              <button
                className={'ta-tool-btn ' + (viewMode === 'matrix' ? 'active' : '')}
                onClick={() => setViewMode(v => v === 'list' ? 'matrix' : 'list')}
              >{viewMode === 'list' ? 'Matrix' : 'List'}</button>
              <button
                className={'ta-tool-btn ' + (showSettings ? 'active' : '')}
                onClick={() => setShowSettings(!showSettings)}
              >
                Notifications {notifPrefs.browser && browserPerm === 'granted' ? '· on' : '· off'}
              </button>
              <button
                className={'ta-tool-btn ' + (refreshing ? 'spinning' : '')}
                onClick={manualRefresh} disabled={refreshing}
              >↻ Sync</button>
            </div>
          </div>

          {tasks.length === 0 && (
            <div className="ta-empty">No tasks yet — add the first one above.</div>
          )}
          {tasks.length > 0 && filtered.length === 0 && (
            <div className="ta-empty">Nothing matches this filter.</div>
          )}

          {viewMode === 'matrix' && filtered.length > 0 && (() => {
            const active = filtered.filter(t => t.status !== 'done');
            const QUADRANTS = [
              { id: 'do',       label: 'Do',       desc: 'Urgent · Important',           tasks: [] },
              { id: 'schedule', label: 'Schedule',  desc: 'Not urgent · Important',       tasks: [] },
              { id: 'delegate', label: 'Delegate',  desc: 'Urgent · Not important',       tasks: [] },
              { id: 'eliminate',label: 'Eliminate', desc: 'Not urgent · Not important',   tasks: [] },
            ];
            active.forEach(t => {
              const due = t.dueDate ? fmtDue(t.dueDate) : null;
              const urgent = !!(due && (due.status === 'overdue' || due.diffDays <= 3));
              const important = t.priority === 'high';
              if (urgent && important)   QUADRANTS[0].tasks.push(t);
              else if (!urgent && important) QUADRANTS[1].tasks.push(t);
              else if (urgent && !important) QUADRANTS[2].tasks.push(t);
              else                           QUADRANTS[3].tasks.push(t);
            });
            return (
              <div className="ta-matrix">
                {QUADRANTS.map(q => (
                  <div key={q.id} className={`ta-quadrant ta-quadrant-${q.id}`}>
                    <div className="ta-quadrant-head">
                      <span className="ta-quadrant-title">{q.label}</span>
                      <span className="ta-quadrant-count">{q.tasks.length}</span>
                    </div>
                    <div className="ta-quadrant-desc">{q.desc}</div>
                    {q.tasks.length === 0 ? (
                      <div className="ta-quadrant-empty">Nothing here</div>
                    ) : q.tasks.sort(cmp).map(task => {
                      const due = fmtDue(task.dueDate);
                      return (
                        <div key={task.id} className="ta-matrix-item">
                          <button
                            className={'ta-status-dot ' + task.status}
                            onClick={() => cycleStatus(task.id)}
                            aria-label="Cycle status"
                          />
                          <span className="ta-matrix-title">{task.title}</span>
                          <span className="ta-matrix-meta">
                            {task.assignee !== identity && <span className="who other">{task.assignee}</span>}
                            {due && <span className={'ta-due ' + due.status}>{due.label}</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}

          {viewMode === 'list' && grouped.map(group => group.items.length > 0 && (
            <section className="ta-group" key={group.id}>
              <div className="ta-group-head">
                <h2 className="ta-group-title">{group.label}</h2>
                <span className="ta-group-count">{group.items.length}</span>
                <div className="ta-group-line" />
              </div>

              {group.items.map(task => {
                const due = fmtDue(task.dueDate);
                const isOverdue = due && due.status === 'overdue' && task.status !== 'done';
                const isNew = isNewSinceLastVisit(task);
                const attachments = task.attachments || [];
                return (
                  <article
                    key={task.id}
                    className={'ta-card ' + (task.status === 'done' ? 'done ' : '') + (isOverdue ? 'overdue ' : '') + (isNew ? 'is-new' : '')}
                  >
                    {editingId === task.id ? (
                      <div className="ta-edit-row">
                        <input className="ta-edit-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title" />
                        <textarea className="ta-edit-input" value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="Description" rows={2} />
                        <div className="ta-edit-meta">
                          <div className="ta-meta-group">
                            <span className="ta-meta-label">Assign</span>
                            <div className="ta-pill-group">
                              {PEOPLE.map(p => (
                                <button type="button" key={p} className={'ta-pill ' + (editAssignee === p ? 'active' : '')} onClick={() => setEditAssignee(p)}>{p}</button>
                              ))}
                            </div>
                          </div>
                          <div className="ta-meta-group">
                            <span className="ta-meta-label">Priority</span>
                            <div className="ta-pill-group">
                              {PRIORITIES.map(p => (
                                <button type="button" key={p.id} className={`ta-pill priority-${p.id} ${editPriority === p.id ? 'active' : ''}`} onClick={() => setEditPriority(p.id)}>{p.label}</button>
                              ))}
                            </div>
                          </div>
                          <div className="ta-meta-group">
                            <span className="ta-meta-label">Due</span>
                            <input type="date" className="ta-date-input" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} />
                          </div>
                        </div>
                        <div className="ta-edit-actions">
                          <button className="ta-add-btn" onClick={saveEdit}>Save</button>
                          <button className="ta-icon-btn" onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="ta-card-top">
                        <button
                          className={'ta-status-dot ' + task.status}
                          title="Click to cycle status"
                          onClick={() => cycleStatus(task.id)}
                          aria-label="Cycle status"
                        />
                        <div className="ta-card-body">
                          <div className="ta-card-headline">
                            <div className="ta-card-title">{task.title}</div>
                            <div className="ta-card-badges">
                              {isNew && <span className="ta-new-badge">New</span>}
                              <span className={'ta-prio ' + (task.priority || 'medium')}>
                                {(task.priority || 'medium')}
                              </span>
                              {due && <span className={'ta-due ' + due.status}>{due.label}</span>}
                            </div>
                          </div>

                          {(task.updates || []).length > 0 && (() => {
                            const updates = task.updates;
                            const isExpanded = expandedUpdates.has(task.id);
                            return (
                              <div className="ta-updates">
                                <div className="ta-update">
                                  <div className="ta-update-text">"{updates[0].text}"</div>
                                  <div className="ta-update-meta">Latest · {updates[0].by} · {fmtDate(updates[0].at)}</div>
                                </div>
                                {updates.length > 1 && !isExpanded && (
                                  <button className="ta-updates-toggle" onClick={() => setExpandedUpdates(prev => new Set([...prev, task.id]))}>
                                    +{updates.length - 1} older update{updates.length > 2 ? 's' : ''}
                                  </button>
                                )}
                                {updates.length > 1 && isExpanded && updates.slice(1).map(u => (
                                  <div key={u.at} className="ta-update older">
                                    <div className="ta-update-text">"{u.text}"</div>
                                    <div className="ta-update-meta">{u.by} · {fmtDate(u.at)}</div>
                                  </div>
                                ))}
                                {isExpanded && (
                                  <button className="ta-updates-toggle" onClick={() => setExpandedUpdates(prev => { const n = new Set(prev); n.delete(task.id); return n; })}>
                                    Hide history
                                  </button>
                                )}
                              </div>
                            );
                          })()}

                          {task.description && (
                            <div className="ta-card-desc">{task.description}</div>
                          )}

                          {attachments.length > 0 && (
                            <div className="ta-attachments">
                              {attachments.map(att => (
                                <div className="ta-attachment" key={att.id}>
                                  <div className="ta-attachment-icon">
                                    {att.kind === 'file' ? <FileIcon /> : <LinkIcon />}
                                  </div>
                                  <div className="ta-attachment-info">
                                    <div className="ta-attachment-name">{att.name}</div>
                                    <div className="ta-attachment-meta">
                                      {att.kind === 'file'
                                        ? `${formatBytes(att.size)} · ${att.addedBy}`
                                        : `${getHost(att.url)} · ${att.addedBy}`}
                                      {' · '}{timeAgo(att.addedAt)}
                                    </div>
                                  </div>
                                  <div className="ta-attachment-actions">
                                    <button
                                      className="ta-attachment-btn"
                                      onClick={() => downloadAttachment(att)}
                                      disabled={downloadingId === att.id}
                                    >{att.kind === 'file' ? (downloadingId === att.id ? '…' : 'Download') : 'Open'}</button>
                                    <button
                                      className="ta-attachment-btn danger"
                                      onClick={() => removeAttachment(task.id, att.id)}
                                      aria-label="Remove"
                                    >×</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="ta-card-meta">
                            <span className={'who ' + (task.assignee !== identity ? 'other' : '')}>
                              → {task.assignee}
                            </span>
                            <span>by {task.createdBy} · {fmtDate(task.createdAt)}</span>
                            <div className="ta-card-actions">
                              <button className="ta-icon-btn primary" onClick={() => startAttach(task.id)}>Attach</button>
                              <button className="ta-icon-btn primary" onClick={() => startUpdate(task.id)}>Post update</button>
                              <button className="ta-icon-btn" onClick={() => startEdit(task)}>Edit</button>
                              <button className="ta-icon-btn danger" onClick={() => removeTask(task.id)}>Delete</button>
                            </div>
                          </div>

                          {attachForId === task.id && (
                            <div className="ta-attach-picker">
                              <div className="ta-attach-tabs">
                                <button
                                  className={'ta-attach-tab ' + (attachTab === 'file' ? 'active' : '')}
                                  onClick={() => { setAttachTab('file'); setAttachError(''); }}
                                >Upload file</button>
                                <button
                                  className={'ta-attach-tab ' + (attachTab === 'link' ? 'active' : '')}
                                  onClick={() => { setAttachTab('link'); setAttachError(''); }}
                                >Add link</button>
                                <div style={{ flex: 1 }} />
                                <button className="ta-attach-tab" onClick={cancelAttach}>Cancel</button>
                              </div>
                              {attachTab === 'file' ? (
                                <>
                                  <div className="ta-attach-row">
                                    <label className="ta-file-label">
                                      <input
                                        type="file"
                                        onChange={e => {
                                          const f = e.target.files?.[0];
                                          if (f) attachFile(task.id, f);
                                          e.target.value = '';
                                        }}
                                        disabled={attachUploading}
                                      />
                                      {attachUploading ? 'Uploading…' : 'Choose a file…'}
                                    </label>
                                  </div>
                                  <div className="ta-attach-hint">
                                    Max {formatBytes(MAX_FILE_BYTES)} per file. Stored shared — visible to both of you.
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="ta-attach-row">
                                    <input
                                      className="ta-attach-input"
                                      placeholder="https://… (Drive, SharePoint, anywhere)"
                                      value={linkUrl}
                                      onChange={e => setLinkUrl(e.target.value)}
                                      onKeyDown={e => { if (e.key === 'Enter') attachLink(task.id); }}
                                      autoFocus
                                    />
                                  </div>
                                  <div className="ta-attach-row" style={{ marginTop: '0.4rem' }}>
                                    <input
                                      className="ta-attach-input"
                                      placeholder="Label (optional, e.g. 'Q3 briefing')"
                                      value={linkLabel}
                                      onChange={e => setLinkLabel(e.target.value)}
                                      onKeyDown={e => { if (e.key === 'Enter') attachLink(task.id); }}
                                    />
                                    <button className="ta-attach-submit" onClick={() => attachLink(task.id)}>Add</button>
                                  </div>
                                  <div className="ta-attach-hint">Opens in a new tab when clicked.</div>
                                </>
                              )}
                              {attachError && <div className="ta-attach-error">{attachError}</div>}
                            </div>
                          )}

                          {updateForId === task.id && (
                            <div className="ta-update-entry">
                              <input
                                className="ta-update-input"
                                placeholder="What's the latest? (e.g. Draft sent, awaiting review)"
                                value={updateText}
                                onChange={e => setUpdateText(e.target.value)}
                                autoFocus
                                onKeyDown={e => {
                                  if (e.key === 'Enter') postUpdate(task.id);
                                  if (e.key === 'Escape') { setUpdateForId(null); setUpdateText(''); }
                                }}
                              />
                              <button className="ta-update-submit" onClick={() => postUpdate(task.id)}>Post</button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </section>
          ))}

          <div className="ta-footnote">
            Tasks, attachments, and updates are stored across sessions and shared with anyone using this artifact. Browser notifications only fire while a tab is open.
          </div>

        </div>
      </div>
    </>
  );
}
