import { Accordion, Loader } from "@navikt/ds-react";
import { Card } from "@sanity/ui";
import {
  getPublishedId,
  IntentButton,
  Preview,
  useClient,
  useSchema,
} from "sanity";
import useSWR from "swr";

export function FeedbackView(props) {
  const { documentId } = props;

  const schema = useSchema();

  const schemaType = schema.get("aksel_feedback");
  console.log(schemaType);

  const client = useClient({ apiVersion: "2021-06-07" });
  const { data, error, isValidating } = useSWR(
    `*[_type == "aksel_feedback" && references($id)]`,
    (query) =>
      client.fetch(query, {
        id: documentId,
      })
  );

  if (isValidating) {
    return (
      <div className="grid place-items-center px-6">
        <div className="mx-auto mt-24">
          <Loader size="xlarge" variant="neutral" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center">
        <div className="mx-auto mt-24 px-6">
          En feil oppstod, prøv å laste side på nytt eller kontakt utvikler.
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="grid place-items-center">
        <div className="mx-auto mt-24 px-6">
          Siden har ingen tilbakemeldinger enda.
        </div>
      </div>
    );
  }

  const done = data.filter((x) => x?.behandlet === true);
  const notDone = data.filter((x) => x?.behandlet === false);

  return (
    <div className="grid place-items-center">
      <div className="mx-auto mt-8 w-full px-6">
        <div className="mt-7">
          <ul>
            {notDone.map((x) => (
              <li key={x._id}>
                <Card flex={1}>
                  <IntentButton
                    intent="edit"
                    mode="bleed"
                    padding={1}
                    radius={2}
                    params={{
                      type: "aksel_feedback",
                      id: getPublishedId(x._id),
                    }}
                    style={{ width: "100%" }}
                  >
                    <Preview schemaType={schemaType} value={x} key={x._id} />
                  </IntentButton>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        {done.length > 0 && (
          <div className="mt-7">
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>{`Ferdig behandlet ${done.length}`}</Accordion.Header>
                <Accordion.Content>
                  <ul>
                    {done.map((x) => (
                      <li key={x._id}>
                        <Card flex={1}>
                          <IntentButton
                            intent=""
                            mode="bleed"
                            padding={1}
                            radius={2}
                            params={{
                              type: schemaType,
                              id: getPublishedId(x._id),
                            }}
                            style={{ width: "100%" }}
                          >
                            <Preview
                              schemaType={schemaType}
                              value={x}
                              key={x._id}
                            />
                          </IntentButton>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}