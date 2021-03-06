import React, { useState, useContext } from "react";
import "./FLDetsForm.css";
import Header from "../../../Components/Header/Header";
import AddSkill from "../../../Components/Utilities/AddSkill/AddSkill";
import AddButton from "../../../Components/Utilities/AddButton/AddButton";
import PictureUpload from "../../../Components/PictureUpload/PictureUpload";
import SmallButton from "../../../Components/Utilities/SmallButton/SmallButton";
import AppContext from "../../../AppContext";
import ApiService from "../../../services/ApiService";
import TokenService from "../../../services/TokenService";

function FLDetsForm(props) {
  const context = useContext(AppContext);
  const [textarea, setTextarea] = useState("");
  const [image, setImage] = useState("");

  const saveChanges = () => {
    ApiService.addProfile({ dev_blurb: textarea, image: image })
      .then(() => context.addFreelanceSkills())
      .then(() => {
        TokenService.clearAuthToken();
        props.history.push("/login");
      });
  };

  const setProfileImage = (imageURL) => {
    setImage(imageURL);
  };

  const addedSkills = context.AddSkills.map((skill, index) => (
    <AddSkill typeOfSkill="AddSkills" skill={skill} key={index} index={index} />
  ));

  return (
    <main>
      <Header />
      <form
        className="fl-details-form"
        onSubmit={(e) => {
          e.preventDefault();
          saveChanges();
        }}
      >
        <h1>Your Details</h1>
        <label className="about-label" htmlFor="about">
          About
        </label>
        <textarea
          id="about"
          name="about"
          cols="40"
          rows="8"
          placeholder="Enter a little something about yourself."
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        ></textarea>
        <section>
          <article className="skills-container">
            <h2>Add Skills</h2>
            {addedSkills}
          </article>
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              context.addSkill("AddSkills");
            }}
          />
        </section>
        <PictureUpload image={image} setImage={setProfileImage} />
        <SmallButton
          className="btn"
          buttonStyle="btn-outline"
          buttonSize="btn-large"
          type="Submit"
          onSubmit={(e) => {
            e.preventDefault();
            saveChanges();
          }}
        >
          Save
        </SmallButton>
      </form>
    </main>
  );
}

export default FLDetsForm;
