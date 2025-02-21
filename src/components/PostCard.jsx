import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='relative w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-lg transition-transform duration-300 hover:scale-[1.03] overflow-hidden'>
        <div className='w-full h-56 rounded-xl overflow-hidden'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className='w-full h-full object-cover rounded-xl' 
          />
        </div>
        <h2 className='mt-4 text-xl font-bold text-white text-center'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
