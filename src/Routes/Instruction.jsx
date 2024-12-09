import React, { useEffect } from 'react';
import { setDocumentTitle } from '../utils';
import { Link } from 'react-router-dom';

export default function Instruction() {
  useEffect(() => {
    setDocumentTitle('Welcome to MeloMemo');
  }, []);
   return(
       <div className="container mx-auto px-16 py-24">
           <div className="border border-gray-700 rounded-2xl p-12 bg-[#1E1E1E]">
               <h1 className="text-3xl font-medium mb-8 text-gray-200">
                   ✨ Welcome to melomemo - Your Personal Music Diary
               </h1>
               <div className="text-xl leading-relaxed text-gray-300 space-y-6">
                   <p>
                       Create your own collection of meaningful lyrics and cherished songs. 
                       Document your musical journey.
                   </p>
                   
                   <div className="space-y-4 mt-8">
                       <p className="flex items-center gap-3">
                           🎵 <Link to="/lyrics-log" className="text-blue-400 hover:text-blue-300 no-underline font-medium">Lyrics Log</Link>
                           <span className="text-lg"> Add new songs and your favorite lyrics</span>
                       </p>
                       
                       <p className="flex items-center gap-3">
                           📖 <Link to="/songbook" className="text-blue-400 hover:text-blue-300 no-underline font-medium">Your Songbook</Link>
                           <span className="text-lg"> Browse and manage your collection</span>
                       </p>
                       
                       <p className="flex items-center gap-3">
                           🎧 <Link to="/playlists" className="text-blue-400 hover:text-blue-300 no-underline font-medium">Playlists</Link>
                           <span className="text-lg"> Organize songs into morning, night, and on-repeat vibes</span>
                       </p>
                       
                       <p className="flex items-center gap-3">
                           🔍 <Link to="/search" className="text-blue-400 hover:text-blue-300 no-underline font-medium">Search</Link>
                           <span className="text-lg"> Find songs in your collection</span>
                       </p>
                   </div>

                   <p className="mt-8 text-gray-400 italic">
                       Start your musical journey today by <Link to="/lyrics-log" className="text-blue-400 hover:text-blue-300 no-underline font-medium">adding your first song</Link>! 🎵
                   </p>
               </div>
           </div>
       </div>
   )
}