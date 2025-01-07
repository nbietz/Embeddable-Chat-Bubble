import axios from 'axios';
import { ChatConfig, ApiResponse } from '../types';

export class ApiService {
  private config: ChatConfig;

  constructor(config: ChatConfig) {
    this.config = config;
  }

  async sendMessage(message: string): Promise<ApiResponse> {
    try {
      const response = await fetch(
        this.config.apiEndpoint,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ question: message })
        }
      );
      const result = await response.json();
      
      return { content: result.text };
    } catch (error) {
      return { content: '', error: 'Failed to get response' };
    }
  }
} 