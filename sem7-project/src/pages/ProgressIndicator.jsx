import React, { useEffect, useState } from "react";

const CircularProgress = ({ percentage, size = 120, strokeWidth = 10 }) => {
  const [progress, setProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  if(!percentage || percentage<=0){
    return null
  }
  else{
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"  // background ring
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#4F46E5"  // progress color
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-xl font-semibold text-gray-700">
          {progress}%
        </span>
      </div>
    );
  }

};

export default CircularProgress;
