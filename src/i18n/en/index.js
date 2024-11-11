import {
  userAuth,
  userHome,
  footer,
  userProfile,
  createLoop,
  loops,
  raiseQuery,
  activity,
  notes,
  contactList,
  chat,
  participants,
  payment
} from "./User"
import { appLanguage as common } from "./Common/index.i18n"
import { appLanguage as adminAuth } from "./Admin/Auth/index.i18n"
import {
  adminCms,
  adminManageRoles,
  adminManageLoop,
  adminUserManagement,
  adminUpdateProfile,
  manageQueries,
  manageSubscription,
  master
} from "./Admin"

export default function lang() {
  return {
    text: {
      common: common.text,
      userHome: userHome.text,
      userAuth: userAuth.text,
      footer: footer.text,
      adminAuth: adminAuth.text,
      adminUserManagement: adminUserManagement.text,
      adminUpdateProfile: adminUpdateProfile.text,
      userProfile: userProfile.text,
      adminCms: adminCms.text,
      manageQueries: manageQueries.text,
      manageSubscription: manageSubscription.text,
      createLoop: createLoop.text,
      adminManageRoles: adminManageRoles.text,
      adminManageLoop: adminManageLoop.text,
      loops: loops.text,
      master: master.text,
      raiseQuery: raiseQuery.text,
      activity: activity.text,
      notes: notes.text,
      contactList: contactList.text,
      chat: chat.text,
      participants: participants.text,
      payment:payment.text
    },
    validation: {
      auth: userAuth.validation,
      common: common.validation,
      adminAuth: adminAuth.validation,
      adminUserManagement: adminUserManagement.validation,
      adminUpdateProfile: adminUpdateProfile.validation,
      userProfile: userProfile.validation,
      adminCms: adminCms.validation,
      manageQueries: manageQueries.validation,
      manageSubscription: manageSubscription.validation,
      createLoop: createLoop.validation,
      adminManageRoles: adminManageRoles.validation,
      adminManageLoop: adminManageLoop.validation,
      loops: loops.validation,
      master: master.validation,
      raiseQuery: raiseQuery.validation,
      notes: notes.validation,
      chat: chat.validation
    }
  }
}
