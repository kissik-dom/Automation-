import { Radar, Play, Pause, Globe, Database, AlertTriangle } from 'lucide-react'

const SCANNERS = [
  { id: 1, name: 'Sotheby\'s Land Scraper', target: 'sothebysrealty.com', pages: 76, scraped: 34, properties: 412, status: 'running', speed: '~50 properties/min' },
  { id: 2, name: 'County Assessor Lookup', target: 'Various county APIs', pages: 0, scraped: 0, properties: 0, status: 'ready', speed: '~20 lookups/min' },
  { id: 3, name: 'Public Records Search', target: 'State business registries', pages: 0, scraped: 0, properties: 0, status: 'ready', speed: '~30 records/min' },
  { id: 4, name: 'Private Islands Scraper', target: 'sothebysrealty.com/islands', pages: 12, scraped: 0, properties: 0, status: 'ready', speed: '~10 islands/min' },
  { id: 5, name: 'Vineyard/Winery Scraper', target: 'sothebysrealty.com/wineries', pages: 8, scraped: 0, properties: 0, status: 'ready', speed: '~15 properties/min' },
  { id: 6, name: 'Broker Contact Enricher', target: 'LinkedIn + websites', pages: 0, scraped: 0, properties: 0, status: 'ready', speed: '~100 contacts/min' },
]

export default function Scanners() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Data Scanners</h1>
        <p className="text-gray-500 text-sm mt-1">Web scrapers and data collection agents</p>
      </div>

      <div className="card bg-blue-500/5 border-blue-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-400 font-medium">Scraper Architecture</p>
            <p className="text-gray-400 mt-1">
              Scrapers run as serverless functions with 6 concurrent workers. Data is verified against public records
              before storage. Only for-sale properties (not under contract) are included. Each property requires minimum
              3 photos and verified broker contact info.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {SCANNERS.map(scanner => (
          <div key={scanner.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${scanner.status === 'running' ? 'bg-emerald-500/10' : 'bg-royal-700'}`}>
                  <Radar className={`w-5 h-5 ${scanner.status === 'running' ? 'text-emerald-400 animate-pulse' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{scanner.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {scanner.target}</span>
                    <span>{scanner.speed}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge text-[10px] ${scanner.status === 'running' ? 'badge-green' : 'badge-gold'}`}>{scanner.status}</span>
                <button className={`p-2 rounded-lg ${scanner.status === 'running' ? 'hover:bg-yellow-500/10 text-yellow-400' : 'hover:bg-emerald-500/10 text-emerald-400'}`}>
                  {scanner.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {scanner.pages > 0 && (
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Pages</p>
                  <p className="text-lg font-bold text-white">{scanner.scraped}/{scanner.pages}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Properties Found</p>
                  <p className="text-lg font-bold text-gold-400">{scanner.properties}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Progress</p>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-royal-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 rounded-full" style={{ width: `${scanner.pages > 0 ? (scanner.scraped / scanner.pages) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
