import React, { memo } from "react";
import { safetyCheck } from "../../../utils";
import { onScroll } from "../../hook";
import { ItemDateRange1 } from "../CommonItems";

const BlockDateRange1 = ({
  id,
  data,
  className,
  headingClass,
  heading: Heading,
}) => {
  const realData = data["struct"][id];

  return safetyCheck(realData) ? (
    <div className={className}>
      <Heading
        data={data}
        className={headingClass}
        children={realData.heading}
        onClick={() => onScroll(realData.id)}
      />
      <div className="grid gap-4">
        {realData.items
          .filter((x) => x.visible)
          .map((element, index) => {
            return (
              <ItemDateRange1
                key={index}
                id={id}
                data={element}
                language={data.options.language}
                onItemClick={() => onScroll(element.id)}
                isDisplayAccuracy={
                  data.options.accuracy ? data.options.accuracy : false
                }
              />
            );
          })}
      </div>
    </div>
  ) : null;
};

export default memo(BlockDateRange1);
