using System.Threading.Tasks;

namespace KnowledgeSpace.BackendServer.Helpers
{
    public interface ISequenceService
    {
        Task<int> GetKnowledgeBaseNewId();
    }
}
