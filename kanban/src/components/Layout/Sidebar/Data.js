import { AiOutlineHome } from "react-icons/ai";

import {
  MdOutlineDashboard,
  MdOutlineCalendarToday,
  MdOutlineMessage,
  MdOutlineGroup,
  MdWorkspacesOutline,
} from "react-icons/md";

export const LinksArray = [
  {
    label: "Start",
    icon: <AiOutlineHome />,
    to: "/userstart",
    notification: 0,
  },
  {
    label: "Workspace",
    icon: <MdWorkspacesOutline />,
    to: "/workspace",
    notification: 0,
  },
  {
    label: "Board",
    icon: <MdOutlineDashboard />,
    to: "/board",
    notification: 0,
  },
  {
    label: "Group",
    icon: <MdOutlineGroup />,
    to: "/group",
    notification: 0,
  },
  {
    label: "Calendar",
    icon: <MdOutlineCalendarToday />,
    to: "/calendar",
    notification: 0,
  },
  {
    label: "Message",
    icon: <MdOutlineMessage />,
    to: "/message",
    notification: 5,
  },
];
