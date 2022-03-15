import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useResumeSelector } from "../../../../contexts/ResumeContext";
import { formatDateRange } from "../../../../utils";
import EmptyList from "./EmptyList";
import ListItem from "./ListItem";

import styles from "./List.module.css";

const List = ({
  path,
  title,
  titlePath,
  titleFunction,
  subtitle,
  subtitlePath,
  subtitleFunction,
  text,
  textPath,
  textFunction,
  hasDate,
  setOpen,
  setData,
}) => {
  const { t, i18n } = useTranslation();
  const items = useResumeSelector(path, []);

  const handleEdit = (data) => {
    setData(data);
    setOpen(true);
  };

  return (
    <div className="flex flex-col">
      <div className={styles.list}>
        {isEmpty(items) ? (
          <EmptyList />
        ) : (
          items.map((x, i) => {
            return (
              <ListItem
                id={x.id}
                key={x.id}
                data={x}
                path={path}
                title={title || get(x, titlePath, "")}
                titleFunction={titleFunction}
                subtitle={
                  subtitle ||
                  get(x, subtitlePath, "") ||
                  (hasDate &&
                    formatDateRange(
                      {
                        startDate: x.startDate,
                        endDate: x.endDate,
                        language: i18n.language,
                      },
                      t
                    ))
                }
                subtitleFunction={subtitleFunction}
                text={text || get(x, textPath, "")}
                textFunction={textFunction}
                onEdit={() => handleEdit(x)}
                isFirst={i === 0}
                isLast={i === items.length - 1}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default memo(List);
