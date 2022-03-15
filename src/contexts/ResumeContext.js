import { arrayMoveImmutable } from "array-move";
import { v4 as uuidv4 } from "uuid";
import { clone, findIndex, get, isUndefined, setWith, set, has } from "lodash";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import i18next from "i18next";
import { ResumeEvent } from "../constants/ContextEvent";
import { SetItem } from "../services/clientStorage";
import { scaler } from "../utils";
import { useTranslation } from "react-i18next";

const ResumeContext = createContext({});

const ResumeProvider = ({ children }) => {
  const [settingState, settingDispatch] = useState({});
  const { t } = useTranslation();

  const memoizedReducer = useCallback((state, { type, payload }) => {
    let newState;
    let index;
    let items, item;
    switch (type) {
      case ResumeEvent.ON_DISPLAY_SECTION:
        items = get(state, payload.path);
        newState = setWith(clone(state), `${payload.path}`, !items, clone);
        return newState;

      case ResumeEvent.ON_DISPLAY_ITEM:
        items = clone(get(state, payload.path));
        index = findIndex(items, ["id", payload.value.id]);
        payload.value.visible = !payload.visible;
        newState = setWith(
          clone(state),
          `${payload.path}[${index}]`,
          payload.value,
          clone
        );
        return newState;

      case ResumeEvent.ON_ADD_ITEM:
        delete payload.value.temp;
        items = get(state, payload.path, []);
        payload.value.visible = true;
        newState = setWith(
          clone(state),
          payload.path,
          [...items, payload.value],
          clone
        );
        return newState;

      case ResumeEvent.ON_EDIT_ITEM:
        delete payload.value.temp;
        items = get(state, payload.path);
        index = findIndex(items, ["id", payload.value.id]);
        newState = setWith(
          clone(state),
          `${payload.path}[${index}]`,
          payload.value,
          clone
        );
        return newState;

      case ResumeEvent.ON_EDIT_SUMMARY:
        newState = setWith(
          clone(state),
          `${payload.path}`,
          payload.value,
          clone
        );
        return newState;

      case ResumeEvent.ON_DELETE_ITEM:
        items = clone(get(state, payload.path));
        index = findIndex(items, ["id", payload.value.id]);
        items.splice(index, 1);
        newState = setWith(clone(state), payload.path, items, clone);
        return newState;

      case ResumeEvent.ON_MOVE_ITEM_UP:
        items = get(state, payload.path);
        index = findIndex(items, ["id", payload.value.id]);
        items = arrayMoveImmutable(items, index, index - 1);
        newState = setWith(clone(state), payload.path, items, clone);
        return newState;

      case ResumeEvent.ON_MOVE_ITEM_DOWN:
        items = get(state, payload.path);
        index = findIndex(items, ["id", payload.value.id]);
        items = arrayMoveImmutable(items, index, index + 1);
        newState = setWith(clone(state), payload.path, items, clone);
        return newState;

      case ResumeEvent.CHANGE_LANGUAGE:
        newState = set(clone(state), "options.language", payload);
        items = get(
          i18next.getDataByLanguage(payload),
          "translation.builder.sections"
        );
        const sectionList = state.options.sections;
        Object.keys(items).forEach((key) => {
          has(newState, `struct.${key}.heading`) &&
            set(newState, `struct.${key}.heading`, items[key]);
          if (sectionList.includes(key)) SetItem(key, items[key], "local");
        });
        return newState;

      case ResumeEvent.ON_INPUT:
        newState = setWith(clone(state), payload.path, payload.value, clone);
        return newState;

      case ResumeEvent.INIT_SETTING_DATA:
        settingDispatch({
          options: state["options"],
          sections: state["sections"],
        });
        return state;

      case ResumeEvent.ON_INPUT_SETTING:
        let temp = setWith(
          clone(settingState),
          payload.path,
          payload.value,
          clone
        );
        settingDispatch(temp);
        return state;

      case ResumeEvent.SAVE_SETTING:
        newState = clone(state);
        newState["options"] = settingState["options"];
        newState["sections"] = settingState["sections"];
        return newState;

      case ResumeEvent.INIT_DATA:
        for (item in payload.struct) {
          const arr = payload.struct[item].items;
          if (payload.struct[item]["heading"] === "")
            payload.struct[item]["heading"] = t(item);
          if (arr !== undefined) {
            payload.struct[item].items = arr.map((x) => {
              x["id"] = uuidv4();
              return x;
            });
          }
        }
        for (const [key, sizeDefault] of Object.entries(
          payload.options.fontSizeOptions
        )) {
          document.documentElement.style.setProperty(
            key,
            `${scaler(payload.options.fontSize) * sizeDefault}rem`
          );
        }
        if (payload["options"]["accuracy"] === undefined)
          payload["options"]["accuracy"] = true;
        if (payload["options"]["colors"]["accuracy"] === undefined)
          payload["options"]["colors"]["accuracy"] = "#03A9F4";
        newState = payload;
        return newState;
      default:
        throw new Error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, dispatch] = useReducer(memoizedReducer);

  return (
    <ResumeContext.Provider value={{ settingState, state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

const useSettingSelector = (path, fallback) => {
  const { settingState } = useContext(ResumeContext);
  let value = get(settingState, `${path}`);
  if (isUndefined(value)) {
    value = isUndefined(fallback) ? settingState : fallback;
  }
  return value;
};

const useResumeSelector = (path, fallback) => {
  const { state } = useContext(ResumeContext);
  let value = get(state, `${path}`);
  if (isUndefined(value)) {
    value = isUndefined(fallback) ? state : fallback;
  }
  return value;
};

const useResumeDispatch = () => {
  const { dispatch } = useContext(ResumeContext);
  return dispatch;
};

const memoizedProvider = memo(ResumeProvider);

export {
  ResumeContext,
  memoizedProvider as ResumeProvider,
  useSettingSelector,
  useResumeSelector,
  useResumeDispatch,
};
