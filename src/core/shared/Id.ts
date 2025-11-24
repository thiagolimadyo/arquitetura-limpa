import { randomUUID } from "node:crypto";

export default class Id {
  static gerar(): string {
    return randomUUID();
  }
}
