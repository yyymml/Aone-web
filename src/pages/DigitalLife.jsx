import { useState, useEffect, useRef } from 'react'
import './DigitalLife.css'

const petResponses = {
  default: [
    '汪~（摇尾巴）你来看我啦！',
    '喵~ 今天有什么好玩的吗？',
    '蹭蹭你的手 ♥',
    '我好想你呀！',
    '今天天气真好，想出去玩~',
  ],
  happy: [
    '开心地转圈圈！',
    '汪汪汪！好开心！',
    '蹭蹭你的脸~',
    '蹦蹦跳跳！',
  ],
  food: [
    '闻到好吃的味道啦！',
    '尾巴摇得像风扇！',
    '想吃肉肉~',
    '口水流下来了...',
  ],
  sleep: [
    '打个哈欠...',
    '眼皮好重...',
    '想睡觉觉了...',
    '呼噜呼噜...',
  ],
  play: [
    '把球叼过来！',
    '追着尾巴跑！',
    '跳高高！',
    '好开心呀！',
  ],
}

const memoryEvents = [
  { id: 1, type: 'photo', time: '2026-05-15', title: '第一次见面', desc: '在宠物店看到你的第一眼', emoji: '📸' },
  { id: 2, type: 'video', time: '2026-06-01', title: '学会握手', desc: '你终于学会了握手！', emoji: '🎉' },
  { id: 3, type: 'text', time: '2026-06-15', title: '生日快乐', desc: '一岁啦！给你做了鸡肉蛋糕', emoji: '🎂' },
  { id: 4, type: 'photo', time: '2026-07-01', title: '海边玩耍', desc: '第一次带你去海边', emoji: '🌊' },
]

const otherPets = [
  { id: 1, name: '豆豆', type: '🐰', color: '#ffb3ba', x: 10, y: 70 },
  { id: 2, name: '咪咪', type: '🐱', color: '#ffdfba', x: 85, y: 65 },
  { id: 3, name: '旺财', type: '🐕', color: '#baffc9', x: 20, y: 85 },
  { id: 4, name: '小鱼', type: '🐠', color: '#bae1ff', x: 75, y: 80 },
]

export default function DigitalLife() {
  const [petState, setPetState] = useState('idle')
  const [messages, setMessages] = useState([
    { id: 1, text: '汪~ 欢迎来到毛孩子星球！', sender: 'pet' },
    { id: 2, text: '我在这里过得很开心，每天都能看到好多小伙伴！', sender: 'pet' },
  ])
  const [inputText, setInputText] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [rotation, setRotation] = useState({ x: 20, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)
  const [showMemoryDetail, setShowMemoryDetail] = useState(null)
  const speechRef = useRef(null)

  useEffect(() => {
    let interval
    if (autoRotate) {
      interval = setInterval(() => {
        setRotation(prev => ({ ...prev, y: (prev.y + 0.5) % 360 }))
      }, 50)
    }
    return () => clearInterval(interval)
  }, [autoRotate])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputText.trim()) {
        sendMessage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputText])

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.1
      utterance.pitch = 1.3
      utterance.lang = 'zh-CN'
      window.speechSynthesis.speak(utterance)
    }
  }

  const sendMessage = () => {
    const text = inputText.trim()
    if (!text) return

    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }])
    setInputText('')

    let responseKey = 'default'
    if (text.includes('吃') || text.includes('饭') || text.includes('饿')) responseKey = 'food'
    else if (text.includes('睡') || text.includes('困')) responseKey = 'sleep'
    else if (text.includes('玩') || text.includes('球') || text.includes('开心')) responseKey = 'play'
    else if (text.includes('好') || text.includes('喜欢') || text.includes('爱')) responseKey = 'happy'

    setTimeout(() => {
      const responses = petResponses[responseKey]
      const response = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'pet' }])
      speak(response)
    }, 800)
  }

  const setBehavior = (behavior) => {
    setPetState(behavior)
    setTimeout(() => setPetState('idle'), 3000)
  }

  const handleShare = () => {
    const link = `http://aone.love/pet/${Date.now().toString(36)}`
    setShareLink(link)
    setShowShareModal(true)
    navigator.clipboard?.writeText(link)
  }

  const handle3DMouseDown = (e) => {
    setAutoRotate(false)
    const startX = e.clientX
    const startY = e.clientY
    const startYaw = rotation.y
    const startPitch = rotation.x

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      setRotation({
        y: (startYaw + deltaX * 0.5) % 360,
        x: Math.max(-30, Math.min(60, startPitch - deltaY * 0.3)),
      })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      setAutoRotate(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="digital-life-page">
      <div className="starry-sky">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="page-header digital-header">
        <span className="digital-icon">🌍</span>
        <h1>毛孩子星球</h1>
        <p className="digital-subtitle">MaoStar Planet</p>
        <p className="digital-desc">
          在这里，爱永不消逝。<br />
          你的毛孩子以数字生命的形式，永远陪伴在你身边。
        </p>
      </div>

      <div className="container digital-layout">
        <div className="digital-main">
          <div className="planet-stage" onMouseDown={handle3DMouseDown}>
            <div className="planet-ground">
              <div className="planet-grass"></div>
              <div className="planet-flowers">
                <span className="flower">🌸</span>
                <span className="flower">🌼</span>
                <span className="flower">🌺</span>
              </div>
            </div>

            {otherPets.map(pet => (
              <div
                key={pet.id}
                className="other-pet"
                style={{ left: `${pet.x}%`, bottom: `${pet.y}%` }}
              >
                <span className="other-pet-emoji" style={{ filter: `drop-shadow(0 0 8px ${pet.color})` }}>
                  {pet.type}
                </span>
                <span className="other-pet-name">{pet.name}</span>
              </div>
            ))}

            <div className="pet-3d-container" style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}>
              <div className="pet-3d-body">
                <div className="pet-head">
                  <div className="pet-ears">
                    <div className="pet-ear pet-ear-left"></div>
                    <div className="pet-ear pet-ear-right"></div>
                  </div>
                  <div className="pet-face">
                    <div className="pet-eyes">
                      <div className="pet-eye pet-eye-left"></div>
                      <div className="pet-eye pet-eye-right"></div>
                    </div>
                    <div className={`pet-mouth ${petState === 'happy' ? 'happy' : ''}`}></div>
                  </div>
                </div>
                <div className="pet-neck">
                  <div className="pet-collar">
                    <span className="collar-tag">♥</span>
                  </div>
                </div>
                <div className="pet-body">
                  <div className="pet-paws">
                    <div className="pet-paw pet-paw-front-left"></div>
                    <div className="pet-paw pet-paw-front-right"></div>
                    <div className="pet-paw pet-paw-back-left"></div>
                    <div className="pet-paw pet-paw-back-right"></div>
                  </div>
                  <div className={`pet-tail ${petState}`}></div>
                </div>
              </div>
              <div className="pet-shadow"></div>
            </div>

            <div className="behavior-controls">
              <button className="behavior-btn" onClick={() => setBehavior('happy')}>
                <span>💕</span>
                <span>抚摸</span>
              </button>
              <button className="behavior-btn" onClick={() => setBehavior('food')}>
                <span>🍖</span>
                <span>喂食</span>
              </button>
              <button className="behavior-btn" onClick={() => setBehavior('play')}>
                <span>🎾</span>
                <span>玩耍</span>
              </button>
              <button className="behavior-btn" onClick={() => setBehavior('sleep')}>
                <span>😴</span>
                <span>睡觉</span>
              </button>
            </div>
          </div>

          <div className="chat-panel card">
            <div className="chat-header">
              <h3>💬 和毛孩子对话</h3>
              <button className="chat-voice-btn" onClick={() => messages[messages.length - 1]?.sender === 'pet' && speak(messages[messages.length - 1].text)}>
                🔊
              </button>
            </div>
            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.sender}`}>
                  <span className="chat-avatar">{msg.sender === 'pet' ? '🐾' : '👤'}</span>
                  <div className="chat-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                className="text-input"
                placeholder="和毛孩子说点什么..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <button className="btn-primary" onClick={sendMessage}>发送</button>
            </div>
          </div>
        </div>

        <div className="digital-sidebar">
          <div className="memory-archive card">
            <div className="archive-header">
              <h3>📚 记忆档案</h3>
              <button className="share-btn" onClick={handleShare}>
                🔗 共享给亲友
              </button>
            </div>
            <div className="memory-timeline">
              {memoryEvents.map(event => (
                <div
                  key={event.id}
                  className="memory-item"
                  onClick={() => setShowMemoryDetail(event)}
                >
                  <span className="memory-dot"></span>
                  <div className="memory-content">
                    <span className="memory-emoji">{event.emoji}</span>
                    <div>
                      <h4>{event.title}</h4>
                      <p className="memory-date">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-memory-btn">
              + 添加新记忆
            </button>
          </div>

          <div className="pet-status card">
            <h3>🐾 毛孩子状态</h3>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-icon">❤️</span>
                <div>
                  <span className="status-label">心情</span>
                  <div className="status-bar">
                    <div className="status-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
              <div className="status-item">
                <span className="status-icon">🍖</span>
                <div>
                  <span className="status-label">饱食度</span>
                  <div className="status-bar">
                    <div className="status-fill" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <div className="status-item">
                <span className="status-icon">⚡</span>
                <div>
                  <span className="status-label">精力</span>
                  <div className="status-bar">
                    <div className="status-fill" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="status-item">
                <span className="status-icon">💤</span>
                <div>
                  <span className="status-label">睡眠</span>
                  <div className="status-bar">
                    <div className="status-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="planet-info card">
            <h3>🌍 关于毛孩子星球</h3>
            <p>
              这里是所有毛孩子的乐园。当它们离开这个世界，
              灵魂会来到这里，以数字生命的形式继续生活。
            </p>
            <div className="planet-stats">
              <div>
                <span className="stat-num">12,847</span>
                <span className="stat-label">毛孩子居民</span>
              </div>
              <div>
                <span className="stat-num">5,234</span>
                <span className="stat-label">记忆档案</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔗 共享毛孩子星球</h3>
              <button className="modal-close" onClick={() => setShowShareModal(false)}>✕</button>
            </div>
            <div className="share-content">
              <p>将这个链接分享给亲友，他们可以在毛孩子星球上看到你的毛孩子：</p>
              <div className="share-link-box">
                <input type="text" value={shareLink} readOnly />
                <button className="btn-primary" onClick={() => navigator.clipboard?.writeText(shareLink)}>
                  复制链接
                </button>
              </div>
              <div className="share-options">
                <button className="share-option-btn">📱 微信</button>
                <button className="share-option-btn">💬 QQ</button>
                <button className="share-option-btn">📧 邮件</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMemoryDetail && (
        <div className="modal-overlay" onClick={() => setShowMemoryDetail(null)}>
          <div className="modal-content memory-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{showMemoryDetail.emoji} {showMemoryDetail.title}</h3>
              <button className="modal-close" onClick={() => setShowMemoryDetail(null)}>✕</button>
            </div>
            <div className="memory-detail-content">
              <div className="memory-detail-image">
                <span>🖼️</span>
              </div>
              <p className="memory-detail-date">{showMemoryDetail.time}</p>
              <p className="memory-detail-desc">{showMemoryDetail.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}