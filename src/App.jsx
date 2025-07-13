import React, { useState, memo } from 'react';
import { Rnd } from 'react-rnd';

// Separated and memoized window component
const Window = memo(({ window, minimizeWindow, closeWindow, updateWindowContent, openWindow, musicVolume, setMusicVolume, neonGrid, setNeonGrid, hyperdrive, setHyperdrive, uptimeStart }) => (
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
            src="https://www.youtube.com/embed/VQ7lKPSUc2g?autoplay=1&controls=0"
            title="Wide Putin"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      ) : window.title === 'Synth Assistant' ? (
        <SynthAssistant />
      ) : window.title === 'Terminal' ? (
        <TerminalWindow 
        window={window}
        closeWindow={closeWindow}
        minimizeWindow={minimizeWindow}
        updateWindowContent={updateWindowContent}
        />) : window.title === 'Neural Core' ? (
          <NeuralCoreWindow />
        ) : window.title == 'Execute...' ? (
        <ExecuteWindow openWindow={openWindow} closeWindow={closeWindow} window={window}/>
        ) : window.title === 'Control Matrix' ? (
          <ControlMatrixWindow
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            neonGrid={neonGrid}
            setNeonGrid={setNeonGrid}
            hyperdrive={hyperdrive}
            setHyperdrive={setHyperdrive}
            uptimeStart={uptimeStart}
          />
        ) : window.title === 'Trash Matrix' ? (
          <TrashMatrixWindow />
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

  // Define playClickSound within this component
  const playClickSound = () => {
    const clickSound = new Audio('/assets/click_sound.wav');
    clickSound.volume = 0.05;
    clickSound.play().catch(e => console.log('Click sound failed:', e));
  };

  const getSynthResponse = async (msg) => {
    try {
      if (msg.includes("name")) return "I'm SYNTH-AI, your cyberpunk companion from 2085!";
      if (msg.includes("hello") || msg.includes("hi")) return "Greetings, cyber-citizen! Ready to surf the neon highways?";
      if (msg.includes("joke")) return "Why did the hacker break up with the internet? Too many trust issues! 😎";
      if (msg.includes("help")) return "Try asking about my name, a joke, or let's cruise the digital realm together 🌟";
      if (msg.includes("love")) return "Love.exe has stopped responding... firewall active 💙";
      if (msg.includes("synthwave") || msg.includes("retro")) return "Now you're speaking my language! Retro-futuristic vibes engaged! 🚀";
      if (msg.includes("matrix")) return "There is no spoon... only neon dreams 🌈";
      return "ERROR 404: Understanding not found... rebooting humor.dll 🔄";
    } catch (error) {
      console.error('AI API Error:', error);
      return "SYNTH-AI offline... manual mode activated 🛠️";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    playClickSound();
    const userMessage = { from: 'user', text: input };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    
    // Add loading message
    const loadingMessage = { from: 'bot', text: "PROCESSING... 🔄" };
    setMessages(prev => [...prev, loadingMessage]);
    
    // Get AI response
    const response = await getSynthResponse(userInput.toLowerCase());
    
    // Replace loading message with actual response
    setMessages(prev => [...prev.slice(0, -1), { from: 'bot', text: response }]);
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

  const TerminalWindow = ({ window, closeWindow, minimizeWindow, updateWindowContent }) => {
  const [lines, setLines] = useState([
    "Synthwave Terminal v1.0",
    "Type 'help' for a list of commands."
  ]);
  const [input, setInput] = useState("");
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [lines]);

  const handleCommand = (cmd) => {
    let output = "";
    switch (cmd.trim()) {
      case "help":
        output = "Available: help, about, date, clear, echo [msg]";
        break;
      case "about":
        output = "Synthwave OS Terminal - Futuristic vibes!";
        break;
      case "date":
        output = new Date().toString();
        break;
      case "":
        output = "";
        break;
      default:
        if (cmd.startsWith("echo ")) {
          output = cmd.slice(5);
        } else if (cmd === "clear") {
          setLines([]);
          return;
        } else {
          output = "Unknown command: " + cmd;
        }
    }
    setLines((prev) => [...prev, `> ${cmd}`, output]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-2 font-mono text-cyan-200 rounded-lg shadow-inner border-2 border-purple-500 flex flex-col">
      <div className="flex-1 overflow-y-auto text-xs mb-2">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-pink-400" : ""}>{line}</div>
        ))}
      </div>
      <div className="flex">
        <span className="text-purple-400 mr-1">$</span>
        <input
          ref={inputRef}
          className="flex-1 bg-transparent outline-none border-none text-cyan-100"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};

const NeuralCoreWindow = () => {
  const [progress, setProgress] = React.useState(0);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2 + Math.floor(Math.random() * 4)), 80);
      return () => clearTimeout(timer);
    } else {
      setConnected(true);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 rounded-lg p-6">
      <div className="text-3xl font-mono text-cyan-300 mb-4" style={{
        textShadow: "0 0 8px #67e8f9, 0 0 2px #fff"
      }}>
        Neural Link Initializing...
      </div>
      <div className="w-full bg-gray-800 rounded-full h-6 mb-4 border-2 border-purple-500 shadow-inner">
        <div
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 h-6 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-lg font-mono text-purple-300 mb-2 tracking-widest">
        {progress < 100 ? `${progress}%` : "100%"}
      </div>
      <div className="text-cyan-400 font-mono mt-4 animate-pulse">
        {connected ? "NEURAL CORE ONLINE. CONNECTION ESTABLISHED." : "CONNECTING..."}
      </div>
    </div>
  );
};

const ExecuteWindow = ({ openWindow, closeWindow, window }) => {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");

  const handleRun = () => {
  const cmd = input.trim().toLowerCase();
  setError("");
  // Recognized commands (add more as needed)
  const validPrograms = [
    "terminal", "neotext", "cybernet explorer", "data vault",
    "synth assistant", "trash matrix", "neural core"
  ];
  if (validPrograms.includes(cmd)) {
    openWindow(
      cmd
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    );
  } else {
    setError(`Unknown program: ${input}. Please enter one of the recognized programs (terminal, neotext, cybernet explorer, data vault, synth assistant, trash matrix, neural core).`);
  }
  setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 rounded-lg">
      <div className="text-xl font-mono text-cyan-300 mb-4">Run a Program</div>
      <input
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 border-2 border-purple-500 text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
        placeholder="Type a program name (e.g. terminal) and press Enter..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleRun()}
        autoFocus
      />
      <button
        className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-mono hover:from-purple-500 hover:to-pink-500 transition-all"
        onClick={handleRun}
      >
        RUN
      </button>
      {error && <div className="mt-2 text-pink-400 font-mono">{error}</div>}
      <div className="mt-4 text-xs text-purple-300 font-mono opacity-70">Try: terminal, neotext, cybernet explorer, data vault, synth assistant, trash matrix, neural core</div>
    </div>
  );
};

const ControlMatrixWindow = ({
  musicVolume, setMusicVolume,
  neonGrid, setNeonGrid,
  hyperdrive, setHyperdrive,
  uptimeStart
}) => {
  const [fakeRam] = React.useState(() => (Math.random() * 8 + 4).toFixed(1)); // 4-12 GB
  const [fakeCpu] = React.useState(() => (Math.random() * 80 + 10).toFixed(1)); // 10-90%

  const getUptime = () => {
    const seconds = Math.floor((Date.now() - uptimeStart) / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="flex flex-col space-y-6 h-full w-full p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 rounded-lg font-mono text-cyan-200">
      <div>
        <div className="text-xl text-purple-300 mb-2">Control Matrix</div>
        <div className="mb-4">
          <label className="block mb-1 text-cyan-300">Background Music Volume</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={musicVolume}
            onChange={e => setMusicVolume(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-xs text-purple-400">{Math.round(musicVolume * 100)}%</div>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={neonGrid}
              onChange={() => setNeonGrid(v => !v)}
              className="accent-cyan-500"
            />
            <span>Neon Grid</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hyperdrive}
              onChange={() => setHyperdrive(v => !v)}
              className="accent-pink-500"
            />
            <span>Hyperdrive</span>
          </label>
        </div>
        <div className="mt-6">
          <div className="text-purple-300 mb-1">System Stats</div>
          <div className="text-xs">
            <div>Uptime: <span className="text-cyan-400">{getUptime()}</span></div>
            <div>RAM: <span className="text-cyan-400">{fakeRam} GB</span></div>
            <div>CPU Usage: <span className="text-cyan-400">{fakeCpu}%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrashMatrixWindow = () => {
  const [files, setFiles] = React.useState([
    "old_resume.docx",
    "cat_meme.png",
    "virus.exe",
    "rickroll.mp3",
    "notes.txt",
    "secret_plan.pdf"
  ]);
  const [purged, setPurged] = React.useState(false);
  const [restored, setRestored] = React.useState(false);

  const handlePurge = () => {
    setPurged(true);
    setTimeout(() => setFiles([]), 600);
  };

  const handleRestore = () => {
    setRestored(true);
    setTimeout(() => {
      setFiles([
        "old_resume.docx",
        "cat_meme.png",
        "virus.exe",
        "rickroll.mp3",
        "notes.txt",
        "secret_plan.pdf"
      ]);
      setRestored(false);
      setPurged(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 rounded-lg font-mono text-cyan-200">
      <div className="text-2xl text-pink-400 mb-4 font-mono" style={{
        textShadow: "0 0 8px #f472b6, 0 0 2px #fff"
      }}>
        Trash Matrix
      </div>
      <div className={`w-full max-w-xs bg-gray-800 rounded-lg p-4 border-2 border-purple-500 shadow-inner mb-4 transition-all duration-500 ${purged ? "animate-pulse opacity-30 blur-sm" : ""}`}>
        {files.length === 0 ? (
          <div className="text-center text-purple-400">🗑️ Trash is empty!</div>
        ) : (
          <ul className="space-y-2">
            {files.map((file, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="truncate">{file}</span>
                <span className="text-pink-400">✖</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          className="px-4 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded font-mono hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg"
          onClick={handlePurge}
          disabled={files.length === 0 || purged}
        >
          PURGE ALL
        </button>
        <button
          className="px-4 py-1 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded font-mono hover:from-cyan-500 hover:to-purple-500 transition-all shadow-lg"
          onClick={handleRestore}
          disabled={restored || (!purged && files.length > 0)}
        >
          RESTORE
        </button>
      </div>
      {purged && <div className="mt-4 text-pink-400 animate-pulse">Purging files... 💥</div>}
      {restored && <div className="mt-4 text-cyan-400 animate-pulse">Restoring files... 🛠️</div>}
    </div>
  );
};

const SynthwaveDesktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [currentSong, setCurrentSong] = useState('/assets/Timecop1983 - On the Run.mp3');
  const [audioObj, setAudioObj] = useState(null);
  const [musicVolume, setMusicVolume] = useState(0.15);
  const [neonGrid, setNeonGrid] = useState(true);
  const [hyperdrive, setHyperdrive] = useState(false);
  const [uptimeStart] = useState(Date.now());
  
  // Audio setup
  React.useEffect(() => {
    setBooting(true);
    const timer = setTimeout(() => setBooting(false), 2500); // 2.5s boot
    return () => clearTimeout(timer);
  }, []);
  
  // Background music
  // Create and play new audio when the song changes
React.useEffect(() => {
  if (audioObj) {
    audioObj.pause();
  }
  const newAudio = new Audio(currentSong);
  newAudio.loop = true;
  newAudio.volume = musicVolume;
  setAudioObj(newAudio);

  // Play after user interaction
  const playAudio = () => {
    newAudio.play().catch(e => {});
  };
  document.addEventListener('click', playAudio, { once: true });

  return () => {
    newAudio.pause();
    document.removeEventListener('click', playAudio);
  };
}, [currentSong]);

// Update volume when musicVolume changes
React.useEffect(() => {
  if (audioObj) {
    audioObj.volume = musicVolume;
  }
}, [musicVolume, audioObj]);
  
  // Click sound function
  const playClickSound = () => {
    const clickSound = new Audio('/assets/click_sound.wav');
    clickSound.volume = 0.15;
    clickSound.play().catch(e => console.log('Click sound failed:', e));
  };

  const desktopIcons = [
    { id: 1, name: 'Neural Core', icon: '🧠' },
    { id: 2, name: 'Trash Matrix', icon: '🗑️' },
    { id: 3, name: 'Data Vault', icon: '🔐' },
    { id: 4, name: 'CyberNet Explorer', icon: '🌐' }, 
    { id: 5, name: 'NeoText', icon: '📡' },
    { id: 6, name: 'Synth Assistant', icon: '🤖' },
    { id: 7, name: 'Terminal', icon: '💻' },
  ];

  const startMenuItems = [
    { name: 'Data Vault', icon: '🔐' },
    { name: 'Holo Gallery', icon: '🖼️' },
    { name: 'Synth Beats', icon: '🎵' },
    { name: 'Neural Core', icon: '🧠' },
    { name: 'Control Matrix', icon: '⚙️' },
    { name: 'Execute...', icon: '▶️' },
    { name: 'Synth Assistant', icon: '🤖' },
    { name: 'Terminal', icon: '💻' },
  ];

  const synthBeats = [
  { name: "HOME - Hold", file: "/assets/HOME - Hold.mp3" },
  { name: "Miami Nights 1984 - Accelerated", file: "/assets/Miami Nights 1984 - Accelerated.mp3" },
  { name: "Synthwave goose - Blade Runner 2049", file: "/assets/Synthwave goose - Blade Runner 2049.mp3" },
  { name: "Timecop1983 - On the Run", file: "/assets/Timecop1983 - On the Run.mp3" },
  { name: "TRON Legacy - End of Line (Slowed) - Daft Punk", file: "/assets/TRON_ Legacy - End of Line (Slowed) - Daft Punk.mp3" },
  { name: "Venger (feat. Greta Link)", file: "/assets/Venger (feat. Greta Link).mp3" },
  ];

  const holoGalleryImages = [
  { name: "Nyan Cat", src: "/assets/nyan_cat.png" },
  { name: "Peter's Computer", src: "/assets/peter's_computer.jpg" },
  { name: "Trollface", src: "/assets/Trollface.png" },
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
        
        .animate-pulse {
          animation: neon-glow 2s ease-in-out infinite;
        }
          @keyframes flicker {
          0% { opacity: 0.1; }
          5% { opacity: 0.5; }
          10% { opacity: 0.1; }
          15% { opacity: 0.7; }
          20% { opacity: 0.2; }
          25% { opacity: 1; }
          30% { opacity: 0.3; }
          35% { opacity: 0.9; }
          40% { opacity: 0.2; }
          45% { opacity: 1; }
          50% { opacity: 0.7; }
          55% { opacity: 0.3; }
          60% { opacity: 1; }
          100% { opacity: 1; }
        }
        .bootup-overlay {
          position: fixed;
          z-index: 9999;
          inset: 0;
          background: linear-gradient(135deg, #1a002a 0%, #0f172a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s;
        }
        .bootup-text {
          font-family: 'Orbitron', 'monospace', 'sans-serif';
          font-size: 3rem;
          color: #a78bfa;
          text-shadow: 0 0 10px #f0abfc, 0 0 30px #67e8f9;
          letter-spacing: 0.2em;
          animation: flicker 2s linear forwards;
        }
        @keyframes flicker-minimal {
          0%, 100% { opacity: 0.13; }
          48% { opacity: 0.18; }
          50% { opacity: 0.10; }
          52% { opacity: 0.18; }
          60% { opacity: 0.13; }
        }
        .flicker-minimal {
          animation: flicker-minimal 2.5s infinite;
        }
      `}</style>
      {booting && (
  <div className="bootup-overlay">
    <span className="bootup-text">Synthwave OS</span>
  </div>
)}
      
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-cyan-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span
            className="text-6xl md:text-8xl font-extrabold tracking-widest flicker-minimal"
            style={{
              fontFamily: "'Orbitron', 'Share Tech Mono', 'monospace', 'sans-serif'",
              color: "#a78bfa",
              opacity: 0.13,
              textShadow: "0 0 24px #a78bfa, 0 0 2px #fff"
            }}
          >
            Synthwave OS
          </span>
        </div>
        
        {/* Neon Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-cyan-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        
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
            openWindow={openWindow}
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            neonGrid={neonGrid}
            setNeonGrid={setNeonGrid}
            hyperdrive={hyperdrive}
            setHyperdrive={setHyperdrive}
            uptimeStart={uptimeStart}
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
                  item.name === 'Synth Beats' ? (
                    <div key={index} className="px-4 py-2">
                      <div className="flex items-center space-x-3 text-cyan-300 font-mono mb-1">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm">Synth Beats</span>
                      </div>
                      <div className="ml-7 flex flex-col space-y-1">
                        {synthBeats.map((beat, i) => (
                          <button
                            key={beat.file}
                            className={`text-left text-xs px-2 py-1 rounded transition-colors ${
                              currentSong === beat.file
                                ? 'bg-purple-700 text-white font-bold'
                                : 'bg-gray-800 text-cyan-200 hover:bg-purple-600'
                            }`}
                            onClick={() => {
                              playClickSound();
                              setCurrentSong(beat.file);
                              setStartMenuOpen(false);
                            }}
                          >
                            {beat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : item.name === 'Holo Gallery' ? (
                    <div key={index} className="px-4 py-2">
                      <div className="flex items-center space-x-3 text-cyan-300 font-mono mb-1">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm">Holo Gallery</span>
                      </div>
                      <div className="ml-7 grid grid-cols-3 gap-2">
                        {holoGalleryImages.map((img, i) => (
                          <div key={img.src} className="flex flex-col items-center">
                            <img
                              src={img.src}
                              alt={img.name}
                              className="w-16 h-16 object-contain rounded-lg border-2 border-purple-500 shadow-lg bg-gray-800"
                              style={{ background: "#222", marginBottom: "0.25rem" }}
                            />
                            <span className="text-xs text-purple-300 font-mono text-center">{img.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) :  (
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
                  )
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