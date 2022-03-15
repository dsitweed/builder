import React from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { formatDate, formatDateRange } from "../../utils";
import { isFunction } from "lodash";
import { Factory1 } from "../../Factory/BlockFactory";
import { useAccuracyCompareSelector } from "../../contexts/AccuracyContext";
import AccuracyPoint from "../../components/shared/tooltip/AccuracyPoint";
import { Grid } from "@material-ui/core";

export const Item1 = ({ id, data, onItemClick, isDisplayAccuracy }) => {
  const realData = Factory1(id, data);
  const accuracy = useAccuracyCompareSelector(id, data);
  onItemClick = isFunction(onItemClick) ? onItemClick : () => {};

  return (
    <Grid onClick={onItemClick} container>
      <Grid item xs={10}>
        <h6 className="font-semibold text-sm">{realData?.title}</h6>
        <h6 className="text-xs text-black">{realData?.subtitle}</h6>
        <ReactMarkdown
          className="markdown mt-2 text-sm"
          source={realData?.text}
        />
      </Grid>
      <Grid item xs={2}>
        <AccuracyPoint
          isDisplayAccuracy={isDisplayAccuracy}
          accuracy={accuracy}
        />
      </Grid>
    </Grid>
  );
};

export const ItemDate1 = ({
  id,
  data,
  onItemClick,
  isDisplayAccuracy,
  language,
}) => {
  const realData = Factory1(id, data);
  const accuracy = useAccuracyCompareSelector(id, data);
  onItemClick = isFunction(onItemClick) ? onItemClick : () => {};

  return (
    <Grid onClick={onItemClick} container>
      <Grid item xs={10}>
        <h6 className="font-semibold text-sm">{realData?.title}</h6>
        <h6 className="text-gray-400">{realData?.subtitle}</h6>
        {realData.date && (
          <h6 className="text-xs font-medium mb-1">
            {formatDate({ date: realData.date, language })}
          </h6>
        )}
        <ReactMarkdown className="markdown" source={realData?.text} />
      </Grid>
      <Grid item xs={2}>
        <AccuracyPoint
          isDisplayAccuracy={isDisplayAccuracy}
          accuracy={accuracy}
        />
      </Grid>
    </Grid>
  );
};

export const ItemDateRange1 = ({
  id,
  data,
  onItemClick,
  isDisplayAccuracy,
  language,
}) => {
  const realData = Factory1(id, data);
  const accuracy = useAccuracyCompareSelector(id, data);
  const { t } = useTranslation();
  onItemClick = isFunction(onItemClick) ? onItemClick : () => {};

  return (
    <Grid onClick={onItemClick} container>
      <Grid item xs={10}>
        <h6 className="font-semibold text-sm">{realData?.title}</h6>
        <h6 className="text-gray-400">{realData?.subtitle}</h6>
        <div>
          {realData.dateStart && (
            <h6 className="text-xs font-medium mb-1">
              {formatDateRange(
                {
                  startDate: realData.dateStart,
                  endDate: realData.dateEnd,
                  language,
                },
                t,
                true
              )}
            </h6>
          )}
        </div>
        <ReactMarkdown className="markdown" source={realData?.text} />
      </Grid>
      <Grid item xs={2}>
        <AccuracyPoint
          isDisplayAccuracy={isDisplayAccuracy}
          accuracy={accuracy}
        />
      </Grid>
    </Grid>
  );
};
