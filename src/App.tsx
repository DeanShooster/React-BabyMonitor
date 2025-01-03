import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Routes";
import { DictionaryContextProvider } from "./Context/DictionaryContext";
import { BabyContextProvider } from "./Context/BabyContext";

import { Guard } from "./components/Guard";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Diaper } from "./pages/Diaper";
import { Sleep } from "./pages/Sleep";
import { Feed } from "./pages/Feed";
import { Journal } from "./pages/Journal";

import "./App.scss";
import { BackgroundBorderLineEffect } from "./components/BackgroundBorderLineEffect";

function App() {
  return (
    <div className="app">
      <BackgroundBorderLineEffect />
      <BrowserRouter>
        <DictionaryContextProvider>
          <BabyContextProvider>
            <Guard>
              <Header />
              <Routes>
                <Route path={routes.Home} element={<Home />}>
                  <Route path={routes.Diaper} element={<Diaper />} />
                  <Route path={routes.Sleep} element={<Sleep />} />
                  <Route path={routes.Feeding} element={<Feed />} />
                </Route>
                <Route path={routes.Journal} element={<Journal />} />
              </Routes>
            </Guard>
          </BabyContextProvider>
        </DictionaryContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
