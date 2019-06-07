Magento 2 custom offline payment method


<div dir="ltr" style="text-align: left;" trbidi="on">
As, we know that magento 2 supports a wide variety of payment method including--<br />
<ul style="text-align: left;">
<li>Online payment</li>
<li>Cash on delivery</li>
<li>Paypal payment Solution</li>
<li>Amazon pay</li>
<li>Card payment</li>
<li>Braintree payment solution</li>
<li><br /></li>
</ul>
If you wish to add any other offline payment method along with these existing one then you are at right place.<br />
<br />
&nbsp; &nbsp; &nbsp;Today i am going to show you how to create module which enables us to choose&nbsp; a custom offline payment method at checkout page in magento 2.<br />
<br />
Follow these steps in order to achieve this-<br />
<br />
1. Create a new folder under app/code/<span style="background-color: white; color: #032f62; font-family: , &quot;consolas&quot; , &quot;liberation mono&quot; , &quot;menlo&quot; , &quot;courier&quot; , monospace; font-size: 12px; white-space: pre;">Excellence</span>/<span style="background-color: white; color: #032f62; font-family: , &quot;consolas&quot; , &quot;liberation mono&quot; , &quot;menlo&quot; , &quot;courier&quot; , monospace; font-size: 12px; white-space: pre;">OfflinePaymentMethods</span><br />
<span style="background-color: white; color: #032f62; font-family: , &quot;consolas&quot; , &quot;liberation mono&quot; , &quot;menlo&quot; , &quot;courier&quot; , monospace; font-size: 12px; white-space: pre;"><br /></span>
&nbsp; &nbsp; Here Excellence is namespace and OfflinePaymentMethods is module name.<br />
<div>
<br /></div>
<div>
2. Create registration.php file under app/code/Excellence/OfflinePaymentMethods with following&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; content<br />
<br />
<b>registration.php</b><br />
<br /></div>
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?php  
 \Magento\Framework\Component\ComponentRegistrar::register(  
 \Magento\Framework\Component\ComponentRegistrar::MODULE,  
 'Excellence_OfflinePaymentMethods',  
 __DIR__  
 );  
</code></pre>
<div>
<br />
<br />
3. Create module.xml file under app/code/Excellence/OfflinePaymentMethods/etc/<br />
<br />
<b>&nbsp;module.xml</b><br />
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?xml version="1.0"?&gt;  
 &lt;config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd"&gt;  
      &lt;module name="Excellence_OfflinePaymentMethods" setup_version="0.1.0"&gt;  
           &lt;sequence&gt;  
                &lt;module name="Magento_Store"/&gt;  
                &lt;module name="Magento_Catalog"/&gt;  
           &lt;/sequence&gt;  
      &lt;/module&gt;  
 &lt;/config&gt;  
</code></pre>
<br />
<br />
4.&nbsp; Create system.xml file under app/code/Excellence/OfflinePaymentMethods/etc/adminhtml/<br />
<br />
<b>&nbsp;system.xml</b><br />
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?xml version="1.0"?&gt;  
 &lt;config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Config:etc/system_file.xsd"&gt;  
      &lt;system&gt;  
           &lt;section id="payment" translate="label" type="text" sortOrder="400" showInDefault="1" showInWebsite="1" showInStore="1"&gt;  
                &lt;group id="custompayment" translate="label" type="text" sortOrder="101" showInDefault="1" showInWebsite="1" showInStore="1"&gt;  
                     &lt;label&gt;Custom Payment&lt;/label&gt;  
                     &lt;field id="active" translate="label" type="select" sortOrder="1" showInDefault="1" showInWebsite="1" showInStore="0" canRestore="1"&gt;  
                          &lt;label&gt;Enabled&lt;/label&gt;  
                          &lt;source_model&gt;Magento\Config\Model\Config\Source\Yesno&lt;/source_model&gt;  
                     &lt;/field&gt;  
                     &lt;field id="order_status" translate="label" type="select" sortOrder="20" showInDefault="1" showInWebsite="1" showInStore="0" canRestore="1"&gt;  
                          &lt;label&gt;New Order Status&lt;/label&gt;  
                          &lt;source_model&gt;Magento\Sales\Model\Config\Source\Order\Status\NewStatus&lt;/source_model&gt;  
                     &lt;/field&gt;  
                     &lt;field id="sort_order" translate="label" type="text" sortOrder="100" showInDefault="1" showInWebsite="1" showInStore="0"&gt;  
                          &lt;label&gt;Sort Order&lt;/label&gt;  
                          &lt;frontend_class&gt;validate-number&lt;/frontend_class&gt;  
                     &lt;/field&gt;  
                     &lt;field id="title" translate="label" type="text" sortOrder="10" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1"&gt;  
                          &lt;label&gt;Title&lt;/label&gt;  
                     &lt;/field&gt;  
                     &lt;field id="allowspecific" translate="label" type="allowspecific" sortOrder="50" showInDefault="1" showInWebsite="1" showInStore="0" canRestore="1"&gt;  
                          &lt;label&gt;Payment from Applicable Countries&lt;/label&gt;  
                          &lt;source_model&gt;Magento\Payment\Model\Config\Source\Allspecificcountries&lt;/source_model&gt;  
                     &lt;/field&gt;  
                     &lt;field id="specificcountry" translate="label" type="multiselect" sortOrder="51" showInDefault="1" showInWebsite="1" showInStore="0"&gt;  
                          &lt;label&gt;Payment from Specific Countries&lt;/label&gt;&lt;source_model&gt;Magento\Directory\Model\Config\Source\Country&lt;/source_model&gt;  
                          &lt;can_be_empty&gt;1&lt;/can_be_empty&gt;  
                     &lt;/field&gt;  
                     &lt;field id="min_order_total" translate="label" type="text" sortOrder="98" showInDefault="1" showInWebsite="1" showInStore="0"&gt;  
                          &lt;label&gt;Minimum Order Total&lt;/label&gt;  
                     &lt;/field&gt;  
                     &lt;field id="max_order_total" translate="label" type="text" sortOrder="99" showInDefault="1" showInWebsite="1" showInStore="0"&gt;  
                          &lt;label&gt;Maximum Order Total&lt;/label&gt;  
                     &lt;/field&gt;  
                     &lt;field id="model"&gt;&lt;/field&gt;  
                &lt;/group&gt;  
           &lt;/section&gt;  
      &lt;/system&gt;  
 &lt;/config&gt;  
</code></pre>
<br />
<br />
<br />
5.&nbsp; Create config.xml file under app/code/Excellence/OfflinePaymentMethods/etc/<br />
<br />
<b>&nbsp; config.xml</b><br />
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?xml version="1.0"?&gt;  
 &lt;config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Store:etc/config.xsd"&gt;  
      &lt;default&gt;  
           &lt;payment&gt;  
                &lt;custompayment&gt;  
                     &lt;active&gt;1&lt;/active&gt;  
                     &lt;model&gt;Excellence\OfflinePaymentMethods\Model\CustomPayment&lt;/model&gt;  
                     &lt;order_status&gt;pending&lt;/order_status&gt;  
                     &lt;title&gt;Excellence Custom Payment Method&lt;/title&gt;  
                     &lt;allowspecific&gt;0&lt;/allowspecific&gt;  
                     &lt;group&gt;offline&lt;/group&gt;  
                &lt;/custompayment&gt;  
           &lt;/payment&gt;  
      &lt;/default&gt;  
 &lt;/config&gt;  
</code></pre>
<br />
<br />
6. Create payment.xml file under app/code/Excellence/OfflinePaymentMethods/etc/<br />
<br />
<b>&nbsp;payment.xml</b><br />
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?xml version="1.0"?&gt;  
 &lt;payment xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Payment:etc/payment.xsd"&gt;  
      &lt;groups&gt;  
           &lt;group id="offline"&gt;  
                &lt;label&gt;Offline Payment Methods&lt;/label&gt;  
           &lt;/group&gt;  
      &lt;/groups&gt;  
      &lt;methods&gt;  
           &lt;method name="custompayment"&gt;  
           &lt;allow_multiple_address&gt;1&lt;/allow_multiple_address&gt;  
           &lt;/method&gt;  
      &lt;/methods&gt;  
 &lt;/payment&gt;  
</code></pre>
<br />
<br />
7. Create CustomPayment.php file under app/code/Excellence/OfflinePaymentMethods/Model/<br />
<br />
<b>&nbsp; CustomPayment.php</b><br />
<b><br /></b>

<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?php  
 namespace Excellence\OfflinePaymentMethods\Model;  
 class CustomPayment extends \Magento\Payment\Model\Method\AbstractMethod  
 {  
      const PAYMENT_METHOD_CUSTOM_INVOICE_CODE = 'custompayment';  
      /**  
      * Payment method code  
      *  
      * @var string  
      */  
      protected $_code = self::PAYMENT_METHOD_CUSTOM_INVOICE_CODE;  
 }  
</code></pre>
<b><br /></b>
<b><br /></b>
8. Create checkout_index_index.xml file under<br />
app/code/Excellence/OfflinePaymentMethods/view/frontend/layout/checkout_index_index.xml<br />
<br />
<b>checkout_index_index.xml</b><br />
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;?xml version="1.0"?&gt;  
 &lt;page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd"&gt;  
 &lt;body&gt;  
      &lt;referenceBlock name="checkout.root"&gt;  
           &lt;arguments&gt;  
                &lt;argument name="jsLayout" xsi:type="array"&gt;  
                     &lt;item name="components" xsi:type="array"&gt;  
                          &lt;item name="checkout" xsi:type="array"&gt;  
                               &lt;item name="children" xsi:type="array"&gt;  
                                    &lt;item name="steps" xsi:type="array"&gt;  
                                         &lt;item name="children" xsi:type="array"&gt;  
                                              &lt;item name="billing-step" xsi:type="array"&gt;  
                                                   &lt;item name="children" xsi:type="array"&gt;  
                                                        &lt;item name="payment" xsi:type="array"&gt;  
                                                             &lt;item name="children" xsi:type="array"&gt;  
                                                                  &lt;item name="renders" xsi:type="array"&gt;  
                                                                       &lt;!-- merge payment method renders here --&gt;  
                                                                       &lt;item name="children" xsi:type="array"&gt;  
                                                                            &lt;item name="excellence-offlinepaymentmethods" xsi:type="array"&gt;  
                                                                                 &lt;item name="component" xsi:type="string"&gt;  
                                                                                      Excellence_OfflinePaymentMethods/js/view/payment/offline-payment  
                                                                                 &lt;/item&gt;  
                                                                                      &lt;item name="methods" xsi:type="array"&gt;  
                                                                                      &lt;item name="custompayment" xsi:type="array"&gt;  
                                                                                           &lt;item name="isBillingAddressRequired" xsi:type="boolean"&gt;true&lt;/item&gt;  
                                                                                      &lt;/item&gt;  
                                                                                 &lt;/item&gt;  
                                                                            &lt;/item&gt;  
                                                                       &lt;/item&gt;  
                                                                  &lt;/item&gt;  
                                                             &lt;/item&gt;  
                                                        &lt;/item&gt;  
                                                   &lt;/item&gt;  
                                              &lt;/item&gt;  
                                         &lt;/item&gt;  
                                    &lt;/item&gt;  
                               &lt;/item&gt;  
                          &lt;/item&gt;  
                     &lt;/item&gt;  
                &lt;/argument&gt;  
           &lt;/arguments&gt;  
      &lt;/referenceBlock&gt;  
 &lt;/body&gt;  
 &lt;/page&gt;  
</code></pre>
<br />
<br />
9. Create&nbsp;custompayment-method.js&nbsp;file under app/code/Excellence/OfflinePaymentMethods/view/frontend/web/js/view/payment/method-renderer/<br />
<br />
<b>custompayment-method.js</b></div>
<div>
<br /></div>
<div>
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> define(  
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
</code></pre>
<br />
<br />
<br />
10. Create file under offline-payment.js&nbsp;app/code/Excellence/OfflinePaymentMethods/view/frontend/web/js/view/payment/</div>
<div>
<br /></div>
<div>
<b>&nbsp;offline-payment.js</b></div>
<div>
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> define(  
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
</code></pre>
</div>
<div>
<br />
<br />
11. Create custompayment.html&nbsp;&nbsp;file under app/code/Excellence/OfflinePaymentMethods/view/frontend/web/template/payment/<br />
<br />
<b>custompayment.html</b><br />
<br />
<pre style="background: #f0f0f0; border: 1px dashed #cccccc; color: black; font-family: &quot;arial&quot;; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;"><code style="color: black; word-wrap: normal;"> &lt;div class="payment-method" data-bind="css: {'_active': (getCode() == isChecked())}"&gt;  
      &lt;div class="payment-method-title field choice"&gt;  
           &lt;input type="radio"  name="payment[method]" class="radio" data-bind="attr: {'id': getCode()}, value: getCode(), checked: isChecked, click: selectPaymentMethod, visible: isRadioButtonVisible()"/&gt;  
           &lt;label data-bind="attr: {'for': getCode()}" class="label"&gt;&lt;span data-bind="text: getTitle()"&gt;&lt;/span&gt;&lt;/label&gt;  
      &lt;/div&gt;  
      &lt;div class="payment-method-content"&gt;  
      &lt;!-- ko foreach: getRegion('messages') --&gt;  
      &lt;!-- ko template: getTemplate() --&gt;&lt;!-- /ko --&gt;  
      &lt;!--/ko--&gt;  
      &lt;div class="payment-method-billing-address"&gt;  
      &lt;!-- ko foreach: $parent.getRegion(getBillingAddressFormName()) --&gt;  
      &lt;!-- ko template: getTemplate() --&gt;&lt;!-- /ko --&gt;  
      &lt;!--/ko--&gt;  
      &lt;/div&gt;  
      &lt;div class="checkout-agreements-block"&gt;  
      &lt;!-- ko foreach: $parent.getRegion('before-place-order') --&gt;  
      &lt;!-- ko template: getTemplate() --&gt;&lt;!-- /ko --&gt;  
      &lt;!--/ko--&gt;  
      &lt;/div&gt;  
      &lt;div class="actions-toolbar"&gt;  
           &lt;div class="primary"&gt;  
                &lt;button class="action primary checkout" type="submit" data-bind="  click: placeOrder, attr: {title: $t('Place Order')}, css: {disabled: !isPlaceOrderActionAllowed()}, enable: (getCode() == isChecked()) " disabled&gt;  
                     &lt;span data-bind="i18n: 'Place Order'"&gt;&lt;/span&gt;  
                &lt;/button&gt;  
           &lt;/div&gt;  
           &lt;/div&gt;  
      &lt;/div&gt;  
 &lt;/div&gt;  
</code></pre>
<br /></div>
</div>
