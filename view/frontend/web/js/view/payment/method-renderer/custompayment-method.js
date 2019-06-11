define(
	[
	'Magento_Checkout/js/view/payment/default'
	],
		function (Component) {
		'use strict';
		return Component.extend({
			defaults: {
			template: 'Excellence_OfflinePaymentMethods/payment/custompayment'
			},
			/** Returns send check to info */
			getMailingAddress: function() {
			return window.checkoutConfig.payment.custompayment.mailingAddress;
		},
		/** Returns payable to info */
		/*getPayableTo: function() {
		return window.checkoutConfig.payment.checkmo.payableTo;
		}*/
		});
	}
);

