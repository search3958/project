'use client';

import { useEffect, useCallback, useState } from 'react';

interface DeviceOrientation {
  alpha: number | null; // Z-axis (0-360)
  beta: number | null;  // X-axis (-180 to 180)
  gamma: number | null; // Y-axis (-90 to 90)
}

interface UseDeviceOrientationOptions {
  onOrientationChange?: (orientation: DeviceOrientation) => void;
  onGravityChange?: (gravity: { x: number; y: number }) => void;
}

export function useDeviceOrientation(options: UseDeviceOrientationOptions = {}) {
  const { onOrientationChange, onGravityChange } = options;
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
  });
  
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const newOrientation: DeviceOrientation = {
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    };
    
    setOrientation(newOrientation);
    onOrientationChange?.(newOrientation);
    
    // Calculate gravity direction from device tilt
    // beta: front/back tilt (-180 to 180), 0 = flat, 90 = vertical
    // gamma: left/right tilt (-90 to 90), 0 = flat
    
    if (event.beta !== null && event.gamma !== null) {
      // Normalize to -1 to 1 range
      const gravityX = Math.max(-1, Math.min(1, event.gamma / 45));
      const gravityY = Math.max(-1, Math.min(1, (event.beta - 45) / 45));
      
      onGravityChange?.({ x: gravityX, y: gravityY });
    }
  }, [onOrientationChange, onGravityChange]);
  
  useEffect(() => {
    // Check if DeviceOrientationEvent is available
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) {
      return;
    }
    
    // iOS 13+ requires permission
    if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      // Permission will be requested on user interaction
      return;
    }
    
    window.addEventListener('deviceorientation', handleOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation]);
  
  const requestPermission = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          return true;
        }
      } catch (error) {
        console.error('Failed to request device orientation permission:', error);
        return false;
      }
    }
    return true;
  }, [handleOrientation]);
  
  return {
    orientation,
    requestPermission,
  };
}

export function useMouseGravity(
  containerRef: React.RefObject<HTMLElement | null>,
  onGravityChange: (gravity: { x: number; y: number }) => void
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate direction from center to mouse
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      
      // Normalize to -1 to 1 range
      const maxDist = Math.max(rect.width, rect.height) / 2;
      const gravityX = Math.max(-1, Math.min(1, dx / maxDist));
      const gravityY = Math.max(-1, Math.min(1, dy / maxDist));
      
      onGravityChange({ x: gravityX, y: gravityY });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef, onGravityChange]);
}
