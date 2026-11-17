import React from 'react';

export const AllStarsLogo = ({ 
  size = 'md', 
  className = '',
  showText = false,
  textClassName = '',
  inverted = false
}) => {
  const sizeMap = {
    sm: 'h-10 sm:h-11 w-auto max-w-[120px]',
    md: 'h-12 sm:h-14 w-auto max-w-[160px]',
    lg: 'h-20 sm:h-24 w-auto max-w-[240px]',
    xl: 'h-28 sm:h-36 w-auto max-w-[320px]'
  };

  const textSizeMap = {
    sm: 'text-sm font-black',
    md: 'text-base sm:text-lg font-black',
    lg: 'text-xl sm:text-2xl font-black',
    xl: 'text-2xl sm:text-3xl font-black'
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const currentTextSize = textSizeMap[size] || textSizeMap.md;

  const filterClass = inverted 
    ? 'brightness-0 invert drop-shadow-[0_2px_10px_rgba(34,197,94,0.35)]' 
    : 'dark:brightness-0 dark:invert drop-shadow-sm';

  const textColorClass = inverted
    ? 'text-white'
    : 'text-slate-900 dark:text-white';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      <img
        src="/assets/images/all_stars_arena_logo.png"
        alt="All Stars Arena Logo"
        className={`${currentSize} object-contain transition-all duration-200 group-hover:scale-105 ${filterClass}`}
        onError={(e) => {
          e.currentTarget.src = '/all_stars_arena_logo.png';
        }}
      />
      {showText && (
        <span className={`${currentTextSize} tracking-tight ${textColorClass} whitespace-nowrap group-hover:text-sport-500 dark:group-hover:text-sport-400 transition-colors ${textClassName}`}>
          All Stars Arena
        </span>
      )}
    </div>
  );
};

export default AllStarsLogo;
