"use client"
import { useEffect } from 'react';

const GifBackground = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling on unmount
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor:"transparent",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: 'url("https://media.giphy.com/media/l0IyhqJlF3zxJMy8o/giphy.gif") no-repeat center center fixed',
          backgroundSize: "cover",
        }}
      />
      <div className='absolute right-[24%] top-[30%] text-center text-white text-4xl font-bold'>
        <h1 className='mb-4'>We couldnt find what you are looking for </h1>
        <p>Try searching something else</p>
      </div>
    </div>
  );
};

export default GifBackground;
