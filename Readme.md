# Place Finder Assessment

This React Native Expo project is a technical assignment to evaluate a React Native Senior Developer. It implements a location search application using the Google Maps Places API, maintains search history, and displays selected places on a map.

## 🚀 Features

* **Google Places Autocomplete**

  * Real-time suggestions as the user types
  * Custom dropdown overlay above the map
  * Clear input button and keyboard dismissal on selection
* **Map Integration**

  * Google Maps rendered via `react-native-maps` (Provider: Google)
  * Animates to selected location with smooth transition
  * Displays a marker annotated with place name
* **Search History**

  * Persists last searches (up to 10) using AsyncStorage
  * Displays history as a scrollable list filling remaining screen space
  * Memoized list rendering with `useMemo` for performance
  * Select history items to re-center map
* **Modular Components**

  * `SearchBar.js` — handles input, dropdown results, and selection
  * `MapViewComponent.js` — map rendering and animation logic
  * `SearchHistory.js` — memoized flat list of past searches
  * Navigation structure with React Navigation stack
* **UX & Performance**

  * Debounced API requests (300ms) to reduce network load
  * Keyboard management for seamless interactions
  * Clean, shadowed UI elements for intuitive user experience

## 📁 Project Structure

```
PlaceFinderAssessment/
├── App.js
├── README.md
├── .env
├── package.json
├── babel.config.js
└── src/
    ├── components/
    │   ├── SearchBar.js
    │   ├── MapViewComponent.js
    │   └── SearchHistory.js
    ├── navigation/
    │   └── RootNavigation.js
    ├── screens/
    │   └── HomeScreen.js
    └── utils/
        └── storage.js
```

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repo_url>
   cd PlaceFinderAssessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in the project root:

   ```ini
   GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. **Ensure Expo environment**

   * If using Expo Go on iOS only, no further steps.
   * For Android (or both platforms) with Google Maps:

     1. Configure `app.config.js` (or `app.json`) with API key under `android.config.googleMaps.apiKey` and `ios.config.googleMapsApiKey`.
     2. Run a custom dev client build:

        ```bash
        npx expo prebuild
        eas build --profile development --platform all
        ```
     3. Start in dev-client mode:

        ```bash
        npx expo start --dev-client
        ```

5. **Run the app**

   ```bash
   npx expo start
   ```

   * Or with EAS dev-client: `npx expo start --dev-client`
   * Scan QR code in Expo Go (iOS) or install custom client (Android)

## 📝 Usage

* **Search**

  * Tap the search bar at the top. Type a location.
  * Select from the dropdown. Input clears, keyboard dismisses, and map animates.
* **History**

  * Scroll the "Search History" list at the bottom.
  * Tap any entry to re-center the map on that location.

## ⚙️ Configuration

* **API Key**: Stored in `.env` and injected via Babel `react-native-dotenv` or directly in `app.config.js`.
* **Debounce**: Adjust in `SearchBar.js` via the `debounce` option of `useGoogleAutocomplete`.
* **History Limit**: In `storage.js`, the number of stored entries can be changed by slicing the stored array.