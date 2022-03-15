export const status = {
  SUCCESS: "success",
  FAILED: "failed",
};

export const JWT = "jwt";
export const LANGUAGE = "lang";
export const THEME = "theme";
export const USER_ID = "userId";
export const CV_ID = "cvId";
export const TEMPLATE_ID = "templateId";
export const APP_NAME = "Civizen";
export const SUCCESS = "success";
export const FAILED = "failed";

// accuracy constance
export const ACCURACY = "accuracy";
export const INACCURACY = "inaccuracy";
export const OTHER = "other";

// run project mode
export const DEMO = "demo";
export const DEV = "dev";
export const PRODUCT = "product";

// cv mode
export const CV_EDIT = "cv_edit";
export const CV_SHARE = "cv_share";
export const CV_PDF = "cv_pdf";
export const CV_PREVIEW = "cv_preview";

//env
//                  Chỗ này chỉ cần process.env la truy cap duoc vao file .env ha
export const MODE = process.env.REACT_APP_MODE;
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
export const BUILDER_URL = process.env.REACT_APP_BUILDER_URL;
