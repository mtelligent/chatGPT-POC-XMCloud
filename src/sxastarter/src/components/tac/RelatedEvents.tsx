import { Text, useSitecoreContext, Item, RouteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { BaseContentFields } from 'lib/component-props/events';
import NextLink from 'next/link';

type RelatedEventItem = Item &
  BaseContentFields & {
    url: string;
  };

interface Fields {
  RelatedEvents: RelatedEventItem[];
}

type RelatedEventsFields = {
  fields: Fields;
};

type EventRouteData = RouteData & RelatedEventsFields;

export const Default = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const fields = (sitecoreContext.route as EventRouteData).fields;
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={`component related-events ${props.params?.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="alert alert-danger">
          <h4>Related events:</h4>
          <ul>
            {fields?.RelatedEvents?.map((value, index) => (
              <li key={index}>
                <NextLink href={value.url} className="alert-link text-decoration-none">
                  <Text field={value.fields.Title} />
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
