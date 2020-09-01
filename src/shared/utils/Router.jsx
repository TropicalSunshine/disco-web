import React, { Suspense, lazy } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spinner } from "shared/components/index";

import Navbar from "pages/Navbar";
import { MusicRoomProvider } from "shared/utils/musicRoom";
import { AuthProvider } from "shared/utils/auth";

const Room = lazy(() => import("pages/Room"));
const HomePage = lazy(() => import("pages/HomePage"));
const ExplorePage = lazy(() => import("pages/ExplorePage"));
const CreateRoomPage = lazy(() => import("pages/CreateRoomPage"));

function Router(props) {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <div>
          <AuthProvider>
            <MusicRoomProvider>
              <Navbar />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/explore" component={ExplorePage} />
                <Route exact path="/room/create" component={CreateRoomPage} />
                <Route exact path="/room/:roomId" component={Room} />
              </Switch>
            </MusicRoomProvider>
          </AuthProvider>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
