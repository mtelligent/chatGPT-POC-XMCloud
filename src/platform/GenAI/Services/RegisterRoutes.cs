using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Sitecore.Pipelines;

namespace XmCloudSXAStarter.GenAI.Services
{
    public class RegisterRoutes : RegisterRoutesBase
    {
        public void Process(PipelineArgs args)
        {
            GlobalConfiguration.Configure(this.Configure);
        }

        protected void Configure(HttpConfiguration configuration)
        {
            MapRouteWithSession(configuration, "CloudSXAStarter.GenAI.Services", "api/1.0/genAI/{action}", "GenAI", "index");
        }
    }
}