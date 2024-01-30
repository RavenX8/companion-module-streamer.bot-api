import { InstanceBase, Regex, runEntrypoint, InstanceStatus } from '@companion-module/base'
import UpgradeScripts from './upgrades.js'
import UpdateActions from './actions.js'
import UpdateFeedbacks from './feedbacks.js'
import UpdateVariableDefinitions from './variables.js'
import { StreamerbotClient } from '@streamerbot/client'

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.loaded = false
		this.intervalId = undefined

		this.config = {}
		this.credits = {}
		this.actions = []
		this.triggers = []
		this.activeViewers = 0
		this.dataArray = []
	}

	async subscribe() {
		this.dataArray['CrowdControl'] = []
		this.dataArray['Patreon'] = []
		this.dataArray['StreamElements'] = []
		this.dataArray['Streamlabs'] = []
		this.dataArray['TipeeeStream'] = []
		this.dataArray['Twitch'] = []
		this.dataArray['YouTube'] = []

		await this.client.on(
			['CrowdControl.*', 'Patreon.*', 'StreamElements.*', 'Streamlabs.*', 'TipeeeStream.*', 'Twitch.*', 'YouTube.*'],
			(data) => {
				console.log('Data Received!', data)
				if (this.dataArray.hasOwnProperty(data.event.source) === false) this.dataArray[data.event.source] = []
				if (this.dataArray[data.event.source].hasOwnProperty(data.event.type) === false)
					this.dataArray[data.event.source][data.event.type] = {}
				this.dataArray[data.event.source][data.event.type] = data
			}
		)
	}

	async init(config) {
		this.config = config
		this.client = new StreamerbotClient({
			host: this.config.host,
			port: this.config.port,
			endpoint: this.config.endpoint,
			onConnect: async (data) => {
				await this.subscribe()

				this.loaded = true
				this.updateStatus(InstanceStatus.Ok)

				await this.client.getActions().then((value) => {
					this.actions = value
				})
				await this.client.getCodeTriggers().then((value) => {
					this.triggers = value
				})
				await this.client.getActiveViewers().then((value) => {
					this.activeViewers = value.count
				})
				await this.client.getCredits().then((value) => {
					this.credits = value
				})

				this.updateActions() // export actions
				this.updateFeedbacks() // export feedbacks
				this.updateVariableDefinitions() // export variable definitions

				// this.updateVariableValues()
				this.intervalId = setInterval(() => {
					this.updateVariableValues()
				}, 1000)
			},
			onDisconnect: () => {
				this.updateStatus(InstanceStatus.Disconnected)
			},
			onError: (error) => {
				this.loaded = false
				this.log('debug', error.message)
				this.updateStatus(InstanceStatus.UnknownError)
			},
		})

		this.updateStatus(InstanceStatus.Connecting)
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
		clearInterval(this.intervalId)

		await this.client.unsubscribe('*')
		await this.client.disconnect()
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				id: 'host',
				type: 'textinput',
				label: 'Target IP',
				tooltip: 'Address of the Streamer.bot WebSocket Server. Default localhost',
				default: 'localhost',
			},
			{
				id: 'port',
				type: 'textinput',
				label: 'Target Port',
				width: 5,
				regex: Regex.PORT,
				tooltip: 'Port of the Streamer.bot WebSocket Server. Default 8080',
				default: '8080',
			},
			{
				id: 'endpoint',
				type: 'textinput',
				label: 'Endpoint',
				tooltip: 'Endpoint of the Streamer.bot WebSocket Server. Default /',
				default: '/',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updateVariableValues() {
		this.setVariableValues({
			viewerCount: this.activeViewers,
			lastTwitchFollower: this.dataArray['Twitch']['Follow']?.data.displayName,
			lastTwitchChatMessage: this.dataArray['Twitch']['ChatMessage']?.data.message.message,
			lastDonationSender: this.dataArray['Streamlabs']['Donation']?.data.from,
			lastDonationAmount: this.dataArray['Streamlabs']['Donation']?.data.amount,
			lastDonationFormattedAmount: this.dataArray['Streamlabs']['Donation']?.data.formattedAmount,
			lastDonationCurrency: this.dataArray['Streamlabs']['Donation']?.data.currency,
			lastDonationMessage: this.dataArray['Streamlabs']['Donation']?.data.message,
			lastMerchandiseBuyerName: this.dataArray['Streamlabs']['Merchandise']?.data.from,
			lastMerchandiseBuyerProduct: this.dataArray['Streamlabs']['Merchandise']?.data.product,
			lastMerchandiseBuyerMessage: this.dataArray['Streamlabs']['Merchandise']?.data.message,
			lastMerchandiseProductImageUrl: this.dataArray['Streamlabs']['Merchandise']?.data.image,
			lastTipUsername: this.dataArray['StreamElements']['Tip']?.data.username,
			lastTipAmount: this.dataArray['StreamElements']['Tip']?.data.amount,
			lastTipCurrency: this.dataArray['StreamElements']['Tip']?.data.currency,
			lastTipMessage: this.dataArray['StreamElements']['Tip']?.data.message,
			// lastYoutubeSubscriber: this.dataArray['YouTube']['NewSubscriber']?.data.message,
			lastYoutubeChatMessage: this.dataArray['YouTube']['Message']?.data.message,
			lastYoutubeSuperChat: this.dataArray['YouTube']['SuperChat']?.data.message,
			// lastYoutubeSponsor: this.dataArray['YouTube']['NewSponsor']?.data.message,
		})
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
