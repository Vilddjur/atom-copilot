'use babel';

import FriendAtomView from './friend-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  friendAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.friendAtomView = new FriendAtomView(state.friendAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.friendAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'friend-atom:toggle': () => this.run()
    }));
  },
  run(){
    this.show();
    this.friendAtomView.loadLang(this.copyToClipboard, this.modalPanel);
  },
  show() {
    return (
      this.modalPanel.show()
    );
  },
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.friendAtomView.destroy();
  },

  serialize() {
    return {
      friendAtomViewState: this.friendAtomView.serialize()
    };
  }
};
