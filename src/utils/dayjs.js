import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
