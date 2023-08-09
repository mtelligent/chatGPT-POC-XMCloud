import {
  RichText,
  Field,
  Text,
  Link,
  LinkField,
  ImageField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: Field<string>;
  Summary: Field<string>;
  Body: Field<string>;
  Link: LinkField;
  Image: ImageField;
}
type HeroProps = ComponentProps & {
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
    <div className={`component hero ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">{props.children}</div>
    </div>
  );
};

const Hero = (props: HeroProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const divStyle = {
    backgroundSize: 'cover',
    background: 'url(' + props.fields.Image?.value?.src + ') center no-repeat',
  };
  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <div className="text-white p-5 my-4 rounded-3" style={divStyle}>
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">
            <Text field={props.fields.Title}></Text>
          </h1>
          <p className="col-md-8 fs-4">
            <div>
              <Text field={props.fields.Summary}></Text>
            </div>
          </p>
          <RichText field={props.fields.Body}></RichText>
        </div>
        <Link field={props.fields.Link} className="btn btn-primary btn-lg" role="button">
          Read more
        </Link>
      </div>
    </ComponentContent>
  );
};
export const Default = withDatasourceCheck()(Hero);
