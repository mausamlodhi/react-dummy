import auth from "./Auth";
import loops from "./Loops";
import activity from "./Activity";
import search from "./Search";
import manageParticipants from "./ManageParticipants";
import contactList from "./ContactList";
import chat from "./Chat";
import profile from "./Profile";
import pricing from "./Pricing";
import newLoops from "./NewLoops";
import videoCall from "./ViedoCall";
import raiseQuery from "./RaiseQuery";

const AccessControl = {
  ...auth,
  ...loops,
  ...activity,
  ...search,
  ...manageParticipants,
  ...contactList,
  ...chat,
  ...profile,
  ...pricing,
  ...newLoops,
  ...videoCall,
  ...raiseQuery,
};

export default AccessControl;
