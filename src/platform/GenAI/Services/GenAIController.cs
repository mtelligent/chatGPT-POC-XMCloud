
using Azure.AI.OpenAI;
using Azure;
using Sitecore.Data;
using Sitecore.Services.Infrastructure.Web.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.ServiceModel.Configuration;
using System.Web;
using System.Web.Http;
using IdentityModel.Client;

namespace XmCloudSXAStarter.GenAI.Services
{
    public class GenAIController : ServicesApiController
    {
        public GenAIController() { }

        [HttpGet]
        public HttpResponseMessage Index()
        {
            return Request.CreateResponse(System.Net.HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage Prompt([FromBody] PromptRequest request)
        {
            string pageId = request.pageId;
            string promptId = request.promptId;
            string content = request.content;

            var database = Sitecore.Context.Database ?? Sitecore.Data.Database.GetDatabase("master");
            var aiConfig = database.GetItem("/sitecore/content/Generative AI Settings");
            var page = database.GetItem(new ID(new Guid(pageId)));
            var prompt = database.GetItem(new ID(new Guid(promptId)));

            var apiKey = aiConfig.Fields["API Key"]?.Value ?? "a80e7b5d75fc4c9790730852e2b11341";
            var endpoint = aiConfig.Fields["Endpoint Url"]?.Value ?? "https://prftopenaidemo.openai.azure.com/";
            var deploymentName = aiConfig.Fields["deployment Name"]?.Value ?? "demoModel";

            var promptScenario = prompt.Fields["Scenario"].Value;
            var promptContent = prompt.Fields["Prompt"].Value;
            var keywords = page.Fields["Keywords"].Value;

            string message = promptContent.Replace("{content}", content);
            message = message.Replace("{keywords}", keywords);

            try
            {

                var client = new OpenAIClient(
                    new Uri(endpoint),
                    new Azure.AzureKeyCredential(apiKey));

                var chat = new ChatCompletionsOptions();
                chat.Messages.Add(new ChatMessage(ChatRole.System, promptScenario));
                chat.Messages.Add(new ChatMessage(ChatRole.User, message));

                Response<ChatCompletions> responses = client.GetChatCompletions(deploymentName, chat);

                string response = responses.Value.Choices.First().Message.Content;

                return new HttpResponseMessage() { Content = new StringContent(response, System.Text.Encoding.UTF8, "text/html") };
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage() { Content = new StringContent($"Error calling OpenAIClient. endpoint: {endpoint}, deploymentName: {deploymentName}, promptScenario: {promptScenario}, message: {message}, exception: {ex}", System.Text.Encoding.UTF8, "text/html") };
            }
        }
    }
}