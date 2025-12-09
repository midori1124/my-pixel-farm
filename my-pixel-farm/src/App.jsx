import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  User, 
  Code, 
  Hammer, 
  Sprout, 
  Swords, 
  Search, 
  Soup,    
  Heart,
  Menu,
  X,
  Calendar,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Globe,    
  Coffee,   
  Camera,   
  Instagram, 
  Tv,        
  MessageCircle, 
  Star,
  Send,
  AlertTriangle
} from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

// --- 引入复古像素字体 ---
const PixelFontLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
);

// ==========================================
// 1. 雪花特效图片配置
const SNOW_IMAGE_URL = "http://image.aibochinese.com/i/2025/12/08/padnh6.jpg"; 

// 2. [🔥 这里填入你的 FIREBASE 配置 🔥]
// 请用你在 Firebase 控制台里复制的内容替换下面的字符串
// 如果保持原样，网页会自动运行在"本地模式"（留言只有你自己看得到）
const YOUR_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC_1OWd9PafNW7xO5w4ljuzLulQTHzXNDE",
  authDomain: "project-6449264268116042623.firebaseapp.com",
  projectId: "project-6449264268116042623",
  storageBucket: "project-6449264268116042623.firebasestorage.app",
  messagingSenderId: "92166328998",
  appId: "1:92166328998:web:ebe648d41e12b1b7131a67",
  measurementId: "G-7B81C2J025"
};
// ==========================================

// --- [系统逻辑] 初始化 Firebase 或 降级为本地模式 ---
let db = null;
let auth = null;
let appId = 'default-app-id';
let isCloudEnabled = false;

// 尝试初始化
try {
  let configToUse = null;

  // 1. 优先检查用户是否在代码里填了真实配置
  // (判断逻辑：apiKey 存在且不包含中文提示语)
  if (YOUR_FIREBASE_CONFIG.apiKey && !YOUR_FIREBASE_CONFIG.apiKey.includes("在这里粘贴")) {
    configToUse = YOUR_FIREBASE_CONFIG;
  } 
  // 2. 如果没填，检查是否有环境变量 (预览环境专用)
  else if (typeof window !== 'undefined' && window.__firebase_config) {
     try {
       configToUse = JSON.parse(window.__firebase_config);
       if (typeof window.__app_id !== 'undefined') appId = window.__app_id;
     } catch(e) { /* ignore */ }
  }

  if (configToUse) {
    const app = initializeApp(configToUse);
    auth = getAuth(app);
    db = getFirestore(app);
    isCloudEnabled = true;
    console.log("✅ 已成功连接到云端数据库！");
  } else {
    console.log("⚠️ 未检测到有效配置，已切换至本地存储模式。");
  }
} catch (e) {
  console.warn("Firebase 初始化跳过 (本地模式):", e);
  isCloudEnabled = false;
}

// --- 图片飘雪特效组件 ---
const SnowEffect = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,      
      duration: Math.random() * 5 + 8, 
      delay: Math.random() * 5,       
      size: Math.random() * 15 + 15,  
      opacity: Math.random() * 0.4 + 0.6, 
      sway: Math.random() * 40 - 20,  
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      <style>
        {`
          @keyframes snowfall-sway {
            0% { transform: translate(0, -10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            50% { transform: translate(20px, 50vh) rotate(180deg); }
            90% { opacity: 1; }
            100% { transform: translate(-20px, 105vh) rotate(360deg); opacity: 0; }
          }
        `}
      </style>
      {flakes.map((flake) => (
        <img
          key={flake.id}
          src={SNOW_IMAGE_URL}
          alt="snow"
          className="absolute top-[-50px] select-none object-contain"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall-sway ${flake.duration}s linear ${flake.delay}s infinite`,
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
          }}
        />
      ))}
    </div>
  );
};

// --- Miku Avatar SVG ---
const MikuAvatar = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full bg-[#b6e3f4]" shapeRendering="crispEdges">
    <rect x="2" y="4" width="4" height="12" fill="#39c5bb" />
    <rect x="3" y="16" width="2" height="4" fill="#39c5bb" />
    <rect x="18" y="4" width="4" height="12" fill="#39c5bb" />
    <rect x="19" y="16" width="2" height="4" fill="#39c5bb" />
    <rect x="6" y="3" width="12" height="10" fill="#39c5bb" />
    <rect x="7" y="7" width="10" height="9" fill="#ffe0d0" />
    <rect x="6" y="3" width="12" height="4" fill="#39c5bb" />
    <rect x="6" y="7" width="2" height="3" fill="#39c5bb" />
    <rect x="16" y="7" width="2" height="3" fill="#39c5bb" />
    <rect x="11" y="7" width="2" height="2" fill="#39c5bb" />
    <rect x="8" y="10" width="2" height="3" fill="#2a8b83" />
    <rect x="14" y="10" width="2" height="3" fill="#2a8b83" />
    <rect x="8" y="10" width="2" height="1" fill="#000" opacity="0.5" />
    <rect x="14" y="10" width="2" height="1" fill="#000" opacity="0.5" />
    <rect x="11" y="14" width="2" height="1" fill="#d48c8c" />
    <rect x="5" y="2" width="2" height="2" fill="#ea2e50" />
    <rect x="17" y="2" width="2" height="2" fill="#ea2e50" />
    <rect x="8" y="16" width="8" height="8" fill="#e0e0e0" />
    <rect x="10" y="16" width="4" height="4" fill="#39c5bb" />
    <rect x="11" y="20" width="2" height="4" fill="#39c5bb" />
  </svg>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [imgError, setImgError] = useState(false);
  const [beijingTime, setBeijingTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '--', condition: '加载中...', icon: <Sun size={20}/> });
  
  // --- [本地存储] 个人数据 ---
  const [money, setMoney] = useState(() => {
    const saved = localStorage.getItem("pixel_farm_money");
    return saved ? parseInt(saved, 10) : 114514;
  });

  const [clickCount, setClickCount] = useState(() => {
    const saved = localStorage.getItem("pixel_farm_clicks");
    return saved ? parseInt(saved, 10) : 0;
  });

  // --- [数据管理] 留言 ---
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  
  const [inputName, setInputName] = useState("");
  const [inputMsg, setInputMsg] = useState("");

  // 1. 初始化 (Auth & Data)
  useEffect(() => {
    // 云端模式初始化
    if (isCloudEnabled && auth) {
      const initAuth = async () => {
        try {
          // 检查是否有自定义token（预览环境用）
          if (typeof window !== 'undefined' && window.__initial_auth_token) {
            await signInWithCustomToken(auth, window.__initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }
        } catch (e) {
          console.error("Auth init failed:", e);
        }
      };
      initAuth();
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return () => unsubscribe();
    } else {
      // 本地模式：直接从 localStorage 读取留言
      const savedMsgs = localStorage.getItem("pixel_farm_messages");
      if (savedMsgs) {
        setMessages(JSON.parse(savedMsgs));
      }
    }
  }, []);

  // 2. 监听数据 (云端)
  useEffect(() => {
    if (isCloudEnabled && user && db) {
      const q = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        msgs.sort((a, b) => b.timestamp - a.timestamp);
        setMessages(msgs);
      }, (error) => {
        console.error("读取留言失败:", error);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // 3. 自动保存本地数据
  useEffect(() => {
    localStorage.setItem("pixel_farm_money", money.toString());
  }, [money]);

  useEffect(() => {
    localStorage.setItem("pixel_farm_clicks", clickCount.toString());
  }, [clickCount]);

  // 本地模式下的留言自动保存
  useEffect(() => {
    if (!isCloudEnabled) {
      localStorage.setItem("pixel_farm_messages", JSON.stringify(messages));
    }
  }, [messages]);


  // 发布留言逻辑
  const handlePostMessage = async (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputMsg.trim()) return;

    const fullDate = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const newMessageObj = {
        name: inputName,
        content: inputMsg,
        date: fullDate,
        timestamp: Date.now(),
    };

    if (isCloudEnabled && db && user) {
        // --- 云端发布 ---
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
                ...newMessageObj,
                userId: user.uid
            });
        } catch (error) {
            console.error("云端发布失败:", error);
            alert("发布失败，请检查网络（如果是权限问题，请在Firebase控制台设置Firestore规则）");
            return;
        }
    } else {
        // --- 本地发布 (Fallback) ---
        setMessages([ { id: Date.now(), ...newMessageObj }, ...messages ]);
    }

    setMoney(money + 50);
    setInputMsg(""); 
  };

  // 处理头像点击逻辑
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
          let condition = '晴朗';
          let icon = <Sun size={20} className="text-yellow-500" />;
            
          if (weathercode > 0 && weathercode <= 3) { condition = '多云'; icon = <Cloud size={20} className="text-gray-400" />; }
          else if (weathercode >= 45 && weathercode <= 48) { condition = '雾'; icon = <Cloud size={20} className="text-gray-300" />; }
          else if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) { condition = '雨'; icon = <CloudRain size={20} className="text-blue-400" />; }
          else if (weathercode >= 71 && weathercode <= 77) { condition = '雪'; icon = <CloudSnow size={20} className="text-blue-200" />; }
          else if (weathercode >= 95) { condition = '雷暴'; icon = <CloudLightning size={20} className="text-purple-500" />; }
            
          setWeather({ temp: temperature, condition, icon });
        }
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeather({ temp: 'N/A', condition: '离线', icon: <X size={20} /> });
      }
    };
    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000); 
    return () => clearInterval(weatherTimer);
  }, []);

  const timeString = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(beijingTime);
  const dateString = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(beijingTime);
  const currentFullTime = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(beijingTime);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const tabLabels = {
    profile: '角色',
    skills: '技能',
    projects: '任务',
    daily: '日常',
    messages: '留言板'
  };

  const personalInfo = {
    name: "緑ミドリ", 
    title: "Lv.20 大学生",
    farmName: "Pixel Code Farm",
    intro: "你好！欢迎来到我的私人农场 在这里你能看到我的信息 。我会在这留下自己的生活碎片和自己的介绍 记录一下自己的人生",
    email: "midori@stardew.dev",
    socials: {
      qq: "http://1441000420.qzone.qq.com", 
      bilibili: "https://space.bilibili.com/162103422?spm_id_from=333.1007.0.0", 
      instagram: "https://www.instagram.com/midoriins1124/" 
    },
    avatarUrl: "https://i.postimg.cc/rpfB6wZp/ddad3a23f2b65a7a4392d9af8d2dbc38.jpg" 
  };

  const skills = [
    { name: "网络冲浪 (Web Surfing)", level: 10, icon: <Globe size={24} />, color: "bg-blue-500" },
    { name: "个人菜谱 (Cooking)", level: 4, icon: <Soup size={24} />, color: "bg-orange-500" },
    { name: "游戏能力 (Gaming)", level: 7, icon: <Swords size={24} />, color: "bg-red-500" },
    { name: "行动能力 (Action)", level: 5, icon: <Search size={24} />, color: "bg-yellow-500" },
    { name: "摄影 (Photography)", level: 6, icon: <Camera size={24} />, color: "bg-purple-500" },
  ];

  const projects = [
    { id: 1, title: "大学进度", type: "学习", desc: "目前进度1/4 大一下在读", reward: "一份工作（？）", tags: [] },
    { id: 2, title: "全中国旅行点亮", type: "探索", desc: "目前已点亮 28/34。未点亮：安徽、宁夏、青海、河北、新疆、西藏。", reward: "阅历++", tags: ["旅行", "中国"] }
  ];

  const dailyMoments = [
    {
      id: 2,
      date: "2025年12月8日 19:30",
      title: "给我的头像点击20次（200金币）会有惊喜",
      content: "这是一个隐藏的小彩蛋，只有坚持点击的人才能发现",
      image: null, 
      weather: weather.icon,
      mood: "期待"
    },
    {
      id: 1,
      date: "2025年12月7日 15:22", 
      title: "我在今天开通了这个网站 欧耶！",
      content: "（图片只是我学校的早餐 无意义）", 
      image: "https://i.postimg.cc/d01D8Dz9/5494118cbd5d94f2e15c6250c1afa313.jpg",
      weather: weather.icon, 
      mood: "开心"
    }
  ];

  const woodContainerClass = "bg-[#E09F5B] border-4 border-[#5E2C0C] rounded-lg shadow-[4px_4px_0px_0px_rgba(45,20,5,0.4)] relative w-full";
  const woodInnerClass = "bg-[#FFFAE3] border-2 border-[#9C5828] rounded m-2 p-4 text-[#4A2810] h-full";
    
  const rpgBtnClass = (active) => `
    relative px-4 py-2 font-bold text-xl uppercase transition-all
    ${active 
      ? 'bg-[#E67E22] text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] translate-y-1' 
      : 'bg-[#D35400] text-[#FFE6CC] hover:bg-[#E67E22] shadow-[0_4px_0_#8E3200] hover:shadow-[0_2px_0_#8E3200] hover:translate-y-[2px]'}
    border-2 border-[#5E2C0C] rounded
    flex items-center gap-2
  `;

  return (
    <>
    <PixelFontLink />
    {/* 启用飘雪特效 */}
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
       
      {/* 顶部状态栏 */}
      <div className="fixed top-0 w-full z-50 bg-[#D97940] border-b-4 border-[#5E2C0C] shadow-lg text-white">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center max-w-none">
          <div className="flex items-center gap-4">
            <div className="bg-[#5E2C0C] p-1 rounded border-2 border-[#CCA37A]">
              <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-[#5E2C0C] font-bold text-lg animate-pulse">
                G
              </div>
            </div>
            <span className="text-3xl drop-shadow-md">{money.toLocaleString()}g</span>
          </div>

          <div className="hidden md:flex items-center bg-[#FFFAE3] px-4 py-1 rounded border-2 border-[#5E2C0C] text-[#5E2C0C] shadow-inner gap-6">
             <div className="flex items-center gap-2 border-r-2 border-[#E6C69D] pr-4">
                <Calendar size={20} className="text-red-500" />
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold">{dateString}</span>
                  <span className="text-sm text-[#8E4918]">{timeString} (BJ)</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                {weather.icon}
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold">{weather.temp}°C</span>
                  <span className="text-sm text-[#8E4918]">{weather.condition}</span>
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
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 主内容区域 */}
      <div className="flex-grow flex items-center justify-center pt-24 pb-8 px-4 w-full">
        <div className="w-full max-w-6xl">
           
          {/* 桌面端标签栏 */}
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
                {tab.icon} {tabLabels[tab.id]}
              </button>
            ))}
          </div>

          {/* 木板容器 */}
          <div className={`${woodContainerClass} min-h-[600px] flex flex-col`}>
            {/* 装饰螺丝 */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#8E4918] shadow-[inset 1px 1px 2px rgba(0,0,0,0.5)]"></div>

            <div className="p-4 md:p-8 flex-grow">
               
              {/* --- 角色 TAB --- */}
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
                                src={personalInfo.avatarUrl}
                                alt="Avatar" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform z-10"
                                style={{ imageRendering: 'pixelated' }}
                                onError={() => setImgError(true)}
                              />
                          )}
                      </div>
                      <div className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 rounded-full border border-[#5E2C0C] animate-bounce z-20">
                          点我!
                      </div>
                    </div>
                    <div className="bg-[#FFFAE3] border-2 border-[#9C5828] rounded p-2 w-full text-center shadow-md">
                      <h2 className="text-3xl font-bold text-[#5E2C0C]">{personalInfo.name}</h2>
                      <p className="text-xl text-[#8E4918]">{personalInfo.title}</p>
                    </div>
                    <div className="mt-4 flex gap-2 w-full justify-center mb-6">
                        <span className="text-[#5E2C0C] text-xl">社交账号:</span>
                        <Heart className="fill-red-500 text-red-500 animate-pulse" />
                        <Heart className="fill-red-500 text-red-500" />
                        <Heart className="fill-red-500 text-red-500" />
                        <Heart className="fill-red-500 text-red-500" />
                        <Heart className="text-red-500 opacity-50" />
                    </div>

                    <div className="bg-[#E6C69D] p-4 rounded border-2 border-[#9C5828] text-center w-full">
                        <h4 className="text-3xl font-bold text-[#5E2C0C] mb-3">Find Me</h4>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <a href={personalInfo.socials.qq} target="_blank" rel="noopener noreferrer" className="text-[#5E2C0C] hover:text-[#8E4918] transition-colors hover:scale-110 transform">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#5E2C0C]">
                                    <Star size={24} className="text-yellow-500" />
                                </div>
                            </a>
                            <a href={personalInfo.socials.bilibili} target="_blank" rel="noopener noreferrer" className="text-[#5E2C0C] hover:text-[#8E4918] transition-colors hover:scale-110 transform">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#5E2C0C]">
                                    <Tv size={24} className="text-pink-400" />
                                </div>
                            </a>
                            <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[#5E2C0C] hover:text-[#8E4918] transition-colors hover:scale-110 transform">
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
                      <h3 className="text-4xl font-bold mb-6 border-b-2 border-[#9C5828] pb-2 text-[#5E2C0C]">冒险日志</h3>
                      <div className="space-y-6 text-2xl leading-relaxed">
                        <p>
                          <span className="font-bold text-[#8E4918]">当前农场:</span> {personalInfo.farmName}
                        </p>
                        <p>
                          {personalInfo.intro}
                        </p>
                        <p>
                          目前我是一个在日本留学的大学生，攻读信息系统专业（情報システム）。这是我无聊敲出来的小网站，总之就是没事干。
                        </p>
                        <div className="bg-[#E6C69D] p-4 rounded border border-[#9C5828] mt-8 flex items-center gap-4">
                          <div className="animate-spin-slow">
                              <Code size={32} className="text-[#5E2C0C]" />
                          </div>
                          <div>
                              <div className="font-bold text-[#5E2C0C]">状态: 等待下课中</div>
                              <div className="text-lg text-[#8E4918]">咖啡因 Buff 生效中 (剩余 2h)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 技能 TAB --- */}
              {activeTab === 'skills' && (
                <div className="animate-in slide-in-from-right duration-300 flex flex-col justify-center h-full">
                   <h3 className="text-4xl font-bold mb-12 text-center text-[#5E2C0C] drop-shadow-sm flex items-center justify-center gap-3">
                      <Sprout size={32} /> 技能等级 <Sprout size={32} />
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {skills.map((skill, idx) => (
                          <div key={idx} className="bg-[#FFFAE3] border-2 border-[#9C5828] p-6 rounded-lg shadow-md flex items-center gap-6 hover:translate-x-1 transition-transform cursor-default">
                              <div className={`w-20 h-20 ${skill.color} border-4 border-[#5E2C0C] rounded flex items-center justify-center text-white shadow-lg`}>
                                  {skill.icon}
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

              {/* --- 任务 TAB --- */}
              {activeTab === 'projects' && (
                <div className="animate-in slide-in-from-right duration-300 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="text-4xl font-bold text-[#5E2C0C]">悬赏任务</h3>
                      <div className="text-xl bg-[#FFFAE3] px-3 py-1 border-2 border-[#9C5828] rounded">
                          有新任务！
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
                      {projects.map((project) => (
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
                                          <span className="text-sm font-bold text-[#8E4918] uppercase">奖励</span>
                                          <span className="text-xl font-bold text-[#5E2C0C]">{project.reward}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>
              )}

              {/* --- 日常 TAB --- */}
              {activeTab === 'daily' && (
                <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col">
                   <h3 className="text-4xl font-bold mb-8 text-center text-[#5E2C0C] flex items-center justify-center gap-3">
                      <Coffee size={32} /> 农场日记 <Coffee size={32} />
                   </h3>
                   <div className="flex flex-col gap-8 flex-grow overflow-auto">
                      {/* 仅居中显示日记列表 */}
                      <div className="w-full max-w-4xl mx-auto space-y-8">
                         {dailyMoments.map(moment => (
                             <div key={moment.id} className="bg-[#FFFAE3] border-2 border-[#9C5828] p-6 rounded-lg shadow-md relative">
                                 <div className="absolute -left-2 top-6 w-4 h-8 bg-[#8E4918] rounded-r"></div>
                                 <div className="flex justify-between items-start border-b border-[#9C5828] pb-3 mb-4">
                                     <div className="flex items-center gap-3">
                                         <span className="text-2xl font-bold text-[#5E2C0C]">{moment.date}</span>
                                         <div className="scale-125 origin-left">{moment.weather}</div>
                                     </div>
                                     <span className="text-[#8E4918] bg-[#E6C69D] px-3 py-1 rounded text-lg">心情: {moment.mood}</span>
                                 </div>
                                 <h4 className="text-3xl font-bold text-[#5E2C0C] mb-4">{moment.title}</h4>
                                 
                                 {moment.image && (
                                  <div className="mb-6 border-4 border-[#9C5828] rounded overflow-hidden shadow-sm">
                                    <img src={moment.image} alt={moment.title} className="w-full h-auto object-cover max-h-[500px]" />
                                  </div>
                                 )}
                                 {moment.content && <p className="text-2xl text-[#4A2810] leading-relaxed">{moment.content}</p>}
                             </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {/* --- 留言板 TAB (新增) --- */}
              {activeTab === 'messages' && (
                <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col">
                   <h3 className="text-4xl font-bold mb-8 text-center text-[#5E2C0C] flex items-center justify-center gap-3">
                      <MessageCircle size={32} /> 村庄留言板 <MessageCircle size={32} />
                   </h3>
                   <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 h-full">
                      
                      {!isCloudEnabled && (
                        <div className="bg-[#FFFAE3] border-l-4 border-yellow-500 p-4 text-[#8E4918] flex items-start gap-3 rounded shadow-sm">
                           <AlertTriangle size={24} className="text-yellow-600 flex-shrink-0" />
                           <div>
                             <p className="font-bold">注意：当前处于本地模式</p>
                             <p className="text-sm">留言仅保存在你的浏览器中，只有你自己能看到。若需开启公共留言，请配置 Firebase 数据库。</p>
                           </div>
                        </div>
                      )}

                      {/* 留言列表 */}
                      <div className="flex-grow overflow-auto space-y-4 pr-2 bg-[#E6C69D] p-4 rounded border-2 border-[#9C5828] shadow-inner max-h-[500px]">
                        {messages.length === 0 && (
                          <div className="text-center text-[#8E4918] text-xl py-10">暂无留言</div>
                        )}
                        {messages.map(msg => (
                          <div key={msg.id} className="bg-[#FFFAE3] p-4 rounded border border-[#9C5828] shadow-sm relative group hover:-translate-y-1 transition-transform">
                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-800 shadow-sm border border-[#5E2C0C]"></div>
                             <div className="flex justify-between items-end mb-2 border-b border-[#E6C69D] pb-1">
                                <span className="font-bold text-[#5E2C0C] text-xl">{msg.name}</span>
                                <span className="text-sm text-[#8E4918]">{msg.date}</span>
                             </div>
                             <p className="text-[#4A2810] text-xl leading-snug">{msg.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* 留言输入框 */}
                      <div className="bg-[#FFFAE3] p-6 rounded border-2 border-[#9C5828] shadow-md">
                         <h4 className="text-2xl font-bold text-[#5E2C0C] mb-4 flex items-center gap-2">
                           <Send size={20}/> 发布新留言
                         </h4>
                         <form onSubmit={handlePostMessage} className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <input 
                                  type="text" 
                                  placeholder="你的名字..." 
                                  className="bg-white border-2 border-[#8E4918] px-3 py-2 rounded text-xl focus:outline-none focus:border-[#E67E22] md:w-1/3 placeholder-[#E6C69D]"
                                  value={inputName}
                                  onChange={(e) => setInputName(e.target.value)}
                                  maxLength={10}
                                />
                                <input 
                                  type="text" 
                                  placeholder="写点什么吧..." 
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
                              发布留言
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