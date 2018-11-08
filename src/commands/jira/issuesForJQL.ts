import { Atl } from "../../atlclients/clientManager";
import { JiraIssue } from "../../jira/jiraIssue";

export async function issuesForJQL(jql: string): Promise<JiraIssue.Issue[]> {
  let client = await Atl.jirarequest();

  if (client) {
    return client.search
      .searchForIssuesUsingJqlGet({
        expand: JiraIssue.expand,
        jql: jql,
        fields: JiraIssue.issueFields
      })
      .then((res: JIRA.Response<JIRA.Schema.SearchResultsBean>) => {
        const issues = res.data.issues;
        if (issues) {
          return issues.map((issue: any) => {
            return JiraIssue.fromJsonObject(issue);
          });
        }
        return [];
      });
  }

  return Promise.reject();
}
