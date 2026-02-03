


// saurab ka code pe shi he

// import React, { useState, useEffect, useRef } from 'react';

// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Upload, Sparkles, RefreshCw, Smartphone, ShieldCheck, MapPin, ChevronRight, X } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to the Royal Diamond Boutique. I am your AI Stylist. How can I assist you today? ✨', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
//   ]);
//   const [input, setInput] = useState('');
//   const [ws, setWs] = useState(null);
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isProcessing]);

//   // WebSocket Integration
//   const connectWebSocket = (initialMsg = 'start') => {
//     const socket = new WebSocket('ws://localhost:8000/webhook');
//     socket.onopen = () => socket.send(initialMsg);
//     socket.onmessage = (event) => {
//       const data = event.data;
//       try {
//         const parsed = JSON.parse(data);
//         if (parsed.type === 'jewellery_option') {
//           setMessages(prev => [...prev, { type: 'jewellery', id: parsed.id, imageUrl: parsed.image_url, text: `Signature Collection #${parsed.id}` }]);
//           setStep('selecting');
//         } else if (parsed.type === 'attire_selection') {
//           setStep('attire_selection');
//           setMessages(prev => [...prev, { type: 'bot', text: "Perfect choice. Now, select the attire for your virtual preview:" }]);
//         } else if (parsed.type === 'result') {
//           setStep('initial');
//           setIsProcessing(false);
//           setMessages(prev => [...prev, { type: 'result', text: "Your Virtual Preview is ready!", imageData: parsed.image_data }]);
//         }
//       } catch (e) {
//         setMessages(prev => [...prev, { type: 'bot', text: data }]);
//         if (data.toLowerCase().includes('photo')) setStep('uploading');
//       }
//     };
//     socket.onclose = () => setWs(null);
//     setWs(socket);
//   };

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
//     if (!ws) connectWebSocket(input);
//     else ws.send(input);
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     setMessages(prev => [...prev, { type: 'user', text: `Viewing Jewellery #${id}` }]);
//     ws.send(id.toString());
//     setIsProcessing(true);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64 = reader.result.split(',')[1];
//         setMessages(prev => [...prev, { type: 'user', text: "Portrait uploaded successfully 📷" }]);
//         ws.send(base64);
//         setIsProcessing(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const selectAttire = (type) => {
//     setMessages(prev => [...prev, { type: 'user', text: `Attire: ${type}` }]);
//     ws.send(type);
//     setIsProcessing(true);
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-indigo-950 flex items-center justify-center p-2 sm:p-4 font-sans antialiased">
      
//       {/* Decorative background elements */}
//       <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
//       <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

//       <div className="w-full max-w-4xl h-[92vh] grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-slate-900/40 backdrop-blur-3xl">
        
//         {/* Left Sidebar - Desktop Only Branding */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-8 border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
//           <div className="flex items-center gap-3 mb-12">
//             <div className="p-3 bg-gradient-to-tr from-amber-400 to-yellow-600 rounded-2xl shadow-lg shadow-amber-500/20">
//               <Sparkles className="text-slate-900 w-6 h-6" />
//             </div>
//             <h1 className="text-2xl font-black text-white tracking-tighter italic">LUMIÈRE<br/><span className="text-amber-500 text-sm not-italic font-medium tracking-widest uppercase">Jewellers</span></h1>
//           </div>

//           <div className="space-y-6">
//             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
//               <ShieldCheck className="text-amber-500 w-5 h-5 mb-2" />
//               <h3 className="text-white font-bold text-sm">Certified Luxury</h3>
//               <p className="text-xs text-slate-400">Every piece is Hallmarked & Certified by international labs.</p>
//             </div>
//             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
//               <MapPin className="text-blue-500 w-5 h-5 mb-2" />
//               <h3 className="text-white font-bold text-sm">Global Shipping</h3>
//               <p className="text-xs text-slate-400">Insured worldwide delivery within 5-7 business days.</p>
//             </div>
//           </div>

//           <div className="mt-auto p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20">
//               <p className="text-[10px] text-amber-200/70 uppercase font-bold mb-1">Exclusive Offer</p>
//               <p className="text-sm text-white font-medium">Get 20% off on your first Virtual Try-On purchase!</p>
//           </div>
//         </div>

//         {/* Main Chat Area */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full relative">
          
//           {/* Mobile Header */}
//           <header className="p-5 flex items-center justify-between border-b border-white/5 bg-slate-900/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center border border-white/20">
//                   <Smartphone className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#020617] rounded-full"></div>
//               </div>
//               <div>
//                 <h2 className="text-white text-sm font-bold tracking-tight leading-none">AI Boutique Concierge</h2>
//                 <span className="text-[10px] text-slate-400 font-medium">Personal Stylist Online</span>
//               </div>
//             </div>
//             <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
//           </header>

//           {/* Messages Area */}
//           <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl shadow-lg relative ${
//                     msg.type === 'user' 
//                       ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none' 
//                       : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
//                   }`}>
//                     <p className="text-sm leading-relaxed">{msg.text}</p>
                    
//                     {/* Jewellery Grid */}
//                     {msg.type === 'jewellery' && (
//                       <motion.div 
//                         whileHover={{ scale: 1.02 }} 
//                         className="mt-4 overflow-hidden rounded-2xl bg-black/40 border border-white/10 group cursor-pointer"
//                         onClick={() => selectJewellery(msg.id)}
//                       >
//                         <img src={msg.imageUrl} alt="Jewellery" className="w-full h-44 object-cover group-hover:opacity-80 transition-all" />
//                         <div className="p-3 flex items-center justify-between bg-white/5">
//                           <span className="text-xs font-bold text-amber-400 tracking-wider">PREMIUM SELECTION</span>
//                           <ChevronRight className="w-4 h-4 text-white" />
//                         </div>
//                       </motion.div>
//                     )}

//                     {/* Final Result Image */}
//                     {msg.type === 'result' && (
//                       <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="mt-4 rounded-2xl overflow-hidden ring-4 ring-amber-500/20 shadow-2xl">
//                         <img src={`data:image/png;base64,${msg.imageData}`} alt="Result" className="w-full" />
//                       </motion.div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* AI Thinking Animation */}
//             {isProcessing && (
//               <div className="flex justify-start">
//                 <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full flex items-center gap-3 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.1)]">
//                   <div className="flex gap-1.5">
//                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
//                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                   </div>
//                   <span className="text-[11px] text-blue-400 font-bold uppercase tracking-widest">Processing Look</span>
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Dynamic Input/Controls Area */}
//           <footer className="p-5 sm:p-7 bg-white/[0.02] border-t border-white/5">
//             <AnimatePresence mode="wait">
//               {step === 'uploading' && (
//                 <motion.label 
//                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
//                   className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-[2rem] cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all mb-4"
//                 >
//                   <div className="p-4 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform">
//                     <Upload className="w-6 h-6 text-blue-500" />
//                   </div>
//                   <span className="mt-3 text-xs text-slate-300 font-bold tracking-wide uppercase">Click to upload portrait</span>
//                   <p className="text-[10px] text-slate-500 mt-1 italic">Clear, front-facing photo works best</p>
//                   <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//                 </motion.label>
//               )}

//               {step === 'attire_selection' && (
//                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3 mb-5 overflow-x-auto no-scrollbar">
//                   {['Saree', 'Business Formal', 'Business Casual'].map(a => (
//                     <button key={a} onClick={() => selectAttire(a)} className="whitespace-nowrap px-6 py-3 bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
//                       {a}
//                     </button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="relative flex items-center gap-2 group">
//               <input 
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
//                 placeholder="Type 'Hi' to see our collection..." 
//                 className="flex-1 bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-sm group-focus-within:bg-white/10 placeholder:text-slate-600 shadow-inner"
//               />
//               <button 
//                 onClick={handleSendText}
//                 className="p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white rounded-[1.2rem] transition-all active:scale-95 shadow-lg"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
            
//             <p className="text-center mt-4 text-[9px] text-slate-600 font-medium tracking-[0.2em] uppercase">Powered by Lumière AI Vision v4.0</p>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;







import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SendHorizontal, Upload, Sparkles, RefreshCw, ShieldCheck, 
  X, Diamond, Crown, Zap, ChevronRight, User, Camera, 
  Star, LayoutGrid, Compass, ShoppingBag
} from 'lucide-react';

const VirtualTryOn = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome to the Lumière Private Suite. I am your AI Stylist. Please select an exquisite piece from our collection to begin.' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState('initial'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedJewellery, setSelectedJewellery] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const chatEndRef = useRef(null);

  const jewelleryOptions = [
    { id: 1, name: "Royal Emerald Strings", image_url: '/new_jewellery1.jpeg' },
    { id: 2, name: "Temple Heritage Set", image_url: '/new_jewellery2.jpeg' },
    { id: 3, name: "Ethereal Diamond Choker", image_url: '/new_jewellery3.jpeg' },
    { id: 4, name: "Majestic Gold Rani Haar", image_url: '/new_jewellery5.jpg' },
    { id: 5, name: "Celestial Pearl Droplets", image_url: '/new_jewellery6.webp' },
    { id: 6, name: "Vintage Ruby Medallion", image_url: '/new_jewellery7.jpg' }
  ];



  useLayoutEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // --- LOGIC FUNCTIONS (KEEPS YOUR CORE FUNCTIONALITY) ---
  const generateInstantPreview = (portraitBase64, jewelleryUrl) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const userImg = new Image();
      const jewelImg = new Image();
      userImg.src = portraitBase64;
      userImg.onload = () => {
        canvas.width = userImg.width;
        canvas.height = userImg.height;
        ctx.drawImage(userImg, 0, 0);
        jewelImg.crossOrigin = "anonymous";
        jewelImg.src = ` https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(jewelleryUrl)}&raw=true`; 
        jewelImg.onload = () => {
          const jWidth = canvas.width * 0.45;
          const jHeight = jWidth;
          const x = (canvas.width / 2) - (jWidth / 2);
          const y = canvas.height * 0.42; 
          ctx.drawImage(jewelImg, x, y, jWidth, jHeight);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        jewelImg.onerror = () => resolve(portraitBase64);
      };
    });
  };

  const handleSendText = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    if (input.toLowerCase().match(/(hi|start|jewel|show|collection)/)) {
      setStep('selecting');
      setMessages(prev => [...prev, { type: 'bot', text: 'Displaying our curated masterpieces for your consideration...' }]);
      jewelleryOptions.forEach(item => {
        setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url, name: item.name }]);
      });
    }
    setInput('');
  };

  const selectJewellery = (id) => {
    const item = jewelleryOptions.find(j => j.id === id);
    setSelectedJewellery(id);
    setMessages(prev => [...prev, 
      { type: 'user', text: `I prefer the ${item.name}.` }, 
      { type: 'bot', text: 'An excellent choice. Please provide a portrait so I may begin the virtual draping process.' }
    ]);
    setStep('uploading');
  };

  const resizeImage = (base64Str) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const originalBase64 = reader.result;
      const optimizedBase64 = await resizeImage(originalBase64); 
      setUserPhoto(optimizedBase64);
      setMessages(prev => [...prev, { type: 'user', text: "Portrait submitted." }]);
      const selectedItem = jewelleryOptions.find(i => i.id === selectedJewellery);
      const instantLook = await generateInstantPreview(optimizedBase64, selectedItem.image_url);
      setMessages(prev => [...prev, { 
        type: 'result', 
        text: "✨ Analyzing features for precision mapping...", 
        imageData: instantLook,
        isTemp: true
      }]);
      await sendVirtualTryOnRequest(optimizedBase64, "Original Photo");
    };
  };



  const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
  const item = jewelleryOptions.find(i => i.id === selectedJewellery);
  const loadingMsgId = Date.now();
  
  try {
    setIsProcessing(true);
    setStep('processing');
    setMessages(prev => [...prev, { 
      id: loadingMsgId,
      type: 'result', 
      text: "Step 1: Preparing your portrait for the Atelier...", 
      imageData: portraitBase64, 
      isProcessing: true 
    }]);

    let jewelleryBase64 = "";

    // --- CORRECTION LOGIC START ---
    if (item.image_url.startsWith('http')) {
      // Agar online link hai toh purana proxy logic
      const proxyRes = await fetch(` https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
      const proxyData = await proxyRes.json();
      jewelleryBase64 = proxyData.base64;
    } else {
      // Agar local path hai (/new_jewellery...), toh use browser se fetch karke base64 banayein
      const localRes = await fetch(item.image_url);
      const blob = await localRes.blob();
      jewelleryBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }
    // --- CORRECTION LOGIC END ---

    const response = await fetch(' https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model_photo: portraitBase64,
        clothing_photo: jewelleryBase64, // Ab ye hamesha base64 rahega
        attire: attireType 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || "API Limit reached");
    }

    const data = await response.json();
    let resultUrl = typeof data === 'string' && data.startsWith('http') 
                    ? data 
                    : (data.image || data.image_url || (data.response && data.response.result));

    if (resultUrl) {
      setMessages(prev => prev.map(m => 
        m.id === loadingMsgId ? { 
          ...m, 
          imageData: resultUrl, 
          isProcessing: false, 
          text: attireType === "Original Photo" 
                ? "✅ Draping complete. The masterpiece is ready for your appraisal." 
                : `✅ Successfully styled in ${attireType} ensemble.` 
        } : m
      ));
      setStep('attire_selection');
    }
  } catch (error) {
    console.error("Try-on Error:", error);
    setMessages(prev => prev.map(m => 
      m.id === loadingMsgId ? { 
        ...m, 
        isProcessing: false, 
        text: `❌ Error: ${error.message || "Atelier limit reached"}` 
      } : m
    ));
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center p-4 font-sans text-slate-800 selection:bg-amber-100">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-amber-100/40 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-slate-200/50 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl h-[90vh] grid grid-cols-1 lg:grid-cols-12 rounded-[3.5rem] border border-white/60 bg-white/60 backdrop-blur-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative z-10">
        
        {/* --- NAVIGATION BAR (SIDE) --- */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center py-10 border-r border-slate-100/50 space-y-8 bg-white/20">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Crown size={24} />
          </div>
          <div className="flex flex-col space-y-6 pt-10">
            <LayoutGrid size={20} className="text-slate-400 hover:text-amber-600 cursor-pointer transition-colors" />
            <Compass size={20} className="text-slate-400 hover:text-amber-600 cursor-pointer transition-colors" />
            <ShoppingBag size={20} className="text-slate-400 hover:text-amber-600 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* --- STUDIO INFO (LEFT PANEL) --- */}
        <div className="hidden lg:flex lg:col-span-3 flex-col p-10 bg-slate-50/40 border-r border-slate-100/50 relative">
          {/* <div className="mb-12">
            <h1 className="text-2xl font-serif font-medium tracking-tight text-slate-900 leading-none">LUMIÈRE</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mt-2">Digital Atelier</p>
          </div> */}
          <div className="mb-12 flex flex-col items-start group">
  {/* Logo Wrapper with Ambient Glow */}
  <div className="relative">
    {/* Animated Background Glow (Logo ke piche halki chamak) */}
    <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="relative flex items-center gap-4">
      {/* 1. The Image Logo */}
      <div className="relative">
        <img 
          src="Rlai.jpeg" // Apni file ka path yahan daalein
          alt="RLAI Logo"
          className="h-12 w-auto object-contain brightness-110 contrast-125 rounded-xl" 
        />
        {/* Shine Overlay on Logo */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        />
      </div>

      {/* 2. Vertical Elegant Divider */}
      <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      {/* 3. Brand Text */}
      <div className="flex flex-col">
       
      </div>
    </div>
  </div>

  {/* Subtitle / Tagline */}
  <div className="mt-3 flex items-center gap-3 overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: '1.5rem' }}
      className="h-[1px] bg-amber-500/60" 
    />
  </div>
</div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-[2.5rem] bg-white shadow-sm border border-slate-100"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="text-amber-600 w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Precision Mapping</h3>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-medium">Neural analysis ensures seamless jewelry-to-skin integration.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-[2.5rem] bg-amber-600 text-white shadow-xl shadow-amber-600/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Studio Sync</span>
              </div>
              <p className="text-[11px] font-medium opacity-90 leading-relaxed">Real-time calibration active. High-fidelity rendering enabled.</p>
            </motion.div>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex -space-x-3 mb-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">+24</div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">Private Stylist Session Active</p>
          </div>
        </div>

        {/* --- ATELIER CANVAS (CHAT AREA) --- */}
        <div className="col-span-1 lg:col-span-8 flex flex-col h-full bg-white relative overflow-y-auto">
          {/* <header className="px-12 py-8 border-b border-slate-50 flex items-center justify-between sticky top-0 z-30 bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">Concierge Active</span>
            </div>
            <motion.button 
              whileHover={{ rotate: 90 }}
              className="text-slate-300 hover:text-slate-900 transition-colors p-2"
            >
              <X size={24} strokeWidth={1.5} />
            </motion.button>
          </header> */}
 <header className="relative sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 overflow-hidden">
  
  {/* 1. Ultra-Thin Animated Shine Effect (Shinny Glass look) */}
  <motion.div 
    animate={{ x: ['-200%', '200%'] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 w-[100%]"
  />

  {/* 2. Top Ticker (Height reduced) */}
  <div className="w-full bg-white/[0.02] py-1 border-b border-white/5 overflow-hidden relative z-10">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-16 items-center"
    >
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-16 items-center ">
       <span className="text-[7px] font-bold text-white/80 uppercase tracking-[0.5em] flex items-center gap-2">
    <span className="text-emerald-400">✦</span> Neural AI Active
  </span>
  <span className="text-[7px] font-bold text-white/80 uppercase tracking-[0.5em] flex items-center gap-2">
    <span className="text-amber-400">✦</span> 24K Gold Fidelity
  </span>
  <span className="text-[7px] font-bold text-white/80 uppercase tracking-[0.5em] flex items-center gap-2">
    <span className="text-slate-400">✦</span> Private Encryption
  </span>
        </div>
      ))}
    </motion.div>
  </div>

  {/* 3. Main Header (Height significantly reduced: py-2) */}
  <div className="px-10  flex items-center justify-between relative z-10">
    
    {/* Left: Compact Status */}
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-3 h-3 rounded-full bg-emerald-500/20 animate-ping" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
      </div>
      <div className="flex flex-col -space-y-0.5">
        <span className="text-[8px] font-black text-white uppercase tracking-wider">LUMIÈRE <span className="text-emerald-400">LIVE</span></span>
        <span className="text-[6px] text-slate-500 font-bold uppercase">Encrypted</span>
      </div>
    </div>

    {/* Center: Brand (Smaller & Elegant) */}
    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
      <motion.h1 
        className="text-white font-light text-base tracking-[0.6em] uppercase font-serif"
      >
        Lumière
      </motion.h1>
      <div className="h-[0.5px] w-8 bg-amber-400/40 mt-0.5" />
    </div>

    {/* Right: Actions (More compact) */}
    <div className="flex items-center gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full cursor-pointer"
      >
        <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">Vault</span>
      </motion.div>

      {/* Compact X Icon */}
      <motion.button 
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 group transition-all"
      >
        <X size={14} className="text-red-500 group-hover:text-white" strokeWidth={3} />
        <div className="absolute inset-0 rounded-lg group-hover:bg-red-500/20 blur-sm transition-all" />
      </motion.button>
    </div>
  </div>
</header>
          

          <div className="flex-1 overflow-y-auto px-12 py-10 space-y-12 scroll-smooth no-scrollbar ">
         <AnimatePresence initial={false}>
  {messages.map((msg, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`relative ${msg.type === 'user' ? 'max-w-[80%]' : 'w-full'}`}>
        {msg.text && (
          <p className="text-[13px] leading-relaxed font-medium tracking-wide mb-3 text-slate-800">
            {msg.text}
          </p>
        )}

        {msg.type === 'jewellery' && (
          <motion.div
            whileHover={{ y: -5, shadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
            /* Size Reduced for a cleaner look */
            className="w-56 md:w-64 mt-2 rounded-[2rem] overflow-hidden border border-slate-100 bg-white cursor-pointer group transition-all duration-500 shadow-lg"
            onClick={() => selectJewellery(msg.id)}
          >
            {/* Aspect ratio kept tight to reduce vertical space */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center p-6">
              <img
                src={msg.imageUrl}
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                alt="jewel"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-slate-50">
                <Star size={8} className="text-amber-500 fill-amber-500" />
                <span className="text-[7px] font-black text-slate-900 uppercase tracking-tighter">Masterpiece</span>
              </div>
            </div>
            
            <div className="p-4 flex justify-between items-center bg-white">
              <div className="overflow-hidden">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest block truncate">
                  {msg.name}
                </span>
                <div className="text-[7px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">
                  Atelier Exclusive
                </div>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-all">
                <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>
        )}

        {msg.type === 'result' && (
          /* Reduced size and tight aspect ratio for the result card */
          <div className="mt-3 w-56 md:w-64 rounded-[2rem] overflow-hidden border border-slate-100 bg-white relative shadow-lg aspect-[4/3] flex items-center justify-center bg-slate-50">
            <img
              src={msg.imageData}
              className={`w-full h-full object-contain ${msg.isProcessing ? 'blur-2xl' : ''}`}
              alt="result"
            />
            
            {msg.isProcessing && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mb-3"
                >
                  <RefreshCw size={24} className="text-slate-900" strokeWidth={1.5} />
                </motion.div>
                <span className="text-[8px] font-black text-slate-900 uppercase tracking-[0.2em] animate-pulse">
                  Sculpting...
                </span>
              </div>
            )}
            
            {!msg.isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-3 left-3 bg-slate-900 text-white text-[7px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1"
              >
                <Diamond size={8} className="text-emerald-400" /> High-Fidelity
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  ))}
</AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* --- LUXURY CONTROLS (FOOTER) --- */}
          <footer className="p-2 bg-white/80 backdrop-blur-2xl border-t border-slate-50/50">
            {step === 'uploading' && (
              <motion.label 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center p-2 border-2 border-dashed border-slate-200 rounded-[3.5rem] cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 mb-8 transition-all duration-500 group"
              >
                <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-slate-50">
                  <Camera className="text-amber-600 w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em]">Upload Portrait</span>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Clear frontal lighting ensures the highest fidelity</p>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </motion.label>
            )}

            {step === 'attire_selection' && (
              <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                {['Bridal Saree', 'Modern Evening', 'Formal Silk'].map(a => (
                  <motion.button 
                    whileHover={{ y: -5, shadow: "0 15px 30px -5px rgba(217,119,6,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    key={a} 
                    onClick={() => sendVirtualTryOnRequest(userPhoto, a)} 
                    className="bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-100 px-8 py-5 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-sm flex items-center gap-3"
                  >
                    <Sparkles size={14} className="text-amber-500" /> {a} Mode
                  </motion.button>
                ))}
              </div>
            )}

            <div className="flex gap-5 items-center bg-slate-50/80 p-3 rounded-[2.5rem] border border-slate-100/50 focus-within:border-amber-200 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-amber-100/50 transition-all duration-500">
              <div className="pl-6 text-slate-300">
                <ShoppingBag size={20} strokeWidth={1.5} />
              </div>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendText()} 
                placeholder="Talk to your digital concierge..." 
                className="flex-1 bg-transparent border-none py-4 text-sm focus:outline-none placeholder:text-slate-400 font-medium tracking-wide" 
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendText} 
                className="bg-slate-900 text-white p-5 rounded-[2rem] hover:bg-amber-600 transition-all shadow-xl"
              >
                <SendHorizontal size={20} strokeWidth={2}/>
              </motion.button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;




        // https://virtual-try-backend-bgtk.onrender.com/
// 