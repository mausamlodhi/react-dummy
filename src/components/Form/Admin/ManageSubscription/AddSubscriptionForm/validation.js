import i18next from "i18next";
import * as yup from "yup";

export default function validation(addUser,loopsLimitRadio,userLimitRadio) {

    return yup.object().shape({
        planName: yup.string().required(i18next.t("validation.manageSubscription.planName")),
        planPrice: yup.string().required(i18next.t("validation.manageSubscription.planPrice")),
        planValidity: yup.string().required(i18next.t("validation.manageSubscription.planValidity")),
        planLevel: yup.string().required(i18next.t("validation.manageSubscription.planLevel")),
        voiceCallsLimit: yup.string().required(i18next.t("validation.manageSubscription.voiceCallsLimit")),
        videoCallsLimit: yup.string().required(i18next.t("validation.manageSubscription.videoCallsLimit")),
        usersLimit:userLimitRadio&& yup.string().required(i18next.t("validation.manageSubscription.usersLimit")),
        additionalUserPrice: addUser&&yup.string().required(i18next.t("validation.manageSubscription.customLoopsLimit")),
        loopsLimit: loopsLimitRadio&&yup.string().required(i18next.t("validation.manageSubscription.customLoopsLimit")),
        userLimit: userLimitRadio&&yup.string().required(i18next.t("validation.manageSubscription.customLoopsLimit")),
    });
}