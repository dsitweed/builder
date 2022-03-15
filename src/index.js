import React, { Suspense, lazy } from "react";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import Spinner from "./components/Spinner";
import CvContextProvider from "./CvContextProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./locale/i18n";
import "./index.css";

const LazyApp = lazy(() => import("./App"));

const theme = createTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={theme}>
      <CvContextProvider>
        {/* Suspense cho phep defer render - load ko dong thoi vi du lieu phai load hoi nhieu nen dung */}
        <Suspense fallback={<Spinner />}>{/* fallback tra lai khi khong load duoc LazyApp */}
          <LazyApp />
        </Suspense>
      </CvContextProvider>
    </MuiThemeProvider>
  </I18nextProvider>,
  document.getElementById("root")
);
