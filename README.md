# 🌤️ Flying Nimbus - Advanced Weather Application

![License: Non-Commercial](https://img.shields.io/badge/License-Non--Commercial-blue.svg)

A sophisticated weather application built with vanilla JavaScript featuring intelligent caching, real-time updates, and modern responsive design. Demonstrates advanced frontend development skills including smart data management and performance optimization.

## 🚀 Key Features

- **7-Day Forecast & Hourly Data** - Complete weather overview with detailed hourly breakdowns
- **Smart Caching System** - Conditional caching based on weather severity (45min normal, 10min severe weather)
- **Real-time Updates** - Auto-updating clock with timezone support, background data refresh
- **Interactive UI** - Smooth animated temperature toggle (°C/°F), responsive across all devices
- **Advanced Metrics** - Air quality index, weather alerts, comprehensive forecast cards
- **Geolocation Support** - Auto-detect user location or search any city worldwide

## 🛠️ Technologies & Architecture

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3/SCSS
- **Pattern**: MVC Architecture with Observer pattern
- **API**: WeatherAPI.com integration
- **Performance**: Event delegation, debounced calls, intelligent cache management

## 📁 Project Structure

```
flying-nimbus/
├── index.html
├── src/js/
│   ├── controller.js         # Main app controller
│   ├── model.js             # Data management & API
│   ├── cache.js             # Smart caching system
│   ├── config.js            # API configuration
│   ├── helpers.js           # Utility functions
│   └── Views/               # Modular view components
│       ├── view.js          # Base view class
│       ├── sidebarView.js   # Weather display
│       ├── weeksView.js     # 7-day forecast
│       ├── eventsView.js    # Today's metrics
│       └── [other views...]
└── src/styles/css/style.comp.css
```

## 🎯 Technical Highlights

### Smart Caching Strategy

```javascript
CACHE_DURATIONS = {
  WEATHER_DATA: 45 * 60 * 1000, // Normal conditions
  ALERTS: 10 * 60 * 1000, // Critical weather
  FORECAST: 60 * 60 * 1000, // Daily forecasts
};
```

### Performance Features

- **Multi-tier caching** with automatic cleanup
- **Background refresh** before cache expiration
- **Event delegation** for efficient DOM handling
- **Conditional API calls** prevent unnecessary requests
- **Real-time timezone** calculations with local updates

## 🚀 Getting Started

1. **Clone & Setup**

   ```bash
   git clone https://github.com/yourusername/flying-nimbus.git
   cd flying-nimbus
   ```

2. **Configure API**

   - Get free API key from [WeatherAPI.com](https://weatherapi.com)
   - Update `src/js/config.js` with your key / use an .env file

3. **Launch**
   ```bash
   python -m http.server 8000  # or open index.html
   ```

## 🎨 Design System

**Color Palette**

- Primary: `#05161C` (Charcoal Blue) | Accent: `#70CFAC` (Calm Teal)
- Highlight: `#E8AD23` (Muted Gold) | Text: `#E5E7EB` (Mist White)

**Responsive Breakpoints**: 1400px, 1200px, 992px, 768px, 576px

## ⚡ Performance & Browser Support

- **Lighthouse Score**: 95+
- **Cache Hit Rate**: ~80% (reduces API calls)
- **Browser Support**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+

## 📊 Project Stats

- **~1,500+ Lines of Code** | **15+ Modular Files**
- **Smart Caching System** | **Real-time Updates**
- **MVC Architecture** | **Performance Optimized**

## 👤 Author

**Ashwik** - Full Stack Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/ashwik-srikakulapu/) | [GitHub](https://github.com/Ashwik-Dev)

## 📜 License

This project is licensed under a **Dual-License Model**:

- ✅ Free for personal, educational, and non-commercial use
- 💼 Commercial use requires a separate license agreement

See the full [LICENSE](./LICENSE) file for details.

For commercial inquiries, please contact: [ashwiksrikakulapu@gmail.com]

---

⭐ **Built with modern JavaScript, advanced caching strategies, and performance optimization techniques**
