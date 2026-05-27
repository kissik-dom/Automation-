// Central store for all free-tier accounts and services
const STORE_KEY = 'rk-automation-hub'

export const FREE_SERVICES = [
  // Email
  { id: 'brevo-1', service: 'Brevo', category: 'email', email: 'royal@kissikingdom.com', limit: '300/day', used: 45, maxDaily: 300, status: 'active', icon: '📧' },
  { id: 'brevo-2', service: 'Brevo', category: 'email', email: 'legal@kissikingdom.com', limit: '300/day', used: 12, maxDaily: 300, status: 'active', icon: '📧' },
  { id: 'resend-1', service: 'Resend', category: 'email', email: 'royal@kissikingdom.com', limit: '100/day', used: 8, maxDaily: 100, status: 'active', icon: '✉️' },
  { id: 'gmail-1', service: 'Gmail', category: 'email', email: 'kissikingdom.royal@gmail.com', limit: '500/day', used: 0, maxDaily: 500, status: 'active', icon: '📫' },
  { id: 'proton-1', service: 'ProtonMail', category: 'email', email: 'royal@proton.me', limit: '150/day', used: 3, maxDaily: 150, status: 'active', icon: '🔐' },
  // AI
  { id: 'groq-1', service: 'Groq', category: 'ai', email: 'gubbi24@proton.me', limit: '14,400 req/day', used: 230, maxDaily: 14400, status: 'active', icon: '🤖' },
  { id: 'sambanova-1', service: 'SambaNova', category: 'ai', email: 'gubbi24@proton.me', limit: '1000 req/day', used: 12, maxDaily: 1000, status: 'active', icon: '🧠' },
  // Hosting
  { id: 'vercel-1', service: 'Vercel', category: 'hosting', email: 'legal@kissikingdom.com', limit: 'Hobby plan', used: 22, maxDaily: 100, status: 'active', icon: '▲' },
  { id: 'github-1', service: 'GitHub', category: 'hosting', email: 'gubbi24@proton.me', limit: 'Free tier', used: 13, maxDaily: 999, status: 'active', icon: '🐙' },
  // Fax
  { id: 'faxplus-1', service: 'Fax.Plus', category: 'fax', email: 'legal@kissikingdom.com', limit: '10 pages/mo', used: 2, maxDaily: 10, status: 'active', icon: '📠' },
  // Storage
  { id: 'supabase-1', service: 'Supabase', category: 'database', email: 'gubbi24@proton.me', limit: '500MB + 50K rows', used: 0, maxDaily: 999, status: 'inactive', icon: '🗄️' },
  // CDN
  { id: 'cloudflare-1', service: 'Cloudflare', category: 'cdn', email: 'legal@kissikingdom.com', limit: 'Free plan', used: 0, maxDaily: 999, status: 'active', icon: '☁️' },
]

export const CRON_JOBS = [
  { id: 'cron-1', name: 'Email Sequence Processor', schedule: '*/30 * * * *', lastRun: new Date(Date.now() - 1800000).toISOString(), nextRun: new Date(Date.now() + 1800000).toISOString(), status: 'active', app: 'Email Command' },
  { id: 'cron-2', name: 'Gazette Auto-Publisher', schedule: '0 9 * * *', lastRun: new Date(Date.now() - 86400000).toISOString(), nextRun: new Date(Date.now() + 86400000).toISOString(), status: 'active', app: 'Royal Gazette' },
  { id: 'cron-3', name: 'Account Limit Reset', schedule: '0 0 * * *', lastRun: new Date(Date.now() - 43200000).toISOString(), nextRun: new Date(Date.now() + 43200000).toISOString(), status: 'active', app: 'Automation Hub' },
  { id: 'cron-4', name: 'Property Data Scraper', schedule: '0 */6 * * *', lastRun: new Date(Date.now() - 21600000).toISOString(), nextRun: new Date(Date.now() + 21600000).toISOString(), status: 'paused', app: 'Flower AI' },
  { id: 'cron-5', name: 'Security Scan', schedule: '0 3 * * *', lastRun: new Date(Date.now() - 86400000).toISOString(), nextRun: new Date(Date.now() + 86400000).toISOString(), status: 'active', app: 'Hub' },
]

export const KINGDOM_APPS = [
  { id: 'app-1', name: 'Kissi Kingdom', domain: 'kissikingdom.com', status: 'deployed', framework: 'Next.js', icon: '👑' },
  { id: 'app-2', name: 'Centillion Social', domain: 'social.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '💬' },
  { id: 'app-3', name: 'Centillion Stream', domain: 'stream.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '📺' },
  { id: 'app-4', name: 'Centillion Music', domain: 'music.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '🎵' },
  { id: 'app-5', name: 'Centillion Shield', domain: 'shield.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '🛡️' },
  { id: 'app-6', name: 'Centillion OS AI', domain: 'os.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '🤖' },
  { id: 'app-7', name: 'Royal Bank', domain: 'bank.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '🏦' },
  { id: 'app-8', name: 'Civil Registry', domain: 'civil.kissikingdom.com', status: 'deployed', framework: 'Next.js', icon: '📋' },
  { id: 'app-9', name: 'Kissi Gold RE', domain: 'gold.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '🏠' },
  { id: 'app-10', name: 'Kingdom Connection', domain: 'connection.kissikingdom.com', status: 'building', framework: 'Vite', icon: '📹' },
  { id: 'app-11', name: 'Automation Hub', domain: 'update.kckngdm.com', status: 'deployed', framework: 'Vite', icon: '⚡' },
  { id: 'app-12', name: 'Email Command', domain: 'email.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '📧' },
  { id: 'app-13', name: 'Royal Gazette', domain: 'gazette.kissikingdom.com', status: 'deployed', framework: 'Vite', icon: '📜' },
  { id: 'app-14', name: 'Flower AI', domain: 'flower.kissikingdom.com', status: 'building', framework: 'Vite', icon: '🌸' },
]

export function loadStore() {
  try {
    const saved = localStorage.getItem(STORE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return {
    services: FREE_SERVICES,
    crons: CRON_JOBS,
    apps: KINGDOM_APPS,
    logs: [],
  }
}

export function saveStore(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)) } catch {}
}
