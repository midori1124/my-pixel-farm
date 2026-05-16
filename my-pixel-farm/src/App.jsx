import React, { useState, useEffect } from 'react';
import { 
  User, Code, Hammer, Sprout, Coffee, MessageCircle, Star, Send, AlertTriangle, 
  Wifi, WifiOff, Trash2, Heart, Calendar, Cloud, CloudRain, CloudSnow, CloudLightning, 
  Sun, X, Menu, Tv, Instagram 
} from 'lucide-react';

// --- 引入我们拆分出来的模块 ---
import { auth, db, isCloudEnabled, appId } from './config/firebase';
import { locales, WEATHER_LOCALE, skillsIcons, dailyImages } from './data/locales';
import SnowEffect from './components/SnowEffect';
import MikuAvatar from './components/MikuAvatar';

import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const PixelFontLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("pixel_farm_lang") || "zh"; } 
    catch(e) { return "zh"; }
  });
  const t = locales[lang] || locales['zh'];

  const [imgError, setImgError] = useState(false);
  const [beijingTime, setBeijingTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '--', code: 'loading', icon: <Sun size={20}/> });
  
  const [money, setMoney] = useState(() => {
    try {
      const saved = localStorage.getItem("pixel_farm_money");
      return saved ? parseInt(saved, 10) : 114514;
    } catch (e) { return 114514; }
  });

  const [clickCount, setClickCount] = useState(() => {
    try {
      const saved = localStorage.getItem("pixel_farm_clicks");
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) { return 0; }
  });

  const [messages, setMessages] = useState(() => {
    if (!isCloudEnabled) {
      try {
        const saved = localStorage.getItem("pixel_farm_messages");
        return saved ? JSON.parse(saved) : [];
      } catch (e) { return []; }
    }
    return [];
  });

  const [user, setUser] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(isCloudEnabled ? "connecting" : "local");
  const [dbErrorMsg, setDbErrorMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("pixel_farm_lang", lang);
  }, [lang]);

  useEffect(() => {
    if (isCloudEnabled && auth) {
      const initAuth = async () => {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          setConnectionStatus("local");
        }
      };
      initAuth();
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
      });
      return () => unsubscribe();
    } else {
      setConnectionStatus("local");
    }
  }, []);

  useEffect(() => {
    if (isCloudEnabled && user && db) {
      const q = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        msgs.sort((a, b) => b.timestamp - a.timestamp);
        if (msgs.length > 0) {
            setMessages(msgs);
            localStorage.setItem("pixel_farm_messages", JSON.stringify(msgs));
        }
        setConnectionStatus("online");
        setDbErrorMsg(""); 
      }, (error) => {
        setConnectionStatus("local"); 
        setDbErrorMsg("Database Error");
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("pixel_farm_money", money.toString());
  }, [money]);

  useEffect(() => {
    localStorage.setItem("pixel_farm_clicks", clickCount.toString());
  }, [clickCount]);

  useEffect(() => {
    if (!isCloudEnabled || connectionStatus === "local") {
      localStorage.setItem("pixel_farm_messages", JSON.stringify(messages));
    }
  }, [messages, connectionStatus]);

  const handlePostMessage = async (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputMsg.trim()) return;

    const localeStr = lang === 'zh' ? 'zh-CN' : lang === 'tw' ? 'zh-TW' : lang === 'ja' ? 'ja-JP' : 'en-US';
    const fullDate = new Date().toLocaleString(localeStr, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });

    const newMessageObj = {
        name: inputName,
        content: inputMsg,
        date: fullDate,
        timestamp: Date.now(),
    };

    const updatedMessages = [ { id: Date.now(), ...newMessageObj }, ...messages ];
    setMessages(updatedMessages);
    localStorage.setItem("pixel_farm_messages", JSON.stringify(updatedMessages));

    setInputMsg(""); 

    if (isCloudEnabled && db && user && connectionStatus === "online") {
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
                ...newMessageObj,
                userId: user.uid
            });
        } catch (error) {
            console.error(error);
        }
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm(t.messagesUI.deleteConfirm)) return;

    if (isCloudEnabled && db && connectionStatus === "online") {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', msgId));
      } catch (error) {
        alert(t.messagesUI.deleteError);
      }
    } else {
      const newMsgs = messages.filter(msg => msg.id !== msgId);
      setMessages(newMsgs);
      localStorage.setItem("pixel_farm_messages", JSON.stringify(newMsgs));
    }
  };

  const handleAvatarClick = () => {
    setMoney(money + 10);
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 20) {
      window.location.href = "http://image.aibochinese.com/i/2025/12/08/rel1qi.jpg";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBeijingTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current_weather=true');
        const data = await res.json();
        if (data.current_weather) {
          const { temperature, weathercode } = data.current_weather;
          let code = 'clear';
          let icon = <Sun size={20} className="text-yellow-500" />;
            
          if (weathercode > 0 && weathercode <= 3) { code = 'cloudy'; icon = <Cloud size={20} className="text-gray-400" />; }
          else if (weathercode >= 45 && weathercode <= 48) { code = 'fog'; icon = <Cloud size={20} className="text-gray-300" />; }
          else if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) { code = 'rain'; icon = <CloudRain size={20} className="text-blue-400" />; }
          else if (weathercode >= 71 && weathercode <= 77) { code = 'snow'; icon = <CloudSnow size={20} className="text-blue-200" />; }
          else if (weathercode >= 95) { code = 'thunder'; icon = <CloudLightning size={20} className="text-purple-500" />; }
            
          setWeather({ temp: temperature, code, icon });
        }
      } catch (error) {
          setWeather({ temp: 'N/A', code: 'offline', icon: <X size={20} /> });
      }
    };
    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000); 
    return () => clearInterval(weatherTimer);
  }, []);

  const localeStr = lang === 'zh' ? 'zh-CN' : lang === 'tw' ? 'zh-TW' : lang === 'ja' ? 'ja-JP' : 'en-US';
  const timeString = new Intl.DateTimeFormat(localeStr, { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(beijingTime);
  const dateString = new Intl.DateTimeFormat(localeStr, { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(beijingTime);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const woodContainerClass = "bg-[#E09F5B] border-4 border-[#5E2C0C] rounded-lg shadow-[4px_4px_0px_0px_rgba(45,20,5,0.4)] relative w-full";
  const woodInnerClass = "bg-[#FFFAE3] border-2 border-[#9C5828] rounded m-2 p-4 text-[#4A2810] h-full";
    
  const rpgBtnClass = (active) => `
    relative px-4 py-2 font-bold text-xl uppercase transition-all whitespace-nowrap
    ${active 
      ? 'bg-[#E67E22] text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] translate-y-1' 
      : 'bg-[#D35400] text-[#FFE6CC] hover:bg-[#E67E22] shadow-[0_4px_0_#8E3200] hover:shadow-[0_2px_0_#8E3200] hover:translate-y-[2px]'}
    border-2 border-[#5E2C0C] rounded
    flex items-center gap-2
  `;

  return (
    <>
    <PixelFontLink />
    <SnowEffect />
    <div className="w-full min-h-screen font-['VT323'] bg-[#6CC478] text-[#4A2810] selection:bg-[#E67E22] selection:text-white flex flex-col overflow-x-hidden"
         style={{
           backgroundImage: `
             repeating-linear-gradient(45deg, #6CC478 25%, transparent 25%, transparent 75%, #6CC478 75%, #6CC478),
             repeating-linear-gradient(45deg, #6CC478 25%, #65B970 25%, #65B970 75%, #6CC478 75%, #6CC478)
           `,
           backgroundPosition: '0 0, 10px 10px',
           backgroundSize: '20px 20px'
         }}
    >
       
      <div className="fixed top-0 w-full z-50 bg-[#D97940] border-b-4 border-[#5E2C0C] shadow-lg text-white">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center max-w-none">
          <div className="flex items-center gap-4">
            <div className="bg-[#5E2C0C] p-1 rounded border-2 border-[#CCA37A]">
              <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-[#5E2C0C] font-bold text-lg animate-pulse">
                G
              </div>
            </div>
            <span className="text-3xl drop-shadow-md">{money.toLocaleString()}g</span>
            
            <div className="flex bg-[#8E4918] p-1 rounded border-2 border-[#5E2C0C] ml-2 font-sans">
               <button onClick={() => setLang('zh')} className={`px-2 text-sm ${lang === 'zh' ? 'text-yellow-400 font-bold' : 'text-[#E6C69D] hover:text-white'}`}>简</button>
               <button onClick={() => setLang('tw')} className={`px-2 text-sm ${lang === 'tw' ? 'text-yellow-400 font-bold' : 'text-[#E6C69D] hover:text-white'}`}>繁</button>
               <button onClick={() => setLang('en')} className={`px-2 text-sm ${lang === 'en' ? 'text-yellow-400 font-bold' : 'text-[#E6C69D] hover:text-white'}`}>EN</button>
               <button onClick={() => setLang('ja')} className={`px-2 text-sm ${lang === 'ja' ? 'text-yellow-400 font-bold' : 'text-[#E6C69D] hover:text-white'}`}>日</button>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-[#FFFAE3] px-4 py-1 rounded border-2 border-[#5E2C0C] text-[#5E2C0C] shadow-inner gap-6">
             <div className="flex items-center gap-2 border-r-2 border-[#E6C69D] pr-4">
                <Calendar size={20} className="text-red-500" />
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold">{dateString}</span>
                  <span className="text-sm text-[#8E4918]">{timeString} {t.topbar.bjTime}</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                {weather.icon}
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold">{weather.temp}°C</span>
                  <span className="text-sm text-[#8E4918]">{WEATHER_LOCALE[weather.code][lang]}</span>
                </div>
             </div>
          </div>

          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#E09F5B] border-b-4 border-[#5E2C0C] z-40 p-4 md:hidden shadow-xl">
          <div className="flex flex-col gap-2">
            {['profile', 'skills', 'projects', 'daily', 'messages'].map(tab => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setIsMenuOpen(false); }}
                className={rpgBtnClass(activeTab === tab)}
              >
                {tab === 'profile' && <User size={20}/>}
                {tab === 'skills' && <Sprout size={20}/>}
                {tab === 'projects' && <Hammer size={20}/>}
                {tab === 'daily' && <Coffee size={20}/>}
                {tab === 'messages' && <MessageCircle size={20}/>}
                {t.tabs[tab]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-grow flex items-center justify-center pt-24 pb-8 px-4 w-full">
        <div className="w-full max-w-6xl">
           
          <div className="hidden md:flex justify-center gap-4 mb-[-4px] relative z-10 px-8">
            {[
              { id: 'profile', icon: <User size={24} /> },
              { id: 'skills', icon: <Sprout size={24} /> },
              { id: 'projects', icon: <Hammer size={24} /> },
              { id: 'daily', icon: <Coffee size={24} /> },
              { id: 'messages', icon: <MessageCircle size={24} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-8 py-3 rounded-t-lg border-t-4 border-l-4 border-r-4 border-[#5E2C0C] font-bold text-2xl flex items-center gap-2 transition-transform
                  ${activeTab === tab.id 
                    ? 'bg-[#E09F5B] text-[#4A2810] translate-y-0 pb-4' 
                    : 'bg-[#A05E28] text-[#E0CEB5] hover:bg-[#C27E46] translate-y-2'}
                `}
              >
                {tab.icon} {t.tabs[tab.id]}
              </button>
            ))}
          </div>

          <div className={`${woodContainerClass} min-h-[600px] flex flex-col`}>
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>

            <div className="p-4 md:p-8 flex-grow">
               
              {activeTab === 'profile' && (
                <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-300 h-full">
                  <div className="md:w-1/3 flex flex-col items-center justify-center">
                    <div className="w-48 h-48 bg-[#D6A672] border-4 border-[#5E2C0C] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden shadow-inner group cursor-pointer" onClick={handleAvatarClick}>
                      <div className="w-full h-full relative">
                          <div className="absolute inset-0">
                              <MikuAvatar />
                          </div>
                          {!imgError && (
                              <img 
                                src="https://i.postimg.cc/rpfB6wZp/ddad3a23f2b65a7a4392d9af8d2dbc38.jpg"
                                alt="Avatar" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform z-10"
                                style={{ imageRendering: 'pixelated' }}
                                onError={() => setImgError(true)}
                              />
                          )}
                      </div>
                      <div className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 rounded-full border border-[#5E2C0C] animate-bounce z-20">
                          {t.avatar.clickMe}
                      </div>
                    </div>
                    <div className="bg-[#FFFAE3] border-2 border-[#9C5828] rounded p-2 w-full text-center shadow-md">
                      <h2 className="text-3xl font-bold text-[#5E2C0C]">{t.profile.name}</h2>
                      <p className="text-xl text-[#8E4918]">{t.profile.title}</p>
                    </div>
                    <div className="mt-4 flex gap-2 w-full justify-center mb-6 items-center">
                        <span className="text-[#5E2C0C] text-xl font-bold">{t.profile.social}</span>
                        <Heart className="fill-red-500 text-red-500 animate-pulse" />
                        <Heart className="fill-red-500 text-red-500" />
                        <Heart className="fill-red-500 text-red-500" />
                        <Heart className="fill-red-500 text-red-500" />
                        <Heart className="text-red-500 opacity-50" />
                    </div>

                    <div className="bg-[#E6C69D] p-4 rounded border-2 border-[#9C5828] text-center w-full">
                        <h4 className="text-3xl font-bold text-[#5E2C0C] mb-3">{t.profile.findMe}</h4>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <a href="http://1441000420.qzone.qq.com" target="_blank" rel="noopener noreferrer" className="text-[#5E2C0C] hover:text-[#8E4918] transition-colors hover:scale-110 transform">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#5E2C0C]">
                                    <Star size={24} className="text-yellow-500" />
                                </div>
                            </a>
                            <a href="https://space.bilibili.com/162103422?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="text-[#5E2C0C] hover:text-[#8E4918] transition-colors hover:scale-110 transform">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#5E2C0C]">
                                    <Tv size={24} className="text-pink-400" />
                                </div>
                            </a>
                            <a href="https://www.instagram.com/midoriins1124/" target="_blank" rel="noopener noreferrer" className="text-[#5E2C0C] hover:text-[#8E4918] transition-colors hover:scale-110 transform">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#5E2C0C]">
                                    <Instagram size={24} className="text-purple-500" />
                                </div>
                            </a>
                        </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className={woodInnerClass + " h-full relative flex flex-col justify-center"}>
                      <div className="absolute top-0 right-0 w-8 h-8 bg-[#E09F5B] transform rotate-45 translate-x-4 -translate-y-4 border-l-2 border-b-2 border-[#9C5828]"></div>
                      <h3 className="text-4xl font-bold mb-6 border-b-2 border-[#9C5828] pb-2 text-[#5E2C0C]">{t.profile.log}</h3>
                      <div className="space-y-6 text-2xl leading-relaxed">
                        <p>
                          <span className="font-bold text-[#8E4918]">{t.profile.curFarm}</span> {t.profile.farmName}
                        </p>
                        <p>
                          {t.profile.intro1}
                        </p>
                        <p>
                          {t.profile.intro2}
                        </p>
                        <p>
                          {t.profile.intro3}
                        </p>
                        <div className="bg-[#E6C69D] p-4 rounded border border-[#9C5828] mt-8 flex items-center gap-4">
                          <div className="animate-spin-slow">
                              <Code size={32} className="text-[#5E2C0C]" />
                          </div>
                          <div>
                              <div className="font-bold text-[#5E2C0C]">{t.profile.status}</div>
                              <div className="text-lg text-[#8E4918]">{t.profile.buff}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="animate-in slide-in-from-right duration-300 flex flex-col justify-center h-full">
                   <h3 className="text-4xl font-bold mb-12 text-center text-[#5E2C0C] drop-shadow-sm flex items-center justify-center gap-3">
                      <Sprout size={32} /> {t.skillsUI.title} <Sprout size={32} />
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {t.skillsData.map((skill, idx) => (
                          <div key={idx} className="bg-[#FFFAE3] border-2 border-[#9C5828] p-6 rounded-lg shadow-md flex items-center gap-6 hover:translate-x-1 transition-transform cursor-default">
                              <div className={`w-20 h-20 ${skillsIcons[idx].color} border-4 border-[#5E2C0C] rounded flex items-center justify-center text-white shadow-lg`}>
                                  {skillsIcons[idx].icon}
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between items-end mb-2">
                                      <span className="text-2xl font-bold text-[#5E2C0C]">{skill.name}</span>
                                      <span className="text-xl text-[#8E4918]">Lv.{skill.level}</span>
                                  </div>
                                  <div className="h-8 w-full bg-[#4a2810] rounded-full border-2 border-[#5E2C0C] relative overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600" style={{width: `${skill.level * 10}%`}}></div>
                                      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
                                          {[...Array(9)].map((_, i) => (
                                              <div key={i} className="w-[2px] h-full bg-[#5E2C0C] opacity-30"></div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="animate-in slide-in-from-right duration-300 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="text-4xl font-bold text-[#5E2C0C]">{t.projectsUI.title}</h3>
                      <div className="text-xl bg-[#FFFAE3] px-3 py-1 border-2 border-[#9C5828] rounded font-bold">
                          {t.projectsUI.newQuest}
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
                      {t.projectsData.map((project) => (
                          <div key={project.id} className="bg-[#FFFAE3] p-0 relative group shadow-lg transition-transform hover:-translate-y-2 h-full">
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-[#5E2C0C] shadow-sm z-10"></div>
                              <div className="border-4 border-[#9C5828] h-full flex flex-col p-6 relative bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
                                  <h4 className="text-2xl font-bold text-[#5E2C0C] mb-2 uppercase border-b-2 border-dashed border-[#9C5828] pb-2">
                                      {project.title}
                                  </h4>
                                  {project.type && (
                                    <div className="text-[#8E4918] font-bold text-lg mb-2">{project.type}</div>
                                  )}
                                  <p className="text-xl text-[#4A2810] leading-tight mb-4 flex-1">
                                      {project.desc}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                      {project.tags.map(tag => (
                                          <span key={tag} className="bg-[#E6C69D] text-[#5E2C0C] px-2 py-0.5 rounded text-lg border border-[#9C5828]">
                                              {tag}
                                          </span>
                                      ))}
                                  </div>
                                  <div className="mt-auto pt-4 border-t-2 border-[#9C5828] flex justify-between items-center">
                                      <div className="flex flex-col">
                                          <span className="text-sm font-bold text-[#8E4918] uppercase">{t.projectsUI.reward}</span>
                                          <span className="text-xl font-bold text-[#5E2C0C]">{project.reward}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'daily' && (
                <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col">
                   <h3 className="text-4xl font-bold mb-8 text-center text-[#5E2C0C] flex items-center justify-center gap-3">
                      <Coffee size={32} /> {t.dailyUI.title} <Coffee size={32} />
                   </h3>
                   <div className="flex flex-col gap-8 flex-grow overflow-auto">
                      <div className="w-full max-w-4xl mx-auto space-y-8">
                         {t.dailyData.map(moment => (
                             <div key={moment.id} className="bg-[#FFFAE3] border-2 border-[#9C5828] p-6 rounded-lg shadow-md relative">
                                 <div className="absolute -left-2 top-6 w-4 h-8 bg-[#8E4918] rounded-r"></div>
                                 <div className="flex justify-between items-start border-b border-[#9C5828] pb-3 mb-4">
                                     <div className="flex items-center gap-3">
                                         <span className="text-2xl font-bold text-[#5E2C0C]">{moment.date}</span>
                                         <div className="scale-125 origin-left">{weather.icon}</div>
                                     </div>
                                     <span className="text-[#8E4918] bg-[#E6C69D] px-3 py-1 rounded text-lg font-bold">
                                         {t.dailyUI.mood} {moment.mood}
                                     </span>
                                 </div>
                                 <h4 className="text-3xl font-bold text-[#5E2C0C] mb-4">{moment.title}</h4>
                                 
                                 {dailyImages[moment.id] && (
                                  <div className="mb-6 flex flex-col gap-4">
                                    {dailyImages[moment.id].map((imgUrl, i) => (
                                      <div key={i} className="border-4 border-[#9C5828] rounded overflow-hidden shadow-sm">
                                        <img src={imgUrl} alt={`${moment.title}-${i}`} className="w-full h-auto object-cover max-h-[500px]" />
                                      </div>
                                    ))}
                                  </div>
                                 )}
                                 {moment.content && <p className="text-2xl text-[#4A2810] leading-relaxed">{moment.content}</p>}
                             </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col">
                   <h3 className="text-4xl font-bold mb-8 text-center text-[#5E2C0C] flex items-center justify-center gap-3">
                      <MessageCircle size={32} /> 
                      {t.messagesUI.title}
                      <span className="ml-2" title={isCloudEnabled ? "Online" : "Local Mode"}>
                        {connectionStatus === "online" ? <Wifi size={24} className="text-green-600" /> : <WifiOff size={24} className="text-yellow-600" />}
                      </span>
                      <MessageCircle size={32} />
                   </h3>
                   <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 h-full">
                      
                      {!isCloudEnabled && (
                        <div className="bg-[#FFFAE3] border-l-4 border-yellow-500 p-4 text-[#8E4918] flex items-start gap-3 rounded shadow-sm">
                           <AlertTriangle size={24} className="text-yellow-600 flex-shrink-0" />
                           <div>
                             <p className="font-bold">{t.messagesUI.localWarningTitle}</p>
                             <p className="text-sm">
                               {dbErrorMsg || t.messagesUI.localWarningDesc}
                             </p>
                           </div>
                        </div>
                      )}

                      <div className="flex-grow overflow-auto space-y-4 pr-2 bg-[#E6C69D] p-4 rounded border-2 border-[#9C5828] shadow-inner max-h-[500px]">
                        {messages.length === 0 && (
                          <div className="text-center text-[#8E4918] text-xl py-10 font-bold">{t.messagesUI.empty}</div>
                        )}
                        {messages.map(msg => (
                          <div key={msg.id} className="bg-[#FFFAE3] p-4 rounded border border-[#9C5828] shadow-sm relative group hover:-translate-y-1 transition-transform">
                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-800 shadow-sm border border-[#5E2C0C]"></div>
                             
                             <button 
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete"
                             >
                               <Trash2 size={18} />
                             </button>

                             <div className="flex justify-between items-end mb-2 border-b border-[#E6C69D] pb-1">
                                <span className="font-bold text-[#5E2C0C] text-xl">{msg.name}</span>
                                <span className="text-sm text-[#8E4918]">{msg.date}</span>
                             </div>
                             <p className="text-[#4A2810] text-xl leading-snug">{msg.content}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#FFFAE3] p-6 rounded border-2 border-[#9C5828] shadow-md">
                         <h4 className="text-2xl font-bold text-[#5E2C0C] mb-4 flex items-center gap-2">
                           <Send size={20}/> {t.messagesUI.postTitle}
                         </h4>
                         <form onSubmit={handlePostMessage} className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <input 
                                  type="text" 
                                  placeholder={t.messagesUI.namePlaceholder}
                                  className="bg-white border-2 border-[#8E4918] px-3 py-2 rounded text-xl focus:outline-none focus:border-[#E67E22] md:w-1/3 placeholder-[#E6C69D]"
                                  value={inputName}
                                  onChange={(e) => setInputName(e.target.value)}
                                  maxLength={10}
                                />
                                <input 
                                  type="text" 
                                  placeholder={t.messagesUI.msgPlaceholder}
                                  className="bg-white border-2 border-[#8E4918] px-3 py-2 rounded text-xl focus:outline-none focus:border-[#E67E22] flex-grow placeholder-[#E6C69D]"
                                  value={inputMsg}
                                  onChange={(e) => setInputMsg(e.target.value)}
                                  maxLength={50}
                                />
                            </div>
                            <button 
                              type="submit" 
                              className="self-end bg-[#D35400] text-[#FFE6CC] border-2 border-[#5E2C0C] px-6 py-2 rounded text-xl font-bold hover:bg-[#E67E22] shadow-[0_4px_0_#8E3200] hover:shadow-[0_2px_0_#8E3200] hover:translate-y-[2px] transition-all"
                            >
                              {t.messagesUI.postBtn}
                            </button>
                         </form>
                      </div>
                   </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;