import React, { Suspense, lazy } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavbarRoute from "./NavbarRoute";
import { LoaderPage } from "shared/components/index";
import { MusicRoomProvider } from "shared/utils/musicRoom";
import { AuthProvider } from "shared/utils/auth";
import { ThemeProvider } from "shared/utils/theme";

const Room = lazy(() => import("pages/Room"));
const HomePage = lazy(() => import("pages/HomePage"));
const ExplorePage = lazy(() => import("pages/ExplorePage"));
const CreateRoomPage = lazy(() => import("pages/CreateRoomPage"));


function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderPage />}>
        <div>
          <AuthProvider>
            <ThemeProvider>
              <MusicRoomProvider>
                <Switch>
                  <NavbarRoute exact path="/" component={HomePage} />
                  <NavbarRoute exact path="/explore" component={ExplorePage} />
                  <NavbarRoute exact path="/room/create" component={CreateRoomPage} />
                  <Route exact path="/room/:roomId" component={Room} />
                </Switch>
              </MusicRoomProvider>
            </ThemeProvider>
          </AuthProvider>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
