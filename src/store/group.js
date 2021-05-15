import {observable, action, makeObservable} from 'mobx';

export class Group {
  @observable
  groups = undefined;

  @observable
  groupCurrent = undefined;

  @observable
  messages = undefined;

  constructor(groups, groupCurrent, messages) {
    this.groups = groups;
    this.groupCurrent = groupCurrent;
    this.messages = messages;
    makeObservable(this);
  }

  @action
  setGroups = (value) => {
    this.groups = value;
  };
  @action
  setGroupCurrent = (value) => {
    this.groupCurrent = value;
  };
  @action
  setMessages = (value, roomId) => {
    if (this.messages) this.messages = [value, ...this.messages];
    else this.messages = [value];
    if (roomId && this.groups) {
      const oldData = [...this.groups].filter((it) => {
        return it.id + '' !== roomId + '';
      });
      const newData = [...this.groups].find((it) => {
        return it.id + '' === roomId + '';
      });
      newData.lastMassage = value;
      this.groups = [newData, ...oldData];
    }
  };
  @action
  setSeenMessage = (value, roomId) => {
    const oldData = [...this.groups].filter((it) => {
      return it.id + '' !== roomId + '';
    });
    const newData = [...this.groups].find((it) => {
      return it.id + '' === roomId + '';
    });
    newData.lastMassage = value;
    this.groups = [newData, ...oldData];
  };
  @action
  setMessagesBegin = (value) => {
    this.messages = value;
  };
}
