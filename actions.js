export default function (self) {
	self.setActionDefinitions({
		runAction: {
			name: 'Run Action',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: '',
					choices: self.actions.actions.map((value) => ({ label: value.name, ...value })),
				},
			],
			callback: async (event) => {
				console.log('Run Action!', event.options.action)
				await self.client.doAction(event.options.action)
			},
		},
		runActionAdvanced: {
			name: 'Run Action Advanced',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: '',
					choices: self.actions.actions.map((value) => ({ label: value.name, ...value })),
				},
				{
					id: 'actionArgs',
					type: 'textinput',
					label: 'Action Arguments',
					default: 0,
				},
			],
			callback: async (event) => {
				console.log('Run Action Advanced!', event.options.action)
				await self.client.doAction(event.options.action, event.options.actionArgs)
			},
		},
		runActionByName: {
			name: 'Run Action by Name',
			options: [
				{
					id: 'actionName',
					type: 'textinput',
					label: 'Action Name',
					default: '',
				},
			],
			callback: async (event) => {
				console.log('Run Action by Name: ', event.options.actionName)
				await self.client.doAction(event.options.actionName)
			},
		},
		runActionById: {
			name: 'Run Action by Id',
			options: [
				{
					id: 'actionId',
					type: 'textinput',
					label: 'Action Id',
					default: 0,
				},
			],
			callback: async (event) => {
				console.log('Run Action by Id: ', event.options.actionId)
				await self.client.doAction(event.options.actionId)
			},
		},
		clearCredits: {
			name: 'Clear Credits',
			options: [],
			callback: async (event) => {
				console.log('Clear Credits!')
				await self.client.clearCredits()
			},
		},
		testCredits: {
			name: 'Test Credits',
			options: [],
			callback: async (event) => {
				console.log('Test Credits!')
				await self.client.testCredits()
			},
		},
	})
}
