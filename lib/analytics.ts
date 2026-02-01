import { sendGAEvent } from '@next/third-parties/google';

type EventType =
  | 'button_click'
  | 'nav_click'
  | 'project_click'
  | 'contact_message_sent'
  | 'email_copy'
  | 'social_click';

type EventParams = {
  [key: string]: string | number | boolean | undefined;
  location?: string;
  label?: string;
};


export const trackEvent = (eventName: EventType, params: EventParams = {}) => {
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}:`, params);
  }

  sendGAEvent('event', eventName, params);
};
