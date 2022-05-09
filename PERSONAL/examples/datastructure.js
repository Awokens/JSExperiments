
const SERVER_API = 'https://api.minehut.com/server/{server}?byName=true' // <--- base api domain
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



// data structure below \/

class MinehutAPI {

    constructor() {

        this.server = null
        this.name = null

    }

    async getServer(value) {
        try {

            const response = await fetch(SERVER_API.replace('{server}', value))

            if (!response || !response.ok) return;

            const data = await response.json()
            this.server = data.server

        } catch (err) {
            console.error("Server Fetch Error: ", err);
        }
    }

    status() {
        return this.server != null
    }

    getName() {
        try {
            return this.server.name
        } catch (err) {
            console.error("Server Name Error: " + err);
        }
        return null
    }



    


}

async function main() {

    const server = "102d2d"

    const Minehut = new MinehutAPI()

    await Minehut.getServer(server)

    if (!Minehut.status()) return console.log("This server does not exist or something went wrong in the backend.");

    const name = Minehut.getName()
    if (!name) return console.log(`The formal name of the server, ${server} is missing for some reason`)

    console.log(Minehut.getName());

}

main()


