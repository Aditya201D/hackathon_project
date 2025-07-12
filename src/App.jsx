import React, { useState, memo } from 'react';
import { Rnd } from 'react-rnd';

// separated and memoized window from main window componnent to prevent re-render everytime we type in notpad 
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
    className={`bg-gray-200 border-2 border-gray-400 shadow-lg ${
      window.minimized ? 'hidden' : ''
    }`}
  >
    {/* Title Bar */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 flex justify-between items-center text-sm font-semibold cursor-move">
      <span>{window.title}</span>
      <div className="flex space-x-1">
        <button 
          onClick={() => minimizeWindow(window.id)}
          className="w-4 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-400"
        >
          _
        </button>
        <button 
          onClick={() => closeWindow(window.id)}
          className="w-4 h-4 bg-red-500 border border-gray-400 flex items-center justify-center text-xs hover:bg-red-600 text-white"
        >
          ×
        </button>
      </div>
    </div>

    {/* Window Content */}
    <div className="p-2 bg-white h-full overflow-auto">

      {/* internet explorer */}
      {window.title === 'Internet Explorer' ? (
        <iframe
          src="https://archive.org"
          title="Embedded Web App"
          className="w-full h-full border-none"
        />
      ) : window.title === 'Notepad' ? (
        <textarea
          autoFocus
          value={window.content || ''}
          onChange={(e) => updateWindowContent(window.id, e.target.value)}
          className="w-full h-full resize-none bg-white text-black p-2 text-sm border border-gray-300 outline-none font-mono"
          placeholder="Start typing..."
        />
      ) : (
        <div className="text-center text-gray-600 mt-20">
          <div className="text-4xl mb-4">
            {window.title === 'My Computer' ? '💻' : 
            window.title === 'Recycle Bin' ? '🗑️' :
            window.title === 'My Documents' ? '📁' : '📝'}
          </div>
          <p>This is a replica of {window.title}</p>
          <p className="text-sm mt-2">Windows XP Desktop Experience</p>
        </div>
      )}
    </div>
  </Rnd>
));

const WindowsXPDesktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const desktopIcons = [
    { id: 1, name: 'My Computer', icon: '💻' },
    { id: 2, name: 'Recycle Bin', icon: '🗑️' },
    { id: 3, name: 'My Documents', icon: '📁' },
    { id: 4, name: 'Internet Explorer', icon: '🌐' }, 
    { id: 5, name: 'Notepad', icon: '📝' },
  ];

  const startMenuItems = [
    { name: 'My Documents', icon: '📁' },
    { name: 'My Pictures', icon: '🖼️' },
    { name: 'My Music', icon: '🎵' },
    { name: 'My Computer', icon: '💻' },
    { name: 'Control Panel', icon: '⚙️' },
    { name: 'Run...', icon: '▶️' },
  ];

  const openWindow = (iconName) => {
  if (!openWindows.find(w => w.title === iconName)) {
    const newWindow = {
      id: Date.now(),
      title: iconName,
      x: Math.random() * 200 + 50,
      y: Math.random() * 100 + 50,
      width: 500,
      height: 400,
      minimized: false,
      content: iconName === 'Notepad' ? localStorage.getItem('notepadContent') || '' : 
               iconName === 'Internet Explorer' ? 'https://www.google.com' : '',
    };
    setOpenWindows([...openWindows, newWindow]);
  }
};

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ));
  };

  const updateWindowContent = (id, newContent) => {
    setOpenWindows(windows =>
      windows.map(w => {
        if (w.id === id) {
          if (w.title === 'Notepad') {
            localStorage.setItem('notepadContent', newContent);
          }
          return { ...w, content: newContent };
        }
        return w;
      })
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" 
    style={{ 
      backgroundImage: 'url("src/assets/wallpaper.jpeg")',
      backgroundSize:'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
      }}>
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center cursor-pointer hover:bg-blue-200 hover:bg-opacity-30 p-2 rounded"
            onDoubleClick={() => openWindow(icon.name)}
          >
            <div className="text-2xl mb-1">{icon.icon}</div>
            <div className="text-white text-xs text-center font-semibold drop-shadow-md">
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
        <div className="absolute bottom-10 left-0 w-80 bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-blue-700 shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <div className="font-bold">Administrator</div>
                <div className="text-sm opacity-90">Windows XP</div>
              </div>
            </div>
          </div>
          <div className="bg-white">
            {startMenuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  openWindow(item.name);
                  setStartMenuOpen(false);
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2">
            <div className="flex justify-between">
              <button className="text-white text-sm hover:underline">Log Off</button>
              <button className="text-white text-sm hover:underline">Turn Off Computer</button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-blue-500 to-blue-600 border-t-2 border-blue-700 flex items-center px-2">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-sm border border-green-700 hover:from-green-400 hover:to-green-500 text-sm font-bold flex items-center space-x-2"
        >
          <span className="text-lg">🪟</span>
          <span>start</span>
        </button>

        {/* Quick Launch */}
        <div className="flex items-center space-x-1 ml-2 px-2 border-r border-blue-700">
          <div className="w-6 h-6 bg-blue-400 rounded-sm flex items-center justify-center text-xs cursor-pointer hover:bg-blue-300">
            🌐
          </div>
          <div className="w-6 h-6 bg-blue-400 rounded-sm flex items-center justify-center text-xs cursor-pointer hover:bg-blue-300">
            📁
          </div>
        </div>

        {/* Open Window Buttons */}
        <div className="flex-1 flex items-center space-x-1 px-2">
          {openWindows.filter(w => !w.minimized).map((window) => (
            <button
              key={window.id}
              className="bg-blue-400 hover:bg-blue-300 text-white px-3 py-1 text-xs rounded-sm border border-blue-600 max-w-40 truncate"
              onClick={() => minimizeWindow(window.id)}
            >
              {window.title}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2 px-2 border-l border-blue-700">
          <div className="text-white text-xs cursor-pointer hover:bg-blue-400 px-1 rounded">🔊</div>
          <div className="text-white text-xs cursor-pointer hover:bg-blue-400 px-1 rounded">📶</div>
          <div className="text-white text-xs font-semibold">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowsXPDesktop;