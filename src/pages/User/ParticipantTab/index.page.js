import React from "react";
import Tabs from "components/UiElement/Tabs";
import ChannelAddParticipants from "../Loops/LoopsModel/ChannelAddParticipants";

function ParticipantsTabs({ channel, onClose }) {
  const tabContent = [
    {
      name: "Add Participants",
      key: "addPArticipants",
      content: <ChannelAddParticipants onClose={onClose} channel={channel} />,
    },
    // {
    //   name: "Invite Participants",
    //   key: "inviteParticipants",
    //   content: <InviteParticipant />,
    // },
  ];

  return (
    <div className="commonTabs">
      <Tabs
        tabContent={tabContent}
        navClass="border-0 mb-2 mb-md-4"
        tabClass="border-0 mb-2 mb-md-4"
      />
    </div>
  );
}

export default ParticipantsTabs;
