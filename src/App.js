import React, { useEffect, useState } from "react";
import './index.css'

const JsonBodyObject = (props) => {
  return (
    <>
      <p key={props.id}>
        "{props.name}": "{props.list.message}"
      </p>
    </>
  );
};

function JsonArrayObject(props) {
  let content = "";

  for (var i = 0; i < props.length; i++) {
    if (props.hasOwnProperty(i)) {
      if (i === props.length - 1) {
        content += props[i].name;
      } else {
        content += props[i].name + '", "';
      }
    }
  }

  return content;
}

function JsonArrayObject2(props) {
  let content = "";

  for (var i = 0; i < props.length; i++) {
    if (props.hasOwnProperty(i)) {
      if (i === props.length - 1) {
        content += props[i].message;
      } else {
        content += props[i].message + '", "';
      }
    }
  }

  return content;
}

const JsonBodyArray = (props) => {
  return (
    <>
      <p key={props.id}>
        "{props.name}": ["{JsonArrayObject(props.list)}"]
      </p>
    </>
  );
}

const JsonBodyArray2 = (props) => {
  return (
    <>
      <p key={props.id}>
        "{props.name}": ["{JsonArrayObject2(props.list)}"]
      </p>
    </>
  );
};

const App = () => {

  const [persons, setPerson] = useState();

  const personUrl = "https://naythanc.dev/person";

  // Function to collect data
  const getPerson = async () => {
    const response = await fetch(
      personUrl + "/api/v1/jc"
    ).then((response) => response.json());

    setPerson(response);
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <>
      {persons && 
        persons.map((person) => {
        let socials = person.socials.map((social) => {
          return (
            <>
              <p className="json-child" key={social.id}>
                "{social.name}": "
                <a href={social.url} rel="noreferrer" target="_blank">
                  {social.social_value}
                </a>
                "
              </p>
            </>
          );
        });
        let skills = person.skills.map((skills) => {
          return (
            <>
              <div className="json-child" key={skills.id}>
                <JsonBodyArray name="language" list={skills.languages} />
                <JsonBodyArray name="framework" list={skills.framework} />
                <JsonBodyArray name="cicd" list={skills.cicd} />
                <JsonBodyArray name="container" list={skills.container} />
                <JsonBodyArray name="monitoring" list={skills.monitoring} />
                <JsonBodyArray
                  name="messaging_platform"
                  list={skills.messaging_platform}
                />
                <JsonBodyArray name="security" list={skills.security} />
              </div>
            </>
          );
        });
        let misc = person.misc.map((misc) => {
          return (
            <>
              <div className="json-child" key={misc.id}>
                <JsonBodyArray name="hobbies" list={misc.hobbies} />
                <JsonBodyArray2 name="learn" list={misc.learn} />
                <JsonBodyObject name="uh" list={misc.uh} />
              </div>
            </>
          );
        });
        return (
          <>
            <div className="header">
              <p>👋👋</p>
            </div>
            <div key={person.id}>"{person.name}": &#123;</div>
            <div className="json-parent">
              <p>"socials": &#123;</p>
            </div>
            <div>{socials}</div>
            <div className="json-parent">
              <p>&#125;</p>
            </div>
            <p>&#125;</p>
            <div className="json-parent">
              <p>"skills": &#123;</p>
            </div>
            {skills}
            <div className="json-parent">
              <p>&#125;</p>
            </div>
            <p>&#125;</p>
            <div className="json-parent">
              <p>"misc": &#123;</p>
            </div>
            {misc}
            <div className="json-parent">
              <p>&#125;</p>
            </div>
            <p>&#125;</p>
          </>
        );
      })}
      <div className="footer">by: JC</div>
    </>
  );
}

export default App