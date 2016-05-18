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
    this.element.innerHTML = "";
    container = document.createElement('div');

    editor = atom.workspace.getActiveTextEditor();
    lang = editor.getGrammar().name;
    if(lang !== null ){
      json = require('../language/'+lang.toLowerCase()+'.json');
      words = editor.lineTextForBufferRow(editor.getCursorBufferPosition().row).split(/[\s,"'.]+/);
      out = this.getNextWord(json, 0, words);
    }
    console.log(out);
    if(out === null){
      container.textContent = out;
      container.classList.add('container');

      this.element.appendChild(container);
      out = "nothing";
    }else {
      for(i in out){
        single_suggestion = document.createElement('div');
        single_suggestion.classList.add('single-suggestion');
        single_suggestion.textContent = out[i];
        this.element.appendChild(single_suggestion);
      }
    }
  }
  getNextWord(json, index, words){
    if (json.hasOwnProperty("code")){
      return json["code"];
    }else if(json.hasOwnProperty(words[index])){
      return this.getNextWord(json[words[index]], index+1, words)
    }
    return null
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
