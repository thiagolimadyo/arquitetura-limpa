// import { v4 as uuid } from "uuid";
import { randomUUID } from "node:crypto";

export default class Id {
  static gerar(): string {
    return randomUUID();
  }
}
