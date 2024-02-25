import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configAppStore } from "./Redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(configAppStore);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={configAppStore}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
