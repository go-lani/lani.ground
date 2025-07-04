'use client';

import React, { createContext, useEffect, useState } from 'react';

export interface IBreakPoints {
  PHONE: number;
  TABLET: number;
  SMALL_DESKTOP?: number;
}

export interface IDeviceInfo {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallDesktop?: boolean;
}

export const DeviceContext = createContext<IDeviceInfo | undefined>(undefined);

const getDeviceType = (
  width: number,
  breakPoints: IBreakPoints,
): 'phone' | 'tablet' | 'small-desktop' | 'desktop' => {
  if (width <= breakPoints.PHONE) return 'phone';
  if (width <= breakPoints.TABLET) return 'tablet';
  if (
    breakPoints.SMALL_DESKTOP !== undefined &&
    width <= breakPoints.SMALL_DESKTOP
  )
    return 'small-desktop';
  return 'desktop';
};

const getDeviceConfig = (
  width: number,
  breakPoints: IBreakPoints,
): IDeviceInfo => {
  const deviceType = getDeviceType(width, breakPoints);

  // 기본 device info
  const baseDeviceInfo: IDeviceInfo = {
    isPhone: false,
    isTablet: false,
    isDesktop: false,
    ...(breakPoints.SMALL_DESKTOP !== undefined && { isSmallDesktop: false }),
  };

  switch (deviceType) {
    case 'phone':
      return { ...baseDeviceInfo, isPhone: true };
    case 'tablet':
      return { ...baseDeviceInfo, isTablet: true };
    case 'small-desktop':
      return { ...baseDeviceInfo, isSmallDesktop: true };
    case 'desktop':
      return { ...baseDeviceInfo, isDesktop: true };
    default:
      return { ...baseDeviceInfo, isDesktop: true };
  }
};

const DEFAULT_BREAKPOINTS: IBreakPoints = {
  PHONE: 720,
  TABLET: 1024,
};

export interface DeviceDetectorProviderProps {
  children: React.ReactNode;
  breakPoints?: IBreakPoints;
}

export function DeviceDetectorProvider({
  children,
  breakPoints = DEFAULT_BREAKPOINTS,
}: DeviceDetectorProviderProps) {
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>({
    isPhone: false,
    isTablet: false,
    isDesktop: true,
    ...(breakPoints.SMALL_DESKTOP !== undefined && {
      isSmallDesktop: false,
    }),
  });

  useEffect(() => {
    let lastWidth = window.innerWidth;
    let lastOrientation = window.screen.orientation?.angle;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentOrientation = window.screen.orientation?.angle;

      if (lastOrientation !== currentOrientation) {
        lastOrientation = currentOrientation;
        lastWidth = currentWidth;
        setDeviceInfo(getDeviceConfig(currentWidth, breakPoints));
        return;
      }

      // 키보드 열림/닫힘으로 인한 리사이즈인 경우:
      // 1. 현재 input이 포커스된 상태이거나
      // 2. 이전 너비와 현재 너비가 같은 경우 (iOS에서 키보드가 닫힐 때)
      if (
        document.activeElement?.tagName === 'INPUT' ||
        currentWidth === lastWidth
      ) {
        lastWidth = currentWidth; // 현재 너비로 lastWidth 갱신
        return;
      }

      lastWidth = currentWidth;
      setDeviceInfo(getDeviceConfig(currentWidth, breakPoints));
    };

    setDeviceInfo(getDeviceConfig(window.innerWidth, breakPoints));

    const userAgent = navigator.userAgent.toLowerCase();
    const isPhoneDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent,
      );

    if (isPhoneDevice) {
      setDeviceInfo((prev) => ({ ...prev, isPhone: true }));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakPoints]);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
}
