define(
	[
	'Magento_Checkout/js/view/payment/default',
	'ko',
	'jquery',
    'Magento_Checkout/js/model/quote',
    'mage/url',
    'Magento_Ui/js/model/messageList'
	],
		function (Component,ko,$,quote,url,messageList) {
		'use strict';
		return Component.extend({
			defaults: {
				template: 'Excellence_OfflinePaymentMethods/payment/custompayment'
			},
			
			getMailingAddress: function() {
				return window.checkoutConfig.payment.custompayment.mailingAddress;
			},

			initialize: function () {
	        	var self = this;
	        	self._super();
	        	self.btnPlaceOrder = ko.observable(false);
            	self.btnContinue = ko.observable(true);
            },

			validateDomain:function(){

				/* gathering details of current user either logged in or guest user */
				var self = this;

                var currentEmail; 
                if(quote.guestEmail) 
                    currentEmail = quote.guestEmail;
                else 
                    currentEmail = window.checkoutConfig.customerData.email;

                var validationUrl = url.build('validate/validate/validateemail');

                /* ajax calling */
                $.ajax(
						{ 
							url : validationUrl,
							type : 'POST',
							data: 
								{
									customerEmail: currentEmail
								},

	                        showLoader: true,
	                        success : function(flag) {
		                       if(flag)
		                       {
		                           self.btnPlaceOrder(true);
		                           self.btnContinue(false);
		                           messageList.addSuccessMessage({ message: 'You are allowed to place order.' });
		                       	}
		                       else {
		                             messageList.addErrorMessage({ message: 'You are not allowed to place order with provided email domain.' });
		                       	}
                   			}
               			}
           			);
				}
			}
		);
	}
);

