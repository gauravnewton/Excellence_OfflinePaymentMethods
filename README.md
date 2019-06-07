As, we know that magento 2 supports a wide variety of payment method including--

Online payment
Cash on delivery
Paypal payment Solution
Amazon pay
Card payment
Braintree payment solution

If you wish to add any other offline payment method along with these existing one then you are at right place.



     Today i am going to show you how to create module which enables us to choose  a custom offline payment method at checkout page in magento 2.



Follow these steps in order to achieve this-



1. Create a new folder under app/code/Excellence/OfflinePaymentMethods


    Here Excellence is namespace and OfflinePaymentMethods is module name.



2. Create registration.php file under app/code/Excellence/OfflinePaymentMethods with following          content



registration.php



 <?php  
 \Magento\Framework\Component\ComponentRegistrar::register(  
 \Magento\Framework\Component\ComponentRegistrar::MODULE,  
 'Excellence_OfflinePaymentMethods',  
 __DIR__  
 );  




3. Create module.xml file under app/code/Excellence/OfflinePaymentMethods/etc/



 module.xml



 <?xml version="1.0"?>  
 <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">  
      <module name="Excellence_OfflinePaymentMethods" setup_version="0.1.0">  
           <sequence>  
                <module name="Magento_Store"/>  
                <module name="Magento_Catalog"/>  
           </sequence>  
      </module>  
 </config>  




4.  Create system.xml file under app/code/Excellence/OfflinePaymentMethods/etc/adminhtml/



 system.xml



 <?xml version="1.0"?>  
 <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Config:etc/system_file.xsd">  
      <system>  
           <section id="payment" translate="label" type="text" sortOrder="400" showInDefault="1" showInWebsite="1" showInStore="1">  
                <group id="custompayment" translate="label" type="text" sortOrder="101" showInDefault="1" showInWebsite="1" showInStore="1">  
                     <label>Custom Payment</label>  
                     <field id="active" translate="label" type="select" sortOrder="1" showInDefault="1" showInWebsite="1" showInStore="0" canRestore="1">  
                          <label>Enabled</label>  
                          <source_model>Magento\Config\Model\Config\Source\Yesno</source_model>  
                     </field>  
                     <field id="order_status" translate="label" type="select" sortOrder="20" showInDefault="1" showInWebsite="1" showInStore="0" canRestore="1">  
                          <label>New Order Status</label>  
                          <source_model>Magento\Sales\Model\Config\Source\Order\Status\NewStatus</source_model>  
                     </field>  
                     <field id="sort_order" translate="label" type="text" sortOrder="100" showInDefault="1" showInWebsite="1" showInStore="0">  
                          <label>Sort Order</label>  
                          <frontend_class>validate-number</frontend_class>  
                     </field>  
                     <field id="title" translate="label" type="text" sortOrder="10" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">  
                          <label>Title</label>  
                     </field>  
                     <field id="allowspecific" translate="label" type="allowspecific" sortOrder="50" showInDefault="1" showInWebsite="1" showInStore="0" canRestore="1">  
                          <label>Payment from Applicable Countries</label>  
                          <source_model>Magento\Payment\Model\Config\Source\Allspecificcountries</source_model>  
                     </field>  
                     <field id="specificcountry" translate="label" type="multiselect" sortOrder="51" showInDefault="1" showInWebsite="1" showInStore="0">  
                          <label>Payment from Specific Countries</label><source_model>Magento\Directory\Model\Config\Source\Country</source_model>  
                          <can_be_empty>1</can_be_empty>  
                     </field>  
                     <field id="min_order_total" translate="label" type="text" sortOrder="98" showInDefault="1" showInWebsite="1" showInStore="0">  
                          <label>Minimum Order Total</label>  
                     </field>  
                     <field id="max_order_total" translate="label" type="text" sortOrder="99" showInDefault="1" showInWebsite="1" showInStore="0">  
                          <label>Maximum Order Total</label>  
                     </field>  
                     <field id="model"></field>  
                </group>  
           </section>  
      </system>  
 </config>  






5.  Create config.xml file under app/code/Excellence/OfflinePaymentMethods/etc/



  config.xml



 <?xml version="1.0"?>  
 <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Store:etc/config.xsd">  
      <default>  
           <payment>  
                <custompayment>  
                     <active>1</active>  
                     <model>Excellence\OfflinePaymentMethods\Model\CustomPayment</model>  
                     <order_status>pending</order_status>  
                     <title>Excellence Custom Payment Method</title>  
                     <allowspecific>0</allowspecific>  
                     <group>offline</group>  
                </custompayment>  
           </payment>  
      </default>  
 </config>  




6. Create payment.xml file under app/code/Excellence/OfflinePaymentMethods/etc/



 payment.xml



 <?xml version="1.0"?>  
 <payment xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Payment:etc/payment.xsd">  
      <groups>  
           <group id="offline">  
                <label>Offline Payment Methods</label>  
           </group>  
      </groups>  
      <methods>  
           <method name="custompayment">  
           <allow_multiple_address>1</allow_multiple_address>  
           </method>  
      </methods>  
 </payment>  




7. Create CustomPayment.php file under app/code/Excellence/OfflinePaymentMethods/Model/



  CustomPayment.php



 <?php  
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


8. Create checkout_index_index.xml file under

app/code/Excellence/OfflinePaymentMethods/view/frontend/layout/checkout_index_index.xml



checkout_index_index.xml



 <?xml version="1.0"?>  
 <page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
 xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">  
 <body>  
      <referenceBlock name="checkout.root">  
           <arguments>  
                <argument name="jsLayout" xsi:type="array">  
                     <item name="components" xsi:type="array">  
                          <item name="checkout" xsi:type="array">  
                               <item name="children" xsi:type="array">  
                                    <item name="steps" xsi:type="array">  
                                         <item name="children" xsi:type="array">  
                                              <item name="billing-step" xsi:type="array">  
                                                   <item name="children" xsi:type="array">  
                                                        <item name="payment" xsi:type="array">  
                                                             <item name="children" xsi:type="array">  
                                                                  <item name="renders" xsi:type="array">  
                                                                       <!-- merge payment method renders here -->  
                                                                       <item name="children" xsi:type="array">  
                                                                            <item name="excellence-offlinepaymentmethods" xsi:type="array">  
                                                                                 <item name="component" xsi:type="string">  
                                                                                      Excellence_OfflinePaymentMethods/js/view/payment/offline-payment  
                                                                                 </item>  
                                                                                      <item name="methods" xsi:type="array">  
                                                                                      <item name="custompayment" xsi:type="array">  
                                                                                           <item name="isBillingAddressRequired" xsi:type="boolean">true</item>  
                                                                                      </item>  
                                                                                 </item>  
                                                                            </item>  
                                                                       </item>  
                                                                  </item>  
                                                             </item>  
                                                        </item>  
                                                   </item>  
                                              </item>  
                                         </item>  
                                    </item>  
                               </item>  
                          </item>  
                     </item>  
                </argument>  
           </arguments>  
      </referenceBlock>  
 </body>  
 </page>  




9. Create custompayment-method.js file under app/code/Excellence/OfflinePaymentMethods/view/frontend/web/js/view/payment/method-renderer/



custompayment-method.js





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






10. Create file under offline-payment.js app/code/Excellence/OfflinePaymentMethods/view/frontend/web/js/view/payment/



 offline-payment.js



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




11. Create custompayment.html  file under app/code/Excellence/OfflinePaymentMethods/view/frontend/web/template/payment/



custompayment.html



 <div class="payment-method" data-bind="css: {'_active': (getCode() == isChecked())}">  
      <div class="payment-method-title field choice">  
           <input type="radio"  name="payment[method]" class="radio" data-bind="attr: {'id': getCode()}, value: getCode(), checked: isChecked, click: selectPaymentMethod, visible: isRadioButtonVisible()"/>  
           <label data-bind="attr: {'for': getCode()}" class="label"><span data-bind="text: getTitle()"></span></label>  
      </div>  
      <div class="payment-method-content">  
      <!-- ko foreach: getRegion('messages') -->  
      <!-- ko template: getTemplate() --><!-- /ko -->  
      <!--/ko-->  
      <div class="payment-method-billing-address">  
      <!-- ko foreach: $parent.getRegion(getBillingAddressFormName()) -->  
      <!-- ko template: getTemplate() --><!-- /ko -->  
      <!--/ko-->  
      </div>  
      <div class="checkout-agreements-block">  
      <!-- ko foreach: $parent.getRegion('before-place-order') -->  
      <!-- ko template: getTemplate() --><!-- /ko -->  
      <!--/ko-->  
      </div>  
      <div class="actions-toolbar">  
           <div class="primary">  
                <button class="action primary checkout" type="submit" data-bind="  click: placeOrder, attr: {title: $t('Place Order')}, css: {disabled: !isPlaceOrderActionAllowed()}, enable: (getCode() == isChecked()) " disabled>  
                     <span data-bind="i18n: 'Place Order'"></span>  
                </button>  
           </div>  
           </div>  
      </div>  
 </div>  
