import React, { Suspense, lazy } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavbarRoute from "./NavbarRoute";
import { LoaderPage } from "shared/components/index";
import { MusicRoomProvider } from "shared/context/musicRoom";
import { AuthProvider } from "shared/context/auth";
import { ThemeProvider } from "shared/context/theme";
import { UserProvider } from "shared/context/user";

const Room = lazy(() => import("pages/Room"));
const HomePage = lazy(() => import("pages/HomePage"));
const ExplorePage = lazy(() => import("pages/ExplorePage"));
const CreateRoomPage = lazy(() => import("pages/CreateRoomPage"));
const Profile = lazy(() => import("pages/Profile"));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderPage />}>
        <div>
          <AuthProvider>
            <UserProvider>
              <ThemeProvider>
                <MusicRoomProvider>
                  <Switch>
                    <NavbarRoute exact path="/" component={HomePage} />
                    <NavbarRoute exact path="/explore" component={ExplorePage} />
                    <NavbarRoute exact path="/room/create" component={CreateRoomPage} />
                    <Route exact path="/room/:roomId" component={Room} />
                    <NavbarRoute exact path="/u/:username" component={Profile} />
                  </Switch>
                </MusicRoomProvider>
              </ThemeProvider>
            </UserProvider>
          </AuthProvider>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
