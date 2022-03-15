import {
  AWARDS,
  CERTIFICATIONS,
  COURSES,
  CUSTOM,
  EDUCATION,
  HOBBIES,
  LANGUAGES,
  POSTGRAD_STUDENTS,
  PROJECTS,
  PUBLICATIONS,
  REFERENCES,
  RESEARCH,
  SKILLS,
  SOCIAL,
  TOPIC,
  UNDERGRAD_STUDENTS,
  WORK,
} from "../../../constants/SectionConstants";
import AwardDialog from "./dialogs/AwardDialog";
import CertificateDialog from "./dialogs/CertificateDialog";
import CourseDialog from "./dialogs/CourseDialog";
import CustomDialog from "./dialogs/CustomDialog";
import EducationDialog from "./dialogs/EducationDialog";
import HobbyDialog from "./dialogs/HobbyDialog";
import LanguageDialog from "./dialogs/LanguageDialog";
import PostgradStudentDialog from "./dialogs/PostgradStudentDialog";
import ProjectDialog from "./dialogs/ProjectDialog";
import PublicationDialog from "./dialogs/PublicationDialog";
import ReferenceDialog from "./dialogs/ReferenceDialog";
import ResearchDialog from "./dialogs/ResearchDialog";
import SkillDialog from "./dialogs/SkillDialog";
import SocialDialog from "./dialogs/SocialDialog";
import TopicDialog from "./dialogs/TopicDialog";
import UndergradStudentDialog from "./dialogs/UndergradStudentDialog";
import WorkDialog from "./dialogs/WorkDialog";

const LeftDialogSelector = ({ id, open, setOpen, data, setData }) => {
  switch (id) {
    case AWARDS:
      return <AwardDialog {...{ open, setOpen, data, setData }} />;
    case CERTIFICATIONS:
      return <CertificateDialog {...{ open, setOpen, data, setData }} />;
    case COURSES:
      return <CourseDialog {...{ open, setOpen, data, setData }} />;
    case CUSTOM:
      return <CustomDialog {...{ open, setOpen, data, setData }} />;
    case EDUCATION:
      return <EducationDialog {...{ open, setOpen, data, setData }} />;
    case HOBBIES:
      return <HobbyDialog {...{ open, setOpen, data, setData }} />;
    case LANGUAGES:
      return <LanguageDialog {...{ open, setOpen, data, setData }} />;
    case POSTGRAD_STUDENTS:
      return <PostgradStudentDialog {...{ open, setOpen, data, setData }} />;
    case PROJECTS:
      return <ProjectDialog {...{ open, setOpen, data, setData }} />;
    case PUBLICATIONS:
      return <PublicationDialog {...{ open, setOpen, data, setData }} />;
    case REFERENCES:
      return <ReferenceDialog {...{ open, setOpen, data, setData }} />;
    case RESEARCH:
      return <ResearchDialog {...{ open, setOpen, data, setData }} />;
    case SKILLS:
      return <SkillDialog {...{ open, setOpen, data, setData }} />;
    case SOCIAL:
      return <SocialDialog {...{ open, setOpen, data, setData }} />;
    case TOPIC:
      return <TopicDialog {...{ open, setOpen, data, setData }} />;
    case UNDERGRAD_STUDENTS:
      return <UndergradStudentDialog {...{ open, setOpen, data, setData }} />;
    case WORK:
      return <WorkDialog {...{ open, setOpen, data, setData }} />;
    default:
      throw new Error();
  }
};

export default LeftDialogSelector;
