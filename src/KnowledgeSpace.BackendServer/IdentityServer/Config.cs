using IdentityServer4.Models;
using System.Collections.Generic;

namespace KnowledgeSpace.BackendServer.IdentityServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
          new IdentityResource[]
          {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
          };

        public static IEnumerable<ApiResource> Apis =>
            new ApiResource[]
            {
                new ApiResource("api.knowledgespace", "KnowledgeSpace API")
            };

    }
}
