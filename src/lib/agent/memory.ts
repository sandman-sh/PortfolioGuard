import { getMemoryState } from "@/lib/storage";

export async function readAgentMemory(address?: string) {
  return getMemoryState(address);
}
