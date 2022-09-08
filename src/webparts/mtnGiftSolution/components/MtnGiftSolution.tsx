import * as React from "react";
import { IMtnGiftSolutionProps } from "./IMtnGiftSolutionProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import * as jQuery from "jquery";
import "./global.scss";
import "./assets/icon.scss";
import { Home } from "./screens";

export default class MtnGiftSolution extends React.Component<
  IMtnGiftSolutionProps,
  {}
> {
  public render(): React.ReactElement<IMtnGiftSolutionProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}
