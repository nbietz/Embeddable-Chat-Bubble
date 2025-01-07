import { ChatConfig, ChatMessage } from '../types';
import { ApiService } from '../services/ApiService';
import { StorageService } from '../services/StorageService';
import '../styles/styles.css';

export class ChatWidget {
  private container!: HTMLElement;
  private window!: HTMLElement;
  private apiService!: ApiService;
  private storageService: StorageService;
  private messages: ChatMessage[] = [];
  private isMinimized = true;

  constructor(config: ChatConfig) {
    this.apiService = new ApiService(config);
    this.storageService = new StorageService();
    this.messages = this.storageService.loadMessages();
    
    this.initializeWidget();
  }

  private initializeWidget(): void {
    this.container = document.createElement('div');
    this.container.className = 'chat-widget-container';
    
    this.createChatBubble();
    this.createChatWindow();
    
    document.body.appendChild(this.container);
  }

  private createChatBubble(): void {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = '💬';
    bubble.onclick = () => this.toggleChat();
    
    this.container.appendChild(bubble);
  }

  private createChatWindow(): void {
    this.window = document.createElement('div');
    this.window.className = 'chat-window';
    
    const header = this.createHeader();
    const messagesContainer = this.createMessagesContainer();
    const input = this.createInput();
    
    this.window.appendChild(header);
    this.window.appendChild(messagesContainer);
    this.window.appendChild(input);
    
    this.makeResizable();
    this.container.appendChild(this.window);
  }

  private toggleChat(): void {
    this.isMinimized = !this.isMinimized;
    this.window.classList.toggle('visible', !this.isMinimized);
  }

  private async sendMessage(content: string): Promise<void> {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: Date.now()
    };

    this.addMessage(userMessage);

    const response = await this.apiService.sendMessage(content);
    if (!response.error) {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: Date.now()
      };
      
      this.addMessage(assistantMessage);
    }
  }

  private addMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.storageService.saveMessages(this.messages);
    this.renderMessages();
  }

  private renderMessages(): void {
    const container = this.window.querySelector('.chat-messages');
    if (!container) return;

    container.innerHTML = this.messages
      .map(msg => `
        <div class="message ${msg.role}">
          ${msg.content}
        </div>
      `)
      .join('');
    
    container.scrollTop = container.scrollHeight;
  }

  private makeResizable(): void {
    const handle = document.createElement('div');
    handle.className = 'resize-handle';
    this.window.appendChild(handle);

    let isResizing = false;
    let originalWidth: number;
    let originalHeight: number;
    let originalX: number;
    let originalY: number;

    handle.addEventListener('mousedown', (e) => {
      isResizing = true;
      originalWidth = this.window.offsetWidth;
      originalHeight = this.window.offsetHeight;
      originalX = e.clientX;
      originalY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;

      const width = originalWidth + (e.clientX - originalX);
      const height = originalHeight + (e.clientY - originalY);

      this.window.style.width = `${Math.max(300, width)}px`;
      this.window.style.height = `${Math.max(400, height)}px`;
    });

    document.addEventListener('mouseup', () => {
      isResizing = false;
    });
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('div');
    header.className = 'chat-header';
    
    const title = document.createElement('div');
    title.textContent = 'Chat';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => this.toggleChat();
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    return header;
  }

  private createMessagesContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'chat-messages';
    this.renderMessages();
    return container;
  }

  private createInput(): HTMLElement {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'chat-input';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        this.sendMessage(input.value.trim());
        input.value = '';
      }
    });
    
    inputContainer.appendChild(input);
    return inputContainer;
  }
} 