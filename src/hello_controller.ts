import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  declare readonly hasMessageInputTarget: boolean;
  declare readonly messageInputTarget: HTMLInputElement;

  static targets = [ "messageInput" ];

  submit() {
    const element: HTMLInputElement = this.messageInputTarget;
    const name = element.value;
    console.log(`Hello, ${name}!`, {element, name});
    element.value = "";
  }

  removeMessage() {
    
  }
} 