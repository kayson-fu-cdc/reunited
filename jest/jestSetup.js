class MessageChannelStub {
    constructor() {
      this.port1 = { onmessage: undefined };
      this.port2 = {
        postMessage: (c) => {
          this.port1.onmessage();
        },
      };
    }
  }
  
  window.MessageChannel = MessageChannelStub;