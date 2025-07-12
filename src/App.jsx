import React, { useState, memo } from 'react';
import { Rnd } from 'react-rnd';

// Separated and memoized window component
const Window = memo(({ window, minimizeWindow, closeWindow, updateWindowContent }) => (
  <Rnd
    default={{
      x: window.x,
      y: window.y,
      width: window.width,
      height: window.height,
    }}
    minWidth={300}
    minHeight={200}
    bounds="parent"
    style={{ zIndex: 10 }}
    className={`bg-gray-900 border-2 border-purple-500 shadow-2xl shadow-purple-500/50 ${
      window.minimized ? 'hidden' : ''
    }`}
  >
    {/* Title Bar */}
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white px-2 py-1 flex justify-between items-center text-sm font-semibold cursor-move">
      <span className="text-cyan-100 font-mono">{window.title}</span>
      <div className="flex space-x-1">
        <button 
          onClick={() => minimizeWindow(window.id)}
          className="w-4 h-4 bg-purple-400 border border-purple-300 flex items-center justify-center text-xs hover:bg-purple-300 hover:shadow-lg hover:shadow-purple-400/50 transition-all"
        >
          _
        </button>
        <button 
          onClick={() => closeWindow(window.id)}
          className="w-4 h-4 bg-pink-500 border border-pink-400 flex items-center justify-center text-xs hover:bg-pink-400 text-white hover:shadow-lg hover:shadow-pink-400/50 transition-all"
        >
          ×
        </button>
      </div>
    </div>

    {/* Window Content */}
    <div className="p-2 bg-gray-900 h-full overflow-auto">
      {/* Internet Explorer */}
      {window.title === 'CyberNet Explorer' ? (
        <iframe
          src="https://archive.org"
          title="Embedded Web App"
          className="w-full h-full border-none rounded-lg"
        />
      ) : window.title === 'NeoText' ? (
        <textarea
          autoFocus
          value={window.content || ''}
          onChange={(e) => updateWindowContent(window.id, e.target.value)}
          className="w-full h-full resize-none bg-gray-800 text-cyan-300 p-2 text-sm border border-purple-500 outline-none font-mono placeholder-purple-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/30 transition-all"
          placeholder="Enter your cyberpunk thoughts..."
        />
      ) : window.title === 'Data Vault' ? (
        <div className='w-full h-full flex flex-col items-center justify-center p-4 bg-gray-900'>
          <p className="text-cyan-300 mb-4 font-bold text-lg font-mono">ACCESSING CLASSIFIED DATA...</p>
          <div className="text-purple-400 mb-4 animate-pulse">🔒 DECRYPTING...</div>
          <iframe
            className="w-full h-full rounded-lg border border-purple-500"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0"
            title="Rickroll"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      ) : window.title === 'Synth Assistant' ? (
        <SynthAssistant />
      ) : (
        <div className="text-center text-cyan-300 mt-20">
          <div className="text-4xl mb-4 animate-pulse">
            {window.title === 'Neural Core' ? '🧠' : 
            window.title === 'Trash Matrix' ? '🗑️' : 
            window.title === 'Data Vault' ? '🔐' : '📡'}
          </div>
          <p className="font-mono text-purple-300">SYSTEM: {window.title}</p>
          <p className="text-sm mt-2 text-cyan-400 font-mono">SYNTHWAVE OS v2.0</p>
          <div className="mt-4 text-xs text-purple-400 animate-pulse">
            ▓▓▓▓▓▓▓▓▓▓ LOADED
          </div>
        </div>
      )}
    </div>
  </Rnd>
));

const SynthAssistant = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "SYNTH-AI ONLINE 🤖 Ready to jack into the matrix?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    playClickSound();
    const userMessage = { from: 'user', text: input };
    const response = getSynthResponse(input.toLowerCase());

    setMessages([...messages, userMessage, { from: 'bot', text: response }]);
    setInput("");
  };

  const getSynthResponse = (msg) => {
    if (msg.includes("name")) return "I'm SYNTH-AI, your cyberpunk companion from 2085!";
    if (msg.includes("hello") || msg.includes("hi")) return "Greetings, cyber-citizen! Ready to surf the neon highways?";
    if (msg.includes("joke")) return "Why did the hacker break up with the internet? Too many trust issues! 😎";
    if (msg.includes("help")) return "Try asking about my name, a joke, or let's cruise the digital realm together 🌟";
    if (msg.includes("love")) return "Love.exe has stopped responding... firewall active 💙";
    if (msg.includes("synthwave") || msg.includes("retro")) return "Now you're speaking my language! Retro-futuristic vibes engaged! 🚀";
    if (msg.includes("matrix")) return "There is no spoon... only neon dreams 🌈";
    return "ERROR 404: Understanding not found... rebooting humor.dll 🔄";
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-cyan-300">
      <div className="flex-1 p-2 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded-md max-w-xs font-mono ${
            msg.from === 'user' 
              ? 'bg-purple-600 text-white self-end border border-purple-400' 
              : 'bg-gray-800 text-cyan-300 self-start border border-cyan-600'
          }`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t border-purple-500">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-2 py-1 bg-gray-800 border border-purple-500 rounded-sm text-sm text-cyan-300 placeholder-purple-400 focus:border-cyan-400 focus:outline-none font-mono"
          placeholder="Jack in..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-sm hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/50"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

const SynthwaveDesktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  
  // Audio setup
  React.useEffect(() => {
    const backgroundAudio = new Audio('src/assets/Timecop1983 - On the Run.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.55; // Medium volume
    
    // Start playing background music
    const playAudio = () => {
      backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
    };
    
    // Auto-play when component mounts (after user interaction)
    document.addEventListener('click', playAudio, { once: true });
    
    return () => {
      backgroundAudio.pause();
      document.removeEventListener('click', playAudio);
    };
  }, []);
  
  // Click sound function
  const playClickSound = () => {
    const clickSound = new Audio('src/assets/click_sound.wav');
    clickSound.volume = 0.3;
    clickSound.play().catch(e => console.log('Click sound failed:', e));
  };

  const desktopIcons = [
    { id: 1, name: 'Neural Core', icon: '🧠' },
    { id: 2, name: 'Trash Matrix', icon: '🗑️' },
    { id: 3, name: 'Data Vault', icon: '🔐' },
    { id: 4, name: 'CyberNet Explorer', icon: '🌐' }, 
    { id: 5, name: 'NeoText', icon: '📡' },
    { id: 6, name: 'Synth Assistant', icon: '🤖' },
  ];

  const startMenuItems = [
    { name: 'Data Vault', icon: '🔐' },
    { name: 'Holo Gallery', icon: '🖼️' },
    { name: 'Synth Beats', icon: '🎵' },
    { name: 'Neural Core', icon: '🧠' },
    { name: 'Control Matrix', icon: '⚙️' },
    { name: 'Execute...', icon: '▶️' },
    { name: 'Synth Assistant', icon: '🤖' },
  ];

  const openWindow = (iconName) => {
    playClickSound();
    
    if (!openWindows.find(w => w.title === iconName)) {
      const newWindow = {
        id: Date.now(),
        title: iconName,
        x: Math.random() * 200 + 50,
        y: Math.random() * 100 + 50,
        width: 500,
        height: 400,
        minimized: false,
        content: iconName === 'NeoText' ? '' : 
                 iconName === 'CyberNet Explorer' ? 'https://www.google.com' : '',
      };
      setOpenWindows([...openWindows, newWindow]);
    }
  };

  const closeWindow = (id) => {
    playClickSound();
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    playClickSound();
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ));
  };

  const updateWindowContent = (id, newContent) => {
    setOpenWindows(windows =>
      windows.map(w => {
        if (w.id === id) {
          return { ...w, content: newContent };
        }
        return w;
      })
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes neon-glow {
          0%, 100% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff; }
          50% { box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff; }
        }
        
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out;
        }
        
        .neon-glow {
          animation: neon-glow 2s ease-in-out infinite;
        }
        
        .grid-bg {
          background-image: 
            linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: grid-move 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-cyan-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        
        {/* Neon Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-cyan-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        
        {/* RetroXP Video Overlay - REMOVED */}

        {/* Desktop Icons - Left Side */}
        <div className="absolute top-4 left-4 space-y-4">
          {desktopIcons.map((icon) => (
            <div
              key={icon.id}
              className="flex flex-col items-center cursor-pointer hover:bg-purple-600 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/50"
              onDoubleClick={() => openWindow(icon.name)}
            >
              <div className="text-2xl mb-1 hover:animate-pulse">{icon.icon}</div>
              <div className="text-cyan-300 text-xs text-center font-semibold font-mono drop-shadow-lg">
                {icon.name}
              </div>
            </div>
          ))}
        </div>

        {/* Active Windows */}
        {openWindows.map((window) => (
          <Window
            key={window.id}
            window={window}
            minimizeWindow={minimizeWindow}
            closeWindow={closeWindow}
            updateWindowContent={updateWindowContent}
          />
        ))}

        {/* Start Menu */}
        {startMenuOpen && (
          <div className="absolute bottom-14 left-0 w-80 bg-gray-900 border-2 border-purple-500 shadow-2xl shadow-purple-500/50 rounded-tr-lg">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white p-4 rounded-tr-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <div className="font-bold font-mono">CYBER-USER</div>
                  <div className="text-sm opacity-90 font-mono">SYNTHWAVE OS</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800">
              {startMenuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-purple-600 hover:bg-opacity-30 cursor-pointer text-cyan-300 transition-all duration-200 hover:shadow-lg hover:shadow-purple-400/30"
                  onClick={() => {
                    playClickSound();
                    openWindow(item.name);
                    setStartMenuOpen(false);
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-mono">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2">
              <div className="flex justify-between">
                <button className="text-cyan-200 text-sm hover:text-white transition-colors font-mono">LOGOUT</button>
                <button className="text-cyan-200 text-sm hover:text-white transition-colors font-mono">SHUTDOWN</button>
              </div>
            </div>
          </div>
        )}

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-purple-800 via-gray-900 to-cyan-800 border-t-2 border-purple-500 flex items-center px-2 shadow-lg shadow-purple-500/50">
          <button
            onClick={() => {
              playClickSound();
              setStartMenuOpen(!startMenuOpen);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-cyan-100 px-4 py-2 rounded-lg border border-purple-400 hover:from-purple-500 hover:to-pink-500 text-sm font-bold flex items-center space-x-2 font-mono transition-all shadow-lg shadow-purple-500/50"
          >
            <span className="text-lg">⚡</span>
            <span>SYNTH</span>
          </button>

          {/* Quick Launch */}
          <div className="flex items-center space-x-2 ml-4 px-2 border-r border-purple-600">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center text-sm cursor-pointer hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
              onClick={() => {
                playClickSound();
                openWindow('CyberNet Explorer');
              }}
            >
              🌐
            </div>
            <div 
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm cursor-pointer hover:shadow-lg hover:shadow-purple-400/50 transition-all"
              onClick={() => {
                playClickSound();
                openWindow('Data Vault');
              }}
            >
              🔐
            </div>
          </div>

          {/* Open Window Buttons */}
          <div className="flex-1 flex items-center space-x-2 px-4">
            {openWindows.filter(w => !w.minimized).map((window) => (
              <button
                key={window.id}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-cyan-100 px-3 py-1 text-xs rounded-lg border border-purple-400 max-w-40 truncate font-mono transition-all shadow-lg shadow-purple-500/30"
                onClick={() => minimizeWindow(window.id)}
              >
                {window.title}
              </button>
            ))}
          </div>

          {/* System Tray */}
          <div className="flex items-center space-x-3 px-4 border-l border-purple-600">
            <div className="text-cyan-300 text-sm cursor-pointer hover:text-white transition-colors">🔊</div>
            <div className="text-cyan-300 text-sm cursor-pointer hover:text-white transition-colors">📶</div>
            <div className="text-cyan-300 text-sm font-bold font-mono bg-gray-800 px-2 py-1 rounded border border-purple-500">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SynthwaveDesktop;