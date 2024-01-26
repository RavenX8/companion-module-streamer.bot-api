export default async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'viewerCount', name: 'Current Viewer Count' },
		{ variableId: 'lastTwitchFollower', name: 'Last Twitch Follower' },
		{ variableId: 'lastTwitchChatMessage', name: 'Last Twitch Chat Message' },
		{ variableId: 'lastDonationSender', name: 'Last Streamlabs Donation Sender' },
		{ variableId: 'lastDonationAmount', name: 'Last Streamlabs Donation amount' },
		{ variableId: 'lastDonationFormattedAmount', name: 'Last Streamlabs Donation formatted amount' },
		{ variableId: 'lastDonationCurrency', name: 'Last Streamlabs donation currency' },
		{ variableId: 'lastDonationMessage', name: 'Last Streamlabs Donation Message' },
		{ variableId: 'lastMerchandiseBuyerName', name: 'Last Streamlabs Merchandise Buyer Name' },
		{ variableId: 'lastMerchandiseBuyerProduct', name: 'Last Streamlabs Bought Merchandise Product' },
		{ variableId: 'lastMerchandiseBuyerMessage', name: 'Last Streamlabs Merchendise Buyer message' },
		{ variableId: 'lastMerchandiseProductImageUrl', name: 'Last Streamlabs Bought Merchendise Image url' },
		{ variableId: 'lastTipUsername', name: 'Last StreamElements Tip Username' },
		{ variableId: 'lastTipAmount', name: 'Last StreamElements Tip Amount' },
		{ variableId: 'lastTipCurrency', name: 'Last StreamElements Tip Currency' },
		{ variableId: 'lastTipMessage', name: 'Last StreamElements Tip Message' },
		{ variableId: 'lastYoutubeSubscriber', name: 'Last Youtube Subscriber' },
		{ variableId: 'lastYoutubeChatMessage', name: 'Last Youtube Chat Message' },
		{ variableId: 'lastYoutubeSuperChat', name: 'Last Youtube Super Chat' },
		{ variableId: 'lastYoutubeSponsor', name: 'Last Youtube Sponsor' },
	])
}
