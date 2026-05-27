import { Cpu, Cloud, DollarSign, Zap, AlertTriangle } from 'lucide-react'

const GPU_PROVIDERS = [
  { name: 'RunPod', type: 'A100 80GB', hourly: '$1.99/hr', monthly: '$~50-200/mo', status: 'available', use: 'DeepFaceLive + MuseTalk', link: 'runpod.io' },
  { name: 'Vast.ai', type: 'RTX 4090', hourly: '$0.35/hr', monthly: '$~30-100/mo', status: 'available', use: 'AI Avatar rendering', link: 'vast.ai' },
  { name: 'Lambda Cloud', type: 'A10G', hourly: '$0.60/hr', monthly: '$~60-150/mo', status: 'available', use: 'General GPU compute', link: 'lambda.cloud' },
  { name: 'Google Colab', type: 'T4 (free)', hourly: 'Free', monthly: '$0', status: 'active', use: 'Testing & prototyping', link: 'colab.google.com' },
]

export default function GPU() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">GPU Orchestrator</h1>
        <p className="text-gray-500 text-sm mt-1">Manage GPU resources for AI avatar processing and real-time rendering</p>
      </div>

      <div className="card bg-purple-500/5 border-purple-500/20">
        <div className="flex items-start gap-3">
          <Cpu className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-purple-400 font-medium">GPU Required For</p>
            <ul className="text-gray-400 mt-1 space-y-1 list-disc pl-5">
              <li><strong>DeepFaceLive</strong> — Real-time AI face swap for video conferencing</li>
              <li><strong>MuseTalk</strong> — Lip-sync AI for avatar mouth movement</li>
              <li><strong>Gaze Correction</strong> — Eye contact correction for natural appearance</li>
              <li><strong>3D Flyover</strong> — Property visualization from satellite/photo data</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {GPU_PROVIDERS.map(gpu => (
          <div key={gpu.name} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-gold-400" />
                <h3 className="font-semibold text-white">{gpu.name}</h3>
              </div>
              <span className={`badge text-[10px] ${gpu.status === 'active' ? 'badge-green' : 'badge-gold'}`}>{gpu.status}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">GPU Type</span><span className="text-white">{gpu.type}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Hourly Rate</span><span className="text-gold-400">{gpu.hourly}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Est. Monthly</span><span className="text-gray-300">{gpu.monthly}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Use Case</span><span className="text-gray-300">{gpu.use}</span></div>
            </div>
            <button className="btn-outline text-xs w-full mt-4">
              {gpu.status === 'active' ? 'Manage' : 'Provision Instance'}
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-3">Cost Optimization Strategy</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• Use <strong>spot/preemptible instances</strong> for batch processing (50-70% cheaper)</p>
          <p>• <strong>Scale to zero</strong> when not in active video calls — only pay during use</p>
          <p>• Google Colab for <strong>testing and prototyping</strong> (free T4 GPU)</p>
          <p>• Target budget: <strong>$50-200/month</strong> with on-demand scaling</p>
        </div>
      </div>
    </div>
  )
}
