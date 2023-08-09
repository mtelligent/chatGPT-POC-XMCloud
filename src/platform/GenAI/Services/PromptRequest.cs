using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XmCloudSXAStarter.GenAI.Services
{
    public class PromptRequest
    {
        public string pageId { get; set; }

        public string promptId { get; set; }

        public string content { get; set; }

    }
}