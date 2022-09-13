/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../voter/params";
import { Poll } from "../voter/poll";
import { Vote } from "../voter/vote";

export const protobufPackage = "voter.voter";

/** GenesisState defines the voter module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  pollList: Poll[];
  pollCount: number;
  voteList: Vote[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  voteCount: number;
}

const baseGenesisState: object = { pollCount: 0, voteCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pollList) {
      Poll.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pollCount !== 0) {
      writer.uint32(24).uint64(message.pollCount);
    }
    for (const v of message.voteList) {
      Vote.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.voteCount !== 0) {
      writer.uint32(40).uint64(message.voteCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.pollList = [];
    message.voteList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.pollList.push(Poll.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pollCount = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.voteList.push(Vote.decode(reader, reader.uint32()));
          break;
        case 5:
          message.voteCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.pollList = [];
    message.voteList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.pollList !== undefined && object.pollList !== null) {
      for (const e of object.pollList) {
        message.pollList.push(Poll.fromJSON(e));
      }
    }
    if (object.pollCount !== undefined && object.pollCount !== null) {
      message.pollCount = Number(object.pollCount);
    } else {
      message.pollCount = 0;
    }
    if (object.voteList !== undefined && object.voteList !== null) {
      for (const e of object.voteList) {
        message.voteList.push(Vote.fromJSON(e));
      }
    }
    if (object.voteCount !== undefined && object.voteCount !== null) {
      message.voteCount = Number(object.voteCount);
    } else {
      message.voteCount = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.pollList) {
      obj.pollList = message.pollList.map((e) =>
        e ? Poll.toJSON(e) : undefined
      );
    } else {
      obj.pollList = [];
    }
    message.pollCount !== undefined && (obj.pollCount = message.pollCount);
    if (message.voteList) {
      obj.voteList = message.voteList.map((e) =>
        e ? Vote.toJSON(e) : undefined
      );
    } else {
      obj.voteList = [];
    }
    message.voteCount !== undefined && (obj.voteCount = message.voteCount);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.pollList = [];
    message.voteList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.pollList !== undefined && object.pollList !== null) {
      for (const e of object.pollList) {
        message.pollList.push(Poll.fromPartial(e));
      }
    }
    if (object.pollCount !== undefined && object.pollCount !== null) {
      message.pollCount = object.pollCount;
    } else {
      message.pollCount = 0;
    }
    if (object.voteList !== undefined && object.voteList !== null) {
      for (const e of object.voteList) {
        message.voteList.push(Vote.fromPartial(e));
      }
    }
    if (object.voteCount !== undefined && object.voteCount !== null) {
      message.voteCount = object.voteCount;
    } else {
      message.voteCount = 0;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
