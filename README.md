# Open AI Chat GPT Integration with XM Cloud POC

This project builds upon the XM Cloud starter Kit to enable organizations to define prompts that appear as buttons under text and rich text fields. This works with both Experience Editor and Pages.

You can read more and see screenshots on my blog post about this here:
https://blogs.perficient.com/2023/08/02/integrating-chatgpt-into-sitecores-xm-cloud/

To use this, you'll need to apply for Azure Open AI Services using this link and then provision a service in your own Azure tenant.
https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7en2Ais5pxKtso_Pz4b1_xUOFA5Qk1UWDRBMjg0WFhPMkIzTzhKQ1dWNyQlQCN0PWcu

This took a day or two for me, but your milage may vary.

Once you provision your own service, you'll need to deploy a model and then configure the endpoint and API Key within Sitecore in the main configuration node.

Once that's done, you can play with the different prompts and see how it works.

The Platform project has the service impelmentation if you want to modify how it works (change the fields used for integrating into prompt)

As his is based on the Standard XM Cloud starter kit, follow the standard directions for setting everything up.

# XM Cloud Starter Kit (Next JS)

## QUICK START

1. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

3. Follow the instructions to [deploy to XM Cloud](#deploy-to-xmcloud)

4. Create Edge token and [query from edge](#query-edge)

*** 

## About this Solution
This solution is designed to help developers learn and get started quickly
with XMCLoud + SXA.


