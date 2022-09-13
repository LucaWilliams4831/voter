import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgDeletePoll } from "./types/voter/tx";
import { MsgUpdateVote } from "./types/voter/tx";
import { MsgCreatePoll } from "./types/voter/tx";
import { MsgCreateVote } from "./types/voter/tx";
import { MsgDeleteVote } from "./types/voter/tx";
import { MsgUpdatePoll } from "./types/voter/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/voter.voter.MsgDeletePoll", MsgDeletePoll],
    ["/voter.voter.MsgUpdateVote", MsgUpdateVote],
    ["/voter.voter.MsgCreatePoll", MsgCreatePoll],
    ["/voter.voter.MsgCreateVote", MsgCreateVote],
    ["/voter.voter.MsgDeleteVote", MsgDeleteVote],
    ["/voter.voter.MsgUpdatePoll", MsgUpdatePoll],
    
];

export { msgTypes }