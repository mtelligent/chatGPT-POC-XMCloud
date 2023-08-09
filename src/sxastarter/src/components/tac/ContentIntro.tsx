import { useSitecoreContext, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { EventRouteData } from 'lib/component-props/events';

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component content-intro ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">{props.children}</div>
    </div>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params?.RenderingIdentifier;
  const event = sitecoreContext.route as EventRouteData;
  if (!(event.fields && event.fields.Title && event.fields.Intro)) {
    return (
      <ComponentContent id={id} styles={props.params?.styles}>
        <section>[Content Intro]</section>
      </ComponentContent>
    );
  }
  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <section>
        <h1>
          <Text field={event.fields.Title}></Text>
        </h1>
        <div className="lead">
          <Text field={event.fields.Intro}></Text>
        </div>
        <div>
          <Image
            field={event.fields.ContentImage}
            className="img-fluid"
            imageParams={{ mw: 1000, mh: 568 }}
          ></Image>
        </div>
      </section>
    </ComponentContent>
  );
};
