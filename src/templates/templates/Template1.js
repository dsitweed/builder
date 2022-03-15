import { Grid, makeStyles } from "@material-ui/core";
import PhotoUpload from "../../components/shared/PhotoUpload";
import { PROFILE } from "../../constants/SectionConstants";
import { BlocksLayout1 } from "../blocks/blockLayout";
import BlockSummary1 from "../blocks/blockSummary/BlockSummary1";
import Contact1 from "../blocks/Contact/Contact1";
import Heading1 from "../blocks/Heading/Heading1";
import Photo1 from "../blocks/Photo/Photo1";
import { onScroll } from "../hook";
import cx from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: (props) => props.font,
    color: (props) => props.colors.text,
    backgroundColor: (props) => props.colors.background,
    width: "827px",
    minHeight: "1169px",
  },
  header: {
    height: "120px",
    backgroundColor: "#F3F3F3",
  },
  title: {
    fontSize: (props) => props.fontSize + 10,
  },
  contact: {
    backgroundColor: (props) => props.colors.primary,
  },
  titleSummary: {
    color: "white",
  },
  headingSummary: {
    fontSize: (props) => props.fontSize + 10,
  },
}));

const Template1 = ({ data }) => {
  const cls = useStyles(data.options);
  const layout = data.layout;
  const sections = data.sections;

  return (
    <Grid className={cls.container}>
      <div className={cls.header}>
        <div className="px-5 flex items-center h-full">
          <span
            className={cx("font-bold text-center", cls.title)}
            onClick={() => onScroll(PROFILE)}
          >
            {data.struct.profile.fullName}
          </span>
        </div>
      </div>
      <Grid className={cls.contact}>
        <Grid container className="px-5 py-3">
          <Grid item xs={7}>
            <BlockSummary1
              id="summary"
              data={data}
              heading={Heading1}
              className={cls.titleSummary}
              headingClass={cx(cls.headingSummary, "text-white")}
            />
          </Grid>
          <Grid item xs={5}>
            <Photo1 src={data.struct.profile.photograph} />
            <PhotoUpload />
          </Grid>
          <Grid item xs={12}>
            <Contact1 data={data} className={cls.titleSummary} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4} className="px-5 pt-3">
        <Grid item xs={7}>
          {layout[1]
            ?.filter((x) => sections[x])
            .map((x) => {
              const Component = BlocksLayout1[x];
              return (
                Component && (
                  <Component
                    key={x}
                    id={x}
                    data={data}
                    heading={Heading1}
                    headingClass={cx(cls.headingSummary, "font-bold")}
                  />
                )
              );
            })}
        </Grid>
        <Grid item xs={5}>
          {layout[0]
            ?.filter((x) => sections[x])
            .map((x) => {
              const Component = BlocksLayout1[x];
              return (
                Component && (
                  <Component
                    key={x}
                    id={x}
                    data={data}
                    heading={Heading1}
                    headingClass={cx(cls.headingSummary, "font-bold")}
                  />
                )
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Template1;
