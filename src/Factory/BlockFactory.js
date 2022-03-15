import { EducationWorker1, EducationWorker2 } from "./workers/EducationWorker";
import { WorkWorker1, WorkWorker2 } from "./workers/WorkWorker";
import { ProjectWork1, ProjectWork2 } from "./workers/ProjectWorker";
import { AwardWorker1, AwardWorker2 } from "./workers/AwardWorker";
import {
  CertificationWork1,
  CertificationWork2,
} from "./workers/CertificationsWorker";
import { SkillWorker1, SkillWorker2 } from "./workers/SkillWorker";
import { HobbyWorker1, HobbyWorker2 } from "./workers/HobbyWorker";
import { LanguageWorker1, LanguageWorker2 } from "./workers/LanguageWorker";
import {
  PublicationWorker1,
  PublicationWorker2,
} from "./workers/PublicationWorker";
import { CoursesWorker1, CoursesWorker2 } from "./workers/CoursesWorker";
import { ResearchWorker1, ResearchWorker2 } from "./workers/ResearchWorker";
import {
  UndergradStudentWorker1,
  UndergradStudentWorker2,
} from "./workers/UndergradStudentWorker";
import {
  PostgradStudentWorker1,
  PostgradStudentWorker2,
} from "./workers/PostgradStudentWorker";
import { CustomWorker1, CustomWorker2 } from "./workers/CustomWorker";
import { ReferenceWork1, ReferenceWork2 } from "./workers/ReferenceWorker";
import { TopicWorker1, TopicWorker2 } from "./workers/TopicWorker";
import { SocialWorker1 } from "./workers/SocialWorker";
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
} from "../constants/SectionConstants";

export const Factory1 = (id, data) => {
  switch (id) {
    case undefined:
      return {};
    case EDUCATION:
      return EducationWorker1(data);
    case WORK:
      return WorkWorker1(data);
    case PROJECTS:
      return ProjectWork1(data);
    case AWARDS:
      return AwardWorker1(data);
    case CERTIFICATIONS:
      return CertificationWork1(data);
    case SKILLS:
      return SkillWorker1(data);
    case HOBBIES:
      return HobbyWorker1(data);
    case CUSTOM:
      return CustomWorker1(data);
    case LANGUAGES:
      return LanguageWorker1(data);
    case PUBLICATIONS:
      return PublicationWorker1(data);
    case COURSES:
      return CoursesWorker1(data);
    case RESEARCH:
      return ResearchWorker1(data);
    case TOPIC:
      return TopicWorker1(data);
    case REFERENCES:
      return ReferenceWork1(data);
    case UNDERGRAD_STUDENTS:
      return UndergradStudentWorker1(data);
    case POSTGRAD_STUDENTS:
      return PostgradStudentWorker1(data);
    default:
      throw new Error();
  }
};

export const LeftSideFactory = (id) => {
  switch (id) {
    case undefined:
      return {};
    case SOCIAL:
      return SocialWorker1(id);
    case AWARDS:
      return AwardWorker2(id);
    case WORK:
      return WorkWorker2(id);
    case EDUCATION:
      return EducationWorker2(id);
    case PUBLICATIONS:
      return PublicationWorker2(id);
    case RESEARCH:
      return ResearchWorker2(id);
    case PROJECTS:
      return ProjectWork2(id);
    case SKILLS:
      return SkillWorker2(id);
    case HOBBIES:
      return HobbyWorker2(id);
    case LANGUAGES:
      return LanguageWorker2(id);
    case CUSTOM:
      return CustomWorker2(id);
    case COURSES:
      return CoursesWorker2(id);
    case TOPIC:
      return TopicWorker2(id);
    case CERTIFICATIONS:
      return CertificationWork2(id);
    case UNDERGRAD_STUDENTS:
      return UndergradStudentWorker2(id);
    case POSTGRAD_STUDENTS:
      return PostgradStudentWorker2(id);
    case REFERENCES:
      return ReferenceWork2(id);
    default:
      throw new Error();
  }
};
