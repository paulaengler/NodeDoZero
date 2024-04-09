import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    list() {
        return Array.from(this.#videos.values())
    }

    create(video) {
        const videoID = randomUUID();
        this.#videos.set(videoID, video);
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}