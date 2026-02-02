


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






// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Upload, Sparkles, RefreshCw, ShieldCheck, SendHorizontal, X, Diamond, Crown, Zap } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to the Lumière Private Suite. I am your AI Stylist. Please select an exquisite piece from our collection to begin.' }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const [userPhoto, setUserPhoto] = useState(null);

//   const chatEndRef = useRef(null);

//   const jewelleryOptions = [
//     { id: 1, name: "Royal Emerald Strings", image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, name: "Temple Heritage Set", image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, name: "Ethereal Diamond Choker", image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   // --- 1. INSTANT PREVIEW LOGIC ---
//   const generateInstantPreview = (portraitBase64, jewelleryUrl) => {
//     return new Promise((resolve) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       const userImg = new Image();
//       const jewelImg = new Image();
//       userImg.src = portraitBase64;
//       userImg.onload = () => {
//         canvas.width = userImg.width;
//         canvas.height = userImg.height;
//         ctx.drawImage(userImg, 0, 0);
//         jewelImg.crossOrigin = "anonymous";
//         jewelImg.src = `https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(jewelleryUrl)}&raw=true`; 
//         jewelImg.onload = () => {
//           const jWidth = canvas.width * 0.45;
//           const jHeight = jWidth;
//           const x = (canvas.width / 2) - (jWidth / 2);
//           const y = canvas.height * 0.42; 
//           ctx.drawImage(jewelImg, x, y, jWidth, jHeight);
//           resolve(canvas.toDataURL('image/jpeg', 0.8));
//         };
//         jewelImg.onerror = () => resolve(portraitBase64);
//       };
//     });
//   };

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
//     if (input.toLowerCase().match(/(hi|start|jewel|show|collection)/)) {
//       setStep('selecting');
//       setMessages(prev => [...prev, { type: 'bot', text: 'Displaying our curated masterpieces for your consideration...' }]);
//       jewelleryOptions.forEach(item => {
//         setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url, name: item.name }]);
//       });
//     }
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     const item = jewelleryOptions.find(j => j.id === id);
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, 
//       { type: 'user', text: `I prefer the ${item.name}.` }, 
//       { type: 'bot', text: 'An excellent choice. Please provide a portrait so I may begin the virtual draping process.' }
//     ]);
//     setStep('uploading');
//   };

// // --- Is function ko component ke bahar ya andar kahin bhi add karein ---
// const resizeImage = (base64Str) => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.src = base64Str;
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       const MAX_WIDTH = 800; // AI ke liye 800px-1024px kafi hai
//       const scaleSize = MAX_WIDTH / img.width;
//       canvas.width = MAX_WIDTH;
//       canvas.height = img.height * scaleSize;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       resolve(canvas.toDataURL('image/jpeg', 0.7)); // Quality 0.7 se file size bahut choti ho jayegi
//     };
//   });
// };

// // --- handleFileChange mein ye change karein ---
// const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = async () => {
//     const originalBase64 = reader.result;
    
//     // YAHAN CORRECTION: Pehle resize karein phir bhejein
//     const optimizedBase64 = await resizeImage(originalBase64); 
    
//     setUserPhoto(optimizedBase64);
//     setMessages(prev => [...prev, { type: 'user', text: "Portrait submitted." }]);
    
//     const selectedItem = jewelleryOptions.find(i => i.id === selectedJewellery);
//     const instantLook = await generateInstantPreview(optimizedBase64, selectedItem.image_url);
    
//     setMessages(prev => [...prev, { 
//       type: 'result', 
//       text: "✨ Analyzing details...", 
//       imageData: instantLook,
//       isTemp: true
//     }]);
    
//     await sendVirtualTryOnRequest(optimizedBase64, "Original Photo");
//   };
// };

 

// const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
//   const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//   const loadingMsgId = Date.now(); // Unique ID for this specific request

//   try {
//     setIsProcessing(true);
//     setStep('processing');

//     // 1. Initial Loading Message create karein
//     setMessages(prev => [...prev, { 
//       id: loadingMsgId,
//       type: 'result', 
//       text: "Step 1: Preparing your portrait for the Atelier...", 
//       imageData: portraitBase64, 
//       isProcessing: true 
//     }]);

//     // Fake status updates for better UX (User busy rahega)
//     const statusInterval = setTimeout(() => {
//       setMessages(prev => prev.map(m => 
//         m.id === loadingMsgId ? { ...m, text: "Step 2: AI Neural mapping & shadow calibration..." } : m
//       ));
//     }, 4500);

//     // 2. Fetch Jewellery Proxy
//     const proxyRes = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
//     const proxyData = await proxyRes.json();

//     // 3. Main Try-On API Call
//     const response = await fetch('https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         model_photo: portraitBase64,
//         clothing_photo: proxyData.base64,
//         attire: attireType 
//       }),
//     });

//     if (!response.ok) throw new Error("API Limit reached");

//     const data = await response.json();
    
//     // Response check logic (as per your backend output)
//     let resultUrl = typeof data === 'string' && data.startsWith('http') 
//                     ? data 
//                     : (data.image || data.image_url || (data.response && data.response.result));

//     clearTimeout(statusInterval); // Clear fake updates if API is fast

//     if (resultUrl) {
//       // 4. Loading message ko final result se replace karein
//       setMessages(prev => prev.map(m => 
//         m.id === loadingMsgId ? { 
//           ...m, 
//           imageData: resultUrl, 
//           isProcessing: false, 
//           text: attireType === "Original Photo" 
//                 ? "✅ Masterpiece complete. How about trying a different attire?" 
//                 : `✅ Styled perfectly in ${attireType} elegance.` 
//         } : m
//       ));
//       setStep('attire_selection');
//     }

//   } catch (error) {
//     console.error("Try-on Error:", error);
//     // Error message ko update karein
//     setMessages(prev => prev.map(m => 
//       m.id === loadingMsgId ? { 
//         ...m, 
//         isProcessing: false, 
//         text: "❌ Atelier is busy. Please try another masterpiece." 
//       } : m
//     ));
//   } finally {
//     setIsProcessing(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#050810] flex items-center justify-center p-4 font-sans text-slate-200 selection:bg-amber-500/30">
//       <div className="w-full max-w-5xl h-[92vh] grid grid-cols-1 lg:grid-cols-12 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-[#050810] backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)]">
        
//         {/* --- PREMIUM SIDEBAR --- */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-10 border-r border-white/5 bg-black/40 relative">
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-30" />
          
//           <div className="flex items-center gap-4 mb-12">
//             <div className="p-3.5 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
//               <Crown className="text-black w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black italic tracking-tighter text-white leading-none">LUMIÈRE</h1>
//               <span className="text-[10px] text-amber-500/80 font-bold uppercase tracking-[0.2em]">Haute Couture AI</span>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors group">
//               <ShieldCheck className="text-amber-500 w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
//               <p className="text-xs font-bold text-slate-200 uppercase tracking-widest">Precision Mapping</p>
//               <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Our neural engine analyzes bone structure for 99.8% accurate placement.</p>
//             </div>
            
//             <div className="p-5 rounded-3xl bg-amber-500/5 border border-amber-500/10">
//               <div className="flex items-center gap-2 mb-3">
//                 <Zap className="text-amber-500 w-4 h-4" />
//                 <span className="text-[10px] font-bold uppercase text-amber-500">System Status</span>
//               </div>
//               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//                 <motion.div 
//                   initial={{ width: "0%" }}
//                   animate={{ width: "100%" }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="h-full bg-amber-500" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-auto pt-10 border-t border-white/5">
//             <p className="text-[10px] text-slate-600 font-medium">© 2026 LUMIÈRE DIGITAL ATELIER. ALL RIGHTS RESERVED.</p>
//           </div>
//         </div>

//         {/* --- CHAT AREA --- */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full relative overflow-y-auto">
//           <header className="px-8 py-6 border-b border-white/5 bg-slate-900/40 backdrop-blur-md flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
//                 <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
//               </div>
//               <span className="text-xs font-bold text-white uppercase tracking-widest">Concierge Active</span>
//             </div>
//             <div className="flex gap-2">
//                 <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors"><X size={14}/></div>
//             </div>
//           </header>

//           <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }} 
//                   animate={{ opacity: 1, y: 0 }} 
//                   key={idx} 
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-[80%] relative ${msg.type === 'user' ? 'bg-amber-600 text-black font-medium rounded-3xl rounded-tr-none px-5 py-3.5 shadow-xl shadow-amber-600/10' : 'bg-white/5 text-slate-200 rounded-3xl rounded-tl-none border border-white/10 p-5'}`}>
//                     {msg.text && <p className="text-[13px] leading-relaxed">{msg.text}</p>}
                    
//                     {msg.type === 'jewellery' && (
//                       <motion.div 
//                         whileHover={{ y: -5 }}
//                         className="mt-4 rounded-2xl overflow-hidden border border-amber-500/20 cursor-pointer bg-black/40 group shadow-lg" 
//                         onClick={() => selectJewellery(msg.id)}
//                       >
//                         <img src={msg.imageUrl} className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110" alt="jewel" />
//                         <div className="p-3 flex justify-between items-center bg-gradient-to-t from-black to-transparent">
//                           <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">{msg.name}</span>
//                           <Diamond className="text-amber-500 w-3 h-3" />
//                         </div>
//                       </motion.div>
//                     )}

//                    {msg.type === 'result' && (
//   <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/60 relative group shadow-2xl">
//     <img src={msg.imageData} className={`w-full ${msg.isProcessing ? 'blur-sm' : ''}`} alt="result" />
    
//     {/* SCAN ANIMATION: Ab ye sirf current loading message par dikhega */}
//     {msg.isProcessing && (
      
//       <>
//         <motion.div 
//           initial={{ top: "0%" }}
//           animate={{ top: "100%" }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           className="absolute left-0 w-full h-1 bg-amber-400 shadow-[0_0_15px_#fbbf24] z-10"
//         />
//         <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
//             <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mb-2" />
//             <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">AI Sculpting...</span>
//         </div>
//       </>
//     )}
//   </div>
// )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={chatEndRef} />
//           </div>

//           <footer className="px-8 py-8 bg-black/40 border-t border-white/5 backdrop-blur-xl">
//             {step === 'uploading' && (
//               <motion.label 
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//                 className="flex flex-col items-center p-10 border-2 border-dashed border-amber-500/20 rounded-[2rem] cursor-pointer hover:bg-amber-500/5 mb-6 transition-all group"
//               >
//                 <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
//                     <Upload className="text-amber-500 w-6 h-6" />
//                 </div>
//                 <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Upload High-Resolution Portrait</span>
//                 <p className="text-[10px] text-slate-500 mt-2">Format: JPG, PNG • Max size: 10MB</p>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </motion.label>
//             )}

//             {step === 'attire_selection' && (
//               <div className="flex gap-3 mb-6 overflow-x-auto pb-4 no-scrollbar">
//                 {['Saree', 'Business Formal', 'Business Casual'].map(a => (
//                   <button 
//                     key={a} 
//                     onClick={() => sendVirtualTryOnRequest(userPhoto, a)} 
//                     className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap active:scale-95 transition-all shadow-lg flex items-center gap-2"
//                   >
//                     <Sparkles size={12} className="text-amber-500" /> Pairing with {a}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex gap-4">
//               <div className="flex-1 relative">
//                 <input 
//                   value={input} 
//                   onChange={(e) => setInput(e.target.value)} 
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendText()} 
//                   placeholder="Ask for collection or type 'Hi'..." 
//                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600" 
//                 />
//               </div>
//               <button 
//                 onClick={handleSendText} 
//                 className="bg-amber-500 p-4 rounded-2xl hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-90"
//               >
//                 <SendHorizontal className="text-black" size={24}/>
//               </button>
//             </div>
//           </footer>
//         </div>
//       </div>
      
//       {/* Background Decor */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//           <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full" />
//           <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full" />
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;

// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Send, Upload, Sparkles, RefreshCw, ShieldCheck, 
//   SendHorizontal, X, Diamond, Crown, Zap, ChevronRight,
//   User, Camera, Star
// } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to the Lumière Private Suite. I am your AI Stylist. Please select an exquisite piece from our collection to begin.' }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const [userPhoto, setUserPhoto] = useState(null);

//   const chatEndRef = useRef(null);

//   const jewelleryOptions = [
//     { id: 1, name: "Royal Emerald Strings", image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, name: "Temple Heritage Set", image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, name: "Ethereal Diamond Choker", image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   // --- LOGIC REMAINS UNTOUCHED ---
//   const generateInstantPreview = (portraitBase64, jewelleryUrl) => {
//     return new Promise((resolve) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       const userImg = new Image();
//       const jewelImg = new Image();
//       userImg.src = portraitBase64;
//       userImg.onload = () => {
//         canvas.width = userImg.width;
//         canvas.height = userImg.height;
//         ctx.drawImage(userImg, 0, 0);
//         jewelImg.crossOrigin = "anonymous";
//         jewelImg.src = `https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(jewelleryUrl)}&raw=true`; 
//         jewelImg.onload = () => {
//           const jWidth = canvas.width * 0.45;
//           const jHeight = jWidth;
//           const x = (canvas.width / 2) - (jWidth / 2);
//           const y = canvas.height * 0.42; 
//           ctx.drawImage(jewelImg, x, y, jWidth, jHeight);
//           resolve(canvas.toDataURL('image/jpeg', 0.8));
//         };
//         jewelImg.onerror = () => resolve(portraitBase64);
//       };
//     });
//   };

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
//     if (input.toLowerCase().match(/(hi|start|jewel|show|collection)/)) {
//       setStep('selecting');
//       setMessages(prev => [...prev, { type: 'bot', text: 'Displaying our curated masterpieces for your consideration...' }]);
//       jewelleryOptions.forEach(item => {
//         setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url, name: item.name }]);
//       });
//     }
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     const item = jewelleryOptions.find(j => j.id === id);
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, 
//       { type: 'user', text: `I prefer the ${item.name}.` }, 
//       { type: 'bot', text: 'An excellent choice. Please provide a portrait so I may begin the virtual draping process.' }
//     ]);
//     setStep('uploading');
//   };

//   const resizeImage = (base64Str) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.src = base64Str;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const MAX_WIDTH = 800;
//         const scaleSize = MAX_WIDTH / img.width;
//         canvas.width = MAX_WIDTH;
//         canvas.height = img.height * scaleSize;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         resolve(canvas.toDataURL('image/jpeg', 0.7));
//       };
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const originalBase64 = reader.result;
//       const optimizedBase64 = await resizeImage(originalBase64); 
//       setUserPhoto(optimizedBase64);
//       setMessages(prev => [...prev, { type: 'user', text: "Portrait submitted." }]);
//       const selectedItem = jewelleryOptions.find(i => i.id === selectedJewellery);
//       const instantLook = await generateInstantPreview(optimizedBase64, selectedItem.image_url);
//       setMessages(prev => [...prev, { 
//         type: 'result', 
//         text: "✨ Analyzing details...", 
//         imageData: instantLook,
//         isTemp: true
//       }]);
//       await sendVirtualTryOnRequest(optimizedBase64, "Original Photo");
//     };
//   };

//   const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
//     const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//     const loadingMsgId = Date.now();
//     try {
//       setIsProcessing(true);
//       setStep('processing');
//       setMessages(prev => [...prev, { 
//         id: loadingMsgId,
//         type: 'result', 
//         text: "Step 1: Preparing your portrait for the Atelier...", 
//         imageData: portraitBase64, 
//         isProcessing: true 
//       }]);

//       const statusInterval = setTimeout(() => {
//         setMessages(prev => prev.map(m => 
//           m.id === loadingMsgId ? { ...m, text: "Step 2: AI Neural mapping & shadow calibration..." } : m
//         ));
//       }, 4500);

//       const proxyRes = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
//       const proxyData = await proxyRes.json();

//       const response = await fetch('https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           model_photo: portraitBase64,
//           clothing_photo: proxyData.base64,
//           attire: attireType 
//         }),
//       });

//       if (!response.ok) throw new Error("API Limit reached");
//       const data = await response.json();
//       let resultUrl = typeof data === 'string' && data.startsWith('http') 
//                       ? data 
//                       : (data.image || data.image_url || (data.response && data.response.result));

//       clearTimeout(statusInterval);

//       if (resultUrl) {
//         setMessages(prev => prev.map(m => 
//           m.id === loadingMsgId ? { 
//             ...m, 
//             imageData: resultUrl, 
//             isProcessing: false, 
//             text: attireType === "Original Photo" 
//                   ? "✅ Masterpiece complete. How about trying a different attire?" 
//                   : `✅ Styled perfectly in ${attireType} elegance.` 
//           } : m
//         ));
//         setStep('attire_selection');
//       }
//     } catch (error) {
//       setMessages(prev => prev.map(m => 
//         m.id === loadingMsgId ? { ...m, isProcessing: false, text: "❌ Atelier is busy. Please try again." } : m
//       ));
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 font-sans text-slate-800 selection:bg-amber-200">
//       {/* Background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-100/50 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full" />
//       </div>

//       <div className="w-full max-w-6xl h-[90vh] grid grid-cols-1 lg:grid-cols-12 rounded-[3rem] border border-slate-200/60 bg-white/70 backdrop-blur-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative z-10">
        
//         {/* --- LUXURY SIDEBAR --- */}
//         <div className="hidden lg:flex lg:col-span-3 flex-col p-8 border-r border-slate-100 bg-slate-50/30">
//           <div className="flex items-center gap-3 mb-12">
//             <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
//               <Crown className="text-white w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">LUMIÈRE</h1>
//               <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mt-1">Digital Atelier</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
//               <ShieldCheck className="text-amber-500 w-5 h-5 mb-3" />
//               <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Precision Mapping</h3>
//               <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Neural analysis for seamless jewellery integration.</p>
//             </div>
//             <div className="p-5 rounded-[2rem] bg-amber-50/50 border border-amber-100/50">
//               <div className="flex items-center gap-2 mb-3">
//                 <Zap className="text-amber-600 w-4 h-4" />
//                 <span className="text-[10px] font-bold uppercase text-amber-700">Studio Sync</span>
//               </div>
//               <div className="h-1 w-full bg-amber-200/30 rounded-full overflow-hidden">
//                 <motion.div 
//                   animate={{ x: ["-100%", "100%"] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                   className="h-full w-1/2 bg-amber-500" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-auto pt-6">
//             <div className="flex -space-x-2 mb-4">
//               {[1,2,3].map(i => (
//                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
//                   <User size={14} className="text-slate-400" />
//                 </div>
//               ))}
//               <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
//             </div>
//             <p className="text-[10px] text-slate-400 font-medium tracking-wide">Join 2,400+ style enthusiasts</p>
//           </div>
//         </div>

//         {/* --- MAIN CHAT AREA --- */}
//         <div className="col-span-1 lg:col-span-9 flex flex-col h-full bg-white overflow-y-auto">
//           <header className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-3 h-3 rounded-full bg-emerald-500" />
//                 <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-40" />
//               </div>
//               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Private Stylist Session</span>
//             </div>
//             <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
//               <X size={20} />
//             </button>
//           </header>

//           <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 scroll-smooth">
//             <AnimatePresence initial={false}>
//               {messages.map((msg, idx) => (
//                 <motion.div 
//                   key={idx}
//                   initial={{ opacity: 0, y: 10, scale: 0.98 }} 
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-[75%] ${
//                     msg.type === 'user' 
//                     ? 'bg-slate-900 text-white rounded-[2rem] rounded-tr-none px-6 py-4 shadow-xl shadow-slate-200' 
//                     : 'bg-slate-50 text-slate-800 rounded-[2rem] rounded-tl-none border border-slate-100 p-6 shadow-sm'
//                   }`}>
//                     {msg.text && <p className="text-sm leading-relaxed font-medium">{msg.text}</p>}
                    
//                     {msg.type === 'jewellery' && (
//                       <motion.div 
//                         whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
//                         className="mt-5 rounded-3xl overflow-hidden border border-slate-100 bg-white cursor-pointer group transition-all" 
//                         onClick={() => selectJewellery(msg.id)}
//                       >
//                         <div className="relative h-48 overflow-hidden">
//                           <img src={msg.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="jewel" />
//                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
//                             <Star size={10} className="text-amber-500 fill-amber-500" />
//                             <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tighter">Elite</span>
//                           </div>
//                         </div>
//                         <div className="p-4 flex justify-between items-center border-t border-slate-50">
//                           <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">{msg.name}</span>
//                           <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
//                             <ChevronRight size={14} />
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {msg.type === 'result' && (
//                       <div className="mt-5 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white relative group shadow-2xl">
//                         <img src={msg.imageData} className={`w-full ${msg.isProcessing ? 'blur-md transition-all duration-700' : ''}`} alt="result" />
                        
//                         {msg.isProcessing && (
//                           <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
//                             <motion.div 
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                               className="mb-4"
//                             >
//                               <RefreshCw size={32} className="text-amber-600" />
//                             </motion.div>
//                             <span className="text-[10px] font-bold text-slate-800 uppercase tracking-[0.3em] animate-pulse">Sculpting Preview...</span>
//                             <motion.div 
//                               initial={{ left: "-100%" }}
//                               animate={{ left: "100%" }}
//                               transition={{ duration: 2, repeat: Infinity }}
//                               className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
//                             />
//                           </div>
//                         )}
//                         {!msg.isProcessing && (
//                            <motion.div 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="absolute top-4 left-4 bg-emerald-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg"
//                            >
//                             Final Render
//                            </motion.div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={chatEndRef} />
//           </div>

//           <footer className="p-8 bg-white/80 backdrop-blur-xl border-t border-slate-50">
//             {step === 'uploading' && (
//               <motion.label 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex flex-col items-center p-12 border-2 border-dashed border-slate-200 rounded-[3rem] cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 mb-8 transition-all group"
//               >
//                 <div className="w-16 h-16 rounded-[2rem] bg-white shadow-xl shadow-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border border-slate-50">
//                   <Camera className="text-amber-500 w-7 h-7" />
//                 </div>
//                 <span className="text-xs font-bold text-slate-800 uppercase tracking-[0.2em]">Upload Portrait</span>
//                 <p className="text-[10px] text-slate-400 mt-2">Clear frontal lighting recommended</p>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </motion.label>
//             )}

//             {step === 'attire_selection' && (
//               <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
//                 {['Saree', 'Modern Chic', 'Business Silk'].map(a => (
//                   <button 
//                     key={a} 
//                     onClick={() => sendVirtualTryOnRequest(userPhoto, a)} 
//                     className="bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 border border-slate-100 px-8 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all shadow-sm flex items-center gap-2"
//                   >
//                     <Sparkles size={12} className="text-amber-500" /> {a} Mode
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex gap-4 items-center bg-slate-50 p-2 rounded-[2rem] border border-slate-100 focus-within:border-amber-200 focus-within:bg-white transition-all">
//               <input 
//                 value={input} 
//                 onChange={(e) => setInput(e.target.value)} 
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendText()} 
//                 placeholder="Ask your stylist..." 
//                 className="flex-1 bg-transparent border-none px-6 py-4 text-sm focus:outline-none placeholder:text-slate-400 font-medium" 
//               />
//               <button 
//                 onClick={handleSendText} 
//                 className="bg-slate-900 text-white p-4 rounded-[1.5rem] hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
//               >
//                 <SendHorizontal size={20}/>
//               </button>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;


// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   SendHorizontal, Upload, Sparkles, RefreshCw, ShieldCheck, 
//   X, Diamond, Crown, Zap, ChevronRight, User, Camera, 
//   Star, LayoutGrid, Compass, ShoppingBag
// } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to the Lumière Private Suite. I am your AI Stylist. Please select an exquisite piece from our collection to begin.' }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const [userPhoto, setUserPhoto] = useState(null);

//   const chatEndRef = useRef(null);

//   const jewelleryOptions = [
//     { id: 1, name: "Royal Emerald Strings", image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, name: "Temple Heritage Set", image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, name: "Ethereal Diamond Choker", image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   // --- LOGIC FUNCTIONS (KEEPS YOUR CORE FUNCTIONALITY) ---
//   const generateInstantPreview = (portraitBase64, jewelleryUrl) => {
//     return new Promise((resolve) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       const userImg = new Image();
//       const jewelImg = new Image();
//       userImg.src = portraitBase64;
//       userImg.onload = () => {
//         canvas.width = userImg.width;
//         canvas.height = userImg.height;
//         ctx.drawImage(userImg, 0, 0);
//         jewelImg.crossOrigin = "anonymous";
//         jewelImg.src = `https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(jewelleryUrl)}&raw=true`; 
//         jewelImg.onload = () => {
//           const jWidth = canvas.width * 0.45;
//           const jHeight = jWidth;
//           const x = (canvas.width / 2) - (jWidth / 2);
//           const y = canvas.height * 0.42; 
//           ctx.drawImage(jewelImg, x, y, jWidth, jHeight);
//           resolve(canvas.toDataURL('image/jpeg', 0.8));
//         };
//         jewelImg.onerror = () => resolve(portraitBase64);
//       };
//     });
//   };

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
//     if (input.toLowerCase().match(/(hi|start|jewel|show|collection)/)) {
//       setStep('selecting');
//       setMessages(prev => [...prev, { type: 'bot', text: 'Displaying our curated masterpieces for your consideration...' }]);
//       jewelleryOptions.forEach(item => {
//         setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url, name: item.name }]);
//       });
//     }
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     const item = jewelleryOptions.find(j => j.id === id);
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, 
//       { type: 'user', text: `I prefer the ${item.name}.` }, 
//       { type: 'bot', text: 'An excellent choice. Please provide a portrait so I may begin the virtual draping process.' }
//     ]);
//     setStep('uploading');
//   };

//   const resizeImage = (base64Str) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.src = base64Str;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const MAX_WIDTH = 1024;
//         const scaleSize = MAX_WIDTH / img.width;
//         canvas.width = MAX_WIDTH;
//         canvas.height = img.height * scaleSize;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         resolve(canvas.toDataURL('image/jpeg', 0.7));
//       };
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const originalBase64 = reader.result;
//       const optimizedBase64 = await resizeImage(originalBase64); 
//       setUserPhoto(optimizedBase64);
//       setMessages(prev => [...prev, { type: 'user', text: "Portrait submitted." }]);
//       const selectedItem = jewelleryOptions.find(i => i.id === selectedJewellery);
//       const instantLook = await generateInstantPreview(optimizedBase64, selectedItem.image_url);
//       setMessages(prev => [...prev, { 
//         type: 'result', 
//         text: "✨ Analyzing features for precision mapping...", 
//         imageData: instantLook,
//         isTemp: true
//       }]);
//       await sendVirtualTryOnRequest(optimizedBase64, "Original Photo");
//     };
//   };

//   const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
//     const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//     const loadingMsgId = Date.now();
//     try {
//       setIsProcessing(true);
//       setStep('processing');
//       setMessages(prev => [...prev, { 
//         id: loadingMsgId,
//         type: 'result', 
//         text: "Step 1: Preparing your portrait for the Atelier...", 
//         imageData: portraitBase64, 
//         isProcessing: true 
//       }]);

//       const proxyRes = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
//       const proxyData = await proxyRes.json();

//       const response = await fetch('https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           model_photo: portraitBase64,
//           clothing_photo: proxyData.base64,
//           attire: attireType 
//         }),
//       });

//       if (!response.ok) throw new Error("API Limit reached");
//       const data = await response.json();
//       let resultUrl = typeof data === 'string' && data.startsWith('http') 
//                       ? data 
//                       : (data.image || data.image_url || (data.response && data.response.result));

//       if (resultUrl) {
//         setMessages(prev => prev.map(m => 
//           m.id === loadingMsgId ? { 
//             ...m, 
//             imageData: resultUrl, 
//             isProcessing: false, 
//             text: attireType === "Original Photo" 
//                   ? "✅ Draping complete. The masterpiece is ready for your appraisal." 
//                   : `✅ Successfully styled in ${attireType} ensemble.` 
//           } : m
//         ));
//         setStep('attire_selection');
//       }
//     } catch (error) {
//       setMessages(prev => prev.map(m => 
//         m.id === loadingMsgId ? { ...m, isProcessing: false, text: "❌ Atelier limit reached. Please try another masterpiece." } : m
//       ));
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center p-4 font-sans text-slate-800 selection:bg-amber-100">
//       {/* Dynamic Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-amber-100/40 blur-[120px] rounded-full" />
//         <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-slate-200/50 blur-[120px] rounded-full" />
//       </div>

//       <div className="w-full max-w-7xl h-[90vh] grid grid-cols-1 lg:grid-cols-12 rounded-[3.5rem] border border-white/60 bg-white/60 backdrop-blur-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative z-10">
        
//         {/* --- NAVIGATION BAR (SIDE) --- */}
//         <div className="hidden lg:flex lg:col-span-1 flex-col items-center py-10 border-r border-slate-100/50 space-y-8 bg-white/20">
//           <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
//             <Crown size={24} />
//           </div>
//           <div className="flex flex-col space-y-6 pt-10">
//             <LayoutGrid size={20} className="text-slate-400 hover:text-amber-600 cursor-pointer transition-colors" />
//             <Compass size={20} className="text-slate-400 hover:text-amber-600 cursor-pointer transition-colors" />
//             <ShoppingBag size={20} className="text-slate-400 hover:text-amber-600 cursor-pointer transition-colors" />
//           </div>
//         </div>

//         {/* --- STUDIO INFO (LEFT PANEL) --- */}
//         <div className="hidden lg:flex lg:col-span-3 flex-col p-10 bg-slate-50/40 border-r border-slate-100/50 relative">
//           <div className="mb-12">
//             <h1 className="text-2xl font-serif font-medium tracking-tight text-slate-900 leading-none">LUMIÈRE</h1>
//             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mt-2">Digital Atelier</p>
//           </div>

//           <div className="space-y-6">
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="p-6 rounded-[2.5rem] bg-white shadow-sm border border-slate-100"
//             >
//               <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//                 <ShieldCheck className="text-amber-600 w-5 h-5" />
//               </div>
//               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Precision Mapping</h3>
//               <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-medium">Neural analysis ensures seamless jewelry-to-skin integration.</p>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="p-6 rounded-[2.5rem] bg-amber-600 text-white shadow-xl shadow-amber-600/20"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <Zap size={18} />
//                 <span className="text-[10px] font-bold uppercase tracking-widest">Studio Sync</span>
//               </div>
//               <p className="text-[11px] font-medium opacity-90 leading-relaxed">Real-time calibration active. High-fidelity rendering enabled.</p>
//             </motion.div>
//           </div>

//           <div className="mt-auto pt-8">
//             <div className="flex -space-x-3 mb-4">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
//                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
//                 </div>
//               ))}
//               <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">+24</div>
//             </div>
//             <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">Private Stylist Session Active</p>
//           </div>
//         </div>

//         {/* --- ATELIER CANVAS (CHAT AREA) --- */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full bg-white relative overflow-y-auto">
//           <header className="px-12 py-8 border-b border-slate-50 flex items-center justify-between sticky top-0 z-30 bg-white/90 backdrop-blur-md">
//             <div className="flex items-center gap-4">
//               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
//               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">Concierge Active</span>
//             </div>
//             <motion.button 
//               whileHover={{ rotate: 90 }}
//               className="text-slate-300 hover:text-slate-900 transition-colors p-2"
//             >
//               <X size={24} strokeWidth={1.5} />
//             </motion.button>
//           </header>

//           <div className="flex-1 overflow-y-auto px-12 py-10 space-y-12 scroll-smooth no-scrollbar ">
//             <AnimatePresence initial={false}>
//               {messages.map((msg, idx) => (
//                 <motion.div 
//                   key={idx}
//                   initial={{ opacity: 0, y: 30, scale: 0.98 }} 
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-[75%] relative ${
//                     msg.type === 'user' 
//                     ? 'bg-slate-900 text-white rounded-[2.5rem] rounded-tr-none px-8 py-5 shadow-2xl shadow-slate-200' 
//                     : 'bg-slate-50/80 text-slate-800 rounded-[2.5rem] rounded-tl-none border border-slate-100 p-8 shadow-sm'
//                   }`}>
//                     {msg.text && <p className="text-sm leading-relaxed font-medium tracking-wide">{msg.text}</p>}
                    
//                     {msg.type === 'jewellery' && (
//                       <motion.div 
//                         whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
//                         className="mt-6 rounded-[3rem] overflow-hidden border border-white bg-white cursor-pointer group transition-all duration-500 shadow-xl" 
//                         onClick={() => selectJewellery(msg.id)}
//                       >
//                         <div className="relative h-64 overflow-hidden">
//                           <img src={msg.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="jewel" />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//                           <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-100">
//                             <Star size={12} className="text-amber-500 fill-amber-500" />
//                             <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">Masterpiece</span>
//                           </div>
//                         </div>
//                         <div className="p-6 flex justify-between items-center bg-white">
//                           <div>
//                             <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{msg.name}</span>
//                             <div className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Atelier Exclusive</div>
//                           </div>
//                           <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
//                             <ChevronRight size={18} />
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {msg.type === 'result' && (
//                       <div className="mt-6 rounded-[3.5rem] overflow-hidden border border-white bg-white relative group shadow-2xl">
//                         <img src={msg.imageData} className={`w-full h-auto object-cover ${msg.isProcessing ? 'blur-2xl transition-all duration-1000' : ''}`} alt="result" />
                        
//                         {msg.isProcessing && (
//                           <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center">
//                             <motion.div 
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                               className="mb-6 relative"
//                             >
//                               <RefreshCw size={48} className="text-amber-600" strokeWidth={1} />
//                               <motion.div 
//                                 animate={{ scale: [1, 1.2, 1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                                 className="absolute inset-0 flex items-center justify-center"
//                               >
//                                 <Sparkles size={16} className="text-amber-500" />
//                               </motion.div>
//                             </motion.div>
//                             <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em] animate-pulse">Sculpting Preview...</span>
//                           </div>
//                         )}
//                         {!msg.isProcessing && (
//                            <motion.div 
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             className="absolute top-8 left-8 bg-white/90 backdrop-blur border border-slate-100 text-slate-900 text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2"
//                            >
//                             <Diamond size={12} className="text-amber-500" /> High-Fidelity Render
//                            </motion.div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={chatEndRef} />
//           </div>

//           {/* --- LUXURY CONTROLS (FOOTER) --- */}
//           <footer className="p-10 bg-white/80 backdrop-blur-2xl border-t border-slate-50/50">
//             {step === 'uploading' && (
//               <motion.label 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex flex-col items-center p-14 border-2 border-dashed border-slate-200 rounded-[3.5rem] cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 mb-8 transition-all duration-500 group"
//               >
//                 <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-slate-50">
//                   <Camera className="text-amber-600 w-8 h-8" strokeWidth={1.5} />
//                 </div>
//                 <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em]">Upload Portrait</span>
//                 <p className="text-[10px] text-slate-400 mt-2 font-medium">Clear frontal lighting ensures the highest fidelity</p>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </motion.label>
//             )}

//             {step === 'attire_selection' && (
//               <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
//                 {['Bridal Saree', 'Modern Evening', 'Formal Silk'].map(a => (
//                   <motion.button 
//                     whileHover={{ y: -5, shadow: "0 15px 30px -5px rgba(217,119,6,0.2)" }}
//                     whileTap={{ scale: 0.95 }}
//                     key={a} 
//                     onClick={() => sendVirtualTryOnRequest(userPhoto, a)} 
//                     className="bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-100 px-8 py-5 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-sm flex items-center gap-3"
//                   >
//                     <Sparkles size={14} className="text-amber-500" /> {a} Mode
//                   </motion.button>
//                 ))}
//               </div>
//             )}

//             <div className="flex gap-5 items-center bg-slate-50/80 p-3 rounded-[2.5rem] border border-slate-100/50 focus-within:border-amber-200 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-amber-100/50 transition-all duration-500">
//               <div className="pl-6 text-slate-300">
//                 <ShoppingBag size={20} strokeWidth={1.5} />
//               </div>
//               <input 
//                 value={input} 
//                 onChange={(e) => setInput(e.target.value)} 
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendText()} 
//                 placeholder="Talk to your digital concierge..." 
//                 className="flex-1 bg-transparent border-none py-4 text-sm focus:outline-none placeholder:text-slate-400 font-medium tracking-wide" 
//               />
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSendText} 
//                 className="bg-slate-900 text-white p-5 rounded-[2rem] hover:bg-amber-600 transition-all shadow-xl"
//               >
//                 <SendHorizontal size={20} strokeWidth={2}/>
//               </motion.button>
//             </div>
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
        jewelImg.src = `https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(jewelleryUrl)}&raw=true`; 
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

      const proxyRes = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
      const proxyData = await proxyRes.json();

      const response = await fetch('https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_photo: portraitBase64,
          clothing_photo: proxyData.base64,
          attire: attireType 
        }),
      });

      if (!response.ok) throw new Error("API Limit reached");
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
      setMessages(prev => prev.map(m => 
        m.id === loadingMsgId ? { ...m, isProcessing: false, text: "❌ Atelier limit reached. Please try another masterpiece." } : m
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
          <div className="mb-12">
            <h1 className="text-2xl font-serif font-medium tracking-tight text-slate-900 leading-none">LUMIÈRE</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mt-2">Digital Atelier</p>
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
       <header className="relative flex flex-col sticky top-0 z-30 bg-slate-950 overflow-hidden border-b border-white/10">
  
  {/* 1. Top Slow-Motion Marquee (Luxury Ticker) */}
  <div className="w-full bg-emerald-500/10 py-1.5 border-b border-white/5 overflow-hidden">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-20 items-center"
    >
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-20 items-center">
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.4em]">✦ Neural AI Calibration Active</span>
          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-[0.4em]">✦ 24K Gold Fidelity Rendering</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em]">✦ Private Atelier Encryption</span>
          <span className="text-[9px] font-bold text-white uppercase tracking-[0.4em]">✦ Real-time Precision Mapping</span>
        </div>
      ))}
    </motion.div>
  </div>

  {/* 2. Main Header Content */}
  <div className="px-10 py-5 flex items-center justify-between relative backdrop-blur-2xl">
    
    {/* Left: Status with Glow */}
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-4 h-4 rounded-full bg-emerald-500/20 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Concierge <span className="text-emerald-400">Active</span></span>
        <span className="text-[8px] text-slate-500 font-medium tracking-tighter uppercase">Secured L-Protocol 2.4</span>
      </div>
    </div>

    {/* Center: Brand */}
    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
      <motion.h1 
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-white font-light text-2xl tracking-[0.6em] uppercase font-serif"
      >
        Lumière
      </motion.h1>
      <motion.div 
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1" 
      />
    </div>

    {/* Right: Actions */}
    <div className="flex items-center gap-5">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full cursor-pointer"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest">Session Vault</span>
      </motion.div>

      {/* FIXED: Cross Icon Button with High Visibility */}
      <motion.button 
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 group transition-all duration-300 hover:bg-red-500 hover:border-red-400"
      >
        <X size={20} className="text-red-500 group-hover:text-white transition-colors" strokeWidth={2.5} />
        {/* Subtle Outer Glow */}
        <div className="absolute inset-0 rounded-xl group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all" />
      </motion.button>
    </div>
  </div>
</header>

          <div className="flex-1 overflow-y-auto px-12 py-10 space-y-12 scroll-smooth no-scrollbar ">
          <AnimatePresence initial={false}>
  {messages.map((msg, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`relative ${msg.type === 'user' ? 'max-w-[80%]' : 'w-full'}`}>
        {msg.text && (
          <p className="text-sm leading-relaxed font-medium tracking-wide mb-2">
            {msg.text}
          </p>
        )}

        {msg.type === 'jewellery' && (
          <motion.div
            whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
            /* Fixed Width for consistency: w-64 or w-72 */
            className="w-64 md:w-80 mt-2 rounded-[2.5rem] overflow-hidden border border-white bg-white cursor-pointer group transition-all duration-500 shadow-xl h-[300px]"
            onClick={() => selectJewellery(msg.id)}
          >
            {/* Fixed Aspect Ratio: aspect-square ensures height & width are same */}
            <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-4">
              <img
                src={msg.imageUrl}
                /* object-contain avoids cropping, w-full h-full fills the square */
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                alt="jewel"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-slate-100">
                <Star size={10} className="text-amber-500 fill-amber-500" />
                <span className="text-[9px] font-bold text-slate-900 uppercase">Masterpiece</span>
              </div>
            </div>
            <div className="p-5 flex justify-between items-center bg-white border-t border-slate-50">
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest block truncate">
                  {msg.name}
                </span>
                <div className="text-[8px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">
                  Atelier Exclusive
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-all">
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        )}

        {msg.type === 'result' && (
          /* Aspect Ratio for result: aspect-[3/4] is standard for portraits */
          <div className="mt-4 w-64 md:w-80 rounded-[2.5rem] overflow-hidden border border-white bg-white relative shadow-xl aspect-[3/4] flex items-center justify-center bg-slate-50">
            <img
              src={msg.imageData}
              className={`w-full h-full object-contain ${msg.isProcessing ? 'blur-xl' : ''}`}
              alt="result"
            />
            
            {msg.isProcessing && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mb-4 relative"
                >
                  <RefreshCw size={40} className="text-amber-600" strokeWidth={1} />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sparkles size={14} className="text-amber-500" />
                  </motion.div>
                </motion.div>
                <span className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.3em] animate-pulse">
                  Sculpting...
                </span>
              </div>
            )}
            {!msg.isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-slate-100 text-slate-900 text-[8px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5"
              >
                <Diamond size={10} className="text-amber-500" /> High-Fidelity
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
          <footer className="p-10 bg-white/80 backdrop-blur-2xl border-t border-slate-50/50">
            {step === 'uploading' && (
              <motion.label 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center p-14 border-2 border-dashed border-slate-200 rounded-[3.5rem] cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 mb-8 transition-all duration-500 group"
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