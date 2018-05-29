import React from "react";
import ProfileCredsExperienceList from "./ProfileCredsExperienceList";
import ProfileCredsEducationList from "./ProfileCredsEducationList";

const ProfileCreds = ({ education, experience }) => {
  return (
    <div className="row">
      <ProfileCredsExperienceList experience={experience} />
      <ProfileCredsEducationList education={education} />
    </div>
  );
};

export default ProfileCreds;
