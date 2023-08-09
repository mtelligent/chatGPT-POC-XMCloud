/* eslint-disable */
import styles from "./AIButtons.module.css";

import {
  Field,
  ImageField,
  Item,
  withDatasourceCheck,
  useSitecoreContext
} from '@sitecore-jss/sitecore-jss-nextjs';

import { ComponentProps } from 'lib/component-props';
import React, { useEffect } from 'react';

interface PromptFields {
  Name: Field<string>;
  Append: Field<boolean>;
  Description: Field<string>;
  Icon: ImageField;
}

type Prompt = Item & {
  fields: PromptFields[];
}

interface Fields {
  EnableFreePrompt: Field<boolean>;
  AllTextAreas: Field<boolean>;
  AllTextBoxes: Field<boolean>;
  CSSClasses: Field<boolean>;

  Prompts: Prompt[];
}

type GenAIPromps = ComponentProps & {
  fields: Fields;
};


const AIButtons = (props: GenAIPromps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  let selected:HTMLElement;

  const { sitecoreContext } = useSitecoreContext();

  let clickHandler = function(event : MouseEvent){
    console.log("about to type");
    
    event.preventDefault();

    let pageId:string = sitecoreContext.itemId ?? "";
    console.log("pageId:" + pageId);

    if (selected){
      var btn = event.target as HTMLElement;
      if (btn){
        let promptId:string = btn.getAttribute("data-id") ?? "";
        console.log("promptId:" + promptId);

        let append:boolean = btn.getAttribute("data-append") === "true";
       
        
        callPrompt(selected, pageId, promptId, append);

      }
      
    }
  };


  function callPrompt(target:HTMLElement, pageId:string, promptId:string, append:boolean){

    let content = target.innerText;

    if (!append){
      target.innerText = "";
    }

    let request = new XMLHttpRequest();
    let url = "/api/1.0/genAI/prompt";

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let message = request.response;
            typeString(target, message, 0, 25, () => { 
        
              var saveButtonState = document.getElementById("__SAVEBUTTONSTATE") as HTMLInputElement;
              if (saveButtonState){
                saveButtonState.value = "1";
                saveButtonState.onchange(new Event("changed"));
              }
              
              let id = selected.id;
      
              document.getElementById('scFieldValues')?.querySelectorAll("input").forEach(hidden => {
                if (id.indexOf(hidden.id) >= 0) {
                  hidden.value = selected.innerHTML;
                }
            });
      
              console.log("typed everything");
            });
          }
    };
    
    var data = JSON.stringify({"pageId": pageId, "promptId": promptId, "content": content});

    request.send(data);

  }

  useEffect(() => {
    console.log('AI Buttons: Client Side Code Entered');

    var editable = document.querySelectorAll(".scWebEditInput, .scWebEditInput>.ql-editor");
    var aiToolbar = document.getElementById("aiToolbar");
  
    aiToolbar?.querySelectorAll("button").forEach(btn => btn.removeEventListener("click", clickHandler ));
    aiToolbar?.querySelectorAll("button").forEach(btn => btn.addEventListener("click", clickHandler));

    editable.forEach(item => item.addEventListener('focus', (event : FocusEvent) => {
      console.log("AI Buttons: focused on editable.");
      let editNode = event.target as HTMLElement;
      selected = editNode;
      if (editNode && aiToolbar){
        editNode?.parentNode?.appendChild(aiToolbar);
        fadeIn(aiToolbar, 1000);
      }       
      
    }));
    editable.forEach(item => item.addEventListener('blur', (event : FocusEvent) => {
      console.log("AI Buttons: blurred editable.");
      fadeOut(aiToolbar, 500);
    }));


  }, [ ]);

  function typeString(target: HTMLElement, str: string, cursor: number, delay: number, cb: Function) {
    let typed = target.innerHTML;
    target.innerText = typed + str[cursor];
    //document.execCommand("insertText", false, str[cursor]);
    //var e = jQuery.Event("keydown");
    //e.which = str.charCodeAt(cursor);
    //jQuery(target).trigger(e);

    if (cursor < str.length - 1) {
      setTimeout(function() {
        typeString(target, str, cursor + 1, delay, cb);
      }, delay);
    } else {
      cb();
    }
  }


  function fadeIn( elem : HTMLElement, ms : number )
  {
    if( ! elem )
      return;
  
    elem.style.opacity = "0";
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "block";
    elem.style.visibility = "visible";
  
    if( ms )
    {
      var opacity = 0;
      var timer = setInterval( function() {
        opacity += 50 / ms;
        if( opacity >= 1 )
        {
          clearInterval(timer);
          opacity = 1;
        }
        elem.style.opacity = opacity.toString();
        elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
      }, 50 );
    }
    else
    {
      elem.style.opacity = "1";
      elem.style.filter = "alpha(opacity=1)";
    }
  }
  
  function fadeOut( elem, ms )
  {
    if( ! elem )
      return;
  
    if( ms )
    {
      var opacity = 1;
      var timer = setInterval( function() {
        opacity -= 50 / ms;
        if( opacity <= 0 )
        {
          clearInterval(timer);
          opacity = 0;
          elem.style.display = "none";
          elem.style.visibility = "hidden";
        }
        elem.style.opacity = opacity;
        elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
      }, 50 );
    }
    else
    {
      elem.style.opacity = 0;
      elem.style.filter = "alpha(opacity=0)";
      elem.style.display = "none";
      elem.style.visibility = "hidden";
    }
  }

  return (
    <div
      className={`component layout-context-data ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <div className="component-content">

      <div id="aiToolbar" className={styles.aiToolbar}>
       
        {props.fields?.Prompts?.map((value, index) => (
          <button data-id={value?.id} >{value?.name}</button>
        ))}
        
      </div>        
      </div>
    </div>
  );
};

export const Default = withDatasourceCheck()(AIButtons);
