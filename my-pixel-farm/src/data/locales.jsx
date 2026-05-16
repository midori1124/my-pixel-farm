import React from 'react';
import { Globe, Soup, Swords, Search, Camera } from 'lucide-react';

export const WEATHER_LOCALE = {
  'clear': { zh: '晴朗', en: 'Clear', ja: '晴れ', tw: '晴朗' },
  'cloudy': { zh: '多云', en: 'Cloudy', ja: '曇り', tw: '多雲' },
  'fog': { zh: '雾', en: 'Fog', ja: '霧', tw: '霧' },
  'rain': { zh: '雨', en: 'Rain', ja: '雨', tw: '雨' },
  'snow': { zh: '雪', en: 'Snow', ja: '雪', tw: '雪' },
  'thunder': { zh: '雷暴', en: 'Thunder', ja: '雷雨', tw: '雷暴' },
  'loading': { zh: '加载中...', en: 'Loading...', ja: '読込中...', tw: '加載中...' },
  'offline': { zh: '离线', en: 'Offline', ja: 'オフライン', tw: '離線' }
};

export const locales = {
  zh: {
    tabs: { profile: '角色', skills: '技能', projects: '任务', daily: '日常', messages: '留言板' },
    topbar: { bjTime: '(BJ)' },
    avatar: { clickMe: '点我!' },
    profile: {
      name: "緑ミドリ", title: "Lv.20 大学生", farmName: "Pixel Code Farm",
      social: "社交账号:", findMe: "Find Me", log: "冒险日志",
      curFarm: "当前农场:",
      intro1: "你好！欢迎来到我的私人农场 在这里你能看到我的信息 。我会在这留下自己的生活碎片和自己的介绍 记录一下自己的人生",
      intro2: "目前我是一个在日本留学的大学生，攻读信息系统专业（情報システム）。这是我无聊敲出来的小网站，总之就是没事干。",
      intro3: "我的日语和英语不是很好，日语基本上可以听懂但是对话有点困难，英语的话只能理解简单的（抱歉）。",
      status: "状态: 睡觉中", buff: "咖啡因 Buff 生效中 (剩余 0h)"
    },
    skillsUI: { title: "技能等级" },
    skillsData: [
      { name: "网络冲浪 (Web Surfing)", level: 10 },
      { name: "个人菜谱 (Cooking)", level: 4 },
      { name: "游戏能力 (Gaming)", level: 7 },
      { name: "行动能力 (Action)", level: 5 },
      { name: "摄影 (Photography)", level: 6 },
    ],
    projectsUI: { title: "悬赏任务", newQuest: "有新任务！", reward: "奖励" },
    projectsData: [
      { id: 1, title: "大学进度", type: "学习", desc: "目前进度2/4 大二上在读", reward: "一份工作（？）", tags: [] },
      { id: 2, title: "全中国旅行点亮", type: "探索", desc: "目前已点亮 28/34。未点亮：安徽、宁夏、青海、河北、新疆、西藏。", reward: "阅历++", tags: ["旅行", "中国"] }
    ],
    dailyUI: { title: "农场日记", mood: "心情:" },
    dailyData: [
      { id: 3, date: "4月20日 18:33", title: "就是看看猫", content: "", mood: "治愈" },
      { id: 2, date: "2025年12月8日 19:30", title: "给我的头像点击20次（200金币）会有惊喜", content: "这是一个隐藏的小彩蛋，只有坚持点击的人才能发现", mood: "期待" },
      { id: 1, date: "2025年12月7日 15:22", title: "我在今天开通了这个网站 欧耶！", content: "（图片只是我学校的早餐 无意义）", mood: "开心" }
    ],
    messagesUI: {
      title: "留言板",
      localWarningTitle: "注意：当前处于本地模式",
      localWarningDesc: "黄色 WiFi 图标表示未能连接到云端。留言仅保存在你的浏览器中，只有你自己能看到。",
      empty: "暂无留言，快来抢沙发！",
      postTitle: "发布新留言",
      namePlaceholder: "你的名字...",
      msgPlaceholder: "写点什么吧...",
      postBtn: "发布留言",
      deleteConfirm: "确定要删除这条留言吗？",
      deleteError: "删除失败：你可能没有权限删除这条云端留言。",
      postError: "发布失败！请检查网络或 Firebase 规则配置。"
    }
  },
  en: {
    tabs: { profile: 'Profile', skills: 'Skills', projects: 'Quests', daily: 'Daily', messages: 'Board' },
    topbar: { bjTime: '(BJ)' },
    avatar: { clickMe: 'Click!' },
    profile: {
      name: "Midori", title: "Lv.20 Uni Student", farmName: "Pixel Code Farm",
      social: "Socials:", findMe: "Find Me", log: "Adventure Log",
      curFarm: "Current Farm:",
      intro1: "Hello! Welcome to my private farm. Here you can see my info. I will leave fragments of my life and introduce myself, recording my life journey.",
      intro2: "Currently, I am a university student studying in Japan, majoring in Information Systems. This is a small website I built out of boredom, basically because I have nothing else to do.",
      intro3: "My Japanese and English aren't very good. I can mostly understand Japanese when listening, but conversing is a bit tough. As for English, I can only understand simple phrases (sorry!).",
      status: "Status: Sleeping", buff: "Caffeine Buff Active (0h left)"
    },
    skillsUI: { title: "Skill Levels" },
    skillsData: [
      { name: "Web Surfing", level: 10 },
      { name: "Cooking", level: 4 },
      { name: "Gaming", level: 7 },
      { name: "Action", level: 5 },
      { name: "Photography", level: 6 },
    ],
    projectsUI: { title: "Bounty Quests", newQuest: "New Quest!", reward: "Reward" },
    projectsData: [
      { id: 1, title: "Uni Progress", type: "Study", desc: "Current progress 2/4. Sophomore year.", reward: "A job (?)", tags: [] },
      { id: 2, title: "Travel China", type: "Explore", desc: "Currently unlocked 28/34. Locked: Anhui, Ningxia, Qinghai, Hebei, Xinjiang, Tibet.", reward: "EXP++", tags: ["Travel", "China"] }
    ],
    dailyUI: { title: "Farm Diary", mood: "Mood:" },
    dailyData: [
      { id: 3, date: "Apr 20, 18:33", title: "Just looking at cats", content: "", mood: "Healed" },
      { id: 2, date: "Dec 8, 2025 19:30", title: "Click my avatar 20 times (200G) for a surprise", content: "This is a hidden easter egg, only those who keep clicking will find it.", mood: "Expectant" },
      { id: 1, date: "Dec 7, 2025 15:22", title: "I launched this website today, Oh yeah!", content: "(The picture is just my school breakfast, no meaning)", mood: "Happy" }
    ],
    messagesUI: {
      title: "Message Board",
      localWarningTitle: "Note: Currently in Local Mode",
      localWarningDesc: "The yellow WiFi icon means it's not connected to the cloud. Messages are only saved in your browser.",
      empty: "No messages yet, be the first to post!",
      postTitle: "Post New Message",
      namePlaceholder: "Your name...",
      msgPlaceholder: "Say something...",
      postBtn: "Post Message",
      deleteConfirm: "Are you sure you want to delete this message?",
      deleteError: "Delete failed: You may not have permission to delete this cloud message.",
      postError: "Post failed! Please check your network or Firebase rules."
    }
  },
  ja: {
    tabs: { profile: 'キャラ', skills: 'スキル', projects: 'クエスト', daily: '日常', messages: '掲示板' },
    topbar: { bjTime: '(BJ)' },
    avatar: { clickMe: 'ｸﾘｯク!' },
    profile: {
      name: "緑ミドリ", title: "Lv.20 大学生", farmName: "Pixel Code Farm",
      social: "SNS:", findMe: "Find Me", log: "冒険ログ",
      curFarm: "現在の農場:",
      intro1: "こんにちは！私のプライベート農場へようこそ。ここでは私の情報を見ることができます。生活の断片や自己紹介を残し、人生を記録していきます。",
      intro2: "現在、日本に留学している大学生で、情報システムを専攻しています。これは暇つぶしに作った小さなサイトです。とにかくやることがなくて。",
      intro3: "私の日本語と英語はあまり上手ではありません。日本語は基本的に聞き取れますが、会話は少し難しいです。英語は簡単な言葉しか理解できません（ごめんなさい）。",
      status: "状態: 睡眠中", buff: "カフェインバフ発動中 (残り0時間)"
    },
    skillsUI: { title: "スキルレベル" },
    skillsData: [
      { name: "ネットサーフィン (Web Surfing)", level: 10 },
      { name: "料理 (Cooking)", level: 4 },
      { name: "ゲーム (Gaming)", level: 7 },
      { name: "行動力 (Action)", level: 5 },
      { name: "写真 (Photography)", level: 6 },
    ],
    projectsUI: { title: "懸賞クエスト", newQuest: "新クエスト！", reward: "報酬" },
    projectsData: [
      { id: 1, title: "大学の進捗", type: "学習", desc: "現在の進捗 2/4。大学2年生。", reward: "仕事（？）", tags: [] },
      { id: 2, title: "中国全土旅行", type: "探索", desc: "現在 28/34 を解放。未解放: 安徽、寧夏、青海、河北、新疆、西蔵。", reward: "経験値++", tags: ["旅行", "中国"] }
    ],
    dailyUI: { title: "農場日記", mood: "気分:" },
    dailyData: [
      { id: 3, date: "4月20日 18:33", title: "ただ猫を見るだけ", content: "", mood: "癒やし" },
      { id: 2, date: "2025年12月8日 19:30", title: "アバターを20回（200G）クリックするとサプライズが", content: "これは隠されたイースターエッグです。クリックし続ける人だけが見つけることができます。", mood: "期待" },
      { id: 1, date: "2025年12月7日 15:22", title: "今日このサイトを開設しました。イェーイ！", content: "（画像は学校の朝食です。特に意味はありません）", mood: "嬉しい" }
    ],
    messagesUI: {
      title: "掲示板",
      localWarningTitle: "注意：現在ローカルモードです",
      localWarningDesc: "黄色のWiFiアイコンはクラウドに接続されていないことを示します。メッセージはブラウザにのみ保存されます。",
      empty: "まだメッセージはありません。最初のメッセージを投稿しましょう！",
      postTitle: "新しいメッセージを投稿",
      namePlaceholder: "名前...",
      msgPlaceholder: "何か書いてね...",
      postBtn: "投稿する",
      deleteConfirm: "このメッセージを削除してもよろしいですか？",
      deleteError: "削除に失敗しました。このクラウドメッセージを削除する権限がない可能性があります。",
      postError: "投稿に失敗しました！ネットワークまたはFirebaseのルールを確認してください。"
    }
  },
  tw: {
    tabs: { profile: '角色', skills: '技能', projects: '任務', daily: '日常', messages: '留言板' },
    topbar: { bjTime: '(BJ)' },
    avatar: { clickMe: '點我!' },
    profile: {
      name: "緑ミドリ", title: "Lv.20 大學生", farmName: "Pixel Code Farm",
      social: "社交帳號:", findMe: "Find Me", log: "冒險日誌",
      curFarm: "當前農場:",
      intro1: "你好！歡迎來到我的私人農場 在這裡你能看到我的資訊 。我會在這留下自己的生活碎片和自己的介紹 記錄一下自己的人生",
      intro2: "目前我是一個在日本留學的大學生，攻讀資訊系統專業（情報システム）。這是我無聊敲出來的小網站，總之就是沒事幹。",
      intro3: "我的日語和英語不是很好，日語基本上可以聽懂但是對話有點困難，英語的話只能理解簡單的（抱歉）。",
      status: "狀態: 睡覺中", buff: "咖啡因 Buff 生效中 (剩餘 0h)"
    },
    skillsUI: { title: "技能等級" },
    skillsData: [
      { name: "網路衝浪 (Web Surfing)", level: 10 },
      { name: "個人菜譜 (Cooking)", level: 4 },
      { name: "遊戲能力 (Gaming)", level: 7 },
      { name: "行動能力 (Action)", level: 5 },
      { name: "攝影 (Photography)", level: 6 },
    ],
    projectsUI: { title: "懸賞任務", newQuest: "有新任務！", reward: "獎勵" },
    projectsData: [
      { id: 1, title: "大學進度", type: "學習", desc: "目前進度2/4 大二上在讀", reward: "一份工作（？）", tags: [] },
      { id: 2, title: "全中國旅行點亮", type: "探索", desc: "目前已點亮 28/34。未點亮：安徽、寧夏、青海、河北、新疆、西藏。", reward: "閱歷++", tags: ["旅行", "中國"] }
    ],
    dailyUI: { title: "農場日記", mood: "心情:" },
    dailyData: [
      { id: 3, date: "4月20日 18:33", title: "就是看看貓", content: "", mood: "治癒" },
      { id: 2, date: "2025年12月8日 19:30", title: "給我的頭像點擊20次（200金幣）會有驚喜", content: "這是一個隱藏的小彩蛋，只有堅持點擊的人才能發現", mood: "期待" },
      { id: 1, date: "2025年12月7日 15:22", title: "我在今天開通了這個網站 歐耶！", content: "（圖片只是我學校的早餐 無意義）", mood: "開心" }
    ],
    messagesUI: {
      title: "留言板",
      localWarningTitle: "注意：當前處於本地模式",
      localWarningDesc: "黃色 WiFi 圖標表示未能連接到雲端。留言僅保存在你的瀏覽器中，只有你自己能看到。",
      empty: "暫無留言，快來搶沙發！",
      postTitle: "發布新留言",
      namePlaceholder: "你的名字...",
      msgPlaceholder: "寫點什麼吧...",
      postBtn: "發布留言",
      deleteConfirm: "確定要刪除這條留言嗎？",
      deleteError: "刪除失敗：你可能沒有權限刪除這條雲端留言。",
      postError: "發布失敗！請檢查網絡或 Firebase 規則配置。"
    }
  }
};

export const skillsIcons = [
  { icon: <Globe size={24} />, color: "bg-blue-500" },
  { icon: <Soup size={24} />, color: "bg-orange-500" },
  { icon: <Swords size={24} />, color: "bg-red-500" },
  { icon: <Search size={24} />, color: "bg-yellow-500" },
  { icon: <Camera size={24} />, color: "bg-purple-500" }
];

export const dailyImages = {
  3: [
    "https://img.cdn1.vip/i/6a07dcf1d2332_1778900209.webp",
    "https://img.cdn1.vip/i/6a07dc70a2e58_1778900080.webp"
  ],
  1: ["https://i.postimg.cc/d01D8Dz9/5494118cbd5d94f2e15c6250c1afa313.jpg"]
};