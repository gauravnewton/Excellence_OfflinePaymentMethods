define(
	[
	'uiComponent',
	'Magento_Checkout/js/model/payment/renderer-list'
	],
		function (
		Component,
		rendererList
		) {
			'use strict';
			rendererList.push({
			type: 'custompayment',
			component: 'Excellence_OfflinePaymentMethods/js/view/payment/method-renderer/custompayment-method'
		});
	/** Add view logic here if needed */
	return Component.extend({});
	}
);