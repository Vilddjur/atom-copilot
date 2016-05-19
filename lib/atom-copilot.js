'use babel';

import AtomCopilotView from './atom-copilot-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCopilotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCopilotView = new AtomCopilotView(state.atomCopilotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCopilotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-copilot:toggle': () => this.run()
    }));
  },
  run(){
    this.show();
    this.atomCopilotView.loadLang(this.copyToClipboard, this.modalPanel);
  },
  show() {
    return (
      this.modalPanel.show()
    );
  },
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCopilotView.destroy();
  },

  serialize() {
    return {
      atomCopilotViewState: this.atomCopilotView.serialize()
    };
  }
};
