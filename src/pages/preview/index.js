import { Container } from "@material-ui/core";
import Header from "../../components/pages/headers";
import { useResumeSelector } from "../../contexts/ResumeContext";
import ArtBoardItem from "../builder/center/ArtBoardItem";

const Preview = () => {
  const state = useResumeSelector();

  return (
    <>
      {console.log("ssoo")}
      <Header />
      <Container>
        <ArtBoardItem templateName={state.templateName} data={state} />
      </Container>
    </>
  );
};

export default Preview;
