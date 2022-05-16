const BASE_API = 'https://api.minehut.com/server/'
const fetch = (...args) => import('node-fetch')
    .then(({
        default: fetch
    }) => fetch(...args))

class Minehut {
    constructor() {
        this.server = null
        this.name = null
        this.error = null
    }

    async getServer(value) {

        try {
            const response = await fetch(`${BASE_API}${value}?byName=true`)
            if (!response || !response.ok) {
                this.error = `This server named, ${value} doesn't exist`
                return
            }
            const data = await response.json()
            this.server = data.server

        } catch (err) {
            this.error = `Error: ${err}`
        }
        this.eror = `Failed to fetch server, ${value} while in the process`
    }

    getStatus() {
        return this.server != null
    }

    getValue(value) {
        if (!this.getStatus()) return null

        try {
            for (let obj in this.server) {
                if (obj.toString() === value) return this.server[obj]
            }
            this.error = `This valuee doesn't exist in the server data of ${this.name}`
        } catch (err) {
            this.error = `Error: ${err}`
        }
        return null
    }

	hasValue(value) {
		if (!this.getStatus()) return null

        try {
            for (let obj in this.server) {
                if (obj.toString() === value) return true
            }
            return false
        } catch (err) {
            this.error = `Error: ${err}`
        }
        return false
	}

    getError() {


		if (!this.error || !typeof this.error instanceof 'string') return 'There is no error input for the cause :('

		return this.error
    }
}