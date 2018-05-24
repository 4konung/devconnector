export const structeredProfile = ({
  twitter = "",
  facebook = "",
  linkedin = "",
  youtube = "",
  instagram = "",
  handle = "",
  company = "",
  website = "",
  location = "",
  skills = "",
  status = "",
  githubusername = "",
  bio = "",
  social
}) => {
  let result = {
    handle,
    company,
    website,
    location,
    status,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    skills: Array.isArray(skills) ? skills.join(",") : skills
  };

  // If it is data from server, pasre social obj
  if (social) {
    const socialData = Object.entries(social).reduce(
      (accu, [key, value]) => ({ ...accu, [key]: value }),
      {}
    );
    result = { ...result, ...socialData };
  }

  return result;
};

export const structeredExperience = ({
  title = "",
  company = "",
  location = "",
  from = "",
  to = "",
  current = false,
  description = ""
}) => ({
  title,
  company,
  location,
  from,
  to,
  current,
  description
});

export const optionslist = [
  {
    label: "* Select Professional Status",
    value: 0
  },
  {
    label: "Developer",
    value: "Developer"
  },
  {
    label: "Junior Developer",
    value: "Junior Developer"
  },
  {
    label: "Senior Developer",
    value: "Senior Developer"
  },
  {
    label: "Manager",
    value: "Manager"
  },
  {
    label: "Student of Learning",
    value: "Student of Learning"
  },
  {
    label: "Instructor or Teacher",
    value: "Instructor or Teacher"
  },
  {
    label: "Intern",
    value: "Intern"
  },
  {
    label: "Other",
    value: "Other"
  }
];
