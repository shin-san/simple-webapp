import React, { useEffect, useState } from "react";
import './index.css'

const JsonBody1 = (props) => {
  return(
    <>
      "{props.name}": "<a href={props.link} rel="noreferrer" target="_blank">{props.value}</a>"
    </>
  )
}

const JsonBodyObject = (props) => {
  return (
    <>
      <p>
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
      <p>
        "{props.name}": ["{JsonArrayObject(props.list)}"]
      </p>
    </>
  );
}

const JsonBodyArray2 = (props) => {
  return (
    <>
      <p>
        "{props.name}": ["{JsonArrayObject2(props.list)}"]
      </p>
    </>
  );
};

const App = () => {

  const [persons, setPerson] = useState();

  const personUrl = "http://person-service.jc-dev.svc";

  // Function to collect data
  const getPerson = async () => {
    const response = await fetch(
      personUrl + "/api/v1/person/JC"
    ).then((response) => response.json());

    setPerson(response);
  };

  useEffect(() => {
    getPerson();
  }, []);

  console.log(persons);

  return (
    <>
      {persons && 
        persons.map((person) => {
        let socials = person.socials.map((social) => {
          return (
            <>
              <p className="json-child">
                <JsonBody1
                  name={social.name}
                  link={social.url}
                  value={social.social_value}
                />
              </p>
            </>
          );
        });
        let skills = person.skills.map((skills) => {
          return (
            <>
              <div className="json-child">
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
              <div className="json-child">
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
            <div>"{person.name}": &#123;</div>
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