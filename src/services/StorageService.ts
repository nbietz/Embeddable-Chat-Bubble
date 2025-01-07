import { ChatMessage } from '../types';

export class StorageService {
  private readonly STORAGE_KEY = 'chat_widget_history';

  saveMessages(messages: ChatMessage[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
  }

  loadMessages(): ChatMessage[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
} 