import { ResumeProvider } from "./contexts/ResumeContext";
import { SettingProvider } from "./contexts/SettingContext";
import { AccuracyProvider } from "./contexts/AccuracyContext";

const CvContextProvider = ({ children }) => {
  return (
    <SettingProvider>
      <ResumeProvider>
        <AccuracyProvider>{children}</AccuracyProvider>
      </ResumeProvider>
    </SettingProvider>
  );
};

export default CvContextProvider;
