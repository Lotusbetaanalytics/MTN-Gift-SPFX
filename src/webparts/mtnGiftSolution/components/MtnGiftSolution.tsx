import * as React from "react";
import { IMtnGiftSolutionProps } from "./IMtnGiftSolutionProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import * as jQuery from "jquery";
import "./global.scss";
import "./assets/icon.scss";
import {
  CollectionReport,
  Dashboard,
  ErrorPage,
  Home,
  Homepage,
  TotalUploads,
  ViewPickup,
} from "./screens";
import {
  AdminViewDocument,
  AdminViewReport,
  configDivision,
  configLocation,
  configRole,
  DocumentPage,
  EmployeePickLocation,
  EmployeePickLocationEdit,
  LocationReport,
  LocationResult,
  LocationView,
  Pickup,
  Report,
  Roles,
  UploadDocument,
} from "./screens";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";

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
            <Route path="/home" exact component={Homepage} />
            <Route
              path="/admin/document/upload"
              exact
              render={(props) => (
                <UploadDocument context={this.props.context} />
              )}
            />
            <Route path="/admin/document" exact component={DocumentPage} />
            <Route
              path="/admin/collection-report"
              exact
              component={CollectionReport}
            />
            <Route path="/admin/total-upload" exact component={TotalUploads} />
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route
              path="/admin/document/:id"
              exact
              component={AdminViewDocument}
            />
            <Route path="/admin/pickup" exact component={Pickup} />
            <Route
              path="/admin/pickup/:id"
              exact
              render={(props) => <ViewPickup context={this.props.context} />}
            />
            <Route path="/admin/report" exact component={Report} />
            <Route path="/admin/report/:id" exact component={AdminViewReport} />
            <Route
              path="/admin/config"
              exact
              render={(props) => <Roles context={this.props.context} />}
            />
            <Route path="/admin/division" exact component={configDivision} />
            <Route path="/admin/location" exact component={configLocation} />
            <Route path="/admin/roles" exact component={configRole} />
            {/* <Route path="/locationchampion/search" exact component={LocationSearch} /> */}
            <Route path="/locationchampion" exact component={LocationResult} />
            <Route
              path="/locationchampion/report"
              exact
              component={LocationReport}
            />
            <Route
              path="/locationchampion/report/view/:id"
              exact
              component={LocationView}
            />
            <Route
              path="/employee/location"
              exact
              component={EmployeePickLocation}
            />
            <Route
              path="/employee/location/edit"
              exact
              component={EmployeePickLocationEdit}
            />
            <Route component={ErrorPage} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}
