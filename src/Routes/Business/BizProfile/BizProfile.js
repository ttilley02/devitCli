import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import ApiService from "../../../services/ApiService";
import AppContext from "../../../AppContext";
import "./BizProfile.css";

function BizProfile(props) {
  const context = useContext(AppContext);
  let { businessID } = useParams();
  let [profile, setProfile] = useState({
    id: "",
    dev_blurb: "",
    emp_blurb: "",
    user_id: "",
    nickname: "",
    skills: [],
    level: [],
    image: "",
  });

  useEffect(() => {
    let isMounted = true; // track whether component is mounted

    ApiService.getUserProfiles(businessID).then((profile) => {
      if (isMounted) {
        setProfile(profile);
      }
    });

    return () => {
      // clean up
      isMounted = false;
    };
  }, []); // only on "didMount"

  return (
    <main>
      {context.user.id === businessID &&
      (profile.emp_blurb === null || profile.emp_blurb === "") ? (
        <Redirect to="/SignUp/BizDetails" />
      ) : (
        <section className="profile-wrapper">
          <Header />
          <h1 className="profile-header">{profile.nickname}</h1>
          <section className="Biz-image-offer-container">
            <article className="Biz-image-container">
              <img src={profile.image} className="Biz" alt={profile.nickname} />
            </article>
          </section>
          <section className="Biz-info-container">
            <h3>About Us</h3>
            <article className="Biz-blurb">
              <p className="profile-text">{profile.emp_blurb}</p>
            </article>
          </section>
        </section>
      )}
    </main>
  );
}
export default BizProfile;
