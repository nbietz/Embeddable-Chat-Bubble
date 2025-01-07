import { ChatWidget } from './components/ChatWidget';
import { ChatConfig } from './types';

export function initializeChatWidget(config: ChatConfig): ChatWidget {
  return new ChatWidget(config);
}

// Make it available globally
(window as any).initializeChatWidget = initializeChatWidget; 