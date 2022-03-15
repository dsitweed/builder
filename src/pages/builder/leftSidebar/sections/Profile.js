import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../../components/shared/heading/Heading";
import Input from "../../../../components/shared/input/Input";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import cx from "classnames";

const Profile = ({ id }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  return (
    <section className="divide-y divide-gray-300">
      <section>
        <Heading id={id} className="cursor-pointer" />
        <Input
          name="heading"
          label={t("heading")}
          path={`struct.${id}.heading`}
        />
        <Input
          name="firstName"
          label={t("fullName")}
          path="struct.profile.fullName"
        />
        <Input
          name="subtitle"
          label={t("subtitle")}
          path="struct.profile.subtitle"
        />
        <Input name="email" label={t("email")} path="struct.profile.email" />
        <Input name="phone" label={t("phone")} path="struct.profile.phone" />
      </section>
      <section
        className={cx("divide-y divide-gray-300", {
          "h-0 invisible": !open,
          visible: open,
        })}
      >
        <section className="pt-5">
          <Input
            name="degree"
            label={t("degree")}
            path="struct.profile.degree"
          />
          <Input
            name="position"
            label={t("position")}
            path="struct.profile.position"
          />
        </section>
        <section className="pt-5">
          <Input
            name="address"
            label={t("address")}
            path="struct.profile.address"
          />
        </section>
        <section className="pt-5">
          <Input
            type="date"
            name="birthDate"
            label={t("birthDate")}
            path="struct.profile.birthDate"
          />
          <Input
            name="website"
            label={t("website")}
            path="struct.profile.website"
          />
        </section>
      </section>
      <div
        className="flex font-bold cursor-pointer justify-self-center text-blue-primary-100"
        onClick={() => handleOnClick()}
      >
        {open ? (
          <>
            <div>{t("hide")}</div>
            <RiArrowDropUpLine size="20px" />
          </>
        ) : (
          <>
            <div>{t("show")}</div>
            <RiArrowDropDownLine size="20px" />
          </>
        )}
      </div>
    </section>
  );
};

export default memo(Profile);
