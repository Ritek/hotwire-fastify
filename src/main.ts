import './style.css';
// import typescriptLogo from './typescript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.ts';
// import * as Turbo from "@hotwired/turbo";
import "@hotwired/turbo";

// import { setupSse } from './sse.ts';c
// Turbo.connectStreamSource("/");

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="flex justify-center">

    <div class="w-1/2">
      <turbo-frame id="form-test">
        <form action="/messages" method="post">
          <fieldset>
            <legend>Send a message:</legend>
            <label for="task">Name</label>
            <input id="task" name="task" type="text" placeholder="A new message..." required type="reset" value=""/>
          </fieldset>
          <button type="submit" class="bg-sky-500 border-2 border-solid rounded-sm">Send</button>
        </form>
      </turbo-frame>

      <turbo-frame id="initial_messages" src="/initial_messages">
        <p>This message will be replaced by the response from /messages.</p>
      </turbo-frame>

      <div id="messages">
        <p>This message will be replaced by the response from /messages.</p>
      </div>
    </div>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
// setupSse(document.querySelector<HTMLDivElement>('#log')!);
