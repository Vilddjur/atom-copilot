'use babel';

export default class FriendAtomView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('friend-atom');

    // Create message element
    this.loadLang();
  }
  loadLang(){
    var message = null;
    if(document.getElementById('lang-friend-atom') === null){
      message = document.createElement('div');
      message.setAttribute("id", "lang-friend-atom");
    }else{
      message = document.getElementById('lang-friend-atom');
    }
    lang = atom.workspace.getActiveTextEditor().getGrammar().name;
    if(lang == null ){
      lang = "Plain Text";
    }

    message.textContent = 'You are writing in: ' + lang;
    message.classList.add('message');
    this.element.appendChild(message);
  }
  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
