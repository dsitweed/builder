import { get, isUndefined, isArray } from "lodash";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { AccuracyEvent } from "../constants/ContextEvent";
import { ACCURACY, INACCURACY, OTHER } from "../constants/CommonConstants";

const AccuracyContext = createContext({});

const AccuracyProvider = ({ children }) => {
  const memoizedReducer = useCallback((state, { type, payload }) => {
    let newState;
    switch (type) {
      case AccuracyEvent.INIT_ACCURACY:
        newState = payload;
        return newState;
      default:
        throw new Error();
    }
  }, []);

  const [accuracyState, accuracyDispatch] = useReducer(memoizedReducer);

  return (
    <AccuracyContext.Provider value={{ accuracyState, accuracyDispatch }}>
      {children}
    </AccuracyContext.Provider>
  );
};

const useAccuracyCompareSelector = (path, data) => {
  const { accuracyState } = useContext(AccuracyContext);
  let accuracyValue = get(accuracyState, `${path}`);
  if (accuracyValue === undefined) return OTHER;
  if (!isUndefined(accuracyValue)) {
    if (isArray(accuracyValue.items)) {
      const elements = accuracyValue.items;
      for (let i = 0; i < elements.length; i++) {
        let status = true;
        const element = elements[i];
        const keys = Object.keys(element);
        const length = keys.length;
        for (let index = 0; index < length; index++) {
          const key = keys[index];
          if (key === "id" || key === "visible") continue;
          if (element[key] !== data[key]) {
            status = false;
            break;
          }
        }
        if (status) return ACCURACY;
      }
    } else if (typeof accuracyValue === "string") {
      if (accuracyValue === data) return ACCURACY;
    }
  }
  return INACCURACY;
};

const useAccuracySelector = (path, fallback) => {
  const { accuracyState } = useContext(AccuracyContext);
  let value = get(accuracyState, `${path}`);
  if (isUndefined(value)) {
    value = isUndefined(fallback) ? accuracyState : fallback;
  }
  return value;
};

const useAccuracyDispatch = () => {
  const { accuracyDispatch } = useContext(AccuracyContext);
  return accuracyDispatch;
};

const memoizedProvider = memo(AccuracyProvider);

export {
  AccuracyContext,
  memoizedProvider as AccuracyProvider,
  useAccuracyCompareSelector,
  useAccuracySelector,
  useAccuracyDispatch,
};
