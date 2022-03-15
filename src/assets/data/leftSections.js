import {
  AiOutlineFileProtect,
  AiOutlineProject,
  AiOutlineControl,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { BsPerson, BsBriefcase } from "react-icons/bs";
import { FaChalkboard } from "react-icons/fa";
import { IoSchoolOutline, IoGameControllerOutline } from "react-icons/io5";
import { ImClipboard } from "react-icons/im";
import {
  HiOutlineDocument,
  HiOutlineBeaker,
  HiOutlineTranslate,
  HiOutlineSpeakerphone,
} from "react-icons/hi";
import { FiTwitter, FiAward } from "react-icons/fi";
import { BiBookOpen } from "react-icons/bi";
import { VscTools, VscPerson } from "react-icons/vsc";
import {
  AWARDS,
  CERTIFICATIONS,
  COURSES,
  CUSTOM,
  EDUCATION,
  HOBBIES,
  LANGUAGES,
  POSTGRAD_STUDENTS,
  PROFILE,
  PROJECTS,
  PUBLICATIONS,
  REFERENCES,
  RESEARCH,
  SKILLS,
  SOCIAL,
  SUMMARY,
  TOPIC,
  UNDERGRAD_STUDENTS,
  WORK,
} from "../../constants/SectionConstants";

const Section = [
  {
    id: PROFILE,
    icon: BsPerson,
    fixed: true,
  },
  {
    id: SUMMARY,
    icon: HiOutlineDocument,
  },
  {
    id: SOCIAL,
    icon: FiTwitter,
    fixed: true,
  },
  {
    id: WORK,
    icon: BsBriefcase,
  },
  {
    id: EDUCATION,
    icon: IoSchoolOutline,
  },
  {
    id: PUBLICATIONS,
    icon: BiBookOpen,
  },
  {
    id: RESEARCH,
    icon: HiOutlineBeaker,
  },
  {
    id: PROJECTS,
    icon: AiOutlineProject,
  },
  {
    id: AWARDS,
    icon: FiAward,
  },
  {
    id: SKILLS,
    icon: VscTools,
  },
  {
    id: HOBBIES,
    icon: IoGameControllerOutline,
  },
  {
    id: LANGUAGES,
    icon: HiOutlineTranslate,
  },
  {
    id: CUSTOM,
    icon: AiOutlineControl,
  },
  {
    id: COURSES,
    icon: FaChalkboard,
  },
  {
    id: TOPIC,
    icon: ImClipboard,
  },
  {
    id: CERTIFICATIONS,
    icon: AiOutlineFileProtect,
  },
  {
    id: UNDERGRAD_STUDENTS,
    icon: VscPerson,
  },
  {
    id: POSTGRAD_STUDENTS,
    icon: AiOutlineUserSwitch,
  },
  {
    id: REFERENCES,
    icon: HiOutlineSpeakerphone,
  },
];

export default Section;
