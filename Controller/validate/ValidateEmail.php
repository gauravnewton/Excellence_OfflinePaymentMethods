<?php
namespace Excellence\OfflinePaymentMethods\Controller\Validate;
 
 
class ValidateEmail extends \Magento\Framework\App\Action\Action
{
    protected $_scopeConfig;
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
    )
    {
         $this->resultJsonFactory = $resultJsonFactory;
        $this->_scopeConfig = $scopeConfig;
        return parent::__construct($context);
    }
     
    public function execute()
    {
        $result = $this->resultJsonFactory->create();
        /* domain validation starts here */
        $storeAllowedDomain =  $this->_scopeConfig->getValue('payment/custompayment/email_domain'); // getting configration's allowed domain

        $flag = 0;

        $email = $this->getRequest()->getPostValue('customerEmail'); //this is the email entered by user on store front

        $extractedDomainName = substr(strrchr($email, "@"), 1);
        
        if( $storeAllowedDomain === $extractedDomainName)
            $flag = 1;
        return $result->setData($flag);
    }
}