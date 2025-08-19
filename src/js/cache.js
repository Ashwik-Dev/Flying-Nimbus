class SmartCache {
  constructor() {
    this.cache = new Map();
    this.CACHE_DURATIONS = {
      WEATHER_DATA: 45 * 60 * 1000, // 45 minutes
      ALERTS: 10 * 60 * 1000, // 10 minutes
      FORECAST: 60 * 60 * 1000, // 60 minutes
    };
  }

  _generateKey(location) {
    return location.toLowerCase().trim();
  }

  _isExpired(timestamp, duration) {
    return Date.now() - timestamp > duration;
  }

  _hasActiveAlerts(data) {
    return data.alerts && data.alerts.length > 0;
  }

  _isSevereWeather(data) {
    // Check for severe weather conditions
    const severeConditions = [
      "storm",
      "tornado",
      "hurricane",
      "blizzard",
      "flood",
    ];
    const weatherText = data.des?.toLowerCase() || "";
    return severeConditions.some((condition) =>
      weatherText.includes(condition)
    );
  }

  get(location) {
    const key = this._generateKey(location);
    const cached = this.cache.get(key);

    if (!cached) return null;

    const now = Date.now();
    const { data, timestamps } = cached;

    // Check different cache conditions
    const weatherExpired = this._isExpired(
      timestamps.weather,
      this.CACHE_DURATIONS.WEATHER_DATA
    );
    const alertsExpired = this._isExpired(
      timestamps.alerts,
      this.CACHE_DURATIONS.ALERTS
    );
    const forecastExpired = this._isExpired(
      timestamps.forecast,
      this.CACHE_DURATIONS.FORECAST
    );

    // Smart cache logic
    const hasAlerts = this._hasActiveAlerts(data);
    const isSevere = this._isSevereWeather(data);

    // Force shorter cache for severe weather or active alerts
    if (hasAlerts || isSevere) {
      const shortCacheExpired = this._isExpired(
        timestamps.weather,
        this.CACHE_DURATIONS.ALERTS
      );
      if (shortCacheExpired) return null;
    }

    // Check if any critical data is expired
    if (alertsExpired || weatherExpired) {
      return null; // Need fresh data
    }

    // Return cached data with freshness info
    return {
      data,
      freshness: {
        weather: !weatherExpired,
        alerts: !alertsExpired,
        forecast: !forecastExpired,
      },
    };
  }

  set(location, data) {
    const key = this._generateKey(location);
    const now = Date.now();

    const cacheEntry = {
      data,
      timestamps: {
        weather: now,
        alerts: now,
        forecast: now,
        cached: now,
      },
    };

    this.cache.set(key, cacheEntry);

    // Clean old entries periodically
    this._cleanOldEntries();

    // console.log(`📦 Cached data for ${location}`);

    // Log cache strategy for debugging
    if (this._hasActiveAlerts(data)) {
      // console.log(`⚠️  Active alerts detected - using shorter cache duration`);
    }
    if (this._isSevereWeather(data)) {
      // console.log(`🌪️  Severe weather detected - using shorter cache duration`);
    }
  }

  shouldRefresh(location) {
    const cached = this.get(location);
    if (!cached) return true;

    // Always refresh for severe weather or alerts
    if (
      this._hasActiveAlerts(cached.data) ||
      this._isSevereWeather(cached.data)
    ) {
      return true;
    }

    return false;
  }

  _cleanOldEntries() {
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const now = Date.now();

    for (let [key, cached] of this.cache) {
      if (now - cached.timestamps.cached > maxAge) {
        this.cache.delete(key);
        // console.log(`🗑️  Cleaned old cache entry for ${key}`);
      }
    }
  }

  clear() {
    this.cache.clear();
    // console.log('🧹 Cache cleared');
  }

  getCacheInfo() {
    const entries = Array.from(this.cache.entries()).map(([key, cached]) => ({
      location: key,
      age: Math.round((Date.now() - cached.timestamps.cached) / 1000 / 60), // minutes
      hasAlerts: this._hasActiveAlerts(cached.data),
      isSevere: this._isSevereWeather(cached.data),
    }));

    return {
      totalEntries: this.cache.size,
      entries,
    };
  }
}

export default new SmartCache();
