import loopsRoute from "./Loops/index.route";
import activityRoute from "./Activity/index.route";
import searchRoute from "./Search/index.route";
import manageParticipantsRoute from "./ManageParticipants/index.route";
import contactListRoute from "./ContactList/index.route";
import chatRoute from "./Chat/index.route";
import profileRoute from "./Profile/index.route";
import pricingRoute from "./Pricing/index.route";
import newLoopsRoute from "./NewLoops/index.route";
import raiseQuery from "./RaiseQuery/index.route";
import Faq from "./Faqs/index.route";
import userPrivacyPolicy from "./PrivacyPolicy/index.route";
import UserTermsAndConditions from "./TermsAndConditions/index.route";

export default function route() {
  return [
    ...loopsRoute(),
    ...activityRoute(),
    ...searchRoute(),
    ...manageParticipantsRoute(),
    ...contactListRoute(),
    ...chatRoute(),
    ...profileRoute(),
    ...pricingRoute(),
    ...newLoopsRoute(),
    ...raiseQuery(),
    ...Faq(),
    ...userPrivacyPolicy(),
    ...UserTermsAndConditions(),
  ];
}
