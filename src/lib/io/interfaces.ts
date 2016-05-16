export interface Receiver {
 () : void
}

export interface Sender {
 (message : string) : void
}

export interface IO {
 receive : Receiver,
 send : Sender
}
