import { IDAllocator } from "../../shared/src/utils/IDAllocator";
import { Logger } from "../../shared/src/utils/Logger";
import { Game } from "./game/Game";

export const core = {
    gameAllocator: new IDAllocator(6),
    games: new Map<number, Game>(),
    logger: new Logger()
};
