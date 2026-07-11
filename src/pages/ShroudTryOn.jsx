import { useState } from 'react'
import './ShroudTryOn.css'

const shroudStyles = [
  {
    id: 'tang',
    name: '传统唐装',
    desc: '经典立领盘扣，庄重典雅',
    color: '#8b2500',
    accentColor: '#c4a265',
    neckline: 'stand',
    pattern: 'traditional',
    icon: '🏮'
  },
  {
    id: 'modern',
    name: '现代简约',
    desc: '线条流畅，素雅大方',
    color: '#3d3226',
    accentColor: '#8b7355',
    neckline: 'round',
    pattern: 'plain',
    icon: '✨'
  },
  {
    id: 'elegant',
    name: '素雅中山',
    desc: '中山装改良款，儒雅端庄',
    color: '#2c3e50',
    accentColor: '#95a5a6',
    neckline: 'stand',
    pattern: 'plain',
    icon: '📚'
  },
  {
    id: 'warm',
    name: '暖色调和',
    desc: '温暖大地色系，柔和亲切',
    color: '#a0522d',
    accentColor: '#deb887',
    neckline: 'v',
    pattern: 'warm',
    icon: '🍂'
  },
]

export default function ShroudTryOn() {
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)
  const [shoulder, setShoulder] = useState(44)
  const [gender, setGender] = useState('male')
  const [selectedStyle, setSelectedStyle] = useState(shroudStyles[0])
  const [customColor, setCustomColor] = useState(shroudStyles[0].color)
  const [showCustomPanel, setShowCustomPanel] = useState(false)
  const [customPattern, setCustomPattern] = useState('')
  const [step, setStep] = useState(1)

  const legLength = Math.min(Math.max(60 + (height - 160) * 0.6, 50), 80)
  const shoulderWidth = Math.min(Math.max(30 + (shoulder - 38) * 2, 28), 50)

  const nextStep = () => setStep(2)
  const prevStep = () => setStep(1)

  const handleDemoSubmit = () => {
    alert('试穿效果预览完成！\n\n您的定制寿衣「' + selectedStyle.name + (customPattern ? ' - ' + customPattern : '') + '」效果已生成。\n\n（此为Demo演示，实际版本将支持3D数字人试穿）')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>寿衣虚拟试穿</h1>
        <p>输入身型参数，预览穿着效果，找到最合适的那一件</p>
        <span className="demo-badge">概念Demo</span>
      </div>

      <div className="container shroud-layout">
        <div className="shroud-preview">
          <div className="mirror-frame">
            <div className="mirror-inner">
              <svg viewBox="0 0 200 400" className="body-svg">
                <ellipse cx="100" cy="48" rx="20" ry="24" fill="#f0dcc8" />
                <rect
                  x={100 - shoulderWidth / 2}
                  y="68"
                  width={shoulderWidth}
                  height={legLength}
                  rx="6"
                  fill={showCustomPanel ? customColor : selectedStyle.color}
                />
                {selectedStyle.neckline === 'stand' && (
                  <rect x="88" y="64" width="24" height="8" rx="2" fill={showCustomPanel ? customColor : selectedStyle.accentColor} opacity="0.7" />
                )}
                {selectedStyle.neckline === 'v' && (
                  <polygon points="100,68 92,78 108,78" fill="rgba(240,220,200,0.6)" />
                )}
                {selectedStyle.neckline === 'round' && (
                  <ellipse cx="100" cy="72" rx="10" ry="5" fill="rgba(240,220,200,0.5)" />
                )}
                {selectedStyle.pattern === 'traditional' && (
                  <>
                    <line x1="90" y1="90" x2="110" y2="90" stroke={selectedStyle.accentColor} strokeWidth="1" opacity="0.5" />
                    <line x1="90" y1="100" x2="110" y2="100" stroke={selectedStyle.accentColor} strokeWidth="1" opacity="0.5" />
                    <circle cx="100" cy="120" r="8" fill="none" stroke={selectedStyle.accentColor} strokeWidth="1" opacity="0.4" />
                  </>
                )}
                {selectedStyle.pattern === 'warm' && (
                  <>
                    <line x1="94" y1="85" x2="106" y2="85" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                    <line x1="94" y1="95" x2="106" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  </>
                )}
                <rect x="94" y="65" width="4" height={legLength - 5} rx="1" fill="rgba(0,0,0,0.1)" />
                <line x1="75" y1={68 + legLength} x2="125" y2={68 + legLength} stroke={showCustomPanel ? customColor : selectedStyle.color} strokeWidth="2" />
                <line x1="92" y1={68 + legLength} x2="88" y2={68 + legLength + 50} stroke="#f0dcc8" strokeWidth="12" strokeLinecap="round" />
                <line x1="108" y1={68 + legLength} x2="112" y2={68 + legLength + 50} stroke="#f0dcc8" strokeWidth="12" strokeLinecap="round" />
                <line x1="80" y1="78" x2="60" y2={68 + legLength * 0.5} stroke="#f0dcc8" strokeWidth="10" strokeLinecap="round" />
                <line x1="120" y1="78" x2="140" y2={68 + legLength * 0.5} stroke="#f0dcc8" strokeWidth="10" strokeLinecap="round" />
                <ellipse cx="100" cy="48" rx="20" ry="24" fill="#f0dcc8" opacity="0.85" />
                {gender === 'female' && (
                  <path d="M80,28 Q90,18 100,28 Q110,18 120,28" fill="none" stroke="#8b7355" strokeWidth="1.5" />
                )}
                <circle cx="92" cy="43" r="2.5" fill="#3d3226" />
                <circle cx="108" cy="43" r="2.5" fill="#3d3226" />
                <path d="M95,52 Q100,55 105,52" fill="none" stroke="#c4956a" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="mirror-label">
              <span className="style-name">{selectedStyle.name}</span>
              {customPattern && <span className="custom-label">定制：{customPattern}</span>}
            </div>
          </div>
        </div>

        <div className="shroud-panel">
          {step === 1 ? (
            <div className="setup-form">
              <div className="panel-section">
                <h3>基本信息</h3>
                <div className="gender-toggle">
                  <button
                    className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                    onClick={() => setGender('male')}
                  >♂ 男性</button>
                  <button
                    className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                    onClick={() => setGender('female')}
                  >♀ 女性</button>
                </div>
              </div>

              <div className="panel-section">
                <h3>身高（cm）</h3>
                <div className="param-slider">
                  <input type="range" min="140" max="200" value={height} onChange={e => setHeight(Number(e.target.value))} />
                  <span className="param-value">{height} cm</span>
                </div>
              </div>

              <div className="panel-section">
                <h3>体重（kg）</h3>
                <div className="param-slider">
                  <input type="range" min="35" max="120" value={weight} onChange={e => setWeight(Number(e.target.value))} />
                  <span className="param-value">{weight} kg</span>
                </div>
              </div>

              <div className="panel-section">
                <h3>肩宽（cm）</h3>
                <div className="param-slider">
                  <input type="range" min="30" max="55" value={shoulder} onChange={e => setShoulder(Number(e.target.value))} />
                  <span className="param-value">{shoulder} cm</span>
                </div>
              </div>

              <button className="btn-primary full-width" onClick={nextStep}>
                生成虚拟人像 →
              </button>
            </div>
          ) : (
            <div className="style-panel">
              <button className="back-btn" onClick={prevStep}>← 返回修改参数</button>

              <div className="panel-section">
                <h3>选择寿衣款式</h3>
                <div className="style-grid">
                  {shroudStyles.map(style => (
                    <button
                      key={style.id}
                      className={`style-card ${selectedStyle.id === style.id && !showCustomPanel ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedStyle(style)
                        setCustomColor(style.color)
                        setShowCustomPanel(false)
                      }}
                    >
                      <span className="style-icon">{style.icon}</span>
                      <span className="style-name-sm">{style.name}</span>
                      <span className="style-desc-sm">{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel-section">
                <button
                  className="custom-toggle"
                  onClick={() => setShowCustomPanel(!showCustomPanel)}
                >
                  {showCustomPanel ? '← 返回预设款式' : '🎨 自定义DIY配色'}
                </button>
              </div>

              {showCustomPanel && (
                <div className="panel-section custom-section">
                  <h3>自定义颜色</h3>
                  <div className="custom-colors">
                    {['#8b2500', '#3d3226', '#2c3e50', '#a0522d', '#4a6741', '#6b3a6b', '#2a4a6b', '#5c4033', '#1a1a2e', '#800020'].map(c => (
                      <button
                        key={c}
                        className={`color-dot ${customColor === c ? 'active' : ''}`}
                        style={{ background: c }}
                        onClick={() => setCustomColor(c)}
                      />
                    ))}
                  </div>
                  <h3>自定义图案（文字描述）</h3>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="如：梅花刺绣、祥云纹样..."
                    value={customPattern}
                    onChange={e => setCustomPattern(e.target.value)}
                  />
                </div>
              )}

              <button className="btn-primary full-width" onClick={handleDemoSubmit}>
                确认试穿效果
              </button>
              <p className="demo-hint">
                * 当前为概念演示版，完整版将支持3D数字人建模与AR实时试穿
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}