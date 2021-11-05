import React from 'react'
import './index.css'

const JsonBody1 = (props) => {
  return(
    <>
      <p>"{props.name}": "<a href={props.link} target="_blank">{props.value}</a>",</p>
    </>
  )
}

const JsonBody2 = (props) => {
  return(
    <>
      <p>"{props.name}": "{props.value}"</p>
    </>
  )
}

function JsonArrayString(props) {
  let content = "";

  for (var i = 0; i < props.length; i++) {
    if (i === props.length - 1) {
      content += props[i]
    } else {
      content += props[i] + "\", \"" 
    }
  }

  return content;
}

const JsonBodyArray = (props) => {
  return(
    <>
      <p>"{props.name}": ["{JsonArrayString(props.list)}"],</p>
    </>
  )
}

const App = () => {

  const skills = ["java", "groovy", "rust", "bash"];
  const framework = ["spring-boot", "apache-camel", "quarkus"];
  const cicd = ["jenkins", "github-actions"];
  const containers = ["docker", "kubernetes", "openshift"];
  const monitoring = ["prometheus", "grafana", "splunk"];
  const messaging_platform = ["amq", "ibm mq"];

  const hobbies = ["k3s", "raspi4", "💤", "🏃‍♂️", "📖"];
  const learn = ["go", "rust", "react"];


  return(
  <>
      <p>"JC": &#123;</p>
      <div class="json-parent"><p>"socials": &#123;</p></div>
      <div class="json-child">
        <JsonBody1 name="github" link="https://github.com/shin-san" value="shin-san"/>
        <JsonBody1 name="linkedin" link="https://www.linkedin.com/in/naythanc" value="naythanc"/>
        <p>"contact": "<a href="mailto:nchan009@gmail.com">nchan009@gmail.com</a>"</p>
      </div>
      <div class="json-parent"><p>&#125;</p></div>
      <p>&#125;,</p>
      <div class="json-parent"><p>"skills": &#123;</p></div>
      <div class="json-child">
        <JsonBodyArray name="language" list={skills}/>
        <JsonBodyArray name="framework" list={framework}/>
        <JsonBodyArray name="cicd" list={cicd}/>
        <JsonBodyArray name="container" list={containers}/>
        <JsonBodyArray name="monitoring" list={monitoring}/>
        <JsonBodyArray name="messaging_platform" list={messaging_platform}/>
        <JsonBody2 name="security" value ="oauth"/>
      </div>
      <div class="json-parent"><p>&#125;</p></div>
      <p>&#125;</p>
      <div class="json-parent"><p>"misc": &#123;</p></div>
      <div class="json-child">
        <JsonBodyArray name="hobbies" list={hobbies}/>
        <JsonBodyArray name="learn" list={learn}/>
        <JsonBody2 name="uh" value ="dunno what else to add"/>
      </div>
      <div class="json-parent"><p>&#125;</p></div>
      <p>&#125;</p>
  </>
  )
}

export default App