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
      out = "nothing";
      container.textContent = out;
    }else {
      for(i in out){
        this.addSuggestion(container, out[i]);
      }
    }
    container.classList.add('container');

    this.element.appendChild(container);
  }
  addSuggestion(container, text){
    single_suggestion = document.createElement('div');
    single_suggestion.classList.add('single-suggestion');
    single_suggestion.textContent = text;
    single_suggestion_link = document.createElement('a');
    single_suggestion_link.textContent = "COPY";
    single_suggestion_link.onclick = function(){ FriendAtomView.copyToClipboard(text);};
    single_suggestion.appendChild(document.createElement('br'));
    single_suggestion.appendChild(single_suggestion_link);
    container.appendChild(single_suggestion);
  }
  getNextWord(json, index, words){
    if (json.hasOwnProperty("code")){
      return json["code"];
    }else if(json.hasOwnProperty(words[index])){
      return this.getNextWord(json[words[index]], index+1, words)
    }
    return null
  }
  static copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      } finally {
          document.body.removeChild(textarea);
      }
    }
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
