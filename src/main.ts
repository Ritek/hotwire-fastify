import './style.css';
import "@hotwired/turbo";
import { Application } from "@hotwired/stimulus";
import HelloController from "./hello_controller";

// @ts-ignore
window.Stimulus = Application.start();
// @ts-ignore
Stimulus.register("hello", HelloController);


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="flex justify-center">

    <div class="w-1/2">
        <turbo-frame id="form-test">
          <form id="message-form" action="/messages" method="post" data-controller="hello" data-action="turbo:submit-end->hello#submit">
            <fieldset >
              <legend>Simple chat</legend>
              <label for="message-user">Name:</label>
              <input id="message-user" name="user" type="text" placeholder="Enter your name..." required type="reset" value=""/>

              <div class="flex flex-col">
                <label for="message-content">Message:</label>
                <input id="message-content" name="message" type="text" placeholder="Enter message here..." 
                  class="border-b-2 border-sky-500 mb-2 focus:invalid:border-red-500 bg-transparent"
                  required type="reset" value=""
                  data-hello-target="messageInput"
                />
              </div>
            </fieldset>

            <div class="flex justify-end">
              <button form="message-form" value="add" type="submit" 
                class="bg-sky-500 hover:bg-sky-800 px-2 border-2 border-solid rounded-sm" 
                data-action="turbo:submit-end->hello#submit"
              >Send</button>
            </div>

            <div>
              <h4>Received messages:</h4>
              <turbo-frame id="messages" src="/initial_messages">
                
              </turbo-frame>
            </div>
          </form>
        </turbo-frame>
      </div>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
// setupSse(document.querySelector<HTMLDivElement>('#log')!);
