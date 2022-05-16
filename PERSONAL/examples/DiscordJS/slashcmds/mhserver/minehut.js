


/** 

	!! current objects listed in the Minehut API per server

*/


const run = async (client, interaction) => {

	await interaction.deferReply()

	// console.log(1);

	const MinehutAPI = require('../modules/constructor.js')
	const server = interaction.options.getString('server')
	const value = interaction.options.getString('value')

	// console.log(2);

	await MinehutAPI.getServer(server)

	if (!MinehutAPI.getStatus()) {
		return interaction.followUp({
			content: MinehutAPI.getError(),
			ephermeral: true
		})
	}

	// console.log(3);

	if (!MinehutAPI.hasValue(value)) return interaction.followUp({
		content: `This tag, ${value} for server ${server}, does not exist`,
		ephermeral: true
	})

	const details = MinehutAPI.getValue(value)

	// console.log(`${details}`, value);
	// console.log(4);

	try {
		return interaction.followUp({
			content: `**${server}**'s tag ${value} is ${details}`,
			ephermeral: true
		})
	} catch (err) {
		// console.log(5);
		return interaction.followUp({
			content: 'Failed to process command at the end.',
			ephermeral: true
		})
	}



}


module.exports = {

	name: "getserver",
	description: "retrieves a specific Minehut server's information",
	perm: "ADMINISTRATOR",
	options: [
		{
			name: "server", description: "gets server details",
			type: "STRING", required: true
		},
		{
			name: "value", description: "retrieve a specific detail of the target server",
			type: "STRING", required: true,
			choices: [
				{name: "backup_slots", value: "backup_slots"},
				{name: "suspended", value: "suspended"},
				{name: "server_version_type", value: "server_version_type"},
				{name: "proxy", value: "proxy"},
				{name: "_id", value: "_id"},
				{name: "owner", value: "owner"},
				{name: "name", value: "name"},
				{name: "creation", value: "creation"},
				{name: "platform", value: "platform"},
				{name: "storage_node", value: "storage_node"},
				{name: "__v", value: "__v"},
				{name: "port", value: "port"},
				{name: "last_online", value: "last_online"},
				{name: "visibility", value: "visibility"},
				{name: "motd", value: "motd"},
				{name: "server_plan", value: "server_plan"},
				{name: "credits_per_day", value: "credits_per_day"},
				{name: "active_icon", value: "active_icon"},
				{name: "icon", value: "icon"},
				{name: "online", value: "online"},
				{name: "maxPlayers", value: "maxPlayers"},
				{name: "playerCount", value: "playerCount"},
				{name: "activeServerPlan", value: "activeServerPlan"}
			]
		}
	],
	run


}


// function for titlecasing stuff