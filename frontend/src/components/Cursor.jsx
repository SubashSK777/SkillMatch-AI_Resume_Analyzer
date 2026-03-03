import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateFollower = () => {
      setFollowerPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    const onMouseOver = (e) => {
      if (
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || 
        e.target.closest('button') || 
        e.target.closest('a') || 
        e.target.closest('[role="button"]') ||
        e.target.closest('.interactive')
      ) {
        setIsHovering(true);
        document.body.classList.add('hovering');
      }
    };

    const onMouseOut = (e) => {
      // Check if we are still hovering an interactive element
      if (
        !e.relatedTarget || 
        !(
          ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(e.relatedTarget.tagName) || 
          e.relatedTarget.closest?.('button') || 
          e.relatedTarget.closest?.('a') || 
          e.relatedTarget.closest?.('[role="button"]') ||
          e.relatedTarget.closest?.('.interactive')
        )
      ) {
        setIsHovering(false);
        document.body.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    animationFrameId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.classList.remove('hovering');
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  return (
    <>
      <div
        className={`custom-cursor-follower ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${followerPosition.x}px`, top: `${followerPosition.y}px` }}
      />
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default Cursor;
