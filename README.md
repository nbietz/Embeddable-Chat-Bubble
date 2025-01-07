# Embeddable Chat Widget

A lightweight, customizable chat widget that can be embedded into any website. The widget provides a modern, responsive interface with features like minimization, resizing, and chat history persistence.

[![](https://data.jsdelivr.com/v1/package/gh/yourusername/chat-widget/badge)](https://www.jsdelivr.com/package/gh/yourusername/chat-widget)

> 📝 Note: Replace `yourusername` in the CDN URLs with your actual GitHub username after forking/publishing the repository.

## Features

- 🎯 Easy to embed
- 📱 Fully responsive
- 💾 Persistent chat history
- 🎨 Customizable theme
- 🔄 Resizable chat window
- 📍 Floating interface
- 🔽 Minimizable to chat bubble

## Installation

### Using CDN
You can load the widget directly from GitHub using jsdelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/yourusername/chat-widget@main/dist/chat-widget.js"></script>
```

Note: Replace `yourusername` with your GitHub username. You can also specify a specific version:
```html
<!-- Load a specific version -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/chat-widget@v1.0.0/dist/chat-widget.js"></script>

<!-- Load the latest version from the main branch -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/chat-widget@main/dist/chat-widget.js"></script>
```

### Self-hosted
1. Download the `chat-widget.js` file from the `dist` folder
2. Host it on your server
3. Include it in your HTML

## Usage

Add the following code snippet to your HTML file, just before the closing `</body>` tag:
```html
<script src="path/to/chat-widget.js"></script>
<script>
const chatWidget = initializeChatWidget({
apiEndpoint: 'https://your-api-endpoint.com/chat',
apiKey: 'your-api-key',
theme: {
primaryColor: '#007bff',
secondaryColor: '#6c757d',
fontFamily: 'Arial, sans-serif'
}
});
</script>
```

## Configuration Options

| Option | Type | Description | Required |
|--------|------|-------------|----------|
| apiEndpoint | string | The endpoint URL for your chat API | Yes |
| apiKey | string | Your API authentication key | Yes |
| theme | object | Customization options for the widget | No |

### Theme Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| primaryColor | string | '#007bff' | Main color for the widget |
| secondaryColor | string | '#6c757d' | Secondary color for elements |
| fontFamily | string | 'Arial, sans-serif' | Font family for the widget |

## Development

### Prerequisites
- Node.js (v14 or higher)
- pnpm

### Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/chat-widget.git
cd chat-widget
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your API credentials:
```env
CHAT_API_ENDPOINT=your_api_endpoint_here
CHAT_API_KEY=your_api_key_here
```

4. Start development server
```bash
pnpm run dev
```

5. Build for production
```bash
pnpm run build
```

### Testing
Open `test/index.html` in your browser to test the widget locally after building the project.

To run the development server with the test page:
```bash
pnpm run test
```

### Testing on Live Websites

You can test the widget on any live website using browser developer tools:

1. Open the website where you want to test the widget
2. Open Developer Tools (F12 or Right Click -> Inspect)
3. Go to the Console tab
4. Paste and execute this code:

```javascript
// First, load the widget script
const script = document.createElement('script');
// For development
script.src = 'http://localhost:8080/chat-widget.js';
// For production
// script.src = 'https://cdn.jsdelivr.net/gh/yourusername/chat-widget@main/dist/chat-widget.js';
document.body.appendChild(script);

// Wait for script to load, then initialize
script.onload = () => {
    const chatWidget = initializeChatWidget({
        apiEndpoint: process.env.CHAT_API_ENDPOINT,
        apiKey: process.env.CHAT_API_KEY,
        theme: {
            primaryColor: '#007bff',
            secondaryColor: '#6c757d',
            fontFamily: 'Arial, sans-serif'
        }
    });
};
```

Note: Make sure your widget is being served (using `pnpm run dev` or hosted somewhere) before testing.

## Project Structure
```
chat-widget/
├── package.json
├── tsconfig.json
├── webpack.config.js
├── src/
│   ├── index.ts
│   ├── components/
│   │   └── ChatWidget.ts
│   ├── services/
│   │   ├── ApiService.ts
│   │   └── StorageService.ts
│   ├── styles/
│   │   └── styles.css
│   └── types/
│       └── index.ts
├── dist/
└── test/
    └── index.html
```

## API Integration

The widget is designed to work with any chat completion API. The API endpoint should:

1. Accept POST requests
2. Expect a JSON payload with a `message` field
3. Return a response with a text completion

Example API Response Format:
```json
{
"choices": [
{
"text": "API response message"
}
]
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Local Storage

The widget uses browser's localStorage to persist chat history. The data is stored under the key `chat_widget_history`.

## Customization

### CSS Variables

The widget uses CSS variables for theming. You can override these in your own CSS:
```css
:root {
--primary-color: #007bff;
--secondary-color: #6c757d;
}
```

## License

MIT License - feel free to use this in your projects!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please open an issue in the GitHub repository.
