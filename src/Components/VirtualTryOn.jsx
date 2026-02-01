// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Upload, Sparkles, RefreshCw } from 'lucide-react';

// const VirtualTryOn = () => {
//   // States
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [ws, setWs] = useState(null);
//   const [step, setStep] = useState('initial'); // initial, selecting, uploading, attire_selection, processing
//   const [selectedFile, setSelectedFile] = useState(null);
//   const chatEndRef = useRef(null);

//   // Auto Scroll
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, step]);

//   // Connect WebSocket Logic
//   const connectWebSocket = (initialMsg = 'start') => {
//     const socket = new WebSocket('ws://localhost:8000/webhook');

//     socket.onopen = () => {
//       console.log('Connected to AI Server');
//       socket.send(initialMsg);
//     };

//     socket.onmessage = (event) => {
//       const data = event.data;
//       try {
//         const parsed = JSON.parse(data);

//         if (parsed.type === 'jewellery_option') {
//           setMessages(prev => [...prev, {
//             type: 'jewellery',
//             id: parsed.id,
//             imageUrl: parsed.image_url,
//             text: `Jewellery Option ${parsed.id}`
//           }]);
//           setStep('selecting');
//         } 
//         else if (parsed.type === 'attire_selection') {
//           setStep('attire_selection');
//           setMessages(prev => [...prev, { type: 'bot', text: "Please select your preferred attire:" }]);
//         }
//         else if (parsed.type === 'result') {
//           setStep('initial');
//           setMessages(prev => [...prev, {
//             type: 'result',
//             text: "Here is your virtual try-on result!",
//             imageData: parsed.image_data // Base64 from API
//           }]);
//         }
//       } catch (e) {
//         // Handle Plain Text Messages
//         setMessages(prev => [...prev, { type: 'bot', text: data }]);
        
//         // Check if bot is asking for photo
//         if (data.toLowerCase().includes('photo') || data.toLowerCase().includes('send')) {
//           setStep('uploading');
//         }
//       }
//     };

//     socket.onclose = () => setWs(null);
//     setWs(socket);
//   };

//   // Actions
//   const handleSendText = () => {
//     if (!input.trim()) return;
    
//     const userMsg = { type: 'user', text: input };
//     setMessages(prev => [...prev, userMsg]);

//     if (!ws) {
//       connectWebSocket();
//     } else {
//       ws.send(input);
//     }
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     setMessages(prev => [...prev, { type: 'user', text: `Selected Jewellery #${id}` }]);
//     ws.send(id.toString());
//     setStep('processing');
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64 = reader.result.split(',')[1];
//         setMessages(prev => [...prev, { type: 'user', text: "Photo uploaded 📸" }]);
//         ws.send(base64);
//         setStep('processing');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const selectAttire = (type) => {
//     setMessages(prev => [...prev, { type: 'user', text: `Attire: ${type}` }]);
//     ws.send(type);
//     setStep('processing');
//   };

//   return (
//     <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans">
//       <div className="w-full max-w-2xl h-[85vh] bg-slate-800/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
//         {/* Premium Header */}
//         <div className="p-5 border-b border-white/5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/30">
//               <Sparkles className="text-white w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-white font-bold tracking-tight">AI Virtual Try-On</h2>
//               <div className="flex items-center gap-1.5">
//                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                 <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">System Active</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
//           <AnimatePresence>
//             {messages.map((msg, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`max-w-[80%] p-4 rounded-2xl shadow-xl ${
//                   msg.type === 'user' 
//                     ? 'bg-blue-600 text-white rounded-tr-none' 
//                     : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
//                 }`}>
//                   <p className="text-sm leading-relaxed">{msg.text}</p>
                  
//                   {/* Jewellery Grid Component */}
//                   {msg.type === 'jewellery' && (
//                     <motion.div whileHover={{ scale: 1.02 }} className="mt-3 bg-black/20 p-2 rounded-xl border border-white/5 cursor-pointer" onClick={() => selectJewellery(msg.id)}>
//                       <img src={msg.imageUrl} alt="Jewellery" className="rounded-lg w-full h-40 object-cover" />
//                       <button className="w-full mt-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all">Select This</button>
//                     </motion.div>
//                   )}

//                   {/* Result Image Component */}
//                   {msg.type === 'result' && (
//                     <div className="mt-3 rounded-xl overflow-hidden ring-2 ring-blue-500/50">
//                       <img src={`data:image/png;base64,${msg.imageData}`} alt="Result" className="w-full" />
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {/* Loading Animation */}
//           {step === 'processing' && (
//             <div className="flex justify-start">
//               <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
//                 <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
//                 <span className="text-xs text-slate-400 italic">AI is generating your look...</span>
//               </div>
//             </div>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Dynamic Controls Area */}
//         <div className="p-6 bg-black/20 border-t border-white/5">
//           {/* File Upload UI */}
//           {step === 'uploading' && (
//             <motion.label initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:bg-white/5 transition-all mb-4">
//               <Upload className="w-8 h-8 text-blue-400 mb-2" />
//               <span className="text-xs text-slate-400 font-medium">Click to upload your portrait</span>
//               <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//             </motion.label>
//           )}

//           {/* Attire Selection Buttons */}
//           {step === 'attire_selection' && (
//             <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
//               {['Saree', 'Business Formal', 'Business Casual'].map(a => (
//                 <button key={a} onClick={() => selectAttire(a)} className="whitespace-nowrap px-4 py-2 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 text-blue-100 rounded-full text-xs font-bold transition-all">
//                   {a}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Text Input */}
//           <div className="relative flex items-center">
//             <input 
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
//               placeholder="Type 'hi' to start..." 
//               className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
//             />
//             <button onClick={handleSendText} className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-transform active:scale-95">
//               <Send className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;

  // import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
  // import { motion, AnimatePresence } from 'framer-motion';
  // import { Send, Upload, Sparkles, RefreshCw, Smartphone, ShieldCheck, MapPin, ChevronRight, Trash2, Diamond } from 'lucide-react';

  // const VirtualTryOn = () => {
  //   // --- States ---
  //   const [messages, setMessages] = useState([
  //     { type: 'bot', text: 'Welcome to Lumière Jewellers. Experience the future of luxury with our AI Virtual Try-On. ✨', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  //   ]);
  //   const [input, setInput] = useState('');
  //   const [ws, setWs] = useState(null);
  //   const [step, setStep] = useState('initial'); 
  //   const [isProcessing, setIsProcessing] = useState(false);
    
  //   const chatContainerRef = useRef(null);
  //   const chatEndRef = useRef(null);

  //   // --- Auto Scroll Logic (Enhanced Fix) ---
  //   const scrollToBottom = () => {
  //     if (chatEndRef.current) {
  //       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   };

  //   useLayoutEffect(() => {
  //     scrollToBottom();
  //   }, [messages, isProcessing, step]);

  //   // --- WebSocket Connection ---
  //   const connectWebSocket = (initialMsg = 'start') => {
  //     const socket = new WebSocket('ws://localhost:8000/webhook');
      
  //     socket.onopen = () => {
  //       socket.send(initialMsg);
  //     };

  //     socket.onmessage = (event) => {
  //       const data = event.data;
  //       try {
  //         const parsed = JSON.parse(data);
  //         if (parsed.type === 'jewellery_option') {
  //           setMessages(prev => [...prev, { 
  //             type: 'jewellery', 
  //             id: parsed.id, 
  //             imageUrl: parsed.image_url, 
  //             text: `Signature Boutique Piece #${parsed.id}` 
  //           }]);
  //           setStep('selecting');
  //         } else if (parsed.type === 'attire_selection') {
  //           setStep('attire_selection');
  //           setMessages(prev => [...prev, { type: 'bot', text: "Please select your preferred attire for the final preview:" }]);
  //         } else if (parsed.type === 'result') {
  //           setIsProcessing(false);
  //           setStep('initial');
  //           setMessages(prev => [...prev, { 
  //             type: 'result', 
  //             text: "Your Virtual Try-On result is ready! How do you look?", 
  //             imageData: parsed.image_data 
  //           }]);
  //         }
  //       } catch (e) {
  //         setMessages(prev => [...prev, { type: 'bot', text: data }]);
  //         if (data.toLowerCase().includes('photo') || data.toLowerCase().includes('send')) setStep('uploading');
  //       }
  //     };

  //     socket.onclose = () => setWs(null);
  //     setWs(socket);
  //   };

  //   // --- Actions ---
  //   const handleSendText = () => {
  //     if (!input.trim()) return;
  //     setMessages(prev => [...prev, { type: 'user', text: input }]);
  //     if (!ws) connectWebSocket(input);
  //     else ws.send(input);
  //     setInput('');
  //   };

  //   const selectJewellery = (id) => {
  //     setMessages(prev => [...prev, { type: 'user', text: `Try on Jewellery #${id}` }]);
  //     if (ws) ws.send(id.toString());
  //     setIsProcessing(true);
  //   };

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64 = reader.result.split(',')[1];
  //         setMessages(prev => [...prev, { type: 'user', text: "Portrait uploaded 📸" }]);
  //         if (ws) ws.send(base64);
  //         setIsProcessing(true);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const selectAttire = (type) => {
  //     setMessages(prev => [...prev, { type: 'user', text: `Style: ${type}` }]);
  //     if (ws) ws.send(type);
  //     setIsProcessing(true);
  //   };

  //   const resetChat = () => {
  //     setMessages([{ type: 'bot', text: 'Reset complete. Which masterpiece shall we try next? ✨' }]);
  //     setStep('initial');
  //     setIsProcessing(false);
  //   };

  //   return (
  //     <div className=" bg-[#020617] flex items-center justify-center p-0 sm:p-4 font-sans relative overflow-hidden">
        
  //       {/* Dynamic Background */}
  //       <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
  //       <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[80%] bg-amber-900/10 rounded-full blur-[120px]"></div>

  //       <div className="w-full max-w-6xl h-screen sm:h-[90vh] grid grid-cols-1 lg:grid-cols-12 bg-slate-950/50 backdrop-blur-3xl sm:rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden z-10 mt-24">
          
  //         {/* --- FIXED LEFT SIDEBAR --- */}
  //         <div className="hidden lg:flex lg:col-span-4 flex-col p-10 border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent sticky top-0 h-full">
  //           <div className="flex items-center gap-4 mb-16">
  //             <div className="p-3 bg-amber-500 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
  //               <Diamond className="text-black w-6 h-6" />
  //             </div>
  //             <div>
  //               <h1 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">LUMIÈRE</h1>
  //               <span className="text-amber-500 text-[10px] font-bold tracking-[0.5em] uppercase">Jewellers</span>
  //             </div>
  //           </div>

  //           <div className="space-y-10">
  //             {[
  //               { icon: <ShieldCheck className="text-amber-500" />, title: "Certified Luxury", desc: "Every piece is Hallmarked & Certified by international labs." },
  //               { icon: <MapPin className="text-blue-500" />, title: "Global Shipping", desc: "Insured worldwide delivery within 5-7 business days." }
  //             ].map((item, i) => (
  //               <div key={i} className="group cursor-default">
  //                 <div className="flex items-center gap-3 mb-2">
  //                   {item.icon}
  //                   <h3 className="text-white font-bold text-sm uppercase tracking-wider">{item.title}</h3>
  //                 </div>
  //                 <p className="text-xs text-slate-400 leading-relaxed pl-8 group-hover:text-slate-200 transition-colors">{item.desc}</p>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="mt-auto relative group">
  //             <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
  //             <div className="relative p-6 rounded-[1.8rem] bg-slate-900 border border-amber-500/20">
  //               <Sparkles className="absolute top-4 right-4 w-5 h-5 text-amber-500/30" />
  //               <p className="text-[10px] text-amber-500 uppercase font-black mb-1">Exclusive Offer</p>
  //               <p className="text-sm text-white font-medium">Get 20% off on your first Virtual Try-On purchase!</p>
  //             </div>
  //           </div>
  //         </div>

  //         {/* --- SCROLLABLE CHAT AREA --- */}
  //         <div className="col-span-1 lg:col-span-8 flex flex-col h-full bg-black/20"style={{ overflowY: 'auto' }}>
            
  //           {/* Header */}
  //           <header className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-slate-900/40 backdrop-blur-md">
  //             <div className="flex items-center gap-4">
  //               <div className="relative">
  //                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-white/10 shadow-lg">
  //                   <Smartphone className="w-6 h-6 text-white" />
  //                 </div>
  //                 <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0a0f1e] rounded-full"></span>
  //               </div>
  //               <div>
  //                 <h2 className="text-white text-base font-bold">AI Stylist Concierge</h2>
  //                 <div className="flex items-center gap-1.5">
  //                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lumière Visionary Engine</span>
  //                 </div>
  //               </div>
  //             </div>
  //             <button onClick={resetChat} className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all border border-transparent hover:border-red-400/20">
  //               <Trash2 className="w-5 h-5" />
  //             </button>
  //           </header>

  //           {/* Messages Scrollbox */}
  //           <div 
  //             ref={chatContainerRef}
  //             className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar"
  //           >
  //             <AnimatePresence initial={false}>
  //               {messages.map((msg, idx) => (
  //                 <motion.div
  //                   key={idx}
  //                   initial={{ opacity: 0, y: 10, scale: 0.98 }}
  //                   animate={{ opacity: 1, y: 0, scale: 1 }}
  //                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
  //                 >
  //                   <div className={`max-w-[85%] p-5 rounded-[1.8rem] shadow-xl ${
  //                     msg.type === 'user' 
  //                       ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none' 
  //                       : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
  //                   }`}>
  //                     <p className="text-sm leading-relaxed">{msg.text}</p>
                      
  //                     {/* Jewellery Selection Card */}
  //                     {msg.type === 'jewellery' && (
  //                       <motion.div 
  //                         whileHover={{ y: -4 }}
  //                         className="mt-4 rounded-3xl bg-black/40 border border-amber-500/30 overflow-hidden cursor-pointer group shadow-2xl"
  //                         onClick={() => selectJewellery(msg.id)}
  //                       >
  //                         <div className="relative h-48">
  //                           <img src={msg.imageUrl} alt="Jewellery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
  //                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
  //                             <span className="text-[10px] text-white font-black uppercase tracking-widest">Click to Try On</span>
  //                           </div>
  //                         </div>
  //                         <div className="p-4 flex items-center justify-between bg-white/5">
  //                           <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase">Signature Collection</span>
  //                           <div className="bg-amber-500 p-1.5 rounded-full text-black shadow-lg shadow-amber-500/40"><ChevronRight className="w-4 h-4" /></div>
  //                         </div>
  //                       </motion.div>
  //                     )}

  //                     {/* AI Result Image */}
  //                     {msg.type === 'result' && (
  //                       <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="mt-4 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black ring-1 ring-white/10">
  //                         <img src={`data:image/png;base64,${msg.imageData}`} alt="Result" className="w-full" />
  //                       </motion.div>
  //                     )}
  //                   </div>
  //                 </motion.div>
  //               ))}
  //             </AnimatePresence>

  //             {isProcessing && (
  //               <div className="flex justify-start">
  //                 <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-full flex items-center gap-3 animate-pulse">
  //                   <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
  //                   <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">Crafting Masterpiece...</span>
  //                 </div>
  //               </div>
  //             )}
  //             <div ref={chatEndRef} className="h-4" />
  //           </div>

  //           {/* Footer Controls */}
  //           <footer className="p-8 bg-gradient-to-t from-black/40 to-transparent">
  //             <AnimatePresence mode="wait">
  //               {step === 'uploading' && (
  //                 <motion.label 
  //                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
  //                   className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-[2.2rem] cursor-pointer hover:bg-blue-600/5 hover:border-blue-500/40 transition-all mb-6 group"
  //                 >
  //                   <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Upload className="w-6 h-6 text-blue-500" /></div>
  //                   <span className="mt-3 text-[10px] text-slate-300 font-black uppercase tracking-widest">Upload Portrait</span>
  //                   <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
  //                 </motion.label>
  //               )}

  //               {step === 'attire_selection' && (
  //                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
  //                   {['Saree', 'Business Formal', 'Business Casual' , 'Default'].map(a => (
  //                     <button key={a} onClick={() => selectAttire(a)} className="whitespace-nowrap px-8 py-4 bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-black text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all">
  //                       {a}
  //                     </button>
  //                   ))}
  //                 </motion.div>
  //               )}
  //             </AnimatePresence>

  //             <div className="relative flex items-center gap-3">
  //               <input 
  //                 value={input}
  //                 onChange={(e) => setInput(e.target.value)}
  //                 onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
  //                 placeholder="Talk to your luxury stylist..." 
  //                 className="flex-1 bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all text-sm placeholder:text-slate-600"
  //               />
  //               <button 
  //                 onClick={handleSendText}
  //                 className="p-5 bg-gradient-to-tr from-amber-400 to-yellow-600 text-black rounded-[1.2rem] shadow-lg shadow-amber-500/20 active:scale-90 transition-all"
  //               >
  //                 <Send className="w-5 h-5" />
  //               </button>
  //             </div>
  //           </footer>
  //         </div>
  //       </div>

  //       <style jsx="true">{`
  //         .no-scrollbar::-webkit-scrollbar { display: none; }
  //         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  //         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  //         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  //         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.2); border-radius: 10px; }
  //         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.4); }
  //       `}</style>
  //     </div>
  //   );
  // };

  // export default VirtualTryOn;


// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Upload, Sparkles, RefreshCw, Smartphone, ShieldCheck, MapPin, ChevronRight, Trash2, Diamond } from 'lucide-react';

// const VirtualTryOn = () => {
//   // --- States ---
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to Lumière Jewellers. Experience the future of luxury with our AI Virtual Try-On. ✨', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const chatContainerRef = useRef(null);
//   const chatEndRef = useRef(null);

//   // --- Auto Scroll Logic ---
//   const scrollToBottom = () => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useLayoutEffect(() => {
//     scrollToBottom();
//   }, [messages, isProcessing, step]);

//   // --- Simulate Jewellery Options ---
//   const jewelleryOptions = [
//     { id: 1, image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   // --- Actions ---
//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
    
//     if (input.toLowerCase().includes('hi') || input.toLowerCase().includes('jewellery')) {
//       setMessages(prev => [
//         ...prev,
//         { type: 'bot', text: 'Please choose a jewellery piece to try on.' }
//       ]);
//       setStep('selecting');
//       showJewelleryOptions();
//     } else {
//       setMessages(prev => [...prev, { type: 'bot', text: 'I didn’t understand that. Please select your jewellery.' }]);
//     }
//     setInput('');
//   };

//   const showJewelleryOptions = () => {
//     jewelleryOptions.forEach((item) => {
//       setMessages(prev => [
//         ...prev,
//         { type: 'jewellery', id: item.id, imageUrl: item.image_url, text: `Signature Piece #${item.id}` }
//       ]);
//     });
//   };

//   const selectJewellery = (id) => {
//     setMessages(prev => [...prev, { type: 'user', text: `Try on Jewellery #${id}` }]);
//     setMessages(prev => [
//       ...prev,
//       { type: 'bot', text: `You've selected Jewellery #${id}. Please upload your portrait.` }
//     ]);
//     setStep('uploading');
//     setIsProcessing(true);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64 = reader.result.split(',')[1];
//         setMessages(prev => [...prev, { type: 'user', text: "Portrait uploaded 📸" }]);
//         setIsProcessing(false);

//         // Simulate result by showing a processed image
//         setMessages(prev => [
//           ...prev,
//           { type: 'result', text: "Your Virtual Try-On result is ready! How do you look?", imageData: base64 }
//         ]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const resetChat = () => {
//     setMessages([{ type: 'bot', text: 'Reset complete. Which masterpiece shall we try next? ✨' }]);
//     setStep('initial');
//     setIsProcessing(false);
//   };

//   return (
//     <div className=" bg-[#020617] flex items-center justify-center p-0 sm:p-4 font-sans relative overflow-hidden">
//       {/* Dynamic Background */}
//       <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
//       <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[80%] bg-amber-900/10 rounded-full blur-[120px]"></div>

//       <div className="w-full max-w-6xl h-screen sm:h-[90vh] grid grid-cols-1 lg:grid-cols-12 bg-slate-950/50 backdrop-blur-3xl sm:rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden z-10 mt-24">
//         {/* --- FIXED LEFT SIDEBAR --- */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-10 border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent sticky top-0 h-full">
//           <div className="flex items-center gap-4 mb-16">
//             <div className="p-3 bg-amber-500 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
//               <Diamond className="text-black w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">LUMIÈRE</h1>
//               <span className="text-amber-500 text-[10px] font-bold tracking-[0.5em] uppercase">Jewellers</span>
//             </div>
//           </div>
//           <div className="space-y-10">
//             {[{ icon: <ShieldCheck className="text-amber-500" />, title: "Certified Luxury", desc: "Every piece is Hallmarked & Certified by international labs." },
//             { icon: <MapPin className="text-blue-500" />, title: "Global Shipping", desc: "Insured worldwide delivery within 5-7 business days." }].map((item, i) => (
//                 <div key={i} className="group cursor-default">
//                   <div className="flex items-center gap-3 mb-2">
//                     {item.icon}
//                     <h3 className="text-white font-bold text-sm uppercase tracking-wider">{item.title}</h3>
//                   </div>
//                   <p className="text-xs text-slate-400 leading-relaxed pl-8 group-hover:text-slate-200 transition-colors">{item.desc}</p>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* --- SCROLLABLE CHAT AREA --- */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full bg-black/20" style={{ overflowY: 'auto' }}>
//           {/* Header */}
//           <header className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-slate-900/40 backdrop-blur-md">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-white/10 shadow-lg">
//                   <Smartphone className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0a0f1e] rounded-full"></span>
//               </div>
//               <div>
//                 <h2 className="text-white text-base font-bold">AI Stylist Concierge</h2>
//                 <div className="flex items-center gap-1.5">
//                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lumière Visionary Engine</span>
//                 </div>
//               </div>
//             </div>
//             <button onClick={resetChat} className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all border border-transparent hover:border-red-400/20">
//               <Trash2 className="w-5 h-5" />
//             </button>
//           </header>

//           {/* Messages Scrollbox */}
//           <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar">
//             <AnimatePresence initial={false}>
//               {messages.map((msg, idx) => (
//                 <motion.div key={idx} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-[85%] p-5 rounded-[1.8rem] shadow-xl ${
//                     msg.type === 'user'
//                       ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none'
//                       : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
//                   }`}>
//                     <p className="text-sm leading-relaxed">{msg.text}</p>

//                     {/* Jewellery Selection Cards */}
//                     {msg.type === 'jewellery' && (
//                       <motion.div
//                         whileHover={{ y: -4 }}
//                         className="mt-4 rounded-3xl bg-black/40 border border-amber-500/30 overflow-hidden cursor-pointer group shadow-2xl"
//                         onClick={() => selectJewellery(msg.id)}
//                       >
//                         <div className="relative h-48">
//                           <img src={msg.imageUrl} alt="Jewellery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
//                             <span className="text-[10px] text-white font-black uppercase tracking-widest">Click to Try On</span>
//                           </div>
//                         </div>
//                         <div className="p-4 flex items-center justify-between bg-white/5">
//                           <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase">Signature Collection</span>
//                           <div className="bg-amber-500 p-1.5 rounded-full text-black shadow-lg shadow-amber-500/40"><ChevronRight className="w-4 h-4" /></div>
//                         </div>
//                       </motion.div>
//                     )}

//                     {/* AI Result Image */}
//                     {msg.type === 'result' && (
//                       <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="mt-4 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black ring-1 ring-white/10">
//                         <img src={`data:image/png;base64,${msg.imageData}`} alt="Result" className="w-full" />
//                       </motion.div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {isProcessing && (
//               <div className="flex justify-start">
//                 <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-full flex items-center gap-3 animate-pulse">
//                   <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
//                   <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">Crafting Masterpiece...</span>
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} className="h-4" />
//           </div>

//           {/* Footer Controls */}
//           <footer className="p-8 bg-gradient-to-t from-black/40 to-transparent">
//             <AnimatePresence mode="wait">
//               {step === 'uploading' && (
//                 <motion.label
//                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
//                   className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-[2.2rem] cursor-pointer hover:bg-blue-600/5 hover:border-blue-500/40 transition-all mb-6 group"
//                 >
//                   <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Upload className="w-6 h-6 text-blue-500" /></div>
//                   <span className="mt-3 text-[10px] text-slate-300 font-black uppercase tracking-widest">Upload Portrait</span>
//                   <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//                 </motion.label>
//               )}
//             </AnimatePresence>

//             <div className="relative flex items-center gap-3">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
//                 placeholder="Talk to your luxury stylist..."
//                 className="flex-1 bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all text-sm placeholder:text-slate-600"
//               />
//               <button
//                 onClick={handleSendText}
//                 className="p-5 bg-gradient-to-tr from-amber-400 to-yellow-600 text-black rounded-[1.2rem] shadow-lg shadow-amber-500/20 active:scale-90 transition-all"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;



// abhi ka code
// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Upload, RefreshCw, Smartphone, ShieldCheck, MapPin, Trash2, Diamond } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to Lumière Jewellers. Experience the future of luxury with our AI Virtual Try-On. ✨' }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const chatEndRef = useRef(null);

//   const jewelleryOptions = [
//     { id: 1, image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
    
//     if (input.toLowerCase().includes('hi') || input.toLowerCase().includes('jewel')) {
//       setTimeout(() => {
//         setMessages(prev => [...prev, { type: 'bot', text: 'Please choose a jewellery piece to try on.' }]);
//         setStep('selecting');
//         showJewelleryOptions();
//       }, 500);
//     }
//     setInput('');
//   };

//   const showJewelleryOptions = () => {
//     jewelleryOptions.forEach((item) => {
//       setMessages(prev => [
//         ...prev,
//         { type: 'jewellery', id: item.id, imageUrl: item.image_url, text: `Signature Piece #${item.id}` }
//       ]);
//     });
//   };

//   const selectJewellery = (id) => {
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, 
//       { type: 'user', text: `Try on Jewellery #${id}` },
//       { type: 'bot', text: `Perfect! Now, upload a clear photo of your face/neck.` }
//     ]);
//     setStep('uploading');
//   };

// const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setMessages(prev => [...prev, { type: 'user', text: "Portrait uploaded 📸" }]);
//     setIsProcessing(true);

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//         const portraitBase64 = reader.result; // Get full base64 string with data URL prefix
        
//         // Log the base64 string to check if it's being converted correctly
//         console.log("Base64 Image Data:", portraitBase64);

//         await sendVirtualTryOnRequest(portraitBase64); // Pass this full base64 to the backend
//     };
// };


// const sendVirtualTryOnRequest = async (portraitBase64) => {
//     const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//     if (!item) return;

//     try {
//         setIsProcessing(true);
//         console.log("Step 1: Fetching Jewellery via Proxy...");

//         const proxyRes = await fetch(`http://localhost:8000/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
        
//         if (!proxyRes.ok) {
//             const errorData = await proxyRes.json();
//             throw new Error(errorData.error || 'Proxy error');
//         }

//         const proxyData = await proxyRes.json();
//         if (!proxyData.base64) throw new Error("Invalid base64 from proxy");

//         console.log("Step 2: Sending to AI API...");

//         const response = await fetch('http://localhost:8000/api/try-on', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 model_photo: portraitBase64,
//                 clothing_photo: proxyData.base64
//             }),
//         });

//         // AI Response lein
//         const data = await response.json();
//         console.log("Full API Response:", data); 

//         // --- FIXED LOGIC STARTS HERE ---
//         let finalImg = null;

//         // 1. Agar API ne direct string (URL) bheji hai
//         if (typeof data === 'string' && data.startsWith('http')) {
//             finalImg = data;
//         } 
//         // 2. Agar API ne object bheja hai toh usme fields check karein
//         else if (data && typeof data === 'object') {
//             finalImg = data.image || data.response || data.image_url || data.image_data;
//         }

//         if (finalImg) {
//             // Check karein ki URL hai ya Base64
//             const formattedImg = finalImg.startsWith('http') ? finalImg : `data:image/png;base64,${finalImg}`;
            
//             setMessages(prev => [...prev, { 
//                 type: 'result', 
//                 text: "✨ Here is your luxury look!", 
//                 imageData: formattedImg 
//             }]);
//         } else {
//             console.log("AI returned something unexpected:", data); 
//             throw new Error("Could not find image in AI response");
//         }
//         // --- FIXED LOGIC ENDS HERE ---

//     } catch (error) {
//         console.error('Final Error:', error);
//         setMessages(prev => [...prev, { 
//             type: 'bot', 
//             text: `Error: ${error.message}. Please try again.` 
//         }]);
//     } finally {
//         setIsProcessing(false);
//     }
// };



//   const resetChat = () => {
//     setMessages([{ type: 'bot', text: 'Chat reset. What would you like to try? ✨' }]);
//     setStep('initial');
//     setIsProcessing(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-0 sm:p-4 font-sans">
//       <div className="w-full max-w-6xl h-screen sm:h-[90vh] grid grid-cols-1 lg:grid-cols-12 bg-slate-950 border border-white/10 shadow-2xl overflow-hidden rounded-none sm:rounded-3xl">
        
//         {/* Sidebar */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-10 border-r border-white/5 bg-slate-900/20">
//           <div className="flex items-center gap-4 mb-16">
//             <Diamond className="text-amber-500 w-8 h-8" />
//             <h1 className="text-2xl font-black text-white italic uppercase">LUMIÈRE</h1>
//           </div>
//           <div className="space-y-6 text-slate-400 text-sm">
//             <div className="flex items-center gap-3"><ShieldCheck className="text-amber-500 w-5" /> AI Virtual Fitting</div>
//             <div className="flex items-center gap-3"><MapPin className="text-blue-500 w-5" /> 24/7 Concierge</div>
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full">
//           <header className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-slate-900/40">
//             <div className="flex items-center gap-4">
//               <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
//                 <Smartphone className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-white font-bold text-sm">AI Stylist</h2>
//             </div>
//             <button onClick={resetChat} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={20} /></button>
//           </header>

//           <div className="flex-1 overflow-y-auto p-6 space-y-6">
//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-[85%] p-4 rounded-2xl ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-200 border border-white/10'}`}>
//                     <p className="text-sm">{msg.text}</p>
//                     {msg.type === 'jewellery' && (
//                       <div className="mt-4 rounded-xl overflow-hidden border border-amber-500/30 cursor-pointer" onClick={() => selectJewellery(msg.id)}>
//                         <img src={msg.imageUrl} alt="Jewellery" className="w-full h-40 object-cover" />
//                         <div className="p-2 bg-amber-500 text-black text-[10px] font-bold text-center">SELECT THIS PIECE</div>
//                       </div>
//                     )}
//                     {msg.type === 'result' && (
//                       <div className="mt-4 rounded-xl overflow-hidden shadow-2xl">
//                         <img src={msg.imageData} alt="Result" className="w-full h-auto" />
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isProcessing && (
//               <div className="flex gap-2 items-center text-amber-500 text-xs font-bold animate-pulse">
//                 <RefreshCw className="animate-spin w-4" /> AI PROCESSING...
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           <footer className="p-6 bg-slate-950/50">
//             {step === 'uploading' && !isProcessing && (
//               <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:bg-white/5 mb-4">
//                 <Upload className="w-6 h-6 text-blue-500 mb-1" />
//                 <span className="text-[10px] text-slate-400 font-bold uppercase">Click to upload photo</span>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </label>
//             )}
//             <div className="flex items-center gap-3">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
//                 placeholder="Type 'Hi' to start..."
//                 className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
//               />
//               <button onClick={handleSendText} className="p-4 bg-amber-500 rounded-xl text-black hover:bg-amber-400">
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;



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
// import { Send, Upload, Sparkles, RefreshCw, Smartphone, ShieldCheck, MapPin, ChevronRight, X } from 'lucide-react';

// const VirtualTryOn = () => {
//   // --- States ---
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to the Royal Diamond Boutique. I am your AI Stylist. How can I assist you today? ✨', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const [userPhoto, setUserPhoto] = useState(null);

//   const chatEndRef = useRef(null);

//   // --- Jewellery Data ---
//   const jewelleryOptions = [
//     { id: 1, image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   // --- Handlers ---
//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
    
//     if (input.toLowerCase().includes('hi') || input.toLowerCase().includes('jewel') || input.toLowerCase().includes('start')) {
//       setTimeout(() => {
//         setMessages(prev => [...prev, { type: 'bot', text: 'Please choose a jewellery piece to try on.' }]);
//         setStep('selecting');
//         showJewelleryOptions();
//       }, 500);
//     }
//     setInput('');
//   };

//   const showJewelleryOptions = () => {
//     jewelleryOptions.forEach((item) => {
//       setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url, text: `Signature Piece #${item.id}` }]);
//     });
//   };

//   const selectJewellery = (id) => {
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, 
//       { type: 'user', text: `Try on Jewellery #${id}` },
//       { type: 'bot', text: `Perfect! Now, upload a clear photo of your face/neck.` }
//     ]);
//     setStep('uploading');
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       setUserPhoto(reader.result); // Base64 with prefix
//       setMessages(prev => [...prev, { type: 'user', text: "Portrait uploaded 📸" }]);
//       setStep('attire_selection');
//       setMessages(prev => [...prev, { type: 'bot', text: "Final step: Select your preferred attire for the preview." }]);
//     };
//   };

//   const selectAttire = async (type) => {
//     setMessages(prev => [...prev, { type: 'user', text: `Style: ${type}` }]);
//     await sendVirtualTryOnRequest(userPhoto, type);
//   };

//   const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
//     const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//     if (!item) return;

//     try {
//       setIsProcessing(true);
      
//       // 1. Fetch Jewelry via Proxy
//       const proxyRes = await fetch(`http://localhost:8000/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
//       const proxyData = await proxyRes.json();
      
//       // 2. Send to Backend
//       const response = await fetch('http://localhost:8000/api/try-on', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           model_photo: portraitBase64, // Full base64 (Backend will handle prefix)
//           clothing_photo: proxyData.base64,
//           attire: attireType
//         }),
//       });

//     const data = await response.json();
//       console.log("AI Response:", data);

//       // --- FIXED LOGIC ---
//       // Agar 'data' khud ek string hai jo 'http' se start ho rahi hai, 
//       // toh wahi hamari image hai.
//       let resultUrl = "";
      
//       if (typeof data === 'string' && data.startsWith('http')) {
//         resultUrl = data;
//       } else {
//         // Agar object hai, toh inme se koi ek hoga
//         resultUrl = data.image || data.image_url || (data.response && data.response.result) || data.result;
//       }

//       if (resultUrl) {
//         setMessages(prev => [...prev, { 
//           type: 'result', 
//           text: `✨ Looking stunning in ${attireType}!`, 
//           imageData: resultUrl 
//         }]);
//         setStep('initial');
//       } else {
//         console.error("No URL found in:", data);
//         throw new Error("Result URL not found in response");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessages(prev => [...prev, { type: 'bot', text: "AI is busy or session expired. Please try again." }]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-2 sm:p-4 font-sans text-slate-200">
//       <div className="w-full max-w-4xl h-[92vh] grid grid-cols-1 lg:grid-cols-12 rounded-[2.5rem] border border-white/10 shadow-2xl bg-slate-900/40 backdrop-blur-3xl overflow-hidden">
        
//         {/* Left Sidebar */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-8 border-r border-white/5">
//           <div className="flex items-center gap-3 mb-12">
//             <div className="p-3 bg-gradient-to-tr from-amber-400 to-yellow-600 rounded-2xl shadow-lg shadow-amber-500/20">
//               <Sparkles className="text-slate-900 w-6 h-6" />
//             </div>
//             <h1 className="text-xl font-black text-white italic uppercase tracking-tighter">Lumière</h1>
//           </div>
//           <div className="space-y-4">
//              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
//                 <ShieldCheck className="text-amber-500 w-5 h-5 mb-2" />
//                 <p className="text-xs font-bold text-slate-300">Certified Luxury Assets</p>
//                 <p className="text-[10px] text-slate-500 mt-1">Each piece is verified for 24k authenticity.</p>
//              </div>
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full bg-slate-950/20">
//           <header className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-900/40">
//             <div className="flex items-center gap-3">
//                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center">
//                  <Smartphone className="w-5 h-5 text-blue-400" />
//                </div>
//                <div>
//                  <span className="text-white font-bold text-sm block leading-none">AI Stylist</span>
//                  <span className="text-[10px] text-emerald-400">● Online</span>
//                </div>
//             </div>
//           </header>

//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 10 }} 
//                   animate={{ opacity: 1, y: 0 }}
//                   key={idx} 
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'}`}>
//                     <p className="text-sm leading-relaxed">{msg.text}</p>
//                     {msg.type === 'jewellery' && (
//                       <div className="mt-3 rounded-xl overflow-hidden cursor-pointer border border-amber-500/30 group" onClick={() => selectJewellery(msg.id)}>
//                         <img src={msg.imageUrl} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" alt="jewelry" />
//                         <div className="bg-amber-500 p-2 text-[10px] text-center font-bold text-slate-900 uppercase tracking-widest">Select Piece</div>
//                       </div>
//                     )}
//                     {msg.type === 'result' && (
//                       <div className="mt-3 rounded-xl overflow-hidden bg-black/40 border border-white/10">
//                          <img src={msg.imageData} className="w-full shadow-lg" alt="tryon result" />
//                          <button className="w-full py-2 bg-white/5 text-[10px] font-bold uppercase hover:bg-white/10 transition-colors">Download Preview</button>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isProcessing && (
//               <div className="flex items-center gap-2 text-amber-500 text-xs font-medium">
//                 <RefreshCw className="w-3 h-3 animate-spin" />
//                 <span>AI is crafting your luxury preview...</span>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           <footer className="p-4 bg-slate-900/60 backdrop-blur-xl border-t border-white/5">
//             {step === 'uploading' && (
//               <motion.label initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center p-8 border-2 border-dashed border-blue-500/30 rounded-2xl cursor-pointer hover:bg-blue-500/5 transition-all mb-4">
//                 <Upload className="text-blue-500 w-10 h-10 mb-2 animate-bounce" />
//                 <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Upload Portrait</span>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </motion.label>
//             )}

//             {step === 'attire_selection' && (
//               <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
//                 {['Saree', 'Business Formal', 'Business Casual'].map(a => (
//                   <button key={a} onClick={() => selectAttire(a)} className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-amber-500/20 whitespace-nowrap active:scale-95 transition-transform">
//                     {a} Style
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex gap-2">
//               <input 
//                 value={input} 
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
//                 placeholder="Talk to your stylist..."
//                 className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
//               />
//               <button onClick={handleSendText} className="bg-blue-600 hover:bg-blue-500 p-3.5 rounded-2xl text-white shadow-lg shadow-blue-500/30 transition-all active:scale-90">
//                 <Send size={20}/>
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
// import { Send, Upload, Sparkles, RefreshCw, Smartphone, ShieldCheck, SendHorizontal, X } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to Lumière AI Stylist. Choose a jewellery piece to begin your transformation. ✨' }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const [userPhoto, setUserPhoto] = useState(null);

//   const chatEndRef = useRef(null);

//   const jewelleryOptions = [
//     { id: 1, image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
//     if (input.toLowerCase().match(/(hi|start|jewel)/)) {
//       setStep('selecting');
//       jewelleryOptions.forEach(item => {
//         setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url }]);
//       });
//     }
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, { type: 'user', text: `Jewellery #${id}` }, { type: 'bot', text: 'Beautiful choice! Now, upload your photo.' }]);
//     setStep('uploading');
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const base64 = reader.result;
//       setUserPhoto(base64);
//       setMessages(prev => [...prev, { type: 'user', text: "Photo uploaded 📸" }]);
//       // Step 1: Automatically try on original photo first
//       await sendVirtualTryOnRequest(base64, "Original Photo");
//     };
//   };

//   const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
//     const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//     try {
//       setIsProcessing(true);
//       setStep('processing');

//       const proxyRes = await fetch(`http://localhost:8000/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
//       const proxyData = await proxyRes.json();
      
//       const response = await fetch('http://localhost:8000/api/try-on', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           model_photo: portraitBase64,
//           clothing_photo: proxyData.base64,
//           attire: attireType
//         }),
//       });

//       const data = await response.json();
//       let resultUrl = typeof data === 'string' && data.startsWith('http') ? data : (data.image || data.image_url || (data.response && data.response.result));

//       if (resultUrl) {
//         setMessages(prev => [...prev, { 
//           type: 'result', 
//           text: attireType === "Original Photo" ? "Here is the preview on your original photo. Want to try a different style?" : `Looking great in ${attireType}!`, 
//           imageData: resultUrl 
//         }]);
//         // Step 2: Show attire options ONLY after the first result comes
//         setStep('attire_selection');
//       }
//     } catch (error) {
//       setMessages(prev => [...prev, { type: 'bot', text: "Stylist is busy. Try again." }]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans text-slate-200">
//       <div className="w-full max-w-4xl h-[90vh] grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
        
//         {/* Sidebar */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-8 border-r border-white/5 bg-black/20">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-3 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"><Sparkles className="text-black w-5 h-5" /></div>
//             <h1 className="text-xl font-black italic tracking-tighter text-white">LUMIÈRE</h1>
//           </div>
//           <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
//             <ShieldCheck className="text-amber-500 w-5 h-5 mb-2" />
//             <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Real-time VTO</p>
//             <p className="text-[10px] text-slate-500 mt-1">Our AI maps jewellery to your neckline automatically.</p>
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full relative overflow-y-auto">
//           <header className="p-5 border-b border-white/5 bg-slate-900/60 flex items-center gap-3">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-sm font-bold text-white tracking-wide">AI Concierge</span>
//           </header>

//           <div className="flex-1 overflow-y-auto p-6 space-y-6">
//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-[85%] p-4 rounded-2xl ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'}`}>
//                     {msg.text && <p className="text-sm">{msg.text}</p>}
//                     {msg.type === 'jewellery' && (
//                       <div className="mt-3 rounded-xl overflow-hidden border border-amber-500/30 cursor-pointer group" onClick={() => selectJewellery(msg.id)}>
//                         <img src={msg.imageUrl} className="w-full h-32 object-cover transition-transform group-hover:scale-105" alt="jewel" />
//                         <div className="bg-amber-500 p-2 text-[10px] text-center font-bold text-black uppercase">Try This</div>
//                       </div>
//                     )}
//                     {msg.type === 'result' && (
//                       <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-black/20">
//                         <img src={msg.imageData} className="w-full shadow-2xl" alt="result" />
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isProcessing && <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold uppercase tracking-widest"><RefreshCw className="w-3 h-3 animate-spin" /> Rendering Look...</div>}
//             <div ref={chatEndRef} />
//           </div>

//           <footer className="p-4 bg-black/40 border-t border-white/5">
//             {step === 'uploading' && (
//               <label className="flex flex-col items-center p-8 border-2 border-dashed border-blue-500/20 rounded-2xl cursor-pointer hover:bg-blue-500/5 mb-4">
//                 <Upload className="text-blue-500 w-8 h-8 mb-2" />
//                 <span className="text-[10px] font-black text-blue-400 uppercase">Upload Portrait</span>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </label>
//             )}

//             {step === 'attire_selection' && (
//               <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
//                 {['Saree', 'Business Formal', 'Business Casual'].map(a => (
//                   <button key={a} onClick={() => sendVirtualTryOnRequest(userPhoto, a)} className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-2.5 rounded-xl text-[10px] font-black uppercase whitespace-nowrap active:scale-95 transition-all shadow-lg shadow-amber-500/10">
//                     Wear {a}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex gap-2">
//               <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendText()} placeholder="Type 'Hi' to see collection..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50" />
//               <button onClick={handleSendText} className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-colors"><SendHorizontal size={20}/></button>
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
// import { Send, Upload, Sparkles, RefreshCw, Smartphone, ShieldCheck, SendHorizontal, X } from 'lucide-react';

// const VirtualTryOn = () => {
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: 'Welcome to Lumière AI Stylist. Choose a jewellery piece to begin your transformation. ✨' }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState('initial'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedJewellery, setSelectedJewellery] = useState(null);
//   const [userPhoto, setUserPhoto] = useState(null);

//   const chatEndRef = useRef(null);

//   const jewelleryOptions = [
//     { id: 1, image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
//     { id: 2, image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
//     { id: 3, image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
//   ];

//   useLayoutEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isProcessing]);

//   // --- 1. INSTANT PREVIEW LOGIC (CANVAS OVERLAY) ---
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

//         // Fetch through proxy or direct (crossOrigin needed for canvas)
//         jewelImg.crossOrigin = "anonymous";
//         jewelImg.src = `http://localhost:8000/api/proxy-image?url=${encodeURIComponent(jewelleryUrl)}&raw=true`; 
        
//         jewelImg.onload = () => {
//           // Positioning Logic: Base of the neck (Approx 45% down the face/portrait)
//           const jWidth = canvas.width * 0.45; // Resize jewellery relative to photo
//           const jHeight = jWidth;
//           const x = (canvas.width / 2) - (jWidth / 2);
//           const y = canvas.height * 0.42; 

//           ctx.drawImage(jewelImg, x, y, jWidth, jHeight);
//           resolve(canvas.toDataURL('image/jpeg', 0.8));
//         };
//         jewelImg.onerror = () => resolve(portraitBase64); // Fallback if image fails
//       };
//     });
//   };

//   const handleSendText = () => {
//     if (!input.trim()) return;
//     setMessages(prev => [...prev, { type: 'user', text: input }]);
//     if (input.toLowerCase().match(/(hi|start|jewel)/)) {
//       setStep('selecting');
//       jewelleryOptions.forEach(item => {
//         setMessages(prev => [...prev, { type: 'jewellery', id: item.id, imageUrl: item.image_url }]);
//       });
//     }
//     setInput('');
//   };

//   const selectJewellery = (id) => {
//     setSelectedJewellery(id);
//     setMessages(prev => [...prev, { type: 'user', text: `Jewellery #${id}` }, { type: 'bot', text: 'Beautiful choice! Now, upload your photo.' }]);
//     setStep('uploading');
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const base64 = reader.result;
//       setUserPhoto(base64);
//       setMessages(prev => [...prev, { type: 'user', text: "Photo uploaded 📸" }]);

//       // --- 2. SHOW INSTANT PREVIEW IMMEDIATELY ---
//       const selectedItem = jewelleryOptions.find(i => i.id === selectedJewellery);
//       const instantLook = await generateInstantPreview(base64, selectedItem.image_url);
      
//       setMessages(prev => [...prev, { 
//         type: 'result', 
//         text: "✨ Instant Preview (AI refining lighting in background...)", 
//         imageData: instantLook 
//       }]);

//       // --- 3. BACKGROUND AI REFINEMENT ---
//       await sendVirtualTryOnRequest(base64, "Original Photo");
//     };
//   };

//   const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
//     const item = jewelleryOptions.find(i => i.id === selectedJewellery);
//     try {
//       setIsProcessing(true);
//       setStep('processing');

//       const proxyRes = await fetch(`http://localhost:8000/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
//       const proxyData = await proxyRes.json();
      
//       const response = await fetch('http://localhost:8000/api/try-on', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           model_photo: portraitBase64,
//           clothing_photo: proxyData.base64,
//           attire: attireType
//         }),
//       });

//       const data = await response.json();
//       let resultUrl = typeof data === 'string' && data.startsWith('http') ? data : (data.image || data.image_url || (data.response && data.response.result));

//       if (resultUrl) {
//         setMessages(prev => [...prev, { 
//           type: 'result', 
//           text: attireType === "Original Photo" ? "✅ AI Refined: Textures and shadows matched perfectly!" : `Looking great in ${attireType}!`, 
//           imageData: resultUrl 
//         }]);
//         setStep('attire_selection');
//       }
//     } catch (error) {
//       setMessages(prev => [...prev, { type: 'bot', text: "Stylist is busy. Try again." }]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans text-slate-200">
//       <div className="w-full max-w-4xl h-[90vh] grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
        
//         {/* Sidebar */}
//         <div className="hidden lg:flex lg:col-span-4 flex-col p-8 border-r border-white/5 bg-black/20">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-3 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"><Sparkles className="text-black w-5 h-5" /></div>
//             <h1 className="text-xl font-black italic tracking-tighter text-white">LUMIÈRE</h1>
//           </div>
//           <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
//             <ShieldCheck className="text-amber-500 w-5 h-5 mb-2" />
//             <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Real-time VTO</p>
//             <p className="text-[10px] text-slate-500 mt-1">Our AI maps jewellery to your neckline automatically.</p>
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="col-span-1 lg:col-span-8 flex flex-col h-full relative overflow-y-auto">
//           <header className="p-5 border-b border-white/5 bg-slate-900/60 flex items-center gap-3">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-sm font-bold text-white tracking-wide">AI Concierge</span>
//           </header>

//           <div className="flex-1 overflow-y-auto p-6 space-y-6">
//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-[85%] p-4 rounded-2xl ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'}`}>
//                     {msg.text && <p className="text-sm">{msg.text}</p>}
//                     {msg.type === 'jewellery' && (
//                       <div className="mt-3 rounded-xl overflow-hidden border border-amber-500/30 cursor-pointer group" onClick={() => selectJewellery(msg.id)}>
//                         <img src={msg.imageUrl} className="w-full h-32 object-cover transition-transform group-hover:scale-105" alt="jewel" />
//                         <div className="bg-amber-500 p-2 text-[10px] text-center font-bold text-black uppercase">Try This</div>
//                       </div>
//                     )}
//                     {msg.type === 'result' && (
//                       <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-black/20">
//                         <img src={msg.imageData} className="w-full shadow-2xl" alt="result" />
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isProcessing && <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold uppercase tracking-widest"><RefreshCw className="w-3 h-3 animate-spin" /> Rendering High-Quality Look...</div>}
//             <div ref={chatEndRef} />
//           </div>

//           <footer className="p-4 bg-black/40 border-t border-white/5">
//             {step === 'uploading' && (
//               <label className="flex flex-col items-center p-8 border-2 border-dashed border-blue-500/20 rounded-2xl cursor-pointer hover:bg-blue-500/5 mb-4">
//                 <Upload className="text-blue-500 w-8 h-8 mb-2" />
//                 <span className="text-[10px] font-black text-blue-400 uppercase">Upload Portrait</span>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//               </label>
//             )}

//             {step === 'attire_selection' && (
//               <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
//                 {['Saree', 'Business Formal', 'Business Casual'].map(a => (
//                   <button key={a} onClick={() => sendVirtualTryOnRequest(userPhoto, a)} className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-2.5 rounded-xl text-[10px] font-black uppercase whitespace-nowrap active:scale-95 transition-all shadow-lg shadow-amber-500/10">
//                     Wear {a}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex gap-2">
//               <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendText()} placeholder="Type 'Hi' to see collection..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50" />
//               <button onClick={handleSendText} className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-colors"><SendHorizontal size={20}/></button>
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
import { Send, Upload, Sparkles, RefreshCw, ShieldCheck, SendHorizontal, X, Diamond, Crown, Zap } from 'lucide-react';

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
    { id: 1, name: "Royal Emerald Strings", image_url: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/ec6263da-71ad-4f15-8fa8-b5092974c59d.jpg' },
    { id: 2, name: "Temple Heritage Set", image_url: 'https://www.tatvika.in/cdn/shop/files/GREEN_PRARTHNA_JEWELLERY_SET_3.jpg?v=1762866141&width=1445' },
    { id: 3, name: "Ethereal Diamond Choker", image_url: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7de120e0/images/hi-res/50D2P2NYZAA32_1.jpg?sw=480&sh=480' }
  ];

  useLayoutEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // --- 1. INSTANT PREVIEW LOGIC ---
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

// --- Is function ko component ke bahar ya andar kahin bhi add karein ---
const resizeImage = (base64Str) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800; // AI ke liye 800px-1024px kafi hai
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.7)); // Quality 0.7 se file size bahut choti ho jayegi
    };
  });
};

// --- handleFileChange mein ye change karein ---
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const originalBase64 = reader.result;
    
    // YAHAN CORRECTION: Pehle resize karein phir bhejein
    const optimizedBase64 = await resizeImage(originalBase64); 
    
    setUserPhoto(optimizedBase64);
    setMessages(prev => [...prev, { type: 'user', text: "Portrait submitted." }]);
    
    const selectedItem = jewelleryOptions.find(i => i.id === selectedJewellery);
    const instantLook = await generateInstantPreview(optimizedBase64, selectedItem.image_url);
    
    setMessages(prev => [...prev, { 
      type: 'result', 
      text: "✨ Analyzing details...", 
      imageData: instantLook,
      isTemp: true
    }]);
    
    await sendVirtualTryOnRequest(optimizedBase64, "Original Photo");
  };
};

  // const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
  //   const item = jewelleryOptions.find(i => i.id === selectedJewellery);
  //   try {
  //     setIsProcessing(true);
  //     setStep('processing');
  //     const proxyRes = await fetch(`http://localhost:8000/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
  //     const proxyData = await proxyRes.json();
  //     const response = await fetch('http://localhost:8000/api/try-on', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         model_photo: portraitBase64,
  //         clothing_photo: proxyData.base64,
  //         attire: attireType
  //       }),
  //     });
  //     const data = await response.json();
  //     let resultUrl = typeof data === 'string' && data.startsWith('http') ? data : (data.image || data.image_url || (data.response && data.response.result));
  //     if (resultUrl) {
  //       setMessages(prev => [...prev, { 
  //         type: 'result', 
  //         text: attireType === "Original Photo" ? "✅ The masterpiece is ready. Would you like to see this paired with professional attire?" : `Refined with ${attireType} elegance.`, 
  //         imageData: resultUrl 
  //       }]);
  //       setStep('attire_selection');
  //     }
  //   } catch (error) {
  //     setMessages(prev => [...prev, { type: 'bot', text: "My apologies, the atelier is currently over-capacity. Please attempt again shortly." }]);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };



const sendVirtualTryOnRequest = async (portraitBase64, attireType) => {
  const item = jewelleryOptions.find(i => i.id === selectedJewellery);
  const loadingMsgId = Date.now(); // Unique ID for this specific request

  try {
    setIsProcessing(true);
    setStep('processing');

    // 1. Initial Loading Message create karein
    setMessages(prev => [...prev, { 
      id: loadingMsgId,
      type: 'result', 
      text: "Step 1: Preparing your portrait for the Atelier...", 
      imageData: portraitBase64, 
      isProcessing: true 
    }]);

    // Fake status updates for better UX (User busy rahega)
    const statusInterval = setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === loadingMsgId ? { ...m, text: "Step 2: AI Neural mapping & shadow calibration..." } : m
      ));
    }, 4500);

    // 2. Fetch Jewellery Proxy
    const proxyRes = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(item.image_url)}`);
    const proxyData = await proxyRes.json();

    // 3. Main Try-On API Call
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
    
    // Response check logic (as per your backend output)
    let resultUrl = typeof data === 'string' && data.startsWith('http') 
                    ? data 
                    : (data.image || data.image_url || (data.response && data.response.result));

    clearTimeout(statusInterval); // Clear fake updates if API is fast

    if (resultUrl) {
      // 4. Loading message ko final result se replace karein
      setMessages(prev => prev.map(m => 
        m.id === loadingMsgId ? { 
          ...m, 
          imageData: resultUrl, 
          isProcessing: false, 
          text: attireType === "Original Photo" 
                ? "✅ Masterpiece complete. How about trying a different attire?" 
                : `✅ Styled perfectly in ${attireType} elegance.` 
        } : m
      ));
      setStep('attire_selection');
    }

  } catch (error) {
    console.error("Try-on Error:", error);
    // Error message ko update karein
    setMessages(prev => prev.map(m => 
      m.id === loadingMsgId ? { 
        ...m, 
        isProcessing: false, 
        text: "❌ Atelier is busy. Please try another masterpiece." 
      } : m
    ));
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center p-4 font-sans text-slate-200 selection:bg-amber-500/30">
      <div className="w-full max-w-5xl h-[92vh] grid grid-cols-1 lg:grid-cols-12 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-[#050810] backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)]">
        
        {/* --- PREMIUM SIDEBAR --- */}
        <div className="hidden lg:flex lg:col-span-4 flex-col p-10 border-r border-white/5 bg-black/40 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-30" />
          
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3.5 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <Crown className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white leading-none">LUMIÈRE</h1>
              <span className="text-[10px] text-amber-500/80 font-bold uppercase tracking-[0.2em]">Haute Couture AI</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors group">
              <ShieldCheck className="text-amber-500 w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-200 uppercase tracking-widest">Precision Mapping</p>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Our neural engine analyzes bone structure for 99.8% accurate placement.</p>
            </div>
            
            <div className="p-5 rounded-3xl bg-amber-500/5 border border-amber-500/10">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="text-amber-500 w-4 h-4" />
                <span className="text-[10px] font-bold uppercase text-amber-500">System Status</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-amber-500" 
                />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-white/5">
            <p className="text-[10px] text-slate-600 font-medium">© 2026 LUMIÈRE DIGITAL ATELIER. ALL RIGHTS RESERVED.</p>
          </div>
        </div>

        {/* --- CHAT AREA --- */}
        <div className="col-span-1 lg:col-span-8 flex flex-col h-full relative overflow-y-auto">
          <header className="px-8 py-6 border-b border-white/5 bg-slate-900/40 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Concierge Active</span>
            </div>
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors"><X size={14}/></div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  key={idx} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] relative ${msg.type === 'user' ? 'bg-amber-600 text-black font-medium rounded-3xl rounded-tr-none px-5 py-3.5 shadow-xl shadow-amber-600/10' : 'bg-white/5 text-slate-200 rounded-3xl rounded-tl-none border border-white/10 p-5'}`}>
                    {msg.text && <p className="text-[13px] leading-relaxed">{msg.text}</p>}
                    
                    {msg.type === 'jewellery' && (
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="mt-4 rounded-2xl overflow-hidden border border-amber-500/20 cursor-pointer bg-black/40 group shadow-lg" 
                        onClick={() => selectJewellery(msg.id)}
                      >
                        <img src={msg.imageUrl} className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110" alt="jewel" />
                        <div className="p-3 flex justify-between items-center bg-gradient-to-t from-black to-transparent">
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">{msg.name}</span>
                          <Diamond className="text-amber-500 w-3 h-3" />
                        </div>
                      </motion.div>
                    )}

                   {msg.type === 'result' && (
  <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/60 relative group shadow-2xl">
    <img src={msg.imageData} className={`w-full ${msg.isProcessing ? 'blur-sm' : ''}`} alt="result" />
    
    {/* SCAN ANIMATION: Ab ye sirf current loading message par dikhega */}
    {msg.isProcessing && (
      
      <>
        <motion.div 
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-1 bg-amber-400 shadow-[0_0_15px_#fbbf24] z-10"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mb-2" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">AI Sculpting...</span>
        </div>
      </>
    )}
  </div>
)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          <footer className="px-8 py-8 bg-black/40 border-t border-white/5 backdrop-blur-xl">
            {step === 'uploading' && (
              <motion.label 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex flex-col items-center p-10 border-2 border-dashed border-amber-500/20 rounded-[2rem] cursor-pointer hover:bg-amber-500/5 mb-6 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <Upload className="text-amber-500 w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Upload High-Resolution Portrait</span>
                <p className="text-[10px] text-slate-500 mt-2">Format: JPG, PNG • Max size: 10MB</p>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </motion.label>
            )}

            {step === 'attire_selection' && (
              <div className="flex gap-3 mb-6 overflow-x-auto pb-4 no-scrollbar">
                {['Saree', 'Business Formal', 'Business Casual'].map(a => (
                  <button 
                    key={a} 
                    onClick={() => sendVirtualTryOnRequest(userPhoto, a)} 
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap active:scale-95 transition-all shadow-lg flex items-center gap-2"
                  >
                    <Sparkles size={12} className="text-amber-500" /> Pairing with {a}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handleSendText()} 
                  placeholder="Ask for collection or type 'Hi'..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600" 
                />
              </div>
              <button 
                onClick={handleSendText} 
                className="bg-amber-500 p-4 rounded-2xl hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-90"
              >
                <SendHorizontal className="text-black" size={24}/>
              </button>
            </div>
          </footer>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default VirtualTryOn;