import {
  Item,
  DateField,
  Field,
  Text,
  RouteData,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface OptionItem extends Item {
  fields: {
    Text: Field<string>;
  };
}

interface Fields {
  EventLocation: OptionItem;
  HolidayTypes: OptionItem[];
  EventDate: Field<string>;
  EventDuration: Field<number>;
  HideEventDate: Field<boolean>;
}

type EventDetailsRouteData = RouteData & {
  fields: Fields;
};

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component event-details ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">{props.children}</div>
    </div>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const event = sitecoreContext.route as EventDetailsRouteData;
  const id = props.params?.RenderingIdentifier;
  const fields = event.fields;
  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <div className="alert alert-info mt-1">
        <h4>Event details</h4>
        <h5>
          Location:
          {fields?.EventLocation && <Text field={fields.EventLocation.fields.Text} />}
        </h5>
        <h5 className="mt-1">Holiday type:</h5>
        {fields?.HolidayTypes && (
          <ul>
            {fields.HolidayTypes.map((value, index) => (
              <li className="small" key={index}>
                {value.displayName}
              </li>
            ))}
          </ul>
        )}
        {fields?.hideEventDate && (
          <h5>
            Date:
            <DateField
              field={fields?.EventDate}
              render={(date) => <span>{date && date.toDateString()}</span>}
            />
          </h5>
        )}
        <h5 className="mt-1">
          Duration:
          <Text field={fields?.EventDuration} /> days
        </h5>
      </div>
    </ComponentContent>
  );
};
