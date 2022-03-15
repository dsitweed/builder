import { BsFillPersonFill } from "react-icons/bs";
import { ImPhone, ImLocation } from "react-icons/im";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { AiFillCalendar } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import cx from "classnames";

const ContactItem = ({ title, icon: Icon }) => (
  <div className="cols-span-1 flex items-center">
    <Icon className="text-black text-lg p-1 rounded-full bg-white" />
    <span className="pl-2">{title}</span>
  </div>
);

const Contact1 = ({ data, className }) => {
  const profile = data.struct.profile;

  return (
    <div className={cx("grid grid-cols-3 gap-4", className)}>
      <ContactItem icon={BsFillPersonFill} title={"Nam"} />
      <ContactItem icon={ImPhone} title={profile.phone} />
      <ContactItem icon={GiEarthAsiaOceania} title={profile.website} />
      <ContactItem icon={AiFillCalendar} title={profile.birthDate} />
      <ContactItem icon={MdEmail} title={profile.email} />
      <ContactItem icon={ImLocation} title={profile.address} />
    </div>
  );
};

export default Contact1;
